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
import {getCategories, getProducts2} from "services/productEndPoints";
import {useRouter} from "next/router"; 
import styles from "styles/filtersort.module.css";
import Sort from "components/sort";
import Filter from "components/filter";

type Data = {
  products: any[];
  categories: any[];
};

export default function Index({products, categories}: Data) {
  const router = useRouter(); 
  const [items, setItems] = useState<any[]>([]); 
  const [conditions, setConditions] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const paginateItems: any = paginate(items, currentPage, pageSize);

  const handlePageChange = (page: any): any => {
    setCurrentPage(page);
  };

  const handleConditions = (values: any) => {
    setConditions({ ...conditions, ...values });
  };

  useEffect(() => {
    try {
      (async () => {
        setItems(await getProducts2(conditions));
        setCurrentPage(1);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [conditions]);

  return (
    <Layout>
      <div className={styles.filter_sorter}>
        <SearchBar handleConditions={handleConditions} />
        
        <button onClick={() => router.push("/newproduct")}>
          Add New Product
        </button>
        
      </div>
      <div className={styledProducts.products_filter_container}>
        <div className={styles.filter_sorter}>
          <button
            onClick={() => setConditions({})}
            style={{ height: "2rem", marginTop: "1rem" }}
          >
            Refresh
          </button>
          <div className={styles.sort}>
            <Sort handleConditions={handleConditions} />
          </div>
          <div className={styles.categories}>
            <Filter
              categories={categories}
              handleConditions={handleConditions}
            />
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