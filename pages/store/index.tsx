import { getProducts } from "../../services/productService";

type Data = {
  products: any[];
};

export default function IndexStore({ products }: Data) {
  return (
    <div>
      <h1>Here all the products, Home Page</h1>
      <div>
        {products &&
          products.map((product: any) => (
            <li key={product.id}>{product.title}</li>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getProducts();

  return {
    props: {
      products: res,
    },
  };
}
