import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs/Rx';
import { Message } from './models';
import { MESSAGES } from './messages.mock';

let initialMessages: Message[] = MESSAGES;

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessageService {
    messages$: Observable<Message[]>;
    newMessages$: Subject<Message> = new Subject<Message>();

    append$: Subject<Message> = new Subject<Message>();

    updates$: Subject<any> = new Subject<any>();

    constructor() {

        // newMessages$ ---n-----n---n---->
        // append$      ---F-----F---F---->
        // updates$.scan:  I     M1  M2
        // messages$    ---M1----M2--M3--->     

        this.newMessages$
            .subscribe(this.append$);

        this.append$
            .map(
                (message: Message): IMessagesOperation =>
                    (messages: Message[]) => messages.concat(message)
            )
            .subscribe(this.updates$);

        this.messages$ = 
            this.updates$
                .scan(
                    (messages: Message[], operation: IMessagesOperation) => operation(messages),
                    initialMessages
                );
    }

    getMessages(): Observable<Message[]> {
        return this.messages$;
    }

    addMessage(message: Message) {
        this.newMessages$.next(message);
    }
}
