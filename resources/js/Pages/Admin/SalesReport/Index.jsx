import AdminLayout from '@/Components/templates/AdminLayout';
import { Head } from '@inertiajs/react';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';
import DataGrid from '@/Components/organisms/DataGrid';
import { useMemo } from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-black uppercase text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12.5%</span>
        </div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
    </div>
);

export default function Index({ reports, stats }) {
    const columnDefs = useMemo(() => [
        { headerName: 'Order ID', field: 'id', flex: 0.5 },
        { 
            headerName: 'Customer', 
            valueGetter: (params) => params.data.user?.name || 'Guest'
        },
        { 
            headerName: 'Revenue', 
            field: 'total_amount',
            valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
            cellClass: 'text-green-600 font-bold'
        },
        { 
            headerName: 'Date', 
            field: 'created_at', 
            valueFormatter: (params) => new Date(params.value).toLocaleString('en-GB') 
        }
    ], []);

    return (
        <AdminLayout>
            <Head title="Sales Intelligence" />
            
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Revenue" 
                        value={`₹${stats.total_revenue.toLocaleString()}`} 
                        icon={DollarSign} 
                        color="bg-emerald-500" 
                    />
                    <StatCard 
                        title="Successful Orders" 
                        value={stats.total_orders} 
                        icon={Package} 
                        color="bg-indigo-500" 
                    />
                    <StatCard 
                        title="Avg Order Value" 
                        value={`₹${Math.round(stats.avg_order_value).toLocaleString()}`} 
                        icon={TrendingUp} 
                        color="bg-amber-500" 
                    />
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center text-white shadow-xl">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">Finance Overview</h1>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">In-depth analysis of your revenue stream</p>
                        </div>
                    </div>

                    <DataGrid 
                        rowData={reports.data} 
                        columnDefs={columnDefs} 
                        height="400px"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
