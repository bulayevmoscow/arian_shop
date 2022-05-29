import { FC, useEffect } from "react";
import { IPost } from "./types";
import style from "./style.module.css";
import { usePostsListActions } from "./redux/actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCartListActions } from "../cart/redux/actions";
import { ICartItem, THandleItem } from "../cart/redux/store";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";

const ChoicePage: FC<{
  count: number;
  active: number;
  onClick: (page: number) => void;
}> = ({ count, active, onClick }) => {
  return (
    <div className={style.container_page_buttons}>
      {new Array(count).fill(undefined).map((_, index) => (
        <button
          key={index}
          className={index === active ? style.active : ""}
          onClick={() => {
            if (index !== active) {
              onClick(index);
            }
          }}
        >
          {index}
        </button>
      ))}
    </div>
  );
};

const Post: FC<{
  postData: IPost;
  deleteItem: ActionCreatorWithPayload<{ id: string }>;
  addItem: ActionCreatorWithPayload<THandleItem & { title: string }>;
  cartInfo?: ICartItem;
  setCountItem: ActionCreatorWithPayload<THandleItem, string>;
}> = ({ postData, setCountItem, addItem, cartInfo, deleteItem }) => {
  const count = cartInfo?.count ?? 0;
  const { id, title } = postData;

  const onAddItem = () =>
    addItem({
      title,
      count: 1,
      id: id.toString(),
    });

  const onSetCountItemInc = () =>
    setCountItem({
      count: count + 1,
      id: id.toString(),
    });

  const onSetCountItemDec = () => {
    if (!count) {
      return;
    }
    setCountItem({
      count: count - 1,
      id: id.toString(),
    });
  };

  const onDeleteItem = () => deleteItem({ id: id.toString() });

  return (
    <div key={postData.id} className={style.container_post}>
      <p>{postData.id}</p>
      <div>
        {count === 0 ? (
          <button onClick={onAddItem}>Add to Cart</button>
        ) : (
          <>
            <button onClick={onSetCountItemDec}>-</button>
            <input
              value={count}
              type={"number"}
              onChange={(event) =>
                setCountItem({
                  count: Number(event.target.value),
                  id: id.toString(),
                })
              }
            />
            <button onClick={onSetCountItemInc}>+</button>
            <button onClick={onDeleteItem}>Удалить</button>
          </>
        )}
      </div>
    </div>
  );
};

export const PostsList: FC = () => {
  const { isLoading, posts, page, availablePages, itemsOnPage } =
    useAppSelector((state) => state.postsList);
  const { items: cartInfo } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { changePage, loadPage } = usePostsListActions();
  const { deleteItem, addItem, setCountItem } = useCartListActions();
  const onClickChangePage = (page: number) => {
    changePage(page);
    loadPage({ page, itemsOnPage });
  };

  useEffect(() => {
    loadPage({ page: 0, itemsOnPage });
  }, [dispatch, itemsOnPage, loadPage]);

  return (
    <div className={style.container}>
      {isLoading && <h1>isLoading</h1>}
      <div className={style.container_posts}>
        {posts.map((post) =>
          Post({
            postData: post,
            addItem: addItem,
            setCountItem: setCountItem,
            deleteItem: deleteItem,
            cartInfo: cartInfo[post.id],
          })
        )}
      </div>
      <div className={style.container_page_buttons}>
        <ChoicePage
          count={availablePages}
          active={page}
          onClick={onClickChangePage}
        />
      </div>
    </div>
  );
};
