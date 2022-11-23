import { getProducts } from "../../services/productService";
import Layout from "./../../components/layout";
import Footer from "./../../components/footer";

type Data = {
  products: any[];
};

export default function Index({ products }: Data) {
  return (
    <Layout>
      <h1>Store page</h1>
      <div>
        {products &&
          products.map((product: any) => (
            <li key={product.id}>{product.title}</li>
          ))}
      </div>
      <div>
        <Footer />
      </div>
    </Layout>
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
