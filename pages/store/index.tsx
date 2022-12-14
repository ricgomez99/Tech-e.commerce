import Layout from "./../../components/layout";
import Product from "./../../components/product";
import styledProducts from "../../styles/product.module.css";
import Pagination from "../../components/pagination";
import stylePaginator from "../../styles/paginator.module.css";
import SearchBar from "../../components/searchbar";
import styles from "styles/filtersort.module.css";
import Sort from "components/sort";
import Filter from "components/filter";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { paginate } from "./../../utils/paginate";
import { getCategories, getProducts2 } from "services/productEndPoints";
import { useRouter } from "next/router";
import { BsFillGearFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";
import NotFound from "components/notFound";
import Loading from "components/loading";

type Data = {
  categories: any[];
};
interface Product {
  id: string;
  title: string;
  url: null;
  image: string;
  price: number;
  stock: number;
  categories: string;
  description: string;
  enabled: boolean;
}

export default function Index({ categories }: Data) {
  const router = useRouter();
  const [items, setItems] = useState<Product[] | false>([]);
  const [conditions, setConditions] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const paginateItems: any = paginate(items, currentPage, pageSize);
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  let products: Product[] = [];

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setRole(data.role);
      }
    })();
  }, [email]);

  const handlePageChange = (page: any): any => {
    setCurrentPage(page);
  };

  const handleConditions = (values: any) => {
    if (values.categories === "All") {
      setConditions("All");
    }
    setConditions({ ...conditions, ...values });
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await getProducts2(conditions);
        if (response.length > 0) {
          const filtered = response.filter(
            (product: any) => product.enabled === true
          );
          setItems(filtered);
        } else setItems(false);
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
        <div className={styledProducts.refresh}>
          {items && items.length < 150 ? (
            <button
              className={styledProducts.refreshBtn}
              onClick={() => setConditions({})}
            >
              Refresh{" "}
            </button>
          ) : null}
        </div>
        <div className={styledProducts.options}>
          <div className={styledProducts.ordering}>
            <Sort handleConditions={handleConditions} />
            <Filter
              categories={categories}
              handleConditions={handleConditions}
            />
          </div>
          {role ? (
            role === "ADMIN" ? (
              <div className={styledProducts.toolsBtn}>
                <button
                  className={styledProducts.addToCart}
                  onClick={() => router.push("/newProduct")}
                >
                  Add Product
                </button>
                <button
                  className={styledProducts.adminBtn}
                  onClick={() => router.push(`/admin?role=${role}`)}
                >
                  Admin
                </button>
              </div>
            ) : role === "MOD" ? (
              <div className={styledProducts.toolsBtn}>
                <button
                  className={styledProducts.adminBtn}
                  onClick={() => router.push(`/admin?role=${role}`)}
                >
                  MOD <BsFillGearFill className={styledProducts.icon} />
                </button>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
      <div>
        {items !== false && items.length > 0 ? (
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
        ) : items === false ? (
          <NotFound button={false} />
        ) : (
          <Loading />
        )}
      </div>
      {items !== false && items.length > 0 && (
        <div className={stylePaginator.container}>
          <Pagination
            items={items.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res2 = await getCategories();
  return {
    props: {
      categories: res2,
    },
  };
}
