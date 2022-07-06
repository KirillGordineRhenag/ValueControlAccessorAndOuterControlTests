import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'

import { AppComponent } from './app.component';
import { MyControlWithErrorMessagesComponent } from './my-control-with-error-messages/my-control-with-error-messages.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatInputModule],
  declarations: [AppComponent, MyControlWithErrorMessagesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
