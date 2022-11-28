import Layout from "./../../components/layout";
import { idProduct } from "../../services/productEndPoints";
import { getPathsIds } from "../../utils/productPaths";
import Product from "../../components/product";

export default function ProductDetails({ productInfo }: any) {
  return (
    <Layout>
      <Product product={productInfo} showAs="Page" qty={undefined} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPathsIds();

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const productDetails = await idProduct(id);
  return {
    props: {
      productInfo: productDetails[0],
    },
  };
}
