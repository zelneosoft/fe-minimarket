import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

	@ViewChild(MatSidenav) sidenav!: MatSidenav;

	isSidenavOpen: boolean = true;
	isSidenavMode: MatDrawerMode = 'side';

	constructor(private breakpointObserver: BreakpointObserver) {
		this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
			//jika matches true berarti desktop kalau tidak berarti mobile
			this.isSidenavOpen = result.matches;
			this.isSidenavMode = result.matches ? 'side' : 'over';
		});
	}

	onDrawerOpenedChange(opened: boolean) {
		this.isSidenavOpen = opened;
	}

	toggleSidenav(): void {
		this.isSidenavOpen = !this.isSidenavOpen;
	}

}
