import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ListWarehouseComponent } from './pages/list-warehouse/list-warehouse.component';
import { WarehouseRoutingModule } from './warehouse.routing';
import { DialogWarehouseComponent } from './components/dialog-warehouse/dialog-warehouse.component';



@NgModule({
	declarations: [
		ListWarehouseComponent,
  DialogWarehouseComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		WarehouseRoutingModule,
		TranslateModule
	]
})
export class WarehouseModule { }
