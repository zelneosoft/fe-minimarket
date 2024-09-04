import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BranchComponent } from './branch.component';
import { BranchRoutingModule } from './branch.routing';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';



@NgModule({
	declarations: [
		BranchComponent,
  CreateBranchComponent,
  UpdateBranchComponent
	],
	imports: [
		CommonModule,
		BranchRoutingModule,
		FormsModule,
		TranslateModule
	]
})
export class BranchModule { }
