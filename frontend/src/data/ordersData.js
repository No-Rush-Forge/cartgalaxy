export const ordersData = [
  {
    id: "ORD0001",
    customer: {
      name: "Dinesh Gokul",
      email: "dinesh.gokul@example.com",
      phone: "+91 98765 43210",
    },
    date: "04 Aug 2026",
    items: [
      { product: "Handloom Cotton Saree", quantity: 1, price: 1899 },
      { product: "Brass Table Lamp", quantity: 2, price: 1240 },
    ],
    amount: 4379,
    payment: "Paid",
    status: "Delivered",
    shippingAddress: "12 Lake View Road, Adyar, Chennai, Tamil Nadu 600020",
  },
  {
    id: "ORD0002",
    customer: {
      name: "Manoj Kumar",
      email: "manoj.kumar@example.com",
      phone: "+91 91234 56780",
    },
    date: "04 Aug 2026",
    items: [{ product: "Clay Diffuser Set", quantity: 1, price: 560 }],
    amount: 560,
    payment: "COD",
    status: "Pending",
    shippingAddress: "45 MG Road, Bengaluru, Karnataka 560001",
  },
  {
    id: "ORD0003",
    customer: {
      name: "Priya Nair",
      email: "priya.nair@example.com",
      phone: "+91 90000 11122",
    },
    date: "03 Aug 2026",
    items: [
      { product: "Embroidered Cushion Cover", quantity: 3, price: 420 },
      { product: "Jute Wall Hanging", quantity: 1, price: 350 },
    ],
    amount: 1610,
    payment: "Paid",
    status: "Shipped",
    shippingAddress: "7 Marine Drive, Kochi, Kerala 682031",
  },
  {
    id: "ORD0004",
    customer: {
      name: "Aman Gupta",
      email: "aman.gupta@example.com",
      phone: "+91 99887 76655",
    },
    date: "02 Aug 2026",
    items: [{ product: "Block Print Kurta", quantity: 2, price: 990 }],
    amount: 1980,
    payment: "Paid",
    status: "Processing",
    shippingAddress: "221 Sector 21, Noida, Uttar Pradesh 201301",
  },
  {
    id: "ORD0005",
    customer: {
      name: "Sneha Iyer",
      email: "sneha.iyer@example.com",
      phone: "+91 98111 22334",
    },
    date: "01 Aug 2026",
    items: [{ product: "Handloom Cotton Saree", quantity: 1, price: 1899 }],
    amount: 1899,
    payment: "COD",
    status: "Cancelled",
    shippingAddress: "9 Anna Nagar, Chennai, Tamil Nadu 600040",
  },
  {
    id: "ORD0006",
    customer: {
      name: "Vikram Rao",
      email: "vikram.rao@example.com",
      phone: "+91 90111 22335",
    },
    date: "31 Jul 2026",
    items: [
      { product: "Brass Table Lamp", quantity: 1, price: 1240 },
      { product: "Clay Diffuser Set", quantity: 2, price: 560 },
    ],
    amount: 2360,
    payment: "Paid",
    status: "Delivered",
    shippingAddress: "56 Park Street, Kolkata, West Bengal 700016",
  },
];

export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
