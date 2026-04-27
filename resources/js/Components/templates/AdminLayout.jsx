import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Package, Tag, Layers, Users, ShoppingCart, LogOut, Ticket, Image } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const SidebarItem = ({ href, icon: Icon, children, active }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-semibold text-sm">{children}</span>
  </Link>
);

export default function AdminLayout({ children }) {
  const { props, url } = usePage();
  const { flash, auth } = props;
  const admin = auth.admin;

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white" size={18} />
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Admin Panel</h2>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
          <SidebarItem href={route('admin.dashboard')} icon={LayoutDashboard} active={url === '/admin/dashboard'}>Dashboard</SidebarItem>
          <SidebarItem href={route('admin.products.index')} icon={Package} active={url.startsWith('/admin/products')}>Products</SidebarItem>
          <SidebarItem href={route('admin.categories.index')} icon={Layers} active={url.startsWith('/admin/categories')}>Categories</SidebarItem>
          <SidebarItem href={route('admin.brands.index')} icon={Tag} active={url.startsWith('/admin/brands')}>Brands</SidebarItem>
          <SidebarItem href={route('admin.orders.index')} icon={ShoppingCart} active={url.startsWith('/admin/orders')}>Orders</SidebarItem>
          <SidebarItem href={route('admin.users.index')} icon={Users} active={url.startsWith('/admin/users')}>Customers</SidebarItem>
          <SidebarItem href={route('admin.coupons.index')} icon={Ticket} active={url.startsWith('/admin/coupons')}>Coupons</SidebarItem>
          <SidebarItem href={route('admin.banners.index')} icon={Image} active={url.startsWith('/admin/banners')}>Banners</SidebarItem>
          <SidebarItem href={route('admin.sales-report.index')} icon={LayoutDashboard} active={url.startsWith('/admin/sales-report')}>Sales Report</SidebarItem>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="px-2 mb-4">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Identity: {admin?.role_id === 2 ? 'Admin' : 'Dev'}</p>
             <p className="text-sm font-bold text-gray-900 truncate">{admin?.name || 'Authorized User'}</p>
          </div>
          <Link 
            method="post" 
            as="button" 
            href={route('admin.logout')} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold text-sm"
          >
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-10">
           <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
             {url.split('/')[2]?.replace('-', ' ') || 'Dashboard'}
           </h1>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">
                 {admin?.name?.[0] || 'A'}
              </div>
           </div>
        </header>
        
        <div className="animate-in fade-in duration-500">
           {children}
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />
    </div>
  );
}
