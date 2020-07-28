import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from './../../core/entities';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	@Input()
	title: string = '...';

	@Input()
	buttonTitle: string = '...';

	@Input()
	public todoList: Array<TodoItem> = [];

	@Input()
	showRemaining: boolean = true;

	messageRemaining:
		{ [k: string]: string } = { '=0': 'Nice! You completed your tasks.', '=1': 'Just one more task to do.', 'other': '# tasks left.' };

	@Output()
	buttonEvent: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void { }

	execute(id) {
		this.buttonEvent.emit(id);
	}

}
