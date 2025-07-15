import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { BeritaService } from '../../services/berita.service';
import { BeritaDataOne, Post } from '../../models/berita.model';
import { generateSlug } from '../../utils/string.utils';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  name: string;
  avatar: string;
  date: string;
  text: string;
  replies?: Comment[];
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  slug: string | null = null;
  category: string | null = null;
  item: BeritaDataOne | null = null;
  popularNews: Post[] = [];
  terkaitNews: Post[] = [];

  newComment: string = '';
  comments: Comment[] = [
    {
      id: 1,
      name: 'UJANG YUSMEIDI S.P., M.Agr.',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      date: '28 Mar 2024 11:15',
      text: 'Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?',
      replies: [
        {
          id: 2,
          name: 'DINA RIKHA RIYANAWATI, S.Pd',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
          date: '28 Mar 2024 11:15',
          text: 'saya mengunduh sertifikatnya kok juga belum bisa',
        },
      ],
    },
  ];
  currentPage = 1;
  itemsPerPage = 5;

  submitComment() {
    if (this.newComment.trim().length > 0) {
      this.comments.unshift({
        id: Date.now(),
        name: 'User Baru',
        avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
        date: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        text: this.newComment,
      });
      this.newComment = '';
    }
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  constructor(
    private route: ActivatedRoute,
    private beritaService: BeritaService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.category = this.route.snapshot.paramMap.get('category');
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      const slug = params.get('slug');
      if (slug && category) {
        this.beritaService.getDetail(category, slug).subscribe((res) => {
          this.item = res.data;
        });
      }
    });

    this.beritaService.getPopular().subscribe((res) => {
      this.popularNews = res.data.posts.slice(0, 3); // top 3
    });

    this.beritaService.getTerkait(this.category || '').subscribe((res) => {
      this.terkaitNews = res.data.posts.slice(0, 3);
    });
  }

  generateSlug(title: string): string {
    return generateSlug(title);
  }
}
