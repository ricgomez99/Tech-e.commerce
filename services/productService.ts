export async function getProducts() {
  const request = await fetch(
    "https://techproductsshop-production.up.railway.app/products"
  );
  const products = await request.json();

  return products;
}
