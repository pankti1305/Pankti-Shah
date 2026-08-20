import { Restaurant, InstamartProduct, DineoutVenue, SceneEvent } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Meghana Foods',
    cuisines: ['Biryani', 'Andhra', 'South Indian', 'Seafood'],
    rating: 4.6,
    ratingCount: '15K+ ratings',
    deliveryTimeMinutes: 24,
    distanceKm: 2.1,
    priceForTwo: 500,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    address: 'Koramangala 5th Block, Bengaluru',
    area: 'Koramangala',
    featuredOffer: '50% OFF up to ₹100',
    isSwiggyOneExclusive: true,
    categories: ['Special Biryani', 'Starters', 'Andhra Meals', 'Beverages'],
    menu: [
      {
        id: 'm-101',
        restaurantId: 'rest-1',
        name: 'Meghana Special Chicken Biryani',
        description: 'Iconic spicy boneless chicken preparation served on a bed of fragrant basmati biryani rice with cooling raita.',
        price: 340,
        originalPrice: 380,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        isSpicy: true,
        category: 'Special Biryani',
        rating: 4.8,
        votes: 8420,
        customizations: [
          {
            name: 'Portion Size',
            options: [{ name: 'Single (Serves 1)', price: 0 }, { name: 'Jumbo (Serves 2-3)', price: 210 }]
          },
          {
            name: 'Spice Level',
            options: [{ name: 'Medium Spice', price: 0 }, { name: 'Authentic Andhra Spicy 🔥', price: 0 }]
          }
        ]
      },
      {
        id: 'm-102',
        restaurantId: 'rest-1',
        name: 'Paneer Butter Masala Biryani',
        description: 'Rich cottage cheese cubes marinated in special gravy and layered with aromatic saffron rice.',
        price: 290,
        originalPrice: 320,
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Special Biryani',
        rating: 4.5,
        votes: 3200
      },
      {
        id: 'm-103',
        restaurantId: 'rest-1',
        name: 'Andhra Chilli Chicken 555',
        description: 'Tender chicken tossed with green chillies, curry leaves and secret Andhra spices.',
        price: 310,
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        isSpicy: true,
        category: 'Starters',
        rating: 4.7,
        votes: 4190
      },
      {
        id: 'm-104',
        restaurantId: 'rest-1',
        name: 'Crispy Baby Corn Pepper Fry',
        description: 'Golden baby corn tempura wok-tossed with freshly crushed black pepper and bell peppers.',
        price: 230,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        category: 'Starters',
        rating: 4.4,
        votes: 1840
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Truffles Bistro & Burgers',
    cuisines: ['Burgers', 'American', 'Continental', 'Pastas'],
    rating: 4.5,
    ratingCount: '28K+ ratings',
    deliveryTimeMinutes: 28,
    distanceKm: 3.4,
    priceForTwo: 450,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    address: 'St. Marks Road & Indiranagar, Bengaluru',
    area: 'Indiranagar',
    featuredOffer: 'FLAT ₹125 OFF above ₹399',
    isSwiggyOneExclusive: true,
    categories: ['Signature Burgers', 'Appetizers & Wings', 'Cheesy Pastas', 'Thick Shakes'],
    menu: [
      {
        id: 'm-201',
        restaurantId: 'rest-2',
        name: 'All American Cheese Burger',
        description: 'Double grilled chicken patty with melted cheddar, caramelised onions, gherkins and smoky house glaze.',
        price: 280,
        originalPrice: 320,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        category: 'Signature Burgers',
        rating: 4.7,
        votes: 12400,
        customizations: [
          {
            name: 'Add Extra Cheese',
            options: [{ name: 'Regular Melt', price: 0 }, { name: 'Double Molten Cheddar', price: 40 }]
          },
          {
            name: 'Choice of Fries',
            options: [{ name: 'Peri-Peri Crinkle Fries', price: 60 }, { name: 'Salted French Fries', price: 40 }]
          }
        ]
      },
      {
        id: 'm-202',
        restaurantId: 'rest-2',
        name: 'Peri-Peri Paneer Crunch Burger',
        description: 'Crispy spiced paneer steak with spicy chipotle slaw, jalapenos and soft butter-toasted brioche bun.',
        price: 240,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Signature Burgers',
        rating: 4.6,
        votes: 5600
      },
      {
        id: 'm-203',
        restaurantId: 'rest-2',
        name: 'Crispy Onion Rings & Truffle Dip',
        description: 'Hand-battered sweet Spanish onions fried till golden crunch with creamy truffle garlic dip.',
        price: 175,
        image: 'https://images.unsplash.com/photo-1639024471287-035186f5552d?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        category: 'Appetizers & Wings',
        rating: 4.3,
        votes: 2100
      },
      {
        id: 'm-204',
        restaurantId: 'rest-2',
        name: 'Ferrero Rocher Nutella Shake',
        description: 'Dense Belgian chocolate blend with whole Ferrero crunch, hazelnut spread and dark chocolate shavings.',
        price: 210,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Thick Shakes',
        rating: 4.8,
        votes: 7800
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Corner House Ice Cream',
    cuisines: ['Desserts', 'Ice Cream', 'Sundae', 'Bakery'],
    rating: 4.8,
    ratingCount: '40K+ ratings',
    deliveryTimeMinutes: 18,
    distanceKm: 1.5,
    priceForTwo: 300,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    address: 'Residency Road & Koramangala, Bengaluru',
    area: 'Koramangala',
    featuredOffer: '20% OFF up to ₹50',
    isPureVeg: true,
    isSwiggyOneExclusive: true,
    categories: ['Legendary Sundaes', 'Thick Scoops', 'Fresh Fruit Sundaes'],
    menu: [
      {
        id: 'm-301',
        restaurantId: 'rest-3',
        name: 'Death By Chocolate (D.B.C)',
        description: 'Legendary rich dark chocolate sponge cake, layered with vanilla cream, hot Dutch fudge sauce and roasted peanuts.',
        price: 260,
        originalPrice: 290,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Legendary Sundaes',
        rating: 4.9,
        votes: 21000,
        customizations: [
          {
            name: 'Extra Hot Fudge Sauce',
            options: [{ name: 'Standard Layer', price: 0 }, { name: 'Extra Cup Hot Fudge 🔥', price: 50 }]
          },
          {
            name: 'Nut Toppings',
            options: [{ name: 'Toasted Peanuts', price: 0 }, { name: 'Roasted Almonds & Cashews', price: 40 }]
          }
        ]
      },
      {
        id: 'm-302',
        restaurantId: 'rest-3',
        name: 'Hot Butterscotch Almond Sundae',
        description: 'Butter pecan ice cream drenched in warm caramelized butterscotch sauce with crunchy almond praline.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        category: 'Legendary Sundaes',
        rating: 4.7,
        votes: 6200
      },
      {
        id: 'm-303',
        restaurantId: 'rest-3',
        name: 'Fresh Alphonso Mango & Cream',
        description: 'Seasonal Ratnagiri Alphonso mango pulp served with pure dairy vanilla scoops.',
        price: 230,
        image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Fresh Fruit Sundaes',
        rating: 4.8,
        votes: 4300
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'The Rameshwaram Cafe',
    cuisines: ['South Indian', 'Filter Coffee', 'Snacks', 'Chutneys'],
    rating: 4.7,
    ratingCount: '32K+ ratings',
    deliveryTimeMinutes: 20,
    distanceKm: 1.8,
    priceForTwo: 250,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    address: '100ft Road, Indiranagar, Bengaluru',
    area: 'Indiranagar',
    featuredOffer: 'Free Filter Coffee on ₹250+',
    isPureVeg: true,
    isSwiggyOneExclusive: true,
    categories: ['Ghee Roast Dosas', 'Steaming Idlis & Vadas', 'South Beverages', 'Quick Bites'],
    menu: [
      {
        id: 'm-401',
        restaurantId: 'rest-4',
        name: 'Ghee Podi Butter Masala Dosa',
        description: 'Crispy golden dosa roasted in pure country ghee, smothered with fiery gun powder podi and spiced potato masala.',
        price: 180,
        originalPrice: 200,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        isSpicy: true,
        category: 'Ghee Roast Dosas',
        rating: 4.9,
        votes: 18500
      },
      {
        id: 'm-402',
        restaurantId: 'rest-4',
        name: 'Ghee Podi Button Idlis (14 Pcs)',
        description: 'Mini melt-in-mouth steamed idlis immersed in desi ghee and gunpowder podi, served with 3 signature coconut chutneys.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Steaming Idlis & Vadas',
        rating: 4.8,
        votes: 11200
      },
      {
        id: 'm-403',
        restaurantId: 'rest-4',
        name: 'Authentic Degree Filter Coffee',
        description: 'Freshly brewed Chikmagalur chicory blend served piping hot in traditional copper dabarah.',
        price: 65,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'South Beverages',
        rating: 4.9,
        votes: 9400
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Brik Oven Artisanal Pizza',
    cuisines: ['Italian', 'Woodfired Pizza', 'Garlic Bread', 'Salads'],
    rating: 4.6,
    ratingCount: '12K+ ratings',
    deliveryTimeMinutes: 30,
    distanceKm: 3.8,
    priceForTwo: 700,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    address: 'Church Street, Bengaluru',
    area: 'MG Road',
    featuredOffer: '30% OFF up to ₹150',
    isSwiggyOneExclusive: false,
    categories: ['Sourdough Pizzas', 'Handcrafted Pasta', 'Dessert Calzones'],
    menu: [
      {
        id: 'm-501',
        restaurantId: 'rest-5',
        name: 'Margherita Burrata Special',
        description: 'San Marzano tomato base, fresh basil, extra virgin olive oil and a whole creamy fresh Burrata ball.',
        price: 490,
        originalPrice: 550,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Sourdough Pizzas',
        rating: 4.8,
        votes: 4200
      },
      {
        id: 'm-502',
        restaurantId: 'rest-5',
        name: 'Smoked BBQ Pepperoni & Jalapeno',
        description: 'Hand-stretched sourdough with spiced imported pepperoni cuts, smoked mozzarella and honey drizzle.',
        price: 560,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80',
        isVeg: false,
        isBestseller: true,
        category: 'Sourdough Pizzas',
        rating: 4.7,
        votes: 3900
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Chai Point & All Day Snacks',
    cuisines: ['Tea', 'Breakfast', 'Samosas', 'Bakery'],
    rating: 4.4,
    ratingCount: '19K+ ratings',
    deliveryTimeMinutes: 15,
    distanceKm: 1.2,
    priceForTwo: 200,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    address: 'HSR Layout Sector 2, Bengaluru',
    area: 'HSR Layout',
    featuredOffer: 'FLAT ₹50 OFF on ₹199',
    isPureVeg: true,
    isSwiggyOneExclusive: true,
    categories: ['Hot Flask Teas', 'Crispy Snacks', 'Healthy Bun Maska'],
    menu: [
      {
        id: 'm-601',
        restaurantId: 'rest-6',
        name: 'Ginger Cardamom Chai (500ml Flask)',
        description: 'Fresh milk chai infused with real crushed ginger and aromatic green cardamom in heat-retentive flask (Serves 3-4).',
        price: 169,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Hot Flask Teas',
        rating: 4.7,
        votes: 8900
      },
      {
        id: 'm-602',
        restaurantId: 'rest-6',
        name: 'Punjabi Aloo Samosa (2 Pcs) with Chutneys',
        description: 'Flaky crust samosas filled with roasted spices, green peas and potatoes with sweet tamarind dip.',
        price: 79,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
        isVeg: true,
        isBestseller: true,
        category: 'Crispy Snacks',
        rating: 4.5,
        votes: 5600
      }
    ]
  }
];

export const INSTAMART_PRODUCTS: InstamartProduct[] = [
  {
    id: 'im-1',
    name: 'Amul Taaza Homogenised Toned Milk',
    weight: '1 Litre Pouch',
    price: 54,
    originalPrice: 56,
    discountPercentage: 4,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80',
    category: 'Dairy & Bread',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'im-2',
    name: 'Fresh Farm Cavendish Bananas',
    weight: '500g (3-4 pcs)',
    price: 38,
    originalPrice: 48,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80',
    category: 'Fresh Fruits & Veggies',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'im-3',
    name: 'Lays India\'s Magic Masala Chips',
    weight: '115g Family Pack',
    price: 45,
    originalPrice: 50,
    discountPercentage: 10,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80',
    category: 'Snacks & Munchies',
    inStock: true,
    rating: 4.9
  },
  {
    id: 'im-4',
    name: 'Maggi 2-Minute Masala Instant Noodles',
    weight: 'Pack of 4 (280g)',
    price: 58,
    originalPrice: 65,
    discountPercentage: 11,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80',
    category: 'Instant Food & Noodles',
    inStock: true,
    rating: 4.9
  },
  {
    id: 'im-5',
    name: 'Coca-Cola Zero Sugar Can',
    weight: '300ml Chilled',
    price: 40,
    originalPrice: 40,
    discountPercentage: 0,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    category: 'Cold Drinks & Juices',
    inStock: true,
    rating: 4.6
  },
  {
    id: 'im-6',
    name: 'The Whole Truth Dark Chocolate Peanut Butter',
    weight: '350g Jar',
    price: 299,
    originalPrice: 350,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    category: 'Breakfast & Spreads',
    inStock: true,
    rating: 4.8
  },
  {
    id: 'im-7',
    name: 'Fresh Organic Hass Avocado',
    weight: '2 Pieces (300g)',
    price: 189,
    originalPrice: 240,
    discountPercentage: 21,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
    category: 'Fresh Fruits & Veggies',
    inStock: true,
    rating: 4.7
  },
  {
    id: 'im-8',
    name: 'Modern 100% Whole Wheat Bread',
    weight: '400g Sliced Loaf',
    price: 50,
    originalPrice: 55,
    discountPercentage: 9,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    category: 'Dairy & Bread',
    inStock: true,
    rating: 4.5
  }
];

export const DINEOUT_VENUES: DineoutVenue[] = [
  {
    id: 'dine-1',
    name: 'Toit Brewpub',
    cuisine: 'Microbrewery, Continental, Finger Food',
    area: 'Indiranagar, 100ft Road',
    rating: 4.8,
    reviewsCount: 14200,
    costForTwo: 1800,
    offer: 'FLAT 25% OFF on Food & Drinks Bill',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    timings: '12:00 PM - 11:30 PM',
    features: ['Craft Beer on Tap', 'Outdoor Seating', 'Live Sports Screening', 'Valet Parking']
  },
  {
    id: 'dine-2',
    name: 'Olive Beach Mediterranean Bistro',
    cuisine: 'Mediterranean, European, Cocktails',
    area: 'Wood Street, Ashok Nagar',
    rating: 4.7,
    reviewsCount: 8900,
    costForTwo: 2600,
    offer: 'FLAT 20% OFF on Total Bill with Swiggy Dineout Pay',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    timings: '12:30 PM - 11:00 PM',
    features: ['Romantic Courtyard', 'Candle Light Dinner', 'Sommelier Selection', 'Live Jazz']
  },
  {
    id: 'dine-3',
    name: 'Ozaa Rooftop & Sky Lounge',
    cuisine: 'Pan-Asian, Lebanese, Signature Mixology',
    area: 'MG Road, Central Bengaluru',
    rating: 4.6,
    reviewsCount: 6100,
    costForTwo: 2200,
    offer: '1+1 on Cocktails + 15% OFF on Food',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80',
    timings: '5:00 PM - 1:00 AM',
    features: ['City Skyline View', 'Sunset Lounge', 'DJ Nights', 'Private Cabanas']
  }
];

export const SCENE_EVENTS: SceneEvent[] = [
  {
    id: 'sc-1',
    title: 'Old Bengaluru Heritage Street Food Walk',
    tagline: 'Discover 8 legendary secret food stalls in VV Puram & Malleshwaram',
    date: 'Saturday, 22 Aug',
    time: '5:30 PM - 8:30 PM',
    location: 'VV Puram Food Street, Bengaluru',
    price: 899,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    category: 'Food Walk',
    organizer: 'Bangalore Culinary Guild',
    spotsLeft: 6,
    description: 'Taste authentic crispy Benne Dosas, spiced Gulkand ice cream, Akki Rottis, and filter coffee with historical culinary lore.'
  },
  {
    id: 'sc-2',
    title: 'Artisanal Sourdough & Woodfire Pizza Masterclass',
    tagline: 'Hands-on fermentation, shaping, and brick-oven baking with Master Chef Marco',
    date: 'Sunday, 23 Aug',
    time: '11:00 AM - 2:00 PM',
    location: 'Brik Oven Academy, Indiranagar',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    category: 'Masterclass',
    organizer: 'Chef Marco Rossi',
    spotsLeft: 4,
    description: 'Master hydration percentages, dough stretching, signature tomato sauce reduction, and take home your freshly baked sourdough loaf.'
  },
  {
    id: 'sc-3',
    title: 'Secret Craft Beer Tasting & Brewery Hop',
    tagline: 'Exclusive VIP tour behind the tanks with 6 craft beer flights and pairing bites',
    date: 'Friday, 28 Aug',
    time: '7:00 PM - 10:00 PM',
    location: 'Toit Brewhouse, 100ft Road',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    category: 'Brewery Tour',
    organizer: 'Craft Beer Pioneers Bengaluru',
    spotsLeft: 9,
    description: 'Hop through seasonal ales, imperial stouts, and cloudy NEIPAs with brewmasters explaining malt profiles.'
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'SWIGGYIT',
    discount: '50% OFF up to ₹100',
    minOrder: 199,
    description: 'Valid on food orders above ₹199'
  },
  {
    code: 'MULTICART',
    discount: 'FLAT ₹75 OFF',
    minOrder: 350,
    description: 'Special multi-restaurant cart discount'
  },
  {
    code: 'FREEDEL',
    discount: 'FREE DELIVERY (₹40 OFF)',
    minOrder: 149,
    description: 'Zero delivery fee on all restaurants'
  },
  {
    code: 'FEAST150',
    discount: '₹150 OFF on ₹599+',
    minOrder: 599,
    description: 'Big party & group feast savings'
  }
];

export const INITIAL_USER_ADDRESSES = [
  {
    id: 'addr-1',
    title: 'Home',
    tag: 'Home',
    address: 'Flat 402, Pine Grove Apts, 4th Cross, 12th Main, Koramangala 4th Block, Bengaluru',
    receiverName: 'Pankti & Dharmi',
    receiverPhone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Work / Office',
    tag: 'Work',
    address: 'Tower B, 6th Floor, WeWork Galaxy, Residency Road, Bengaluru',
    receiverName: 'Pankti S.',
    receiverPhone: '+91 98765 43210',
    isDefault: false
  }
];
