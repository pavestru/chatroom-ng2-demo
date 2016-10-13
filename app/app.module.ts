import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/app.component';
import { FormsModule }   from '@angular/forms';

import { ThreadComponent } from './components/thread.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ThreadComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
