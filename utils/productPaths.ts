import { getProducts } from "../services/paths";


export async function getPathsIds() {
    const items = await getProducts();
    const ids = items.map((id:any)=>{
        return {
            params:{
                id
            }
        }
    })
};
