import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeritaService } from '../../services/berita.service';
import { Post } from '../../models/berita.model';
import { generateSlug } from '../../utils/string.utils';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rekomendasi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rekomendasi.component.html',
  styleUrl: './rekomendasi.component.css',
})
export class RekomendasiComponent implements OnInit {
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = '';

  constructor(private beritaService: BeritaService) {}

  ngOnInit() {
    this.beritaService.getRekomendasi().subscribe((res) => {
      this.allPosts = res.data.posts;
      this.applyFilter();
    });
  }

  applyFilter() {
    const search = this.searchTerm.toLowerCase();
    this.filteredPosts = this.allPosts.filter((post) =>
      post.title.toLowerCase().includes(search)
    );
    this.currentPage = 1; // reset ke halaman pertama setiap filter
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredPosts.length
    );
  }

  get pagedPosts(): Post[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPosts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  generateSlug(title: string): string {
    return generateSlug(title);
  }
}
