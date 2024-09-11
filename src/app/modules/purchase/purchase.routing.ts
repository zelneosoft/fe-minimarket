import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePoComponent } from './pages/create-po/create-po.component';
import { ListPoComponent } from './pages/list-po/list-po.component';

const routes: Routes = [
	{
		path: 'po',
		component: ListPoComponent
	},
	{
		path: 'po/create',
		component: CreatePoComponent
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PurchaseRoutingModule { }
