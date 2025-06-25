import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, checkout } from '../features/cart/cartSlice';
import { updateStock } from '../features/products/productsSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  // remuevo el producto
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // cambi la cantiada
  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  // limpio
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // finalizo la compra
  const handleCheckout = () => {
    // actualizo stock
    cart.items.forEach(item => {
      dispatch(updateStock({ productId: item.id, quantity: item.quantity }));
    });
    
    // Finalizo compra
    dispatch(checkout());
    alert('¡Compra realizada con éxito!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Carrito de Compras</h2>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-600">
              Total: ${cart.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {cart.itemCount} {cart.itemCount === 1 ? 'producto' : 'productos'}
            </p>
          </div>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
            <p className="text-gray-400">Agrega algunos productos para comenzar</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Limpiar Carrito
              </button>
              
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 