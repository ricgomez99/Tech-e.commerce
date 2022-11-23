export async function name() {
    
}

export async function getCategories() {
    const request = fetch("https://techproductsshop-production.up.railway.app/categories")
                    .then(response => response.json())
                    .then(data => data.categories)
}