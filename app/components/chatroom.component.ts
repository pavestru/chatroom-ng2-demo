import { Component, ElementRef } from '@angular/core';
import { Message, User } from '../services/models';
import { MessageService } from '../services/messages.service';

@Component({
  selector: 'chatroom',
  providers: [MessageService],
  template: `
    <!-- Welcome screen -->
    <div *ngIf="this.user.name.length === 0" id="main" class="intro">
      <h1>Welcome to Chatroom</h1>
      <div>
        <p>Enter your name</p>
        <div id="new-message">
          <input [(ngModel)]="draftUsername" (keydown.enter)="onEnterUsername($event)" type="text" placeholder="Your name..." />
          <button (click)="onEnterUsername($event)">Enter</button>
        </div>
      </div>
    </div>
    <!-- Chatroom screen -->
    <div *ngIf="this.user.name.length > 0" id="main">
      <div class="fixed">
        <h1>Chatroom</h1>
      </div>
      <div class="fixed">Number of messages: <strong>{{ getLength() }}</strong></div>
      <div id="message-list">
        <div [class.own]="message.username === user.name" class="msg" *ngFor="let message of messages">
          <div class="username">{{ message.username }}</div>
          <div class="text">{{ message.text }}</div>
          <div class="time">{{ message.sentAt | date:"MMM d yyyy, HH:mm:ss" }}</div>
        </div>
      </div>
      <div id="new-message" class="fixed">
        <input type="text" 
               placeholder="Write your message here..."
               (keydown.enter)="onEnter($event)"
               [(ngModel)]="draftMessage.text" />
        <button (click)="onEnter($event)">Send</button>               
      </div>
    </div>
  `
})
export class ChatroomComponent {
  messages: Message[];
  draftMessage: Message;

  user: User;
  draftUsername: string;

  constructor(private messageService: MessageService,
              public el: ElementRef) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.draftMessage = {
      id: 0,
      text: '',
      sentAt: new Date(),
      username: ''
    };
    this.user = {
      name: ''
    };
  }

  getLength() : number {
    if (Array.isArray(this.messages)) {
      return this.messages.length;
    } else {
      return 0;
    }
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  onEnterUsername(event: any): void {
    if (this.draftUsername !== 'Chatbot') {
      this.user.name = this.draftUsername;
    }
    event.preventDefault();
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.sentAt = new Date();
    m.username = this.user.name;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('#message-list');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }  
}
