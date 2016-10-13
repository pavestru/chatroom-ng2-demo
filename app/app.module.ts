import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/app.component';
import { FormsModule }   from '@angular/forms';

import { ChatroomComponent } from './components/chatroom.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ChatroomComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
