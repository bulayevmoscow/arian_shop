import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { loadPage, postsSliceActions } from "./store";

export const usePostsListActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return {
      ...bindActionCreators(postsSliceActions, dispatch),
      loadPage: bindActionCreators(loadPage, dispatch),
    };
  }, [dispatch]);
};
