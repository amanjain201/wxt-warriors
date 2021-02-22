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
  selectedRoomTitle:string;
  listMessages;
  showMessages = false;
  webex;
  incoming_msg;
  listenEventActivated: boolean = false;
  showAddUserModal = false;
  selectedRoomType:string = "";
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
    let regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

    if (this.addUser === undefined || this.addUser.length === 0) {
      Swal.fire(
        'Error',
        'Please enter a person email id to add',
        'error'
      )
      // alert("Please enter a person email id to add")
      return;
    }
    else if(!regex.test(this.addUser)) {
       Swal.fire(
          'Error',
          'Please enter a valid email id',
          'error'
        )   
    }
    else { 
    this.webexService.addUserToRoom(this.addUser, this.selectedRoomId).then(() => {
      this.showAddUserModal=false;
      Swal.fire(
        'Success',
        this.addUser + ' had been added successfully',
        'success'
      ).then(() => {
        this.addUser = "";
      })
     })
    }
  }

  openAddUserModal(){
    this.showAddUserModal = true;
  }

  closeAddUserModal(){
    this.showAddUserModal = false;
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
    //console.log("room details");
    //console.log(room);
    this.selectedRoomId = room.id;
    this.selectedRoomTitle = room.title;
    this.selectedRoomType = room.type;
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
      if(this.selectedRoomType === "direct") {
        this.setOtherPersonEmailToLocalStorage(m.items);
      }
      console.log(this.listMessages);
    });
  }

  setOtherPersonEmailToLocalStorage(allMessages) {
    for(let i=0; i<allMessages.length; i++) {
      if(allMessages[i].personEmail !== localStorage.getItem("profile_email")) {
          let initialPart = allMessages[i].personEmail.split("@")[0];
          localStorage.setItem("callee_url",initialPart+ "@cisco.webex.com");
          break;
      }
    }
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
