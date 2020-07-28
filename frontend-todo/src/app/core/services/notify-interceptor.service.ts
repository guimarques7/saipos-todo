import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpRequest,
	HttpHandler,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastService } from "./toast.service";

@Injectable({
	providedIn: 'root'
})
export class NotifyInterceptorService implements HttpInterceptor {

	constructor(private toastService: ToastService) { }
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(
			tap((event: HttpEvent<any>) => {
				console.log(event);

				if (event instanceof HttpResponse && event.body.message) {
					this.toastService.successToast(event.body.message || 'Success!');
				}
				if (event instanceof HttpErrorResponse && event.error) {

				}
			}),
			catchError((error: HttpErrorResponse) => {
				if (error.error) {
					this.toastService.errorToast(error.error.error || 'Somethig went wrong.');
				}
				return throwError(error);
			  })
		);
	}
}
