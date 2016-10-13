import { Injectable } from '@angular/core';
import { Message } from './models';
import { MESSAGES } from './messages.mock';

let initialMessages: Message[] = MESSAGES;

@Injectable()
export class MessageService {
    messages: Message[];

    constructor() {
        this.messages = initialMessages;
    }

    getMessages(): Message[] {
        return this.messages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }
}
