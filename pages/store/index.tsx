import { getProducts } from "../../services/productService";
import Layout from "./../../components/layout";
import Footer from "./../../components/footer";
import Product from "./../../components/product";
import styledProducts from "../../styles/product.module.css";

type Data = {
  products: any[];
};

export default function Index({ products }: Data) {
  return (
    <Layout>
      <h1>Store page</h1>
      <div className={styledProducts.items}>
        {products &&
          products.map((product: any) => (
            <Product
              key={product.id}
              showAs="Default"
              qty={undefined}
              product={product}
            />
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
