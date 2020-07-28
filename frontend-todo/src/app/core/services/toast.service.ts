import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast) {
		this.toasts = this.toasts.filter(t => t !== toast);
	}

	successToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.show(textOrTpl, Object.assign(options, { classname: 'bg-success text-light', delay: 5000 }));
	}

	errorToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.show(textOrTpl, Object.assign(options, { classname: 'bg-danger text-light', delay: 5000 }));
	}
}
