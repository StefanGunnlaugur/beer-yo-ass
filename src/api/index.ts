import { IApiResult, IHeaders, ICart, ICategory, IProduct, IOrder, IGetProducts } from './types';
import { mapCart, mapOrder, mapCategory, mapProduct } from './mapping';

const baseurl:string | undefined = process.env.REACT_APP_API_URL;

async function get(path: string): Promise<IApiResult> {
  return request('GET', path);
}

async function post(path: string, data: any): Promise<IApiResult> {
  return request('POST', path, data);
}

async function patch(path: string, data: any): Promise<IApiResult> {
  return request('PATCH', path, data);
}

async function deleteMethod(path: string): Promise<IApiResult> {
  return request('DELETE', path);
}

async function request(method: string, path: string, data?: any) {
  const url = new URL(path, baseurl);

  const options: IHeaders = {
    method,
    headers: {},
  };

  if (data) {
    options.headers = { 'content-type': 'application/json' };
    options.body = JSON.stringify(data);
  }

  const user = window.localStorage.getItem('user');

  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log('data', userData)
      options.headers['Authorization'] = `Bearer ${userData.token}`;
    } catch (e) {
      console.warn('Unable to parse user from localStorage', e);
    }
  }

  const response = await fetch(url.href, options);

  const json = method.toLowerCase() !== 'delete' ? await response.json() : null;

  const { status, ok } = response;

  return {
    data: json,
    ok,
    status,
  }
}

async function getCart(): Promise<ICart> {
  let result: IApiResult;

  try {
    result = await get('/cart');
  } catch (e) {
    console.error('Error fetching cart', e);
    throw new Error('Gat ekki sótt körfu');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt körfu' } } = result;
    throw new Error(error);
  }

  return mapCart(result.data);
}

async function updateCartLineQuantity(id: number, quantity: string): Promise<IApiResult> {
  let result: IApiResult;

  try {
    result = await patch(`/cart/line/${id}`, { quantity });
  } catch (e) {
    console.error('Error updating cart line', e);
    throw new Error('Gat ekki uppfært körfulínu');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki uppfært körfulínu' } } = result;
    throw new Error(error);
  }

  return result;
}

async function addProductToCart(product: number, quantity: number): Promise<IApiResult> {
  let result: IApiResult;

  try {
    result = await post('/cart/', { product, quantity });
  } catch (e) {
    console.error('Error adding cart line', e);
    throw new Error('Gat ekki bætt við körfulínu');
  }

  if (result && !result.ok) {
    const { data: { errors: [{ error = 'Gat ekki bætt við körfulínu' }] } } = result;
    throw new Error(error);
  }

  return result;
}

async function submitOrder(name: string, address: string): Promise<IApiResult> {
  let result: IApiResult;

  try {
    result = await post('/orders/', { name, address });
  } catch (e) {
    console.error('Error creating order', e);
    throw new Error('Gat ekki búið til pöntun');
  }

  return result;
}

async function deleteCartLine(id: number): Promise<IApiResult> {
  let result: IApiResult;

  try {
    result = await deleteMethod(`/cart/line/${id}`);
  } catch (e) {
    console.error('Error deleting cart line', e);
    throw new Error('Gat ekki eytt körfulínu');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki eytt körfulínu' } } = result;
    throw new Error(error);
  }

  return result;
}

async function registerUser(username: string, password: string, email: string): Promise<IApiResult> {
  let result: IApiResult;

  try {
    result = await post('/users/register', { username, password, email });
  } catch (e) {
    throw new Error('Gat ekki skráð notanda');
  }

  return result;
}

async function loginUser(username: string, password: string): Promise<any> {
  let result: IApiResult;

  try {
    result = await post('/users/login', { username, password });
  } catch (e) {
    throw new Error('Gat ekki skráð notanda inn');
  }

  return result;
}

async function getOrder(id: number): Promise<IOrder> {
  let result: IApiResult;

  try {
    result = await get(`/orders/${id}`);
  } catch (e) {
    console.error('Error fetching order', e);
    throw new Error('Gat ekki sótt pöntun');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt pöntun' } } = result;
    throw new Error(error);
  }

  return mapOrder(result.data);
}

async function getOrders(): Promise<IOrder[]> {
  let result: IApiResult;

  try {
    result = await get('/orders');
  } catch (e) {
    console.error('Error fetching orders', e);
    throw new Error('Gat ekki sótt pantanir');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt pantanir' } } = result;
    throw new Error(error);
  }

  return result.data.items.map(mapOrder);
}

async function getCategories({ limit = 10, offset = 0 } = {}): Promise<ICategory[]> {
  let result: IApiResult;

  try {
    result = await get(`/categories?limit=${limit}&offset=${offset}`);
  } catch (e) {
    console.error('Error fetching categories', e);
    throw new Error('Gat ekki sótt flokka');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt flokka' } } = result;
    throw new Error(error);
  }

  return result.data.items.map(mapCategory);
}

async function getProduct(id: number | string) : Promise<IProduct> {
  let result: IApiResult;

  try {
    result = await get(`/products/${id}`);
  } catch (e) {
    console.error('Error fetching product', e);
    throw new Error('Gat ekki sótt vöru');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt vöru' } } = result;
    throw new Error(error);
  }

  return mapProduct(result.data);
}

async function getCategory(id: number | string) : Promise<ICategory> {
  let result: IApiResult;

  try {
    result = await get(`/categories/${id}`);
  } catch (e) {
    console.error('Error fetching category', e);
    throw new Error('Gat ekki sótt flokk');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt flokk' } } = result;
    throw new Error(error);
  }

  return mapCategory(result.data);
}


async function getProducts({ limit = 10, offset = 0, category = undefined, search = undefined }: IGetProducts): Promise<IProduct[]> {
  let result: IApiResult;

  const categoryFilter = category ? `category=${category}&` : '';
  const searchFilter = search ? `search=${search}&` : '';

  try {
    result = await get(`/products?${categoryFilter}${searchFilter}limit=${limit}&offset=${offset}`);
  } catch (e) {
    console.error('Error fetching products', e);
    throw new Error('Gat ekki sótt vörur');
  }

  if (result && !result.ok) {
    const { data: { error = 'Gat ekki sótt vörur' } } = result;
    throw new Error(error);
  }

  return result.data.items.map(mapProduct);
}

export {
  getCategory,
  getCategories,
  getProduct,
  getProducts,
  registerUser,
  loginUser,
  getOrders,
  getOrder,
  getCart,
  updateCartLineQuantity,
  deleteCartLine,
  addProductToCart,
  submitOrder,
};