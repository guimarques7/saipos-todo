import { Observable } from 'rxjs';
import { TodoItem } from './../entities';

export interface TodoServiceInterface {
	alerts: any
	getTodos();
	saveTodo(todo: TodoItem);
	generateRandomTodos();
	markDone(id: number);
	markUndone(id: number, password: string);
}
