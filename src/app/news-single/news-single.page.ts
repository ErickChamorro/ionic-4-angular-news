import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss'],
})
export class NewsSinglePage implements OnInit {
  article;
  constructor(private newService: NewsService, public navCtrl: NavController) { }

  ngOnInit() {
    this.article = this.newService.currentArticle;
    console.log(this.newService.currentArticle);
  }

  goToBack(){
    this.navCtrl.goBack();
  }

}
