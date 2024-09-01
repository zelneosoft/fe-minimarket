import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('../overview/overview.module').then((module) => module.OverviewModule)
			},
			{
				path: 'master',
				loadChildren: () => import('../master/master.module').then((module) => module.MasterModule)
			},
			{
				path: 'branch',
				loadChildren: () => import('../branch/branch.module').then((module) => module.BranchModule)
			},
			// initial another root with authenticator
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule { }
