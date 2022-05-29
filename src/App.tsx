import React from "react";
import { PostsList } from "./module/postsList/PostsList";
import { Cart } from "./module/cart/Cart";
import "./app.css";
function App() {
  return (
    <div id="App">
      <PostsList />
      <Cart />
    </div>
  );
}

export default App;
