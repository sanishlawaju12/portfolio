export interface Blog {
  title:string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  view_count: string;
  created_at: string;
}

export interface BlogResponse {
  count: number;
  results: Blog[];
}

export interface BlogDetailPost {
    id: number;
    category: string;
    tags: string[];
    view_count: number;
    slug: string;
    scheduled_for: string | null;
    created_at: string;
    deadline: string;
    title: string;
    body: string;
    image: string;
    excerpt: string;
    status: string;
  }