import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import { LayoutGrid, AlertCircle, Edit2, Trash2, Plus } from 'lucide-react';

export default function Index({ categories }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    offer: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.categories.store'), {
      onSuccess: () => reset()
    });
  };

  return (
    <AdminLayout>
      <Head title="Categories Management" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Creation Form */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-12 h-fit">
           <div className="flex items-center gap-3 mb-8">
              <Plus className="text-indigo-600" />
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">New Category</h3>
           </div>
           
           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input 
                label="Category Name" 
                placeholder="e.g. Mechanical Watches" 
                value={data.name} 
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
              />
              <Input 
                label="Promotional Offer (%)" 
                type="number" 
                value={data.offer} 
                onChange={e => setData('offer', e.target.value)}
                error={errors.offer}
              />
              <Button type="submit" loading={processing} className="w-full mt-4">
                 CREATE CATEGORY
              </Button>
           </form>
        </div>

        {/* List Table */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-10 px-2">
              <div className="flex gap-4 items-center">
                 <LayoutGrid className="text-indigo-600" />
                 <span className="font-black text-gray-950 uppercase tracking-tighter text-lg">{categories.length} Collections Found</span>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                    <tr className="text-left border-b border-gray-50 uppercase tracking-widest text-[10px] font-black text-gray-400">
                       <th className="pb-6 pl-4 font-black">#</th>
                       <th className="pb-6 font-black">Name</th>
                       <th className="pb-6 font-black text-center">Offer</th>
                       <th className="pb-6 font-black text-center">Status</th>
                       <th className="pb-6 pr-4 font-black text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {categories.length > 0 ? categories.map((cat, i) => (
                       <tr key={cat.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-6 pl-4 text-xs font-bold text-gray-300">{i + 1}</td>
                          <td className="py-6 font-bold text-gray-900 uppercase tracking-tighter">{cat.name}</td>
                          <td className="py-6 text-center">
                             <div className="bg-indigo-50 text-indigo-600 text-xs font-black inline-block px-3 py-1 rounded-full uppercase">
                                {cat.offer}% OFF
                             </div>
                          </td>
                          <td className="py-6 text-center">
                             <span className={`w-2 h-2 rounded-full inline-block ${cat.is_listed ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-red-500 shadow-lg shadow-red-200'}`} />
                          </td>
                          <td className="py-6 pr-4 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="p-2"><Edit2 size={14}/></Button>
                                <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:bg-red-50"><Trash2 size={14}/></Button>
                             </div>
                          </td>
                       </tr>
                    )) : (
                       <tr>
                          <td colSpan="5" className="py-20 text-center">
                             <AlertCircle className="mx-auto text-gray-200 mb-2" size={48} />
                             <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No Categories Exist</p>
                          </td>
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
