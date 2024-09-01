import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogBrandComponent } from './components/dialog-brand/dialog-brand.component';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';
import { MasterRoutingModule } from './master.routing';
import { BrandComponent } from './pages/brand/brand.component';
import { CategoryComponent } from './pages/category/category.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { ProductComponent } from './pages/product/product.component';



@NgModule({
	declarations: [
		ProductComponent,
		EmployeComponent,
		CategoryComponent,
		DialogCategoryComponent,
		BrandComponent,
		DialogBrandComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MasterRoutingModule,
		TranslateModule
	]
})
export class MasterModule { }
