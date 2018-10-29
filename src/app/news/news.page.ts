import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: any;
  page = 1;
  constructor(private newsService: NewsService, private router: Router, private network: Network) {
    // watch network for a disconnect
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();

    // watch network for a connection
    const connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();
  }

  ngOnInit() {
    this.newsService.getData(`top-headlines?country=us&category=business&pageSize=5&page=${this.page}`)
    .subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

  loadMoreNews(event) {
    this.page++;
    this.newsService
      .getData(`top-headlines?country=us&category=business&pageSize=5&page=${
        this.page
        }`
      )
    .subscribe(data => {
      // console.log(data);
      // this.data = data;
      for (const article of data['articles']) {
        this.data.articles.push(article);
      }
      event.target.complete();
      console.log(this.data);
    });
  }

}
