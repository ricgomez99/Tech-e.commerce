export async function getProducts() {
  const request = await fetch("https://jsonplaceholder.typicode.com/posts");
  const products = await request.json();

  return products;
}
