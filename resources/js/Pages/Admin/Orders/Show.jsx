import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Package, User, MapPin, Truck, Calendar } from 'lucide-react';
import Button from '@/Components/atoms/Button';

export default function Show({ order }) {
    const { data, setData, put, processing } = useForm({
        status: order.status
    });

    const updateStatus = (e) => {
        e.preventDefault();
        put(route('admin.orders.update', order.id));
    };

    return (
        <AdminLayout>
            <Head title={`Order #${order.id} Details`} />

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <Link href={route('admin.orders.index')} className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4">
                            <ChevronLeft size={14} /> Back to List
                        </Link>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Order <span className="text-indigo-600">#{order.id}</span></h1>
                    </div>
                    <form onSubmit={updateStatus} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <select 
                            value={data.status} 
                            onChange={e => setData('status', e.target.value)}
                            className="bg-gray-50 border-none rounded-xl text-xs font-bold uppercase tracking-widest px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <Button disabled={processing} type="submit" className="bg-indigo-600 hover:bg-gray-950 text-white rounded-xl px-4 py-2 text-[10px] uppercase font-black">Update</Button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Items */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
                                <Package size={14} /> Order Contents
                            </h3>
                            <div className="divide-y divide-gray-50">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="py-6 flex items-center justify-between group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                                <img src={`/storage/${item.product?.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{item.product?.name}</h4>
                                                <p className="text-gray-400 text-xs font-semibold">Qty: {item.quantity} × ₹{item.price}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-indigo-600 text-lg italic">₹{item.quantity * item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center px-4">
                                <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Total Amount</span>
                                <span className="text-3xl font-black text-indigo-600 italic">₹{order.total_amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                <User size={14} /> Customer
                            </h3>
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">{order.user?.name || 'Guest Customer'}</p>
                                <p className="text-gray-400 font-semibold">{order.user?.email}</p>
                                <p className="text-gray-400 font-semibold">{order.user?.mobile}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                <MapPin size={14} /> Shipping Destination
                            </h3>
                            <div className="text-sm font-semibold text-gray-500 leading-relaxed">
                                {order.address ? (
                                    <>
                                        <p className="text-gray-900 font-bold mb-1">{order.address.name}</p>
                                        <p>{order.address.house_name}, {order.address.area}</p>
                                        <p>{order.address.city}, {order.address.state}</p>
                                        <p className="mt-2 text-indigo-600 font-black">{order.address.pincode}</p>
                                    </>
                                ) : 'Address info missing'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
