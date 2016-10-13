import { Component } from '@angular/core';
import { Message } from '../services/models';
import { MessageService } from '../services/messages.service';

@Component({
  selector: 'thread',
  providers: [MessageService],
  template: `
    <div id="main">
      <div class="fixed">
        <h1>Chatroom</h1>
      </div>
      <div class="fixed">Number of messages: <strong>{{ getLength() }}</strong></div>
      <div id="message-list">
        <div class="msg" *ngFor="let message of messages">
          {{ message.text }} {{ message.sentAt | date }}
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
export class ThreadComponent {
  messages: Message[];
  draftMessage: Message;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.draftMessage = {
      id: 0,
      text: '',
      sentAt: new Date(),
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

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.sentAt = new Date();
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }
}
