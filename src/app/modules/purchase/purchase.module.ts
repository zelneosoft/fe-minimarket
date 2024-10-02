import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material.module';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { CreatePoComponent } from './pages/create-po/create-po.component';
import { ListPoComponent } from './pages/list-po/list-po.component';
import { PurchaseRoutingModule } from './purchase.routing';
import { UpdatePoComponent } from './pages/update-po/update-po.component';



@NgModule({
	declarations: [
		ListPoComponent,
		CreatePoComponent,
		DialogProductComponent,
  UpdatePoComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PurchaseRoutingModule,
		TranslateModule,
		MaterialModule
	]
})
export class PurchaseModule { }
