import { IHttpPromise } from "angular";
import { TodoItem } from "./todo-item";

export interface ITodoService {
	alerts: any
	getTodos(): IHttpPromise<TodoItem[]>;
	saveTodo(todo: TodoItem): IHttpPromise<TodoItem>;
	generateRandomTodos(): IHttpPromise<TodoItem[]>;
	markDone(id: number): IHttpPromise<TodoItem>;
	markUndone(id: number, password: string): IHttpPromise<TodoItem>;
}