import AdminLayout from '@/Components/templates/AdminLayout';
import { Head } from '@inertiajs/react';
import { TrendingUp, ShoppingBag, Users, Coins } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">
           +{trend}%
        </span>
      )}
    </div>
    <h3 className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mb-1">{title}</h3>
    <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
  </div>
);

export default function Dashboard({ stats }) {
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard 
          title="Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          icon={Coins} 
          color="bg-indigo-600" 
          trend={12} 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.total_orders} 
          icon={ShoppingBag} 
          color="bg-green-600" 
          trend={15.4} 
        />
        <StatCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
          color="bg-orange-500" 
          trend={2} 
        />
        <StatCard 
          title="Total Inventory" 
          value={stats.products} 
          icon={TrendingUp} 
          color="bg-blue-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Sales Overview</h3>
              <select className="bg-gray-50 border-none rounded-xl font-bold text-xs uppercase tracking-widest px-4 py-2">
                 <option>Last 30 Days</option>
                 <option>This Year</option>
              </select>
           </div>
           
           <div className="h-80 flex items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Analytics Visualization Loading...</p>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-8 relative z-10">Top Selling</h3>
          <div className="flex flex-col gap-6 relative z-10">
             <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden group-hover:scale-110 transition-transform">
                   <img src="https://placehold.co/100x100?text=Apparel" alt="" />
                </div>
                <div className="flex-1">
                   <p className="font-bold text-sm text-gray-800 uppercase tracking-tighter">Premium Cotton Tee</p>
                   <p className="text-xs text-gray-400 font-medium">Oversized Fit</p>
                </div>
                <p className="font-black text-sm text-indigo-600">₹1,500</p>
             </div>
             {/* Repeat more items here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
