import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  listOfRooms: any = [];
  showRooms: boolean = false;
  incoming_msg_event;
  @Output() roomDetails = new EventEmitter<string>();
  roomName = "";
  showCreateRoomModal = false;
  constructor(private webexService: WebexService) { }

  ngOnInit(): void {
    this.webexService.initializeWebexObjectWithClientToken()
  }

  listRooms() {
    this.webexService.onListRoom().then((rooms) => {
      console.log(rooms.items)
      this.listOfRooms = rooms.items;
      this.showRooms = true;
    }).catch((err) => {
      console.log(err);
    })
  }

  hideRooms() {
    this.showRooms = false;
  }

  sendRoomDetails(room) {
    //console.log(room);
    this.roomDetails.emit(room);
  }

  createRoom() {
    this.showCreateRoomModal = true;
    if (this.roomName === undefined || this.roomName.length === 0) {
      Swal.fire(
        'Error',
        'Please enter room name to create',
        'error'
      )
      // alert("Please enter a person email id to add")
      return;
    }
    this.webexService.createRoom(this.roomName).then(() => {
      this.showCreateRoomModal = false;
      Swal.fire(
        'Success',
        this.roomName + ' has been created successfully',
        'success'
      ).then(() => {
        this.roomName = "";
      })
    });
  }

  openCreateRoomModal() {
    this.showCreateRoomModal = true;
  }

  closeModal() {
    this.showCreateRoomModal = false;
  }

}
