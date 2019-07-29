export interface IApiResult {
    data: any;
    ok: boolean;
    status: number;
  }
  
  export interface ICategory {
    id: number;
    title: string;
  }
  
  export interface IProduct {
    id: number;
    title: string;
    price: number;
    image: string;
    category: ICategory;
    description?: string;
    created?: Date;
    updated?: Date;
  }
  
  export interface IUser {
    id: number;
    username: string;
    email: string;
  }
  
  export interface IHeaders {
    method: string;
    headers?: any;
    body?: string;
  }
  
  export interface IOrderLine {
    id: number;
    product: IProduct;
    created: Date;
    quantity: number;
    total: number;
  }
  
  export interface IOrder {
    id: number;
    name: string;
    address: string;
    created: Date;
    updated: Date;
    total: number;
    lines: IOrderLine[];
  }
  
  export interface ICart {
    id: number;
    total: number;
    lines: IOrderLine[];
  }
  
  export interface IGetProducts {
    category?: number;
    limit?: number;
    offset?: number;
    search?: string;
  }