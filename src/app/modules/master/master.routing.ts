import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { CreateProductComponent } from './pages/product/create-product/create-product.component';
import { ProductComponent } from './pages/product/product.component';
import { UpdateProductComponent } from './pages/product/update-product/update-product.component';
import { SupplierComponent } from './pages/supplier/supplier.component';

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
		path: 'products/create',
		component: CreateProductComponent
	},
	{
		path: 'products/edit',
		component: UpdateProductComponent
	},
	{
		path: 'brand',
		component: BrandComponent
	},
	{
		path: 'supplier',
		component: SupplierComponent
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
