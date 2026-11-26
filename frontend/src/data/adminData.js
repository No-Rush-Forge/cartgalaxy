export const mockUsers = [
  {
    id: "USR001",
    name: "Dinesh Gokul",
    email: "dinesh.gokul@example.com",
    role: "Store Owner",
    status: "Active",
    joined: "02 Jul 2026",
  },
  {
    id: "USR002",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    role: "Store Owner",
    status: "Active",
    joined: "10 Jul 2026",
  },
  {
    id: "USR003",
    name: "Aman Gupta",
    email: "aman.gupta@example.com",
    role: "Store Owner",
    status: "Suspended",
    joined: "15 Jul 2026",
  },
  {
    id: "USR004",
    name: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    role: "Store Owner",
    status: "Active",
    joined: "22 Jul 2026",
  },
  {
    id: "USR005",
    name: "Alex Thomas",
    email: "alex.thomas@example.com",
    role: "Admin",
    status: "Active",
    joined: "01 Jun 2026",
  },
  {
    id: "USR006",
    name: "Manoj Kumar",
    email: "manoj.kumar@example.com",
    role: "Store Owner",
    status: "Active",
    joined: "05 Aug 2026",
  },
];

export const mockStores = [
  {
    id: "STR001",
    name: "Dinesh Electronics",
    owner: "Dinesh Gokul",
    status: "Active",
    subscription: "Pro",
    created: "29 Aug 2026",
  },
  {
    id: "STR002",
    name: "ABC Fashion",
    owner: "Priya Nair",
    status: "Active",
    subscription: "Starter",
    created: "28 Aug 2026",
  },
  {
    id: "STR003",
    name: "XYZ Electronics",
    owner: "Alex Thomas",
    status: "Suspended",
    subscription: "Pro",
    created: "25 Aug 2026",
  },
  {
    id: "STR004",
    name: "Meera's Home Store",
    owner: "Sneha Iyer",
    status: "Active",
    subscription: "Starter",
    created: "30 Jul 2026",
  },
  {
    id: "STR005",
    name: "Manoj Handicrafts",
    owner: "Manoj Kumar",
    status: "Active",
    subscription: "None",
    created: "12 Jul 2026",
  },
];

export const mockSubscriptions = [
  {
    id: "SUB001",
    store: "Dinesh Electronics",
    owner: "Dinesh Gokul",
    plan: "Pro",
    status: "Active",
    startDate: "15 Jul 2026",
    renewalDate: "15 Sep 2026",
  },
  {
    id: "SUB002",
    store: "ABC Fashion",
    owner: "Priya Nair",
    plan: "Starter",
    status: "Trial",
    startDate: "20 Aug 2026",
    renewalDate: "27 Aug 2026",
  },
  {
    id: "SUB003",
    store: "XYZ Electronics",
    owner: "Alex Thomas",
    plan: "Pro",
    status: "Expired",
    startDate: "10 May 2026",
    renewalDate: "10 Jul 2026",
  },
  {
    id: "SUB004",
    store: "Meera's Home Store",
    owner: "Sneha Iyer",
    plan: "Starter",
    status: "Active",
    startDate: "20 Jul 2026",
    renewalDate: "20 Sep 2026",
  },
];

export const mockAdminActivity = [
  {
    id: 1,
    type: "user",
    title: "New user registered",
    description: "Manoj Kumar created an account",
    time: "29 Aug 2026, 20:10",
  },
  {
    id: 2,
    type: "store",
    title: "Store suspended",
    description: "XYZ Electronics was suspended",
    time: "29 Aug 2026, 19:45",
  },
  {
    id: 3,
    type: "subscription",
    title: "Subscription activated",
    description: "Pro subscription activated for Dinesh Electronics",
    time: "29 Aug 2026, 19:30",
  },
  {
    id: 4,
    type: "subscription",
    title: "Subscription cancelled",
    description: "XYZ Electronics' Pro plan expired",
    time: "29 Aug 2026, 18:40",
  },
  {
    id: 5,
    type: "store",
    title: "New store created",
    description: "Manoj Handicrafts went live",
    time: "29 Aug 2026, 16:20",
  },
  {
    id: 6,
    type: "account",
    title: "User account updated",
    description: "Priya Nair updated her profile details",
    time: "29 Aug 2026, 15:05",
  },
];

export const platformStats = {
  totalUsers: 128,
  totalStores: 42,
  activeSubscriptions: 37,
  platformRevenue: "₹1,24,500",
};

export const subscriptionStats = {
  active: 37,
  trial: 5,
  expired: 4,
  monthlyRevenue: "₹36,850",
};
