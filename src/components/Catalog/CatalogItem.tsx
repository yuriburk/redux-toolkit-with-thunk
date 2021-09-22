import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProductToCartRequest } from '../../store/modules/cart/actions';

type CatalogItemComponentProps = {
  product: Product;
};

const CatalogItem = ({ product }: CatalogItemComponentProps) => {
  const dispatch = useDispatch();
  const isntAvailable = useSelector<State, boolean>(state => state.cart.productsIdWithoutStock.includes(product.id));

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title} - </strong>
      <span>{product.price} </span>
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {isntAvailable && <span style={{ color: 'red' }}>Não disponível</span>}
    </article>
  );
};

export default CatalogItem;
