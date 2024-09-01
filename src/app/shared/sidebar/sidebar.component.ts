import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

	@Output() menuClicked = new EventEmitter<void>();
	panelOpenState = false;

	constructor(private router: Router, public translate: TranslateService, private breakpointObserver: BreakpointObserver) { }

	goTo(url: string) {
		this.router.navigate([url]);
		this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
			if (!result.matches) {
				this.menuClicked.emit();
			}
		});
	}

	isMenuActive(url: string): boolean {
		const currentUrl = this.router.url;
		return currentUrl === url || currentUrl.startsWith(url + '/');
	}

	isExpantMenu(keyword: string) {
		const regex = new RegExp(`${keyword}.*`);
		if (this.router.url.match(regex)) {
			return true;
		} else {
			return false;
		}
	}

}
