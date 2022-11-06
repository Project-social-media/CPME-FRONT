import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AuthGuard } from '@src/scripts/guards/auth.guard';

@NgModule({
	declarations: [AppComponent, LoginPageComponent, DashboardPageComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [AuthGuard],
	bootstrap: [AppComponent],
})
export class AppModule {}
