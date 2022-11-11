import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
	@Input() backgroundColor: string = 'red';
	@Input() message: string = 'Hello world';

	constructor() {}

	async ngOnInit() {}
}
