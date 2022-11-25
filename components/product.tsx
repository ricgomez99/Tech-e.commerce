import Image from "next/image";
import Link from "next/link";
import style from "../styles/product.module.css";

type Data = {
  product: any;
  showAs: string;
  qty: any;
};

export default function Product({ product, showAs, qty }: Data) {
  if (showAs === "Page") {
    return (
      <div className={style.page}>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
        <div className={style.info}>
          <div>
            <h2>{product.title}</h2>
          </div>
          <div>Category: {product.categories}</div>
          <div className={style.price}>${product.price}</div>
          <div>Stock: {product.stock}</div>
          <div>{product.description}</div>
          <div>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
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
          />
        </div>
        <div>
          <h3>{product.title}</h3>
          <div>{product.price}</div>

          {/* {qty === 0 ? "" : <div>Units: {qty}</div>}
          {qty === 0 ? "" : <div>Subtotal: ${qty * product.price}</div>} */}
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
          <Link href={`/store/${product.id}`}>{product.title}</Link>
        </h3>
      </div>
      <div>{product.price}</div>
      <div>
        <button>Add to cart</button>
      </div>
    </div>
  );
}
