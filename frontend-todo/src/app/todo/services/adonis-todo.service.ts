import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { TodoItem } from './../../core/entities';
import Ws from '@adonisjs/websocket-client';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/toast.service';


@Injectable({
	providedIn: 'root'
})
export class AdonisTodoService {

	private endpoint = 'tasks';
	private url = 'http://localhost:3333/v1';

	private socket;
	private channel;

	todoList$: Subject<TodoItem[]> = new Subject();
	alerts: any[] = [];

	constructor(private http: HttpClient, private toastService: ToastService) {
		this.getTodos().pipe(
			take(1)
		).subscribe((res: TodoItem[]) => {
			this.todoList$.next(res);
		});

		this.startSocket()
	}


	startSocket() {
		this.socket = Ws('ws://127.0.0.1:3333');

		this.socket.connect();

		this.channel = this.socket.subscribe('tasks')

		this.channel.on('tasks', (data: any) => {
			this.getTodos().subscribe((res: TodoItem[]) => {
				this.todoList$.next(res);
			})
		});
	}

	getTodoListSubject(): Subject<TodoItem[]> {
		return this.todoList$;
	}

	private getTodos() {
		const url = `${this.url}/${this.endpoint}`;
		return this.http.get(url);
	}

	saveTodo(todo: TodoItem) {
		const url = `${this.url}/${this.endpoint}`;
		return this.http.post(url, todo)
	}

	generateRandomTodos() {
		const url = `${this.url}/randogs`;
		return this.http.post(url, {});
	}

	markDone(id: number) {
		const url = `${this.url}/${this.endpoint}/${id}`;
		return this.http.put(url, { concluded: true })
	}

	markUndone(id: number, password: string = '') {
		const url = `${this.url}/${this.endpoint}/${id}`;
		return this.http.put(url, { concluded: false }, { headers: { 'saipos-pass': password } })
	}
}
