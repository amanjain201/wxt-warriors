import { Component, OnInit } from '@angular/core';
// import { ModalService } from '@momentum-ui/angular';
import { WebexService } from '../webex.service';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
    userSearchText;
    meet: any;
    incoming_meeting: any;
    added_incoming: any;
    incoming_call: boolean;
    d: boolean;
    meetCreate: boolean;
    incomingMeet: boolean;
    constructor(private webex: WebexService) { }


    ngOnInit(): void {
        console.log("welcome");

        if (this.webex.webex === undefined) {
            this.webex.initializeWebexObjectWithClientToken();
        }
        this.onRegister();
        this.listRooms();
    }

    async joinMeeting(meeting) {

        return meeting.join().then(() => {
            const mediaSettings = {
                receiveVideo: false,
                receiveAudio: true,
                receiveShare: false,
                sendVideo: false,
                sendAudio: true,
                sendShare: false
            };

            // Get our local media stream and add it to the meeting
            return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
                const [localStream, localShare] = mediaStreams;

                meeting.addMedia({
                    localShare,
                    localStream,
                    mediaSettings
                });
            });
        });
    }

    listRooms() {
        this.webex.onListRoom().then((rooms) => {
            // console.log(JSON.stringify(rooms.items))
            //this.rooms = rooms.items;
        })
    }
    onDial() {
        //localStorage.setItem('invite',this.invitee)
        let invitee = "amanjain@cisco.webex.com";
        if(localStorage.getItem("callee_url") !== null) {
            invitee = localStorage.getItem("callee_url");
        }
        return this.webex.webex.meetings.create(invitee).then((meeting) => {
            this.meet = meeting;
            this.meetCreate = true;
            this.incomingMeet = false;
            //this.bindMeetingEvents(this.meet);
            return this.joinMeeting(this.meet)

        })
            .catch((error) => {
                console.error(error);
            });
    }
    async onRegister() {
        try {
            await this.webex.webex.meetings.register();
            this.listenForIncoming();
        } catch (error) {
            window.alert(error);
        }
    }

    async listenForIncoming() {
        console.log("listen incoming");
        this.webex.webex.meetings.on('meeting:added', (addedMeetingEvent) => {
            console.log("meeting coming" + addedMeetingEvent.type);
            if (addedMeetingEvent.type === 'JOIN') {
                console.log("meeting incoming");
                const addedMeeting = addedMeetingEvent.meeting;
                this.incoming_meeting = addedMeetingEvent
                addedMeeting.acknowledge(addedMeetingEvent.type)
                    .then(() => {
                        console.log("hello adding incoming")
                        this.added_incoming = addedMeeting
                        this.incomingMeet = true;
                        this.meetCreate = false;
                        this.incoming_call = true;
                    });
            }
        });
    }

    onhangup() {
        if (this.meetCreate) {
            this.meet.leave()
            this.meetCreate = false;
        }
        else if (this.incomingMeet) {
            this.added_incoming.leave()
            this.incomingMeet = false;
        }

    }

    async incoming_attend() {
        console.log("attending call")
        if (this.incoming_call = true) {
            this.incoming_call = false
            // this.bindMeetingEvents(this.added_incoming);
            return this.joinMeeting(this.added_incoming);
        }
        else { this.added_incoming.decline() }
    }

    async incoming_cancel() {
        console.log("declining call")
        this.incoming_call = false
        this.added_incoming.decline()
    }

    joining() {
        this.d = true
    }

    cancel() {
        this.d = false
    }

    filterItem(value) {

    }
}
