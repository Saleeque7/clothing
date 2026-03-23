import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import { Plus, Package, Layers, Tag, IndianRupee, Image } from 'lucide-react';

export default function Create({ categories, brands }) {
  const { data, setData, post, processing, errors } = useForm({
    product_name: '',
    product_price: '',
    quantity: '',
    category_id: '',
    brand_id: '',
    description: '',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.products.store'));
  };

  return (
    <AdminLayout>
      <Head title="Create New Apparel Line" />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="flex items-center gap-3 mb-10 relative z-10">
                 <Package className="text-indigo-600" />
                 <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">General Information</h3>
              </div>
              
              <div className="flex flex-col gap-8 relative z-10">
                 <Input 
                   label="Garment Title" 
                   placeholder="e.g. Slim Fit Linen Shirt" 
                   value={data.product_name} 
                   onChange={e => setData('product_name', e.target.value)}
                   error={errors.product_name}
                 />
                 
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Detailed Description</label>
                    <textarea 
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold placeholder:text-gray-300 focus:ring-2 focus:ring-indigo-500 min-h-[160px]"
                        placeholder="Describe the fabric, fit, and style..."
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Luxe Brand Selection</label>
                       <select 
                          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold text-gray-600 focus:ring-2 focus:ring-indigo-500"
                          value={data.brand_id}
                          onChange={e => setData('brand_id', e.target.value)}
                       >
                          <option value="">Choose Label</option>
                          {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                       </select>
                       {errors.brand_id && <p className="text-red-500 text-[10px] font-bold uppercase pl-1">{errors.brand_id}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Apparel Collection</label>
                       <select 
                          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-semibold text-gray-600 focus:ring-2 focus:ring-indigo-500"
                          value={data.category_id}
                          onChange={e => setData('category_id', e.target.value)}
                       >
                          <option value="">Choose Genre</option>
                          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                       </select>
                       {errors.category_id && <p className="text-red-500 text-[10px] font-bold uppercase pl-1">{errors.category_id}</p>}
                    </div>
                 </div>
              </div>
           </div>

           {/* Media Assets */}
           <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3 mb-10">
                 <Image className="text-indigo-600" />
                 <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Lookbook Photography</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 <div className="aspect-square rounded-[2rem] bg-indigo-50/50 border-4 border-dashed border-indigo-100 flex flex-col items-center justify-center p-4 text-center group hover:bg-white hover:border-indigo-600 transition-all cursor-pointer relative">
                    <Plus className="text-indigo-400 mb-2 group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Add Master Shot</span>
                    <input 
                       type="file" 
                       multiple 
                       className="absolute inset-0 opacity-0 cursor-pointer"
                       onChange={e => setData('images', Array.from(e.target.files))}
                    />
                 </div>
                 {data.images.map((img, i) => (
                    <div key={i} className="aspect-square rounded-[2rem] bg-gray-100 overflow-hidden relative group">
                       <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button type="button" className="p-2 bg-red-500 text-white rounded-full"><Plus className="rotate-45" size={16}/></button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Pricing & Stock Card */}
        <div className="flex flex-col gap-8">
           <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full bg-opacity-20 blur-3xl" />
              <div className="flex items-center gap-3 mb-10 relative z-10">
                 <IndianRupee className="text-indigo-400" />
                 <h3 className="text-xl font-black text-white tracking-tight uppercase">Economic Setup</h3>
              </div>
              
              <div className="flex flex-col gap-8 relative z-10">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-indigo-300/60 uppercase tracking-widest pl-1">List Price (INR)</label>
                    <input 
                      type="number"
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-2xl font-black text-white focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                      placeholder="0.00"
                      value={data.product_price}
                      onChange={e => setData('product_price', e.target.value)}
                    />
                    {errors.product_price && <p className="text-red-400 text-[10px] font-bold uppercase pl-1">{errors.product_price}</p>}
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-indigo-300/60 uppercase tracking-widest pl-1">Inventory Quantity</label>
                    <input 
                      type="number"
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-2xl font-black text-white focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
                      placeholder="0"
                      value={data.quantity}
                      onChange={e => setData('quantity', e.target.value)}
                    />
                    {errors.quantity && <p className="text-red-400 text-[10px] font-bold uppercase pl-1">{errors.quantity}</p>}
                 </div>
              </div>
           </div>

           <Button type="submit" loading={processing} className="w-full h-20 rounded-[2rem] text-lg font-black tracking-widest shadow-xl shadow-indigo-100 uppercase">
              ACTIVATE COLLECTION
           </Button>
           
           <Link href={route('admin.products.index')} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">
              DISCARD CHANGES
           </Link>
        </div>
      </form>
    </AdminLayout>
  );
}
