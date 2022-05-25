export interface IProduct {
  id?: string;
  title: string;
  price: string;
  description?: string | null;
  category?: ICategory | null;
  categoryId?: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id?: string;
  title: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IPagination<Item = any> {
  items: Item[];
  meta: IPaginationMeta;
}

export interface IDefaultResponse {
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
}
