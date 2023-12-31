import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending request",
        message: "sending data to the server..",
      })
    );

    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "request success",
          message: "data is successfully stored in the server!!",
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "sending request failed",
          messageS: "sending data to the server failed..",
        })
      );
    }

    setTimeout(() => {
      dispatch(
        uiActions.showNotification({
          status: null,
        })
      );
    }, 3000);
  };
}

export function fetchCartData() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cart-e3cb5-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData))
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "sending request failed",
          message: "sending data to the server failed..",
        })
      );
    }
  };
}