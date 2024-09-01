import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
	{
		path: 'category',
		component: CategoryComponent
	},
	{
		path: 'products',
		component: ProductComponent
	},
	{
		path: 'brand',
		component: BrandComponent
	},
	{
		path: 'employes',
		component: EmployeComponent
	},
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasterRoutingModule { }
