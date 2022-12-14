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

type Data = {
  categories: any[];
};

export default function Index({ categories }: Data) {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [conditions, setConditions] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const paginateItems: any = paginate(items, currentPage, pageSize);
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  
  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setRole(data.role);
        console.log(data);
      }
    })();
  }, [email]);

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
        if (response.length > 0) {
          const filtered = response.filter(
            (product: any) => product.enabled === true
          );
          setItems(filtered);
        } else setItems(response);
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
        <button onClick={() => console.log(session, email, role)}>Prueba</button>
          <SearchBar handleConditions={handleConditions} />
        </div>
        
        {role ? (
          role === "ADMIN" ? (
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
          ) : null
        ) : null}
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
  const res2 = await getCategories();
  return {
    props: {
      categories: res2,
    },
  };
}
