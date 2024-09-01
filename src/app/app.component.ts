import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from './core/services/ls.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Toko Man Tabing';

	constructor(translate: TranslateService, ls: LocalStorageService) {
		const storedLanguage = ls.getlang();
		if (storedLanguage) {
			translate.use(storedLanguage);
			translate.setDefaultLang(storedLanguage);
		} else {
			translate.use('en');
			translate.setDefaultLang('en');
		}
	}

}
