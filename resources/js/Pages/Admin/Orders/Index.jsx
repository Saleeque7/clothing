import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, Eye } from 'lucide-react';
import DataGrid from '@/Components/organisms/DataGrid';
import { useMemo } from 'react';

export default function Index({ orders }) {
    const columnDefs = useMemo(() => [
        { headerName: 'Order ID', field: 'id', flex: 0.5 },
        { 
            headerName: 'Customer', 
            valueGetter: (params) => params.data.user?.name || 'Guest',
            cellStyle: { fontWeight: '700' }
        },
        { 
            headerName: 'Total', 
            field: 'total_amount',
            valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
            cellClass: 'text-indigo-600 font-black'
        },
        { 
            headerName: 'Status', 
            field: 'status',
            cellRenderer: (params) => {
                const colors = {
                    'Delivered': 'bg-green-100 text-green-700',
                    'Pending': 'bg-amber-100 text-amber-700',
                    'Shipped': 'bg-blue-100 text-blue-700',
                    'Cancelled': 'bg-red-100 text-red-700'
                };
                return (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${colors[params.value] || 'bg-gray-100 text-gray-700'}`}>
                        {params.value}
                    </span>
                );
            }
        },
        { headerName: 'Placed At', field: 'created_at', valueFormatter: (params) => new Date(params.value).toLocaleDateString('en-GB') },
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <Link 
                    href={route('admin.orders.show', params.data.id)} 
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-bold uppercase text-[10px] tracking-widest"
                >
                    <Eye size={14} /> View Details
                </Link>
            )
        }
    ], []);

    return (
        <AdminLayout>
            <Head title="Orders Management" />
            
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">Order Management</h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Track and manage customer deliveries</p>
                    </div>
                </div>

                <DataGrid 
                    rowData={orders.data} 
                    columnDefs={columnDefs} 
                    height="500px"
                />
            </div>
        </AdminLayout>
    );
}
