import { Component, OnInit } from '@angular/core';
import { PostsService } from '@src/services/apis/posts.service';

@Component({
	selector: 'app-send-page',
	templateUrl: './send-page.component.html',
	styleUrls: ['./send-page.component.scss'],
})
export class SendPageComponent implements OnInit {
	ngChar: number = 0;
	text!: string;

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {}

	textChange(event: any) {
		this.text = event.target.value;
		this.ngChar = this.text.length;

		this.facebookCheck();
		this.twitterCheck();
	}

	sendPost() {
		this.postsService.createPost({ message: this.text, facebook: this.facebookCheck() }).subscribe((res) => {
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
