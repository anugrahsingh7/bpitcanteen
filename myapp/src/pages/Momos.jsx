import Card from '../components/Card';
import { useState, useEffect } from 'react';

function Momos() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const MomosItems = [
        {
            id: 'b1',
            name: 'Idli Sambar',
            description: 'Steamed rice cakes served with lentil soup and coconut chutney',
            price: '30',
            image: 'https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg',
            bestseller: true,
            isVeg: true,
        },
        {
            id: 'b2',
            name: 'Masala Dosa',
            description: 'Crispy rice crepe filled with spiced potato mixture',
            price: '45',
            image: 'https://revi.b-cdn.net/wp-content/uploads/2017/03/masala-dosa-2.jpg',
            bestseller: true,
            isVeg: true,
        },
        {
            id: 'b3',
            name: 'Poha',
            description: 'Flattened rice with peanuts, onions and herbs',
            price: '25',
            image: 'https://www.msrmarket.in/cdn/shop/products/images_6_3.jpg?v=1649492061',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'b4',
            name: 'Upma',
            description: 'Savory semolina porridge with vegetables',
            price: '25',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2EWqSB9haDkHY2AZoRlpkW1fg6z7puCUsmw&s',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'b5',
            name: 'Vada Sambar',
            description: 'Crispy lentil doughnuts served with lentil soup',
            price: '35',
            image: 'https://www.spiritofindiapattaya.com/wp-content/uploads/2023/01/vada-sambar.jpg',
            bestseller: true,
            isVeg: true,
        },
        {
            id: 'b6',
            name: 'Puri Bhaji',
            description: 'Deep-fried bread with potato curry',
            price: '40',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXdnOQYiidexwl5M3xZV7SLIM4-MlZk-oyDA&s',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'b7',
            name: 'Aloo Paratha',
            description: 'Stuffed potato flatbread served with curd and pickle',
            price: '35',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmgf8nAQeSf7lOkSgVq2rtcquXiXCdHMO3hA&s',
            bestseller: false,
            isVeg: true,
        },
        {
            id: 'b8',
            name: 'Vermicelli Upma',
            description: 'Savory semolina noodles with vegetables and nuts',
            price: '25',
            image: 'https://bonmasala.com/wp-content/uploads/2022/12/upma.jpeg',
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
                    {MomosItems.map((item, index) => (
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

export default Momos;
