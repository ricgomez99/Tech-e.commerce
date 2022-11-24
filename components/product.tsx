import Image from "next/image";
import Link from "next/link";
import style from "../styles/product.module.css";

type Data = {
  product: any;
  showAs: string;
  qty: any;
};

export default function Product({ product, showAs, qty }: Data) {
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
