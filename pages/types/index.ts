export enum ArticlesEnum {
  "X Universe" = 1,
  "Elite: Dangerous" = 2,
  "Starpoint Gemini" = 3,
  "EVE Online" = 4,
}

export interface Article {
  date: string;
  excerpt: string;
  post_category_id: ArticlesEnum;
  post_image: string;
  post_thumbnail: string;
  slug: string;
  title: string;
}

export type Articles = { [key: string]: Article[] };
