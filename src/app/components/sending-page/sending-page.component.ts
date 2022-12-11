import { Component } from '@angular/core';
import { PostsService } from '@src/services/apis/posts.services';

interface SocialMedia {
	key: string;
	text: string;
	isActive: boolean;
	iconId: string;
}

@Component({
	selector: 'app-sending-page',
	templateUrl: './sending-page.component.html',
	styleUrls: ['./sending-page.component.scss'],
})
export class SendingPageComponent {
	ngChar: number = 0;
	date!: Date;

	readonly FACEBOOK_KEY = 'facebook';
	readonly TWITTER_KEY = 'twitter';
	readonly INSTAGRAM_KEY = 'instagram';
	readonly LINKEDIN_KEY = 'linkedin';

	socialMedia: SocialMedia[] = [
		{
			key: this.FACEBOOK_KEY,
			text: 'Facebook',
			isActive: true,
			iconId: 'facebook-icon',
		},
		{
			key: this.TWITTER_KEY,
			text: 'Twitter',
			isActive: false,
			iconId: 'twitter-icon',
		},
		{
			key: this.INSTAGRAM_KEY,
			text: 'Instagram',
			isActive: false,
			iconId: 'instagram-icon',
		},
		{
			key: this.LINKEDIN_KEY,
			text: 'LinkedIn',
			isActive: false,
			iconId: 'linkedin-icon',
		},
	];

	constructor() {}

	ngOnInit(): void {}

	//////////////////////////////////////////////////
	// Functions
	//////////////////////////////////////////////////

	dateChange(event: any) {
		// Convert the input value to a Date object
		const date = new Date(event.target.value);

		// Add one hour to the date
		date.setHours(date.getHours() + 1);

		// Set the date property to the updated date
		this.date = date;
	}
}
