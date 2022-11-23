export async function getCategories() {
    try{const request = await fetch("https://techproductsshop-production.up.railway.app/categories")
        return  request.json();
    } catch(error){
        return error
    }
}


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
        const json = fetch(`https://techproductsshop-production.up.railway.app/${id}`)
        return (await json).json();
    } catch (error) {
        console.log(error)
    }
}

