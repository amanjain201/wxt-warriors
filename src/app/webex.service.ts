import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Webex from 'webex';

@Injectable({
  providedIn: 'root'
})
export class WebexService {
  webex: any;
  createdRoomId: string;

  constructor(public http: HttpClient) { }

  performLogin() {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope
        }
      }
    });
    this.listenForWebex();
  }

  async initializeWebexObjectWithClientToken() {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: localStorage.getItem('webex_token')
      }
    });
    this.listenForWebex();
  }

  async listenForWebex() {
    this.webex.once(`ready`, () => {
      console.log(this.webex.canAuthorize);
      console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.canAuthorize) {
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token)
      } else {
        this.webex.authorization.initiateLogin();
      }
    });
  }

  getProfileInfo() {
    let basicAuthHeaderString = 'Bearer ' + localStorage.getItem('webex_token');
    let headers = new HttpHeaders({
      'Authorization': basicAuthHeaderString,
      'Content-Type': 'application/json',
    });
    
    return this.http.get<any>( 'https://webexapis.com/v1/people/me' , { headers: headers });
  }

  async createRoom(roomName: string) {
    try {
      this.createdRoomId = await this.webex.rooms.create({ title: roomName })
        .then(function (room) {
          console.log(room.title);
          return room.id;
        });
      console.log(this.createdRoomId);
      localStorage.setItem("createdRoomId", this.createdRoomId);
    } catch (error) {
      window.alert(error);
    }
  }

  async addUserToRoom(newUser: string, roomId:string) {
    this.webex.memberships.create(this.getMembershipObject(roomId, newUser));
  }

  removeRoom() {
    if (this.createdRoomId !== undefined && this.createdRoomId.length > 0) {
      this.webex.rooms.remove(this.createdRoomId);
    } else {
      window.alert("No room has been created. Please create a room for it to be deleted.")
    }
  }

  async onListRoom() {
    return this.webex.rooms.list({
      max: 500
    });
  }

  async sendMessageToRoom(message: string, roomId: string) {
    console.log("Room id before message: " + roomId);
    this.webex.messages.create({
      text: message,
      roomId: roomId
    })
  }

  getMembershipObject(roomId: string, user: string) {
    let wbxMember = {
      personEmail: user,
      roomId: roomId
    }
    return wbxMember;
  }

  viewMessageHistory(roomId){
    return this.webex.messages.list({ roomId: roomId });
  }

  getInstance() {
    return this.webex;
  }

  stopListeningToMessages() {
    this.webex.messages.stopListening();
    console.log("Stopped listening to message");
  }

  onLogout(){
    this.stopListeningToMessages();
    this.webex.logout();
  }
}
