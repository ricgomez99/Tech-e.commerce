export async function name() {
    
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
