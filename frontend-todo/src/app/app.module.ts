import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToastsContainer } from './core/components/toast-container.component';

import { ToastService } from './core/services/toast.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ToastsContainer
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule
	],
	providers: [
		ToastService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
