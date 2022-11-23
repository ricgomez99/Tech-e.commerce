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

export async function idProduct(id: string) {
  try {
    const json = fetch(
      `https://techproductsshop-production.up.railway.app/${id}`
    );
    return (await json).json();
  } catch (error) {
    return error;
  }
}

export async function nameProduct(name: string) {
  try {
    const json = await fetch(`https://techproductsshop-production.up.railway.app?title=${name}`)
    return json.json();
  } catch (error) {
    return error;
  }
}
