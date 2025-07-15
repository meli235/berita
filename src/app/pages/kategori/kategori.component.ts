import { Component } from '@angular/core';
import { Post } from '../../models/berita.model';
import { generateSlug } from '../../utils/string.utils';
import { BeritaService } from '../../services/berita.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kategori',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './kategori.component.html',
  styleUrl: './kategori.component.css',
})
export class KategoriComponent {
  category: string | null = null;
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private beritaService: BeritaService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = this.route.snapshot.paramMap.get('category');
      const category = params.get('category');
      if (category) {
        this.beritaService.getKategori(category).subscribe((res) => {
          this.allPosts = res.data.posts;
          this.applyFilter();
        });
      }
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
