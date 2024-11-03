import Card from '../components/Card';
import { useState, useEffect } from 'react';

const beveragesAndSnacksItems = [
    {
        id: 'b1',
        name: 'Masala Chai',
        description: 'Traditional Indian spiced tea with milk and aromatic spices',
        price: '20',
        image: 'https://budleaf.com/wp-content/uploads/2023/04/How-to-make-masala-chai-1568x1039.jpeg',
        bestseller: true,
        isVeg: true,
    },
    {
        id: 'b2',
        name: 'Filter Coffee',
        description: 'South Indian style coffee made with chicory blend and milk',
        price: '30',
        image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2016/09/filter-coffee-recipe-1.jpg',
        bestseller: true,
        isVeg: true,
    },
    {
        id: 'b3',
        name: 'Lassi',
        description: 'Creamy yogurt-based sweet drink with cardamom',
        price: '40',
        image: 'https://www.allrecipes.com/thmb/gZ3H84By0Akh1GgWrqDV_Zu2O1M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Indian-Lassi-4x3-1-2000-02cd65d95cb447e48e374bd8884be481.jpg',
        bestseller: true,
        isVeg: true,
    },
    {
        id: 'b4',
        name: 'Nimbu Pani',
        description: 'Refreshing lemonade with mint, cumin, and black salt',
        price: '25',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQknbjbwjDJ9Qb0npP4NsM1I_KNZESXcOXlBQ&s',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'b5',
        name: 'Mango Lassi',
        description: 'Yogurt smoothie with fresh mango pulp and cardamom',
        price: '50',
        image: 'https://media.bluediamond.com/uploads/2023/01/24175942/14_Dairy-Free_Mango_Lassi-2430x1620.jpg',
        bestseller: true,
        isVeg: true,
    },
    {
        id: 'b6',
        name: 'Badam Milk',
        description: 'Almond-flavored milk with saffron and cardamom',
        price: '45',
        image: 'https://www.funfoodfrolic.com/wp-content/uploads/2021/11/Blog-Thumbnail-480x270.jpg',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'b7',
        name: 'Thandai',
        description: 'Spiced milk drink with nuts, seeds, and aromatic spices',
        price: '55',
        image: 'https://twobrothersindiashop.com/cdn/shop/articles/Thandai.jpg?v=1699099328&width=1024',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'b8',
        name: 'Buttermilk',
        description: 'Spiced yogurt-based drink with curry leaves and ginger',
        price: '25',
        image: 'https://www.metropolisindia.com/upgrade/blog/upload/24/05/Health_benefits_of_buttermilk1716900658.webp',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'b9',
        name: 'Rose Milk',
        description: 'Chilled milk flavored with rose syrup and basil seeds',
        price: '35',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS77-nTHxadu4ym_vGpNqjhi5IEaRucUF0MUg&s',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'b10',
        name: 'Jal Jeera',
        description: 'Cumin-flavored spiced water with mint and lemon',
        price: '30',
        image: 'https://www.chefkunalkapur.com/wp-content/uploads/2022/03/Jal-Jeera-recipe-scaled.jpg?v=1648097528',
        bestseller: false,
        isVeg: true,
    },
    {
        id: 'pb1',
        name: 'Thums Up',
        description: 'Strong carbonated cola drink - A taste of thunder',
        price: '40',
        image: 'https://m.economictimes.com/thumb/msid-89486404,width-1200,height-900,resizemode-4,imgsize-84962/thums-up-becomes-a-billion-dollar-brand.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb2',
        name: 'Maaza',
        description: 'Refreshing mango fruit drink',
        price: '40',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gj2IRkF7xpCZ98HwKICOgrE1udAOrPinkQ&s',
        bestseller: true,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb3',
        name: 'Sprite',
        description: 'Clear lemon-lime flavored soft drink',
        price: '40',
        image: 'https://www.coca-cola.com/content/dam/onexp/us/en/brands/sprite/wsc/sprite-wsc-content-card-teaser-img.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb4',
        name: 'Mountain Dew',
        description: 'Energizing citrus flavored soft drink',
        price: '40',
        image: 'https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/3fd11092e65c85456ee9d52a3fd31e5f.jpg',
        bestseller: false,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb5',
        name: 'Pepsi',
        description: 'Classic cola flavored carbonated drink',
        price: '40',
        image: 'https://www.beveragedaily.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/article/2024/01/16/pepsi-rebrand-goes-global-seeking-to-attract-younger-digital-generations/17085164-4-eng-GB/Pepsi-rebrand-goes-global-seeking-to-attract-younger-digital-generations.jpg',
        bestseller: false,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb6',
        name: 'Frooti',
        description: 'Sweet mango drink - Refreshingly fruity',
        price: '20',
        image: 'https://resize.indiatvnews.com/en/resize/newbucket/400_-/2016/05/frooti-1463039036.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '200ml'
    },
    {
        id: 'pb7',
        name: 'Mirinda Orange',
        description: 'Orange flavored carbonated drink',
        price: '40',
        image: 'https://image.mux.com/W9YmqmMXxUhDuCDEAd8GdkZV1EQEbrezXiNKBsPhbcM/thumbnail.jpg?time=20',
        bestseller: false,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb8',
        name: 'Limca',
        description: 'Lime-lemon carbonated refresher',
        price: '40',
        image: 'https://www.hccb.in/images/limca-blog.jpg',
        bestseller: false,
        isVeg: true,
        quantity: '750ml'
    },
    {
        id: 'pb9',
        name: 'Sting',
        description: 'Energy drink with electrifying taste',
        price: '30',
        image: 'https://i.ytimg.com/vi/FPC2mhPpqu4/maxresdefault.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '250ml'
    },
    {
        id: 'ps1',
        name: 'Lay\'s Classic Salted',
        description: 'Classic salted potato chips',
        price: '20',
        image: 'https://m.media-amazon.com/images/I/71h-V47-vFL.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '52g',
        category: 'snacks'
    },
    {
        id: 'ps2',
        name: 'Kurkure Masala Munch',
        description: 'Crunchy corn puffs with masala flavor',
        price: '20',
        image: 'https://5.imimg.com/data5/SELLER/Default/2023/5/308933494/TL/QU/VY/116880623/kurkure-masala-munch-500x500.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '90g',
        category: 'snacks'
    },
    {
        id: 'ps3',
        name: 'Lay\'s Magic Masala',
        description: 'Spicy masala flavored potato chips',
        price: '20',
        image: 'https://m.media-amazon.com/images/I/815SeM4TDFL.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '52g',
        category: 'snacks'
    },
    {
        id: 'ps4',
        name: 'Bingo Mad Angles',
        description: 'Triangle-shaped spicy crackers',
        price: '20',
        image: 'https://s7ap1.scene7.com/is/image/itcportalprod/MAD-angle-desktop?fmt=webp-alpha',
        bestseller: false,
        isVeg: true,
        quantity: '66g',
        category: 'snacks'
    },
    {
        id: 'ps5',
        name: 'Uncle Chips Spicy',
        description: 'Spicy potato chips with perfect crunch',
        price: '20',
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/XQ/CD/FZ/122190343/1654843353977-sku-0215-0.jpg',
        bestseller: false,
        isVeg: true,
        quantity: '60g',
        category: 'snacks'
    },
    {
        id: 'ps6',
        name: 'Doritos Sweet Chilli',
        description: 'Sweet & spicy tortilla chips',
        price: '30',
        image: 'https://m.media-amazon.com/images/I/81bVHDUu9ML.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '70g',
        category: 'snacks'
    },
    {
        id: 'ps7',
        name: 'Haldiram\'s Aloo Bhujia',
        description: 'Spiced potato noodle snack',
        price: '40',
        image: 'https://img.myloview.com/posters/aloo-bhujiya-or-potato-bhujia-also-known-as-namkeen-sev-popular-bikaneri-recipe-served-in-a-bowl-or-plate-selective-focus-700-179719630.jpg',
        bestseller: true,
        isVeg: true,
        quantity: '150g',
        category: 'snacks'
    },
    {
        id: 'ps8',
        name: 'Kurkure Solid Masti',
        description: 'Tangy tomato flavored crunchy snack',
        price: '20',
        image: 'https://5.imimg.com/data5/SELLER/Default/2023/5/308933494/TL/QU/VY/116880623/kurkure-masala-munch-500x500.jpg',
        bestseller: false,
        isVeg: true,
        quantity: '90g',
        category: 'snacks'
    }
];

function Beverages() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
            <h1 className="text-3xl font-bold text-center mb-8">BEVERAGES</h1>
            
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

