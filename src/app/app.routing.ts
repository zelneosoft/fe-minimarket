import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './core/guard/anonymous.guard';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/layout/layout.module').then((module) => module.LayoutModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'authentication',
		loadChildren: () => import('./modules/authentication/authentication.module').then((module) => module.AuthenticationModule),
		canActivate: [AnonymousGuard]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [
		CommonModule,
		RouterModule
	]
})
export class RoutingModule { }
