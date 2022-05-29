import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  title: string;
  count: number;
}

type TCart = {
  items: Record<string, ICartItem>;
};

const initialState: TCart = {
  items: {},
};

export type THandleItem = {
  id: string;
  count: number;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      delete state.items[action.payload.id];
    },
    addItem: (
      state,
      action: PayloadAction<THandleItem & { title: string }>
    ) => {
      const { count, id, title } = action.payload;
      const addingItem: TCart["items"] = {
        [id]: {
          count,
          title,
        },
      };
      state.items = { ...state.items, ...addingItem };
    },
    setCountItem: (state, action: PayloadAction<THandleItem>) => {
      const { count, id } = action.payload;
      if (state.items[id] === undefined) {
        return;
      }
      if (count === 0) {
        delete state.items[id];
        return;
      }
      state.items[id].count = count;
    },
  },
});

export const { actions: cartSliceActions } = cartSlice;
export const { reducer: cartSliceReducer } = cartSlice;
