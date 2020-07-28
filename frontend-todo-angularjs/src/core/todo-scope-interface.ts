import { IScope } from "angular";
import { TodoController } from "../todo/todo-controller";
import { TodoItem } from "./todo-item";

export interface ITodoScope extends IScope {
	todoList: TodoItem[];
	vm: TodoController;
}
