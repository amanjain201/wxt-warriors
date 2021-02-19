import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private webexService: WebexService) { }

  ngOnInit(): void {
    console.log("Inside Home!!!");
    this.webexService.performLogin();
  }

}
