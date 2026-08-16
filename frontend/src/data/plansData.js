export const plansData = [
  {
    id: "starter",
    name: "Starter",
    price: "₹299",
    period: "/month",
    features: ["100 Products", "Basic Reports", "Email Support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹999",
    period: "/month",
    features: ["Unlimited Products", "Coupons", "Advanced Reports", "Multiple Users"],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    features: ["Everything Unlimited", "Priority Support", "Custom Features"],
  },
];

export const billingData = [
  { invoice: "INV001", date: "August 2026", amount: "₹999", status: "Paid" },
  { invoice: "INV002", date: "July 2026", amount: "₹999", status: "Paid" },
  { invoice: "INV003", date: "June 2026", amount: "₹999", status: "Paid" },
  { invoice: "INV004", date: "May 2026", amount: "₹999", status: "Paid" },
];

export const usageData = [
  { label: "Products", value: "120 / Unlimited" },
  { label: "Orders This Month", value: "45" },
  { label: "Storage Used", value: "1.5 GB / 5 GB" },
  { label: "Users", value: "2 / 5" },
];

export const currentSubscription = {
  plan: "Pro Plan",
  price: "₹999 / Month",
  status: "Active",
  renewalDate: "15 September 2026",
};
