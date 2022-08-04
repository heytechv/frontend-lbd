import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { TodoItemComponentComponent } from './todo-item-component/todo-item-component.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { TodoDonePipe } from './todo-done.pipe';
import { TooltipDirective } from './tooltip.directive';
import { ToastComponent } from './toast/toast.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponentComponent,
    TodoDonePipe,
    TooltipDirective,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
