import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MyControlWithErrorMessagesComponent } from './my-control-with-error-messages/my-control-with-error-messages.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    MyControlWithErrorMessagesComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
