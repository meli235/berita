import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BeritaService } from '../../services/berita.service';
import { Post } from '../../models/berita.model';
import { generateSlug } from '../../utils/string.utils';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.css',
})
export class PopularNewsComponent implements OnInit {
  popularPosts: Post[] = [];

  constructor(private beritaService: BeritaService) {}

  ngOnInit() {
    this.beritaService.getPopular().subscribe((res) => {
      // ambil 3 berita terpopuler, misalnya posts[1] sampai posts[3]
      this.popularPosts = res.data.posts.slice(1, 4);
    });
  }

  generateSlug(title: string): string {
    return generateSlug(title);
  }
}
