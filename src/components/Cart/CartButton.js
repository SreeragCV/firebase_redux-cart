import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.totalQuantity)

  function handleToggle(){
    dispatch(uiActions.toggleButton())
  }

  return (
    <button onClick={handleToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
