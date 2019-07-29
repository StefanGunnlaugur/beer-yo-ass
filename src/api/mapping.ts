import { ICategory, IProduct, IOrder, ICart } from './types';

export function mapCategory(item: any): ICategory {
  return {
    id: item.id,
    title: item.title,
  }
}

export function mapOrderLine(line: any) {
  const product: IProduct = {
    id: line.product_id,
    title: line.title,
    price: line.price,
    description: line.description,
    image: line.image,
    category: {
      id: line.category_id,
      title: line.category_title,
    },
  };

  return {
    id: line.id,
    product,
    created: new Date(line.created),
    quantity: line.quantity,
    total: line.total,
  }
}

export function mapOrder(item: any): IOrder {
  return {
    id: item.id,
    name: item.name,
    address: item.address,
    created: new Date(item.created),
    updated: new Date(item.updated),
    total: item.total,
    lines: (item.lines || []).map(mapOrderLine),
  }
}

export function mapCart(item: any): ICart {
  return {
    id: item.id,
    total: item.total,
    lines: item.lines.map(mapOrderLine),
  }
}

export function mapProduct(item: any): IProduct {
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    image: item.image,
    created: new Date(item.created),
    updated: new Date(item.updated),
    category: {
      id: item.category_id,
      title: item.category_title,
    },
  }
}