interface Product {
  id: string;
  productId: string;
  type: string;
  pack: string;
  typeSmallDescription: string;
  price: number;
  tag: string;
  category: string;
  title: string;
  description: string;
  smallDescription: string;
  animationCount: number;
  buttonText: string;
  files: string[];
  compatibility: string[];
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export async function fetchProducts(productId?: string): Promise<Product | Product[]> {
  const url = productId ? `/api/product?productId=${productId}` : "/api/product";
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const res = await fetch("/api/product", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(productId: string, data: Partial<Product>): Promise<Product> {
  const url = `/api/product?productId=${productId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(productId: string): Promise<{ message: string }> {
  const url = `/api/product?productId=${productId}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}
