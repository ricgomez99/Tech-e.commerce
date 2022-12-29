import axios from "axios";

export async function postProduct(data: any) {
  try {
    const response = await axios.post(
      "https://techproductsshop-production.up.railway.app/products",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function idProduct(id: string) {
  try {
    const request = fetch(
      `https://techproductsshop-production.up.railway.app/products/${id}`
    );
    return (await request).json();
  } catch (error) {
    return error;
  }
}

export async function nameProduct(title: string) {
  try {
    const request: any = await fetch(
      `https://techproductsshop-production.up.railway.app/products?title=${title}`
    );

    const response = request.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCategories() {
  try {
    const request = await fetch(
      "http://localhost:3001/categories"
    );
    const categories = await request.json();
    return categories;
  } catch (error) {
    return error;
  }
}

export async function getProducts2(data: any) {
  try {
    let query: string = "";
    if (Object.keys(data).length > 0) {
      let array: Array<string> = [];
      for (let key in data) {
        array.push([key, data[key]].join("="));
      }
      query = array.join("&");
    }
    if (!query.length) {
      const request = await fetch(
        "http://localhost:3001/products"
      );
      const products = await request.json();
      return products;
    } else {
      const request = await fetch(
        `http://localhost:3001/products?${query}`
      );
      const products = await request.json();
      return products;
    }
  } catch (error) {
    return error;
  }
}

//Esta función hace un update de los parámetros de los productos

export async function updateProduct(id: string, data: any) {
  try {
    const request = await axios.patch(
      `https://techproductsshop-production.up.railway.app/products/${id}`,
      data
    );
    const response = await request.data;
    return response;
  } catch (error) {
    return error;
  }
}

export async function updateStock(id: string, stocked: number) {
  try {
    const request = await axios.patch(
      `https://techproductsshop-production.up.railway.app/products/${id}`,
      { stock: stocked }
    );
    const response = request.data;
    return response;
  } catch (error) {
    return error;
  }
}

export async function logicDelete(id: string, enable: boolean) {
  try {
    const request = await axios.patch(
      `https://techproductsshop-production.up.railway.app/products/${id}`,
      { enabled: enable }
    );
    const response = await request.data;
    return response;
  } catch (error) {
    return error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const request = await fetch(
      `https://techproductsshop-production.up.railway.app/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}
