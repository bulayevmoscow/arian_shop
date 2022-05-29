import { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks";
import { ICartItem } from "./redux/store";
import style from "./style.module.css";

const CartItem: FC<ICartItem> = ({ count, title }) => {
  return (
    <div className={style.cart_item_container}>
      <h3>
        Пост <br />
        {title}
      </h3>
      <p>Заказано {count}</p>
    </div>
  );
};

export const Cart: FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const itemsArray = useMemo(() => {
    return Object.values(items);
  }, [items]);

  return (
    <div>
      {/* @ts-ignore*/}
      {/*<pre>{JSON.stringify(items, "", "\t")}</pre>*/}
      <div className={style.cart_container}>
        {itemsArray.map((item) => (
          <CartItem {...item} key={0} />
        ))}
      </div>
    </div>
  );
};
