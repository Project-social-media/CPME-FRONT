import { Component } from '@angular/core';
import { ArchivesService } from '@src/services/apis/archives.services';
import { PostsService } from '@src/services/apis/posts.services';

@Component({
	selector: 'app-calendar-view-list',
	templateUrl: './calendar-view-list.component.html',
	styleUrls: ['./calendar-view-list.component.scss'],
})
export class CalendarViewListComponent {
	listPosts: any[] = [];
	archive: boolean = false;

	constructor(private postsService: PostsService, private archivesService: ArchivesService) {}

	ngOnInit() {
		this.postsService.getAllPosts().subscribe({
			next: (response) => {
				this.listPosts = response.body;
				console.log(this.listPosts);
			},
		});
	}

	convertDateWithHours(date: Date) {
		const dateConvert = new Date(date);
		const dateConvertWithHours = `${dateConvert.getDate()}/${dateConvert.getMonth() + 1}/${dateConvert.getFullYear()} ${dateConvert.getHours()}:${dateConvert.getMinutes()}`;
		return dateConvertWithHours;
	}

	loadArchive() {
		this.archivesService.getAllArchives().subscribe({
			next: (response) => {
				this.listPosts = response.body;
				this.archive = true;
			},
		});
	}

	loadPost() {
		this.postsService.getAllPosts().subscribe({
			next: (response) => {
				this.listPosts = response.body;
				this.archive = false;
			},
		});
	}
}
