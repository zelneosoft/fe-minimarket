import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { CreatePoComponent } from './pages/create-po/create-po.component';
import { ListPoComponent } from './pages/list-po/list-po.component';
import { PurchaseRoutingModule } from './purchase.routing';



@NgModule({
	declarations: [
		ListPoComponent,
		CreatePoComponent,
		DialogProductComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		PurchaseRoutingModule,
		TranslateModule
	]
})
export class PurchaseModule { }
