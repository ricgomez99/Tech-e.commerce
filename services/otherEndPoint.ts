export async function name() {
    
}

export async function getCategories() {
    try{const request = await fetch("https://techproductsshop-production.up.railway.app/categories")
        return  request.json();
    } catch(error){
        return error
    }
}