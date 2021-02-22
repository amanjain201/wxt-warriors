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
  allRooms: any = [];
  showRooms: boolean = false;
  incoming_msg_event;
  @Output() roomDetails = new EventEmitter<string>();
  roomName = "";
  showCreateRoomModal = false;
  profileName = "";
  searchRoomText:string;
  constructor(private webexService: WebexService) { }

  ngOnInit(): void {
    this.webexService.initializeWebexObjectWithClientToken()
  }

  listRooms() {
    this.webexService.getProfileInfo().subscribe(
      res => {
        console.log(res);
        localStorage.setItem("profile_email", res.xmppFederationJid);
        this.profileName =  res.displayName;
        console.log(this.profileName);
      }
      ,
      (error: Response) => {
        console.log(error.status + " " + error.statusText);

      });
      
    this.webexService.onListRoom().then((rooms) => {
      console.log(rooms.items)
      this.listOfRooms = rooms.items;
      this.allRooms = rooms.items;
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
      this.listRooms();
      Swal.fire(
        'Success',
        this.roomName + ' has been created successfully',
        'success'
      ).then(() => {
        this.roomName = "";
      })
    }).catch(err => {
      Swal.fire(
        'Error',
        'Sorry room cannot be created !!!',
        'error'
      )
    });
  }

  openCreateRoomModal() {
    this.showCreateRoomModal = true;
  }

  closeModal() {
    this.showCreateRoomModal = false;
  }

  searchSpaceFilter() {
    if (this.allRooms.length === 0) {
      this.listRooms();
    }
    console.log(this.allRooms);
    console.log(this.searchRoomText);
    if(this.searchRoomText !== undefined && this.searchRoomText.length > 0) {
      this.listOfRooms = this.filterRooms(this.allRooms, this.searchRoomText)
    } else {
      this.listOfRooms = this.allRooms;
    }  
  }

  filterRooms(allRooms, searchText) {
    let filteredRooms = [];
    for(let i=0; i < allRooms.length; i++) {
      if(allRooms[i].title.toLowerCase().includes(searchText.trim().toLowerCase())) {
        filteredRooms.push(allRooms[i]);
      }
    }
    return filteredRooms;
  }


}
