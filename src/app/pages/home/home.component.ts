import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadlineComponent } from '../../components/headline/headline.component';
import { PopularNewsComponent } from '../../components/popular-news/popular-news.component';
import { RekomendasiComponent } from '../../components/rekomendasi/rekomendasi.component';
import { IklanComponent } from '../../components/iklan/iklan.component';
import { BeritaService } from '../../services/berita.service';
import { Post } from '../../models/berita.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeadlineComponent,
    PopularNewsComponent,
    RekomendasiComponent,
    IklanComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  beritaList: Post[] = [];

  constructor(private beritaService: BeritaService) {}

  ngOnInit() {
    this.beritaService.getBerita().subscribe((response) => {
      this.beritaList = response.data.posts;
    });
  }
}
