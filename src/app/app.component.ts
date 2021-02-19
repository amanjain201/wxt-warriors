import { Component } from '@angular/core';
import Webex from 'webex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodeFestApp';
  webex: any;

  ngOnInit(): void {
    // let redirect_uri = "http://localhost:4200";
    // this.webex = Webex.init({
    //   config: {
    //     meetings: {
    //       deviceType: 'WEB'
    //     },
    //     credentials: {
    //       client_id: 'C363c710f07a19092b369a1006c6a022646e76bc3a04f321e3d9924281813292a',
    //       redirect_uri: redirect_uri,
    //       scope: 'spark:all spark:kms'
    //     }
    //   }
    // });
    // this.webex.once('ready', ()=>{
    //   console.log(this.webex.canAuthorize);
    //   // To Login
    //   // this.webex.authorization.initiateLogin();
    //   // To Logout
    //   // this.webex.logout();
    //   if(this.webex.canAuthorize){
    //     // Get Login info if authorised
    //     this.webex.people.get('me').then(data=>{
    //       console.log(data);
    //     })
    //     sessionStorage.setItem("accessToken",this.webex.credentials.supertoken.access_token);
    //   } else {
    //     this.webex.authorization.initiateLogin();
    //   }
    // });
  }
}
