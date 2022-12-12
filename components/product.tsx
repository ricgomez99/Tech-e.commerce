import Image from "next/image";
import Link from "next/link";
import style from "../styles/product.module.css";
import AddButton from "./addButton";
import Router from "next/router";
import LogicDeleteButton from "./logicDeleteButton";
import UpdateModal from "./updateModal";
import { useAppContext } from "../components/statewrapper";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { findUniqueUser } from "services/userEndPoints";

type Data = {
  product: any;
  showAs: string;
  qty: any;
};

export default function Product({ product, showAs, qty }: Data) {
  const cart = useAppContext();
  const [role, setRole] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    (async () => {
      if (typeof email === "string") {
        let data = await findUniqueUser(email);
        setRole(data.role);
      }
    })();
  }, [email]);

  const handleAddItem = (product: any) => {
    cart.addItemToCart(product);
  };

  const handleDeletePerItem = (product: any) => {
    cart.deletePerItem(product);
  };

  const handleDelete = (product: any) => {
    cart.deleteItem(product);
  };

  if (showAs === "Page") {
    return (
      <>
        <div>
          <MdOutlineArrowBack
            onClick={() => Router.back()}
            className={style.backBtn}
          />
        </div>
        <div className={style.page}>
          <div>
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className={style.detailsImg}
            />
          </div>
          <div className={style.info}>
            <div className={style.text}>
              <h1>{product.title}</h1>
            </div>
            <div className={`${style.description} fs-6`}>
              Category: {product.categories}
            </div>
            <div className={`${style.description} fs-6`}>
              Stock: {product.stock}
            </div>
            <div className={style.price}>${product.price}</div>
            <div className={`${style.description} fs-6`}>
              {product.description}
            </div>
            <div className={style.addTocart}>
              <AddButton item={product} />
            </div>
            {role ? (
              role === "ADMIN" ? (
                <div>
                  <LogicDeleteButton
                    id={product.id}
                    enabled={product.enabled}
                  />
                </div>
              ) : null
            ) : null}
            {role ? (
              role === "ADMIN" ? (
                <div>
                  <div>
                    <UpdateModal product={product} />
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
      </>
    );
  }

  if (showAs === "ListItem") {
    return (
      <div className={style.listItem}>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className={style.cartImg}
          />
        </div>
        <div className={style.content}>
          <h3>{product.title}</h3>
          <div className={style.detailContent}>
            <div className="left">
              <div>${product.price}</div>
              {qty === 0 ? "" : <div>Units: {qty}</div>}
              {qty === 0 ? "" : <div>Subtotal: ${qty * product.price}</div>}
            </div>
            <div className="right">
              {qty === 0 ? (
                ""
              ) : (
                <div className={style.buttons}>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={style.button}
                  >
                    <BsFillTrashFill />
                  </button>
                  {qty < product.stock ? (
                    <button
                      onClick={() => handleAddItem(product)}
                      className={style.button}
                    >
                      +
                    </button>
                  ) : (
                    ""
                  )}
                  {qty === 1 ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleDeletePerItem(product.id)}
                      className={style.button}
                    >
                      -
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.item}>
      <div>
        <Link href={`/store/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            className={style.image}
            width={250}
            height={200}
          />
        </Link>
      </div>
      <div className={style.title}>
        <h3>
          <Link
            href={`/store/${product.id}`}
            style={{ textDecoration: "none", color: "#9A9A9A" }}
          >
            {product.title}
          </Link>
        </h3>
      </div>
      <div style={{ color: "#7895B2", fontWeight: "500" }}>
        US${product.price}
      </div>
      <div>
        <AddButton item={product} />
      </div>
    </div>
  );
}
