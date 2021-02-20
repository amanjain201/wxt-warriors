import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Webex from 'webex';

@Injectable({
  providedIn: 'root'
})
export class WebexService {
  webex: any;
  createdRoomId: string;

  constructor() { }

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

  initializeWebexObjectWithClientToken() {
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

  addUserToRoom(newUser: string) {
    this.webex.memberships.create(this.getMembershipObject(this.createdRoomId, newUser));
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
      max: 5
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
