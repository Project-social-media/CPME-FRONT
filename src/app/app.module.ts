import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AuthGuard } from '@src/scripts/guards/auth.guard';
import { TokenInterceptorProvider } from '@src/services/token/token.interceptor';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
	declarations: [AppComponent, LoginPageComponent, DashboardPageComponent, PopupComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [AuthGuard, TokenInterceptorProvider],
	bootstrap: [AppComponent],
})
export class AppModule {}
