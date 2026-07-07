export type Product = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl?: string;
};

export const categories = [
  "Mathiya",
  "Udad Papad",
  "Instant Mix",
  "Farali Special Item",
  "HomeMade Namkeen",
  "Khakhra Corner",
  "Sarevada",
  "Hand Made Item"
];

export const products: Product[] = [
  // Mathiya
  { 
    id: 'm1', 
    category: 'Mathiya', 
    name: 'White Chilly Mathiya - સફેદ મરચાં ના મઠિયા', 
    description: '.500gm Packing Available', 
    price: '₹250.00',
    imageUrl: '/White Chilly Mathiya.png'
  },
  { 
    id: 'm2', 
    category: 'Mathiya', 
    name: 'Green Chilly Mathiya - લીલા મરચાં ના મઠિયા', 
    description: '.500gm Packing Available', 
    price: '₹270.00',
    imageUrl: '/Green Chilly Mathiya.png'
  },
  { 
    id: 'm3', 
    category: 'Mathiya', 
    name: 'Chorafali', 
    description: '.500gm packing available', 
    price: '₹250.00',
    imageUrl: '/Chorafali.png'
  },
  
  // Udad Papad
  { 
    id: 'u1', 
    category: 'Udad Papad', 
    name: 'Double Mari Papad', 
    description: '', 
    price: '₹270.00',
    imageUrl: '/Double Mari Papad.png'
  },
  { 
    id: 'u2', 
    category: 'Udad Papad', 
    name: 'Single Mari Papad - સિંગલ મરી પાપડ', 
    description: '', 
    price: '₹250 Per kg',
    imageUrl: '/Single Mari Papad.png'
  },
  { 
    id: 'u3', 
    category: 'Udad Papad', 
    name: 'Punjabi Udad Papad', 
    description: 'It\'s Winter Special and Tangy and Spicy in Taste', 
    price: '₹280.00', 
    originalPrice: '₹300.00',
    imageUrl: '/Punjabi Udad Papad.png'
  },

  // Instant Mix
  { 
    id: 'i1', 
    category: 'Instant Mix', 
    name: 'Rav\'s Masala', 
    description: 'Serve 3-4 people in just 2 spoon masala. Uses 3-4 times...', 
    price: '₹50.00',
    imageUrl: '/Rav\'s Masala.png'
  },

  // Farali special item
  { 
    id: 'f1', 
    category: 'Farali Special Item', 
    name: 'Premium Sabudana Bataka Chakri', 
    description: 'Sabudana Bataka chakri', 
    price: '₹400.00',
    imageUrl: '/Premium Sabudana Bataka Chakri.png'
  },
  { 
    id: 'f2', 
    category: 'Farali Special Item', 
    name: 'Sabudana Chamcha', 
    description: 'Sabudana papad, 250 or more.', 
    price: '₹270.00',
    imageUrl: '/Sabudana Chamcha.png'
  },

  // HomeMade Namkeen
  { 
    id: 'h1', 
    category: 'HomeMade Namkeen', 
    name: 'Jada Mathiya', 
    description: 'Available in .250gm , .500gm packing', 
    price: '₹440.00',
    imageUrl: '/Jada Mathiya.png'
  },
  { 
    id: 'h2', 
    category: 'HomeMade Namkeen', 
    name: 'Namkeen - નમકીન નાસ્તા', 
    description: '', 
    price: '₹220 - ₹250 per kg',
    imageUrl: '/Namkeen - નમકીન નાસ્તા.png'
  },
  { 
    id: 'h3', 
    category: 'HomeMade Namkeen', 
    name: 'Sp. Farsi Puri', 
    description: 'Made in cottonseed oil', 
    price: '₹80.00',
    imageUrl: '/Sp. Farsi Puri.png'
  },

  // Khakhra corner
  { 
    id: 'k1', 
    category: 'Khakhra Corner', 
    name: 'Handmade Khakhra', 
    description: 'Handmade Methi, Masala, Sada, Jeera, .500gm packing...', 
    price: '₹240.00',
    imageUrl: '/Handmade Khakhra.png'
  },

  // Sarevada
  { 
    id: 's1', 
    category: 'Sarevada', 
    name: 'Mora Chokha Sarevada', 
    description: 'Without green chili', 
    price: '₹180.00',
    imageUrl: '/Mora Chokha Sarevada.png'
  },
  { 
    id: 's2', 
    category: 'Sarevada', 
    name: 'Sp. Handmade NRI packing Sarevada', 
    description: 'Specially for foreign customer. Compact in size so you can...', 
    price: '₹400.00',
    imageUrl: '/Sp. Handmade NRI packing Sarevada.png'
  },
  { 
    id: 's3', 
    category: 'Sarevada', 
    name: 'Krishna Kamod Sarevada', 
    description: 'Krishna kamod kanki with green chilly', 
    price: '₹270.00',
    imageUrl: '/Krishna Kamod Sarevada.png'
  },

  // Hand Made item
  { 
    id: 'hm1', 
    category: 'Hand Made Item', 
    name: 'Magvadi', 
    description: '.250gm pkt', 
    price: '₹70.00',
    imageUrl: '/Magvadi.png'
  },
  { 
    id: 'hm2', 
    category: 'Hand Made Item', 
    name: 'Chokha Sev - Green chilly', 
    description: 'Marcha Vagarni, and Marcha Vali', 
    price: '₹250.00',
    imageUrl: '/Chokha Sev - Green chilly.png'
  }
];
