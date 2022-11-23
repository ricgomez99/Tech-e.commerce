export async function idProduct(id: string) {
    try {
        const json = fetch(`https://techproductsshop-production.up.railway.app/${id}`)
        return (await json).json();
    } catch (error) {
        console.log(error)
    }
}