import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoHomeComponent } from './todo-home/todo-home.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AdonisTodoService } from './services/adonis-todo.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifyInterceptorService } from '../core/services/notify-interceptor.service';

@NgModule({
	declarations: [
		TodoFormComponent,
		TodoHomeComponent,
		TodoListComponent
	],
	imports: [
		CommonModule,
		TodoRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [
		AdonisTodoService,
		{ provide: HTTP_INTERCEPTORS, useClass: NotifyInterceptorService, multi: true }
	]
})
export class TodoModule { }
