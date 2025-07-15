import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './models/berita.model';
import { BeritaService } from './services/berita.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { PopularNewsComponent } from './components/popular-news/popular-news.component';
import { RekomendasiComponent } from './components/rekomendasi/rekomendasi.component';
import { IklanComponent } from './components/iklan/iklan.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'berita-app';
}
