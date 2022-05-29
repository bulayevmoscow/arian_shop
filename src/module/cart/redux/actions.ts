import { cartSliceActions } from "./store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export const useCartListActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(cartSliceActions, dispatch);
  }, [dispatch]);
};
