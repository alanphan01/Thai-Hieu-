export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  is_featured: boolean;
  order_index: number;
}

export interface ProfileData {
  name: string;
  role: string;
  sub_role: string;
  avatar_url: string;
}
