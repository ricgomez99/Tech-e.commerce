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



type Data = {
  products: any[];
};

export default function Index({ products }: Data) {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;


  const paginateItems: any = paginate(items, currentPage, pageSize);

  let response : any; 

  const handleSearch = async (title: any) =>{
  response = await nameProduct(title)
  setItems(response);

  }
  
  const handlePageChange = (page: any): any => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if(response?.length > 0){
      setItems(response)
    } else {
      setItems(products)
    }
  },[response]);

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

