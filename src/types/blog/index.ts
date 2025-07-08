export interface Blog {
  title:string;
  excerpt: string;
  image: string;
  category: {
    id?: string;
    name: string;
    slug: string;
  },
  slug: string;
  view_count: string;
  created_at: string;
}

export interface BlogResponse {
  count: number;
  next: string | null;
  previous: string | null;
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

export type BlogList = {
  id: number;
  excerpt: string;
  image: string;
  created_at: string;
  modified_at: string;
  slug: string;
  title: string;
  scheduled_for: string;
  deadline: string;
  status: "Draft" | "Pending" | "Denied" | "Published" | "Scheduled" | "Expired";
  view_count: number;
  posted_at: string;
  category: {
    id?: string;
    name: string;
    slug: string;
  },
  tags: {
    id?: string;
    name: string;
    slug: string;
  };
};

export type BlogListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogList[];
}

