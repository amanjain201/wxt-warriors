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

  constructor(private webexService: WebexService) {
  }

  ngOnInit(): void {
     this.webexService.initializeWebexObjectWithClientToken();
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
    this.listRooms();
    this.webexService.removeRoom();
  }

  listRooms() {
    this.webexService.onListRoom().then((rooms) => {
      console.log(rooms)
    })
  }

  sendMessageToRoom() {
    this.webexService.sendMessageToRoom(this.message);
  }
  
}
