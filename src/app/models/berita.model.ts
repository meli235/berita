export interface Post {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

export interface BeritaDataOne {
  link: string;
  image: string;
  description: string;
  title: string;
  post: Post;
}

export interface BeritaData {
  link: string;
  image: string;
  description: string;
  title: string;
  posts: Post[];
}

export interface BeritaResponse {
  success: boolean;
  message: string | null;
  data: BeritaData;
}

export interface BeritaResponseOne {
  success: boolean;
  message: string | null;
  data: BeritaDataOne;
}
