import Card from '../components/Card';
import { useState, useEffect } from 'react';

function Snacks() {
  const [loading, setLoading] = useState(true);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      setShowCards(true);
    }, 1500);
  }, []);

  const snackItems = [
    {
      id: 'burger-1',
      name: 'Classic Burger',
      price: '129',
      image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
      description: 'A delicious burger with fresh lettuce, tomatoes, cheese, and our special sauce. Served with crispy fries.',
      bestseller: true,
      isVeg: true
    },
    {
      id: 'pizza-1',
      name: 'Margherita Pizza',
      price: '249',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil leaves on a crispy thin crust.',
      bestseller: true,
      isVeg: true
    },
    {
      id: 'sandwich-1',
      name: 'Club Sandwich',
      price: '159',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
      description: 'Triple-decker sandwich with grilled chicken, bacon, lettuce, tomato, and mayo. Served with chips.',
      bestseller: false,
      isVeg: false
    },
    {
      id: 'fries-1',
      name: 'Loaded Fries',
      price: '99',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
      description: 'Crispy french fries topped with melted cheese, jalapeños, and our special seasoning.',
      bestseller: true,
      isVeg: true
    },
    {
      id: 'wings-1',
      name: 'Spicy Wings',
      price: '199',
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
      description: 'Eight pieces of chicken wings tossed in our signature spicy sauce. Served with dip.',
      bestseller: false,
      isVeg: false
    },
    {
      id: 'nachos-1',
      name: 'Loaded Nachos',
      price: '179',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d',
      description: 'Crispy tortilla chips topped with melted cheese, beans, jalapeños, and sour cream.',
      bestseller: true,
      isVeg: true
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">SNACKS MENU</h1>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin">
            <i className="fas fa-hamburger text-6xl text-orange-500"></i>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {snackItems.map((item, index) => (
            <div
              key={item.id}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <Card 
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
                bestseller={item.bestseller}
                isVeg={item.isVeg}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Snacks;
