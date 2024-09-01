import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BranchComponent } from './branch.component';
import { BranchRoutingModule } from './branch.routing';



@NgModule({
	declarations: [
		BranchComponent
	],
	imports: [
		CommonModule,
		BranchRoutingModule,
		FormsModule,
		TranslateModule
	]
})
export class BranchModule { }
