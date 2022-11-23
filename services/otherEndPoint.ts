export async function postProduct(data: BodyInit) {
  const request = await fetch(
    "https://techproductsshop-production.up.railway.app/products",
    {
      method: "POST",
      body: data,
    }
  );
  return request.json();
}
