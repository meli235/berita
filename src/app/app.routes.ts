import { Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { KategoriComponent } from './pages/kategori/kategori.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detail/:category/:slug',
    component: DetailComponent,
  },
  {
    path: 'kategori/:category',
    component: KategoriComponent,
  },
];
