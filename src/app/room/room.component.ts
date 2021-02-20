import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-webex',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
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
  constructor(private webexService: WebexService) {
  }

  ngOnInit(): void {
  }

  createRoom() {
    this.webexService.createRoom(this.roomName);
    this.createdRoomId = localStorage.getItem("createdRoomId");
    this.showRoomCreatedMessage= true;
  }

  addUserToRoom() {
    this.webexService.addUserToRoom(this.addUser);
  }

  removeRoom() {
    this.webexService.removeRoom();
  }

  listRooms() {
    this.webexService.onListRoom().then((rooms) => {
      console.log(rooms)
    })
  }

  sendMessageToRoom() {
    this.webexService.sendMessageToRoom(this.message,this.selectedRoomId).then(()=>{
      console.log("after send message")
      this.getMessageHistory();
      this.message = "";
    });
    
  }

  getRoomDetails(room){
    this.selectedRoomId = room.id;
    this.getMessageHistory();
  }

  getMessageHistory(){
    this.showMessages=true;
    let messages = this.webexService.viewMessageHistory(this.selectedRoomId);
    messages.then((m)=>
    {
      this.listMessages=m.items;
      this.listMessages.reverse();
      console.log(this.listMessages);
    });
  }
  
  logout(){
    this.webexService.onLogout();
  }

}
