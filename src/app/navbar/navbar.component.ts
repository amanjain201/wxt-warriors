import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';
import { Output, EventEmitter } from '@angular/core';

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

}
