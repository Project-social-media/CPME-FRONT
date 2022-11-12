import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AuthGuard, LoginAuthGuard } from '@src/scripts/guards/auth.guard';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginPageComponent, canActivate: [LoginAuthGuard] },
	{ path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
	{ path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'login' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
