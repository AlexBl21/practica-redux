import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductManager from './components/ProductManager';
import UserManager from './components/UserManager';

function App() {
  const [currentSection, setCurrentSection] = useState('products');

  // Función para renderizar la sección actual
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart />;
      case 'product-manager':
        return <ProductManager />;
      case 'users':
        return <UserManager />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      
      <main className="py-4">
        {renderCurrentSection()}
      </main>
    </div>
  );
}

export default App;
