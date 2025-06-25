import { useSelector } from 'react-redux';

const Navigation = ({ currentSection, onSectionChange }) => {
  const cart = useSelector(state => state.cart);

  const sections = [
    { id: 'products', name: 'Productos', icon: '🛍️' },
    { id: 'cart', name: 'Carrito', icon: '🛒', badge: cart.itemCount },
    { id: 'product-manager', name: 'Gestionar Productos', icon: '⚙️' },
    { id: 'users', name: 'Usuarios', icon: '👥' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Tienda Online</h1>
          </div>
          
          <div className="flex space-x-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
                
                {section.badge && section.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {section.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 