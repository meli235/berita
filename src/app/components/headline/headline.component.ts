import { Component, OnInit } from '@angular/core';
import { BeritaService } from '../../services/berita.service';
import { Post } from '../../models/berita.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
})
export class HeadlineComponent implements OnInit {
  headlines: Post[] = [];
  currentIndex = 0; // default tampil index ke-0
  maxHeadline = 5; // tampil max 5 headline

  constructor(private beritaService: BeritaService) {}

  ngOnInit() {
    this.beritaService.getHeadline().subscribe((res) => {
      // Ambil hanya max 5 headline pertama
      this.headlines = res.data.posts.slice(0, this.maxHeadline);
    });
  }

  get headline(): Post | null {
    return this.headlines.length > 0 ? this.headlines[this.currentIndex] : null;
  }

  next() {
    if (this.currentIndex < this.headlines.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
