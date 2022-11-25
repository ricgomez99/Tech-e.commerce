import { getProducts } from "../../services/productService";
import Layout from "./../../components/layout";
import Footer from "./../../components/footer";
import Product from "./../../components/product";
import styledProducts from "../../styles/product.module.css";
import Pagination from "../../components/pagination";
import { useEffect, useState } from "react";
import { paginate } from "./../../utils/paginate";
import stylePaginator from "../../styles/paginator.module.css";
import SearchBar from "../../components/searchbar";
import { nameProduct } from "../../services/productEndPoints";
import { title } from "process";

type Data = {
  products: any[];
};

export default function Index({ products }: Data) {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  const paginateItems: any = paginate(items, currentPage, pageSize);

  const handleSearch = (title: string) =>{
    nameProduct(title)
    
  }
  
  useEffect(() => {
    if(items){
      handleSearch(title);
    }
    
  }, [])

  const handlePageChange = (page: any): any => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setItems(products);
  }, []);

  return (
    <Layout>
      <h1>Store page</h1>
      <SearchBar onSearch={handleSearch}/>
      <div className={styledProducts.items}>
        {paginateItems &&
          paginateItems.map((product: any) => (
            <Product
              key={product.id}
              showAs="Default"
              qty={undefined}
              product={product}
            />
          ))}
      </div>
      <div className={stylePaginator.container}>
        <Pagination
          items={items.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
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
