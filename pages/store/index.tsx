import { getProducts } from "../../services/paths";
import Layout from "./../../components/layout";
import Product from "./../../components/product";
import styledProducts from "../../styles/product.module.css";
import Pagination from "../../components/pagination";
import { useEffect, useState } from "react";
import { paginate } from "./../../utils/paginate";
import stylePaginator from "../../styles/paginator.module.css";
import SearchBar from "../../components/searchbar";
import { getCategories, getProducts2 } from "services/productEndPoints";
import { useRouter } from "next/router";
import styles from "styles/filtersort.module.css";
import Sort from "components/sort";
import Filter from "components/filter";
import { BsFillGearFill, BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";

type Data = {
  products: any[];
  categories: any[];
};

export default function Index({ products, categories }: Data) {
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
        const response = await getProducts2(conditions);
        const filtered = response.filter(
          (product: any) => product.enabled === true
        );
        setItems(filtered);
        setCurrentPage(1);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [conditions]);

  useEffect(() => {
    setConditions({});
  }, [router.query.refresh]);

  return (
    <Layout>
      <div className={styledProducts.tools}>
        <div className={styledProducts.searchBar}>
          <SearchBar handleConditions={handleConditions} />
        </div>

        <div className={styledProducts.toolsBtn}>
          <button
            className={styledProducts.addToCart}
            onClick={() => router.push("/newProduct")}
          >
            Add Product
            <BsFillPlusCircleFill className={styledProducts.icon} />
          </button>

          <button
            className={styledProducts.adminBtn}
            onClick={() => router.push("/profile/admin")}
          >
            Admin <BsFillGearFill className={styledProducts.icon} />
          </button>
        </div>
      </div>
      <div className={styledProducts.products_filter_container}>
        <div className={styles.filter_sorter}>
          <div className={styles.allBtn}>
            <Button
              variant="light"
              size="sm"
              style={{
                color: "#6B9080",
                padding: "6px 25px",
                fontWeight: "500",
              }}
              onClick={() => setConditions({})}
            >
              All
            </Button>
          </div>
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
