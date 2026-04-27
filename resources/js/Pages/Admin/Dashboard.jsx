import AdminLayout from '@/Components/templates/AdminLayout';
import { Head } from '@inertiajs/react';
import { TrendingUp, ShoppingBag, Users, Coins, Search } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleFont: { size: 12, weight: 'bold' },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    }
  },
  scales: {
    x: { 
        grid: { display: false },
        ticks: { font: { size: 10, weight: '600' }, color: '#94a3b8' }
    },
    y: { 
      beginAtZero: true,
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { 
        font: { size: 10, weight: '600' }, 
        color: '#94a3b8',
        callback: (val) => `₹${val}` 
      }
    }
  }
};

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      fill: true,
      label: 'Revenue',
      data: [3000, 4500, 3200, 7800, 5600, 9000, 12000],
      borderColor: '#1D9E75',
      backgroundColor: 'rgba(29, 158, 117, 0.05)',
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#1D9E75',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 3,
    },
  ],
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white shadow-sm`}>
        <Icon size={18} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
           +{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
  </div>
);

export default function Dashboard({ stats }) {
  return (
    <AdminLayout>
      <Head title="Performance Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Gross Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          icon={Coins} 
          color="bg-[#085041]" 
          trend={12} 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.total_orders} 
          icon={ShoppingBag} 
          color="bg-slate-950" 
          trend={15.4} 
        />
        <StatCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
          color="bg-slate-600" 
          trend={2} 
        />
        <StatCard 
          title="Product Catalog" 
          value={stats.products} 
          icon={TrendingUp} 
          color="bg-[#1D9E75]" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sales Performance</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none">
                 <option>Monthly Analysis</option>
                 <option>Quarterly Insights</option>
              </select>
           </div>
           
           <div className="flex-1 h-80 min-h-[350px]">
              <Line options={chartOptions} data={chartData} />
           </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Top Products</h3>
          <div className="flex flex-col gap-4">
             {[
               { name: 'Apex Hiking Pack', brand: 'PackPal Pro', price: '₹4,500' },
               { name: 'Nomad Daily Tote', brand: 'Urban Carry', price: '₹2,200' },
               { name: 'Insulated Flask 1L', brand: 'HydraFlow', price: '₹1,400' }
             ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group p-2 hover:bg-slate-50 rounded-xl transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:scale-105 transition-transform overflow-hidden">
                      <Search size={16} />
                   </div>
                   <div className="flex-1">
                      <p className="font-bold text-xs text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.brand}</p>
                   </div>
                   <p className="font-bold text-sm text-[#1D9E75]">{item.price}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
