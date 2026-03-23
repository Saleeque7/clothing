import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import { Tag, Trash2, Plus, Image } from 'lucide-react';

export default function Index({ brands }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.brands.store'), {
      onSuccess: () => reset()
    });
  };

  return (
    <AdminLayout>
      <Head title="Brands Management" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit">
           <div className="flex items-center gap-3 mb-8">
              <Plus className="text-indigo-600" />
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">New Brand</h3>
           </div>
           
           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input 
                label="Brand Name" 
                placeholder="e.g. Seiko" 
                value={data.name} 
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
              />
              <div className="w-full h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4">
                 <Image className="text-gray-300 mb-2" />
                 <input 
                    type="file" 
                    onChange={e => setData('image', e.target.files[0])}
                    className="text-xs font-bold text-gray-400"
                 />
              </div>
              <Button type="submit" loading={processing} className="w-full mt-4">REGISTER BRAND</Button>
           </form>
        </div>

        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {brands.map(brand => (
             <div key={brand.id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-indigo-100 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-gray-50 mb-6 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                   {brand.image ? 
                      <img src={`/storage/${brand.image}`} className="w-full h-full object-cover" alt="" /> : 
                      <span className="font-black text-indigo-400 text-lg">{brand.name[0]}</span>
                   }
                </div>
                <h4 className="font-black text-gray-900 uppercase tracking-tighter text-lg mb-4">{brand.name}</h4>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${brand.is_listed ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'} shadow-lg`} />
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{brand.is_listed ? 'Active' : 'Hidden'}</span>
                   </div>
                   <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16}/>
                   </Button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </AdminLayout>
  );
}
