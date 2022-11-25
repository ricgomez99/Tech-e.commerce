import { getProducts } from "../services/paths";

export async function getPathsIds() {
  const items = await getProducts();
  const ids = items.map((item: any) => {
    return {
      params: {
        id: item.id,
      },
    };
  });

  return ids;
}
