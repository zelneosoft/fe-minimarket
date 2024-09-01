import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { AccountComponent } from './dialog/account/account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
	declarations: [
		SidebarComponent,
		ToolbarComponent,
		AccountComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		TranslateModule
	],
	exports: [
		SidebarComponent,
		ToolbarComponent,
		AccountComponent
	]
})
export class SharedModule { }
