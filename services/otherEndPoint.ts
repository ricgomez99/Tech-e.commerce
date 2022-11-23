export async function postProduct(data: BodyInit) {
  try {
    const request = await fetch(
      "https://techproductsshop-production.up.railway.app/products",
      {
        method: "POST",
        body: data,
      }
    );
    return request.json();
  } catch (error) {
    return error;
  }
}

export async function idProduct(id: string) {
  try {
    const request = fetch(
      `https://techproductsshop-production.up.railway.app/${id}`
    );
    return (await request).json();
  } catch (error) {
    return error;
  }
}

export async function nameProduct(name: string) {
  try {
    const request = await fetch(
      `https://techproductsshop-production.up.railway.app?title=${name}`
    );
    return request.json();
  } catch (error) {
    return error;
  }
}

export async function getCategories() {
  try {
    const request = await fetch(
      "https://techproductsshop-production.up.railway.app/categories"
    );
    return request.json();
  } catch (error) {
    return error;
  }
}
