import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing';



@NgModule({
	declarations: [
		AuthenticationComponent
	],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		MaterialModule,
		SharedModule,
		FormsModule,
		TranslateModule
	]
})
export class AuthenticationModule { }
