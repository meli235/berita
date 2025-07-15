import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BeritaDataOne,
  BeritaResponse,
  BeritaResponseOne,
  Post,
} from '../models/berita.model';
import { generateSlug } from '../utils/string.utils';

@Injectable({
  providedIn: 'root',
})
export class BeritaService {
  private apiUrl = 'https://api-berita-indonesia.vercel.app';

  constructor(private http: HttpClient) {}

  getBerita(): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(`${this.apiUrl}/sindonews/nasional/`);
  }

  getHeadline(): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(`${this.apiUrl}/sindonews/sports/`);
  }

  getPopular(): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(`${this.apiUrl}/sindonews/otomotif/`);
  }

  getRekomendasi(): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(`${this.apiUrl}/sindonews/edukasi/`);
  }

  getDetail(category: string, slug: string): Observable<BeritaResponseOne> {
    return this.http
      .get<BeritaResponse>(`${this.apiUrl}/sindonews/${category}/`)
      .pipe(
        map((res) => {
          const post = res.data.posts.find(
            (p: Post) => generateSlug(p.title) === slug
          );
          if (post) {
            return { ...res, data: { ...res.data, post: post } };
          } else {
            throw new Error('Post not found');
          }
        })
      );
  }

  getTerkait(category: string): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(
      `${this.apiUrl}/sindonews/${category}/`
    );
  }

  getKategori(category: string): Observable<BeritaResponse> {
    return this.http.get<BeritaResponse>(
      `${this.apiUrl}/sindonews/${category}/`
    );
  }
}
