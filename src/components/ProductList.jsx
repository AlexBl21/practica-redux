import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const categories = useSelector(state => state.categories.categories);

  // obtengo la categoria
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  // agrego producto al carrito
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Productos Disponibles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {getCategoryName(product.category)}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    product.stock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default ProductList; 