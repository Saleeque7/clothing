import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import Price from '@/Components/atoms/Price';
import { Plus, Edit2, Trash2, Package, Search } from 'lucide-react';

export default function Index({ products }) {
  return (
    <AdminLayout>
      <Head title="Products Management" />

      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 px-2">
           <div className="flex gap-4 items-center">
              <Package className="text-indigo-600" />
              <span className="font-black text-gray-950 uppercase tracking-tighter text-lg">{products.total} Inventory Items</span>
           </div>
           
           <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search Products..." 
                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                 />
              </div>
              <Link href={route('admin.products.create')}>
                 <Button className="rounded-xl px-6 py-3 flex items-center gap-2">
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add Product</span>
                 </Button>
              </Link>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full min-w-[800px]">
              <thead>
                 <tr className="text-left border-b border-gray-50 uppercase tracking-[0.2em] text-[10px] font-black text-gray-400">
                    <th className="pb-6 pl-4">Product Details</th>
                    <th className="pb-6 text-center">Category</th>
                    <th className="pb-6 text-center">Stock</th>
                    <th className="pb-6 text-center">Price</th>
                    <th className="pb-6 text-center">Status</th>
                    <th className="pb-6 pr-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {products.data.map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                       <td className="py-6 pl-4">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100">
                                {product.primary_image ? 
                                   <img src={`/storage/${product.primary_image.image_path}`} className="w-full h-full object-cover" alt="" /> :
                                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] font-bold">NO IMAGE</div>
                                }
                             </div>
                             <div>
                                <h4 className="font-black text-gray-900 uppercase tracking-tighter text-sm line-clamp-1">{product.product_name}</h4>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">{product.brand?.name}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                             {product.category?.name}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <span className={`font-black text-sm tracking-tighter ${product.quantity < 5 ? 'text-red-500' : 'text-gray-900'}`}>
                             {product.quantity}
                          </span>
                       </td>
                       <td className="py-6 text-center">
                          <Price original={product.product_price} sale={product.product_sales_price} className="justify-center" />
                       </td>
                       <td className="py-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${product.is_listed ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'} shadow-lg`} />
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.is_listed ? 'Active' : 'Hidden'}</span>
                          </div>
                       </td>
                       <td className="py-6 pr-4 text-right">
                          <div className="flex justify-end gap-2">
                             <Link href={route('admin.products.edit', product.id)}>
                                <Button variant="ghost" size="sm" className="p-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100">
                                   <Edit2 size={16}/>
                                </Button>
                             </Link>
                             <Button variant="ghost" size="sm" className="p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100">
                                <Trash2 size={16}/>
                             </Button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-12 flex justify-between items-center px-4">
           <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Showing page {products.current_page} of {products.last_page}</p>
           <div className="flex gap-2">
              <Button disabled={!products.prev_page_url} variant="secondary" size="sm" className="rounded-xl px-4">Prev</Button>
              <Button disabled={!products.next_page_url} variant="secondary" size="sm" className="rounded-xl px-4">Next</Button>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
