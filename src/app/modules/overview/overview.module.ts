import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview.routing';



@NgModule({
	declarations: [
		OverviewComponent
	],
	imports: [
		CommonModule,
		OverviewRoutingModule,
		SharedModule,
		TranslateModule
	]
})
export class OverviewModule { }
