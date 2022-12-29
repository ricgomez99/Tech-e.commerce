export async function getProducts() {
  const request = await fetch(
    "http://localhost:3001/products"
  );
  const products = await request.json();

  return products;
}
