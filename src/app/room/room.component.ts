import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { WebexService } from '../webex.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-webex',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  roomName: string;
  createdRoomId: string;
  addUser: string;
  removeUser: string;
  message: string;
  deleteRoomId: string;
  showRoomCreatedMessage: boolean = false;
  selectedRoomId: string;
  listMessages;
  showMessages = false;
  webex;
  incoming_msg;
  listenEventActivated: boolean = false;
  constructor(private webexService: WebexService) {
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  createRoom() {
    this.webexService.createRoom(this.roomName);
    this.createdRoomId = localStorage.getItem("createdRoomId");
    this.showRoomCreatedMessage = true;
  }

  addUserToRoom() {
    if (this.addUser === undefined || this.addUser.length === 0) {
      Swal.fire(
        'Error',
        'Please enter a person email id to add',
        'error'
      )
      // alert("Please enter a person email id to add")
      return;
    }
    this.webexService.addUserToRoom(this.addUser, this.selectedRoomId).then(() => {
      Swal.fire(
        'Success',
        this.addUser + ' had been added successfully',
        'success'
      ).then(() => {
        this.addUser = "";
      })
    })
  }

  removeRoom() {
    this.webexService.removeRoom();
  }

  sendMessageToRoom() {
    this.webexService.sendMessageToRoom(this.message, this.selectedRoomId).then(() => {
      console.log("after send message");
      this.message = "";
    });

  }

  getRoomDetails(room) {
    this.selectedRoomId = room.id;
    this.getMessageHistory();
    if (this.listenEventActivated === false) {
      this.listenToMessages();
    }

  }

  listenToMessages() {
    this.webex = this.webexService.getInstance();
    this.webex.messages.listen()
      .then(() => {
        this.listenEventActivated = true;
        console.log('listening to message events');
        this.webex.messages.on('created', (event) => {
          if (event.data.roomId === this.selectedRoomId) {
            console.log(`Got a message:created event:\n${event}`)
            console.log(event);
            this.listMessages.push(event.data);
            return event;
          }
        }
        );
        //this.webex.messages.on('deleted', (event) => console.log(`Got a message:deleted event:\n${event}`));
      })
      .catch((e) => alert(`Unable to register for message events: ${e}`));

  }

  getMessageHistory() {
    this.listMessages = [];
    this.showMessages = true;
    let messages = this.webexService.viewMessageHistory(this.selectedRoomId);
    messages.then((m) => {
      this.listMessages = m.items;
      this.listMessages.reverse();
      console.log(this.listMessages);
    });
  }

  logout() {
    this.webexService.onLogout();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
