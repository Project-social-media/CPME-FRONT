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
			text: '',
			isActive: true,
			iconId: 'facebook-icon',
		},
		{
			key: this.TWITTER_KEY,
			text: '',
			isActive: false,
			iconId: 'twitter-icon',
		},
		{
			key: this.INSTAGRAM_KEY,
			text: '',
			isActive: false,
			iconId: 'instagram-icon',
		},
		{
			key: this.LINKEDIN_KEY,
			text: '',
			isActive: false,
			iconId: 'linkedin-icon',
		},
	];

	constructor(private postsService: PostsService) {}

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

	//////////////////////////////////////////////////
	// Functions pour le tableau
	//////////////////////////////////////////////////

	getActiveElement(arr: SocialMedia[]) {
		return arr.find((element) => element.isActive === true);
	}

	async updateActiveElement(arr: SocialMedia[], direction: string) {
		let activeElement = arr.find((element) => element.isActive === true);

		if (!activeElement) return;

		activeElement.isActive = false;
		const activeIndex = arr.indexOf(activeElement);

		if (direction === 'next') {
			if (activeIndex === arr.length - 1) {
				activeElement.isActive = true;
				return;
			}
			const nextIndex = activeIndex === arr.length - 1 ? 0 : activeIndex + 1;
			arr[nextIndex].isActive = true;
		} else if (direction === 'prev') {
			if (activeIndex === 0) {
				activeElement.isActive = true;
				return;
			}
			const prevIndex = activeIndex === 0 ? arr.length - 1 : activeIndex - 1;
			arr[prevIndex].isActive = true;
		}
	}

	//////////////////////////////////////////////////
	// Functions pour les boutons
	//////////////////////////////////////////////////

	async boutonClick(direction: string) {
		await this.updateActiveElement(this.socialMedia, direction);
		this.updateTextArea();
	}

	//////////////////////////////////////////////////
	// Functions pour le textarea
	//////////////////////////////////////////////////

	updateTextArea() {
		const activeElement = this.getActiveElement(this.socialMedia);
		if (!activeElement) return;

		const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
		textArea.value = activeElement.text;
	}

	updateTextInActiveElement($event: any) {
		const activeElement = this.getActiveElement(this.socialMedia);
		if (!activeElement) return;

		activeElement.text = $event.target.value;
	}

	//////////////////////////////////////////////////
	// Functions pour l'envoi des posts
	//////////////////////////////////////////////////

	processSocialMedia() {
		if (!this.alertSend()) return;

		// Filter socialMedia to only include items with non-empty text
		const nonEmptyItems = this.socialMedia.filter((item) => item.text !== '');

		// Use map() to call createPost() for each non-empty item
		nonEmptyItems.map((item) => {
			this.postsService.createPost({ message: item.text, date: this.date, [item.key]: true }).subscribe({
				next: (data) => {
					console.log(data);
					this.displayPopup();
				},
				error: (error) => {
					console.error('There was an error!', error);
				},
			});
		});
	}

	alertSend(): boolean {
		let listMedia = 'Vous allez envoyer sur :\n';
		this.socialMedia.forEach((item) => {
			if (item.text !== '') {
				listMedia += '- ' + item.key + '\n';
			}
		});

		let date;
		if (this.date) {
			date = this.date.toLocaleDateString('fr-FR', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			});
			listMedia += '\nSera publié le : ' + date;
		} else {
			date = 'Maintenant';
			listMedia += '\nSera publié : ' + date;
		}
		return confirm(listMedia);
	}

	//////////////////////////////////////////////////
	// Functions pour l'envoi des posts
	//////////////////////////////////////////////////

	displayPopup() {
		// this.popupColor = color;
		// this.popupMessage = message;
		// Get specifiq div element
		var popup = document.getElementById('popup')!;

		popup.style.top = '30px';

		// delay 3s for reset popup position
		setTimeout(() => {
			popup.style.top = '-500px';
		}, 4000);
	}
}
