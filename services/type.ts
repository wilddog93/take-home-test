export interface ResponseAPI {
  code: string;
  description: string;
}

export interface PaginationAPI {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
