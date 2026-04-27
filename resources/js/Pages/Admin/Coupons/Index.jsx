import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Ticket, Plus, Trash2 } from 'lucide-react';
import DataGrid from '@/Components/organisms/DataGrid';
import { useMemo } from 'react';
import Button from '@/Components/atoms/Button';

export default function Index({ coupons }) {
    const columnDefs = useMemo(() => [
        { 
            headerName: 'Coupon Code', 
            field: 'code', 
            cellClass: 'font-black tracking-widest text-indigo-600 uppercase' 
        },
        { 
            headerName: 'Discount', 
            field: 'discount_amount',
            valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
            cellStyle: { fontWeight: '800' }
        },
        { 
            headerName: 'Min Spend', 
            field: 'min_purchase_amount',
            valueFormatter: (params) => `₹${params.value.toLocaleString()}`
        },
        { 
            headerName: 'Expires', 
            field: 'expiry_date',
            valueFormatter: (params) => new Date(params.value).toLocaleDateString('en-GB'),
            cellClass: 'text-gray-400 font-bold'
        },
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <div className="flex gap-4">
                    <button className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ], []);

    return (
        <AdminLayout>
            <Head title="Promotion Console" />
            
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                            <Ticket size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">Campaigns</h1>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Manage discounts and seasonal offers</p>
                        </div>
                    </div>

                    <Link href={route('admin.coupons.create')}>
                        <Button className="rounded-2xl px-6 py-3 bg-indigo-600 hover:bg-gray-950 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-100 transition-all active:scale-95">
                            <Plus size={16} /> New Coupon
                        </Button>
                    </Link>
                </div>

                <DataGrid 
                    rowData={coupons.data} 
                    columnDefs={columnDefs} 
                    height="450px"
                />
            </div>
        </AdminLayout>
    );
}
