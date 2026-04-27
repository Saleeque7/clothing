import { 
  faHome, 
  faStore, 
  faShoppingCart, 
  faHeart, 
  faClipboardList, 
  faUser, 
  faWallet, 
  faChartLine, 
  faUsers, 
  faTags, 
  faList, 
  faBox, 
  faTicketAlt, 
  faImages, 
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

// Roles (Centralized Role IDs)
export const CUSTOMER_USER = 1;
export const ADMIN_USER = 2;
export const DEVELOPER_USER = 3;

// User / Member Sidebar Links (Available for authenticated customers)
export const memberNavList = [
  { text: "Home", icon: faHome, href: "/" },
  { text: "Shop", icon: faStore, href: "/shop" },
  { text: "My Cart", icon: faShoppingCart, href: "/cart" },
  { text: "Wishlist", icon: faHeart, href: "/wishlist" },
  { text: "My Orders", icon: faClipboardList, href: "/orders" },
  { text: "Wallet history", icon: faWallet, href: "/wallet/history" },
  { text: "Profile", icon: faUser, href: "/profile" },
];

// Admin Sidebar Links (Available for Admin/Developer roles)
export const navList = [
  { text: "Dashboard", href: "/admin/dashboard", icon: faChartLine },
  { text: "Users Management", href: "/admin/users", icon: faUsers },
  { text: "Categories", href: "/admin/categories", icon: faList },
  { text: "Brands", href: "/admin/brands", icon: faTags },
  { text: "Products", href: "/admin/products", icon: faBox },
  { text: "Orders Management", href: "/admin/orders", icon: faClipboardList },
  { text: "Coupons", href: "/admin/coupons", icon: faTicketAlt },
  { text: "Banners", href: "/admin/banners", icon: faImages },
  { text: "Sales Report", href: "/admin/sales-report", icon: faFileInvoiceDollar },
];

// Role-Based Permissions Mapping
export const allowedUsers = {
  // Navigation Menus
  adminSideNav: [ADMIN_USER, DEVELOPER_USER],
  memberSideNav: [CUSTOMER_USER, ADMIN_USER, DEVELOPER_USER],

  // Admin Features
  dashboard: [ADMIN_USER, DEVELOPER_USER],
  users: [ADMIN_USER, DEVELOPER_USER],
  categories: [ADMIN_USER, DEVELOPER_USER],
  brands: [ADMIN_USER, DEVELOPER_USER],
  products: [ADMIN_USER, DEVELOPER_USER],
  orders: [ADMIN_USER, DEVELOPER_USER],
  coupons: [ADMIN_USER, DEVELOPER_USER],
  banners: [ADMIN_USER, DEVELOPER_USER],
  salesReport: [ADMIN_USER, DEVELOPER_USER],

  // Customer Features
  cart: [CUSTOMER_USER, ADMIN_USER, DEVELOPER_USER],
  wishlist: [CUSTOMER_USER, ADMIN_USER, DEVELOPER_USER],
  wallet: [CUSTOMER_USER, ADMIN_USER, DEVELOPER_USER],
  profile: [CUSTOMER_USER, ADMIN_USER, DEVELOPER_USER],
};

// Pages where the main navigation/sidebar should be hidden
export const pagesWithoutMenu = [
  "/login",
  "/register",
  "/admin/login",
  "/otp",
  "/forgot-password",
  "/reset-password",
];
