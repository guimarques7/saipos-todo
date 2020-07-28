import { app } from "../app";
import { IHttpPromise, IHttpService } from "angular";
import { ITodoService } from "../core/todo-service-interface";
import { TodoItem } from "../core/todo-item";
import { Utils } from "../utils/constants";

export class AdonisTodoService implements ITodoService {
    
    static $inject = ['$http'];

    private endpoint = 'tasks';
    
    constructor(private $http: IHttpService) { }

    alerts: any[] = [];

    showAlert(data: any) {
        console.log(data);
        
        if (data.error) {
            this.handleError(data.error)
        }
    }

	handleError(msg: String) {
		this.alerts.push({ type: 'danger', msg: msg })
	}

	handleSuccess(msg: String) {        
		this.alerts.push({ type: 'success', msg: msg })
	}

	closeAlert(index: number) {
		this.alerts.splice(index, 1)
	}

    getTodos(): IHttpPromise<TodoItem[]> {
        const url = `${Utils.url}/${this.endpoint}`;
        return this.$http.get(url);
    }

    saveTodo(todo: TodoItem): IHttpPromise<TodoItem> {
        const url = `${Utils.url}/${this.endpoint}`;
        return this.$http.post(url, JSON.stringify(todo));
    }

    generateRandomTodos(): IHttpPromise<TodoItem[]> {
        const url = `${Utils.url}/randogs`;
        console.log(url);
        
        return this.$http.post(url, JSON.stringify({}));
    }

    markDone(id: number): IHttpPromise<TodoItem> {
        const url = `${Utils.url}/${this.endpoint}/${id}`;
        return this.$http.put(url, JSON.stringify({concluded: true}));
    }

    markUndone(id: number, password: string = ''): IHttpPromise<TodoItem> {
        const url = `${Utils.url}/${this.endpoint}/${id}`;
        console.log(password);
        
        return this.$http.put(url, JSON.stringify({concluded: false}), {
            headers: {'saipos-pass': password}
        });
    }
}

app.service('AdonisTodoService', AdonisTodoService)