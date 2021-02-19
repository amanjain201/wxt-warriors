# Cisco CodeFestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Documentation

This is a basic app with basic styling using momentum to demonstrate the use of Webex Teams SDKs. As of now, this app has used the Rooms SDKs to create a room , add members to it, send a message and finally delete the room. 

The app is predominantly divided into 3 components:
* NavBar Component
* Home Component
* Room Component

where NavBar component consists of a fixed left side bar containing links for navigation and right of NavBar is the space for app's dynamic content, Home component consists of content which will show up after sso login and appears on dynamic section part and has description on content of app, Room component appears on clicking on Room link on the navbar and contains stuffs to play with Webex Teams Room SDKs.

 In Room's component, user can perform actions like creating room, adding user to room, send message to room and finally delete the room. All this actions are performed in a service.ts file named as webex.service.ts whose functions are called from both HomeComponent and RoomComponent.

 As of now, this app is a work in progress and therefore, there are very less validations and UX also is very simple. However, overtime it will be enhanced and updated with more SDKs examples.

 Reference: 
 https://webex.github.io/webex-js-sdk/api/#rooms
 
 Live App: https://amanjain201.github.io/cisco-codefestapp/
 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
