import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule, ListModule, ListItemModule, InputModule, TopbarModule } from '@momentum-ui/angular';
import { ShortenTextPipe } from './shorten-text.pipe';
import { HttpClientModule } from '@angular/common/http';
import { CallComponent } from './call/call.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    NavbarComponent,
    HomeComponent,
    ShortenTextPipe,
    CallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ListModule,
    ListItemModule,
    InputModule,
    TopbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
