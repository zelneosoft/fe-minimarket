import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWarehouseComponent } from './pages/list-warehouse/list-warehouse.component';

const routes: Routes = [
	{
		path: '',
		component: ListWarehouseComponent
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WarehouseRoutingModule { }
