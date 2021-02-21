import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule, ListModule, ListItemModule, InputModule, TopbarModule } from '@momentum-ui/angular';
import { ShortenTextPipe } from './shorten-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    NavbarComponent,
    HomeComponent,
    ShortenTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ListModule,
    ListItemModule,
    InputModule,
    TopbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
