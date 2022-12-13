import { findManySales } from 'services/saleEndPoints';

export async function getSalePathsIds() {
  const items = await findManySales();
  const ids = items.map((item: any) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return ids;
}
