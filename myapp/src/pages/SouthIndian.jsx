import Card from '../components/Card';
import { useState, useEffect } from 'react';

function SouthIndian() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const SouthIndianItems = [
        {
            id: 'd1',
            name: 'Roti',
            description: 'Freshly made whole wheat flatbread',
            price: '10',
            image: 'https://ministryofcurry.com/wp-content/uploads/2020/01/roti-1-scaled.jpg',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'd2',
            name: 'Dal Fry',
            description: 'Yellow lentils tempered with spices',
            price: '40',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGaW_nHJWge2hSZf9kAiZog9PJ4OLHNhPpiw&s',
            bestseller: true,
            isVeg: true,
        },
        {
            id: 'd3',
            name: 'Steamed Rice',
            description: 'Plain steamed basmati rice',
            price: '30',
            image: 'https://ianbenites.com/wp-content/uploads/2020/10/20201019_162000-1-480x270.jpg',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'd4',
            name: 'Mixed Veg Curry',
            description: 'Seasonal vegetables in aromatic gravy',
            price: '45',
            image: 'https://www.cookwithmanali.com/wp-content/uploads/2023/01/Mixed-Veg-Sabzi-500x500.jpg',
            bestseller: true,
            isVeg: true,
        },
        {
            id: 'd5',
            name: 'Fresh Curd',
            description: 'Homemade yogurt',
            price: '15',
            image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2012/05/how-to-make-curd-recipe-1.jpg',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'd6',
            name: 'Mixed Pickle',
            description: 'Spicy Indian pickle assortment',
            price: '10',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_i-iDFE9KZI9kY8JiQNEgwgt2qU8Ii-kLA&s',
            bestseller: false,
            isVeg: true,
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
           
            
            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin">
                        <i className="fas fa-hamburger text-6xl text-orange-500"></i>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                    {SouthIndianItems.map((item, index) => (
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

export default SouthIndian;
