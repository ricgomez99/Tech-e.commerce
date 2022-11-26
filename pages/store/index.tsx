import { getProducts } from "../../services/paths";
import Layout from "./../../components/layout";
import Footer from "./../../components/footer";
import Product from "./../../components/product";
import styledProducts from "../../styles/product.module.css";
import Pagination from "../../components/pagination";
import { useEffect, useState } from "react";
import { paginate } from "./../../utils/paginate";
import stylePaginator from "../../styles/paginator.module.css";
import SearchBar from "../../components/searchbar";
import Filter from "components/filter";
import Sort from "components/sort";
import { getCategories, getProducts2 } from "services/productEndPoints";
import { nameProduct } from "../../services/productEndPoints";

import { useRouter } from "next/router"; //for Temporary Form Button

type Data = {
  products: any[];
  categories: any[];
};

export default function Index({ products, categories }: Data) {
  const router = useRouter(); //for Temporary Form Button

  const [items, setItems] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  let responseFilter: Array<any>
  const paginateItems: any = paginate(items, currentPage, pageSize);

  let response: any;

  const handleSearch = async (title: any) => {
      response = await nameProduct(title);
      setItems(response);
  };

  const handlePageChange = (page: any): any => {
    setCurrentPage(page);
  };

  const onFilter = async (value : string) => {
    responseFilter = await getProducts2({categories: value});
    setItems(responseFilter)
  }

  useEffect(() => {
    if (response?.length > 0) {
      setItems(response);
    } else {
      setItems(products);
    }
  }, [response]);

  return (


    <Layout>
      <h1>Store page</h1>
      {/* Temporary Form Button */}
      <button onClick={() => router.push("/newproduct")}>
        Add New Product
      </button>
      {/* Temporary Form Button */}
      <SearchBar onSearch={handleSearch}  />
      <div className={styledProducts.products_filter_container}>
        <div className={styledProducts.filter_sorter}>
          <div className={styledProducts.sort}><Sort /></div>
          <div className={styledProducts.categories}>
            <Filter categories={categories} onFilter = {onFilter} />
          </div>
        </div>
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
  const res2 = await getCategories();
  return {
    props: {
      products: res,
      categories: res2,
    },
  };
}
