import { app } from '../app'
import { ITodoService } from '../core/todo-service-interface'
import { ITodoScope } from '../core/todo-scope-interface'
import { TodoItem } from '../core/todo-item'

export class TodoController {

	todoList: TodoItem[] = []

	doneCount: number = 0
	remainingCount: number = 0

	formSubmited: boolean
	isSavingTask: boolean = false
	isSavingRandomTasks: boolean = false

	todo = {} as TodoItem


	options: ng.ui.bootstrap.IModalSettings
	myModal?: ng.ui.bootstrap.IModalInstanceService

	static $inject = [
		'$scope',
		'AdonisTodoService',
		'$uibModal'
	]

	constructor(
		private $scope: ITodoScope,
		private todoService: ITodoService,
		public $uibModal: ng.ui.bootstrap.IModalService
	) {
		this.initForm()

		$scope.vm = this

		this.listTodos()

		$scope.$watch('todoList', () => {
			this.remainingCount = this.todoList.filter((todo) => todo.concluded !== true).length
		}, true)
	}

	listTodos() {
		this.todoService.getTodos().then((data) => {
			console.log('aaa => ', data);
			
			this.todoList = this.$scope.todoList = data.data
		})

		this.todoService.getTodos().then((data) => {
			console.log('aaa => ', data);
			
			this.todoList = this.$scope.todoList = data.data
		})
	}

	addTodo(isValid: boolean) {
		this.formSubmited = true
		if (!isValid) return

		this.isSavingTask = true

		this.todoService.saveTodo(this.todo).then(() => this.listTodos()).finally(() => this.initForm())
	}

	addRandomTodos() {
		this.isSavingRandomTasks = true
		this.todoService.generateRandomTodos().then(() => this.listTodos()).finally(() => this.initForm())
	}

	initForm() {
		this.formSubmited = false
		this.isSavingTask = false
		this.isSavingRandomTasks = false

		this.todo.description = ''
		this.todo.responsible = ''
		this.todo.email = ''
		this.todo.concluded = false
	}

	markDone(id: number) {
		this.todoService.markDone(id).then(res => {
			this.listTodos()
		})
	}

	markUnDone(id: number) {
		let options: ng.ui.bootstrap.IModalSettings = {
			animation: true,
			controller: 'ModalUndoneController',
            controllerAs:'modalCtrl',
			templateUrl: 'modal-undone.html'
		}

		this.$uibModal.open(options).result
			.then((res: any) => { 
				this.todoService.markUndone(id, res)
					.then(() => this.listTodos())
			})
	}
}

app.controller('TodoController', TodoController)
