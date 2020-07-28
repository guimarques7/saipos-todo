import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throttleTime } from 'rxjs/operators';
import { TodoItem } from 'src/app/core/entities';
import { AdonisTodoService } from '../services/adonis-todo.service';

@Component({
	selector: 'app-todo-home',
	templateUrl: './todo-home.component.html',
	styleUrls: ['./todo-home.component.css']
})
export class TodoHomeComponent implements OnInit {

	public concludedList: Array<TodoItem> = [];
	public unconcludedList: Array<TodoItem> = [];

	@ViewChild('undoneModal')
	private undoneModal;

	public closeResult;

	constructor(private todoService: AdonisTodoService, private modalService: NgbModal) { }

	ngOnInit(): void {
		this.listTodos();
	}

	listTodos() {
		this.todoService.getTodoListSubject()
			.pipe(throttleTime(100))
			.subscribe((res: TodoItem[]) => {
				this.concludedList = res.filter(todo => todo.concluded);
				this.unconcludedList = res.filter(todo => !todo.concluded);
			});
	}

	markUndone(id: number) {
		this.modalService.open(this.undoneModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((supervisorPass) => {
			this.todoService.markUndone(id, supervisorPass)
					.subscribe();
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	markDone(id: number) {
		this.todoService.markDone(id).subscribe();
	}

}
