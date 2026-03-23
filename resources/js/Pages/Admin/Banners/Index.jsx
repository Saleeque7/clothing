import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import { Image, Trash2, Eye, EyeOff, Plus, Link as LinkIcon } from 'lucide-react';

export default function Index({ banners }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    link: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.banners.store'), {
      onSuccess: () => reset()
    });
  };

  const handleToggle = (id) => {
    post(route('admin.banners.toggle', id));
  };

  return (
    <AdminLayout>
      <Head title="Banner Management" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit">
           <div className="flex items-center gap-3 mb-8">
              <Plus className="text-indigo-600" />
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">New Hero Slide</h3>
           </div>
           
           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input 
                label="Heading Label" 
                placeholder="e.g. Summer Collection" 
                value={data.title} 
                onChange={e => setData('title', e.target.value)}
                error={errors.title}
              />
              <Input 
                label="Redirect URL" 
                placeholder="/shop?category=shirts" 
                value={data.link} 
                onChange={e => setData('link', e.target.value)}
                error={errors.link}
              />
              <div className="w-full h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4">
                 <Image className="text-gray-300 mb-2" />
                 <input 
                    type="file" 
                    onChange={e => setData('image', e.target.files[0])}
                    className="text-xs font-bold text-gray-400"
                 />
              </div>
              <Button type="submit" loading={processing} className="w-full mt-4">PUBLISH BANNER</Button>
           </form>
        </div>

        <div className="xl:col-span-2 flex flex-col gap-6">
           {banners.map(banner => (
             <div key={banner.id} className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm transition-all hover:shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100">
                   <img src={`/storage/${banner.image}`} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                   <h4 className="font-black text-gray-900 uppercase tracking-tighter text-lg">{banner.title}</h4>
                   <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                      <LinkIcon size={12}/> {banner.link || 'No redirect link'}
                   </div>
                </div>
                <div className="flex items-center gap-2 md:self-center">
                   <Button 
                      onClick={() => handleToggle(banner.id)} 
                      variant="ghost" 
                      className={`p-3 rounded-xl border ${banner.is_active ? 'text-green-600 bg-green-50 border-green-100' : 'text-gray-400 bg-gray-50 border-gray-100'}`}
                   >
                      {banner.is_active ? <Eye size={18}/> : <EyeOff size={18}/>}
                   </Button>
                   <Button 
                      variant="ghost" 
                      className="p-3 text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent rounded-xl"
                   >
                      <Trash2 size={18}/>
                   </Button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </AdminLayout>
  );
}
