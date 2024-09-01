import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../core/services/loading.service';
import { LocalStorageService } from '../../core/services/ls.service';
import { AccountComponent } from '../dialog/account/account.component';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	@Output() sidenavToggle = new EventEmitter<void>();
	@Input() isSidenavOpen!: boolean;
	currentLanguage: string;
	public loading!: boolean;

	temaTxt = 'Tema Gelap';

	constructor(
		private translate: TranslateService,
		private ls: LocalStorageService,
		private loadingService: LoadingService,
		public dialog: MatDialog
	) {
		this.isSidenavOpen = true;
		this.currentLanguage = this.translate.currentLang;
	}

	ngOnInit(): void {
		this.loadingService.isLoading.subscribe((resp) => {
			this.loading = resp;
		});
	}

	toggleSidenav(): void {
		this.sidenavToggle.emit();
	}

	changeLanguage(lang: string): void {
		this.ls.saveLang(lang);
		this.translate.use(lang);
		this.currentLanguage = lang;
	}

	openDialogAccount() {
		this.dialog.open(AccountComponent, {
			width: '90%',
			maxWidth: '400px',
			height: 'auto',
		});
	}

}
