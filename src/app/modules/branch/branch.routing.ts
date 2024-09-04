import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch.component';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';

const routes: Routes = [
	{
		path: '',
		component: BranchComponent
	},
	{
		path: 'create',
		component: CreateBranchComponent
	},
	{
		path: 'edit',
		component: UpdateBranchComponent
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BranchRoutingModule { }
