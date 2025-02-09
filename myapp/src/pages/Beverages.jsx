import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { useMenuApi } from '../lib/useMenu';
import Loading from '../components/Loading';


function Beverages() {
    const [loading, setLoading] = useState(false);
    const [beveragesAndSnacksItems, setbeveragesAndSnacksItems] = useState([]);
    const { data, isLoading } = useMenuApi("Beverage");
    useEffect(() => {
        if (data?.data?.data) {
        setbeveragesAndSnacksItems(data.data.data);
        }
    }, [data]);
    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
            <div className="w-full justify-center font-semibold items-center flex text-4xl pb-7">BEVERAGES</div>
           
            
            {loading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin">
                        <i className="fas fa-hamburger text-6xl text-orange-500"></i>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                    
                    {beveragesAndSnacksItems.map((item, index) => (
                        <div
                            key={item._id}
                            className="opacity-0 animate-fadeIn"
                            style={{
                                animationDelay: `${index * 150}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <Card
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                bestseller={item.bestseller}
                                isVeg={true}
                                quantity={item.quantity}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Beverages;

