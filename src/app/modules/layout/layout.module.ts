import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing';



@NgModule({
	declarations: [
		LayoutComponent,
	],
	imports: [
		CommonModule,
		LayoutRoutingModule,
		MaterialModule,
		SharedModule
	]
})
export class LayoutModule { }
