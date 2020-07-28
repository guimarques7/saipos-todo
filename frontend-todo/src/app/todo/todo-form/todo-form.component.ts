import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdonisTodoService } from '../services/adonis-todo.service';

@Component({
	selector: 'app-todo-form',
	templateUrl: './todo-form.component.html',
	styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

	isSavingTask: boolean = false
	isSavingRandomTasks: boolean = false

	todoForm: FormGroup;

	@Input()
	canAddRandomTasks: boolean = false;

	constructor(
		private todoService: AdonisTodoService,
		private formBuilder: FormBuilder
	) {
		this.todoForm = formBuilder.group({
			responsible: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			description: ['', Validators.required]
		});
	}

	ngOnInit(): void {
	}

	save() {
		this.isSavingTask = true;
		this.todoService.saveTodo(this.todoForm.value)
			.subscribe(() => this.initForm());
	}

	addRandomTodos() {
		this.isSavingRandomTasks = true
		this.todoService.generateRandomTodos()
			.subscribe(() => this.initForm());
	}

	initForm() {
		this.isSavingTask = false
		this.isSavingRandomTasks = false

		this.todoForm.reset()
	}

}
