import { Component } from '@angular/core';
import { PostsService } from '@src/services/apis/posts.services';

@Component({
	selector: 'app-sending-page',
	templateUrl: './sending-page.component.html',
	styleUrls: ['./sending-page.component.scss'],
})
export class SendingPageComponent {
	ngChar: number = 0;
	text!: string;
	date!: Date;

	socialMedia = {
		facebook: {
			text: 'Facebook',
			isActive: true,
			iconId: 'facebook-icon',
		},
		twitter: {
			text: 'Twitter',
			isActive: false,
			iconId: 'twitter-icon',
		},
		instagram: {
			text: 'Instagram',
			isActive: false,
			iconId: 'instagram-icon',
		},
		linkedin: {
			text: 'LinkedIn',
			isActive: false,
			iconId: 'linkedin-icon',
		},
	};

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		console.log(this.socialMedia);
		this.disableIcon(Object.values(this.socialMedia));
	}

	// NOT USED
	textChange(event: any) {
		this.text = event.target.value;
		this.ngChar = this.text.length;

		this.facebookCheck();
		this.twitterCheck();
	}
	// NOT USED

	dateChange(event: any) {
		this.date = new Date(event.target.value);
		this.date.setHours(this.date.getHours() + 1);
	}

	nextMedia() {
		console.log(this.socialMedia);
		this.setNextActive(Object.values(this.socialMedia));
		console.log(this.socialMedia);
	}

	setNextActive(items: { text: string; isActive: boolean; iconId: string }[]): void {
		// Find the currently active item
		const activeIndex = items.findIndex((item) => item.isActive);
		if (activeIndex === -1) return; // No active item, stop the function

		// Set the current active item to inactive
		items[activeIndex].isActive = false;

		// Set the next item in the list to active (or the first item if it was the last one)
		items[(activeIndex + 1) % items.length].isActive = true;

		this.disableIcon(items);
	}

	disableIcon(items: { text: string; isActive: boolean; iconId: string }[]) {
		items.forEach((item) => {
			if (!item.isActive) {
				document.getElementById(item.iconId)!.classList.add('disable-social');
			} else {
				document.getElementById(item.iconId)!.classList.remove('disable-social');
			}
		});
	}

	sendPost() {
		if (!this.text) {
			alert('Entrez un texte pour envoyer le post');
			return;
		}

		if (!confirm('Êtes-vous sûr de vouloir envoyer ce message ?')) return;

		this.postsService.createPost({ message: this.text, facebook: this.facebookCheck(), twitter: false, date: this.date }).subscribe((res) => {
			console.log(res);
		});
	}

	facebookCheck() {
		if (this.text.length > 20000) {
			console.log('this.text');
			document.getElementById('facebook-icon')!.classList.add('disable-social');
			return false;
		}

		document.getElementById('facebook-icon')!.classList.remove('disable-social');
		return true;
	}

	twitterCheck() {
		if (this.text.length > 280) {
			document.getElementById('twitter-icon')!.classList.add('disable-social');
			return false;
		}

		document.getElementById('twitter-icon')!.classList.remove('disable-social');
		return true;
	}
}
