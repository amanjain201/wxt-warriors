import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  listOfRooms: any = [];
  showRooms:boolean = false;
  constructor(private webexService: WebexService) { }

  ngOnInit(): void {
    this.webexService.initializeWebexObjectWithClientToken()    
  }

  listRooms() {
    this.webexService.onListRoom().then((rooms) => {
      console.log(rooms.items)
      this.listOfRooms = rooms.items;
      this.showRooms = true;
    }).catch((err)=>{
      console.log(err);
      // this.listRooms();
    })
  }

  hideRooms() {
    this.showRooms = false;
  }

}
