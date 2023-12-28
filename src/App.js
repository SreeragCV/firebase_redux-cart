import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let initial = true;

function App() {
  const show = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    async function sendData() {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending request",
          message: "sending data to the server..",
        })
      );
      const response = await fetch(
        "https://cart-e3cb5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "request success",
          message: "data is successfully stored in the server!!",
        })
      );
    }

    if (initial) {
      initial = false;
      return;
    }

    sendData().catch(
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending request",
          messag: "sending data to the server..",
        })
      )
    );
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
