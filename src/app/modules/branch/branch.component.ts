import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Branch } from '../../core/models/branch.model';
import { BranchService } from '../../core/services/api/branch.service';

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
	branch: Branch[] = [];
	search: string = '';
	searchUpdate = new Subject<string>();

	constructor(
		private branchService: BranchService,
	) {
		this.searchUpdate.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		this.loadBrand();
	}

	loadBrand(): void {
		let params = {
			search: this.search
		};
		this.branchService.getBranch(params).subscribe({
			next: (r) => {
				this.branch = r.data;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

}
