export interface ProfileDetail {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ProfileApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ProfileDetail[];
}

export interface ProfileDetailResponse {
  data: ProfileDetail;
}
