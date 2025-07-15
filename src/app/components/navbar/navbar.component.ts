import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  name: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;
  navItems: NavItem[] = [
    { name: 'Beranda', link: '', isActive: true },
    { name: 'Terbaru', link: '/kategori/terbaru', isActive: false },
    { name: 'Kalam', link: '/kategori/kalam', isActive: false },
    { name: 'Gaya Hidup', link: '/kategori/lifestyle', isActive: false },
    { name: 'Olahraga', link: '/kategori/sports', isActive: false },
    { name: 'Nasional', link: '/kategori/nasional', isActive: false },
    { name: 'Internasional', link: '/kategori/international', isActive: false },
  ];

  constructor(private router: Router) {
    // Watch the URL whenever it changes
    this.router.events.subscribe(() => {
      this.updateActiveLink(this.router.url);
    });

    // Also update on first load
    this.updateActiveLink(this.router.url);
  }

  updateActiveLink(currentUrl: string) {
    this.navItems.forEach((item) => {
      // Match exact or startsWith for category links
      if (item.link === '') {
        item.isActive = currentUrl === '/' || currentUrl === '';
      } else {
        item.isActive = currentUrl.startsWith(item.link);
      }
    });
  }
}
