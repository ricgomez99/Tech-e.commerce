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



//Esto hace lo mismo que getProducts, pero tiene anexado los filtros
export async function getProducts2(data: any) {
  try {
    let query: string = ''
    if (Object.keys(data).length > 0) {
      let array: Array<string> = []
      for (let key in data) {
        array.push([key, data[key]].join("="))
      }
      query = array.join("&")
    }
    if (!query.length) {
      const request = await fetch("https://techproductsshop-production.up.railway.app/products");
      const products = await request.json();
      return products;
    }
    else {
      const request = await fetch(`https://techproductsshop-production.up.railway.app/products?${query}`);
      const products = await request.json();
      return products;
    }
  } catch (error) {
    return error;
  }
}

export async function updateProduct(id:string, data: BodyInit) {
  try {
    const request = await fetch(`https://techproductsshop-production.up.railway.app/products/${id}`,{
      method: "PATCH",
      body: data
    });
    const response = await request.json();
    return response;
  } catch (error) {
    return error
  }
}
