import UserLayout from '@/Components/templates/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import ProductCard from '@/Components/molecules/ProductCard';
import { Filter, Search, ChevronDown, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Shop({ products, categories, brands, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleFilter = (key, value) => {
    router.get(route('shop'), { ...filters, [key]: value }, { preserveState: true });
  };

  return (
    <UserLayout>
      <Head title="Premium Clothing Collection" />

      <div className="flex flex-col gap-12">
        {/* Header Area */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
           <div className="max-w-xl">
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-4">
                 Our <span className="text-indigo-600">Collection</span>
              </h1>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Curated high-end fashion for the modern individual</p>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search apparel..." 
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onBlur={() => handleFilter('search', search)}
                 />
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           {/* Sidebar Filters */}
           <aside className="lg:col-span-1 flex flex-col gap-10 sticky top-28 h-fit">
              <div>
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Filter size={16} className="text-indigo-600" /> Categories
                 </h3>
                 <div className="flex flex-col gap-2">
                    <button 
                       onClick={() => handleFilter('category', null)}
                       className={`text-left py-2 px-4 rounded-xl text-sm font-bold uppercase tracking-tighter transition-all ${!filters.category ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                       All Outfits
                    </button>
                    {categories.map(cat => (
                       <button 
                          key={cat.id}
                          onClick={() => handleFilter('category', cat.slug)}
                          className={`text-left py-2 px-4 rounded-xl text-sm font-bold uppercase tracking-tighter transition-all ${filters.category === cat.slug ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}
                       >
                          {cat.name}
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <LayoutGrid size={16} className="text-indigo-600" /> Luxury Brands
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                       <button 
                          key={brand.id}
                          onClick={() => handleFilter('brand', brand.slug)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filters.brand === brand.slug ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-100 hover:text-indigo-600'}`}
                       >
                          {brand.name}
                       </button>
                    ))}
                 </div>
              </div>
           </aside>

           {/* Product Grid */}
           <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-10 text-xs font-black text-gray-400 uppercase tracking-widest">
                 <span>Showing {products.from ?? 0}–{products.to ?? 0} of {products.total} Pieces</span>
                 <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                    Sort by: Latest <ChevronDown size={14} />
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                 {products.data.length > 0 ? (
                    products.data.map(product => (
                       <ProductCard key={product.id} product={product} />
                    ))
                 ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-gray-100 border-dashed">
                       <p className="text-gray-300 font-bold uppercase tracking-widest">No garments match your criteria</p>
                    </div>
                 )}
              </div>

              {/* Pagination */}
              {products.last_page > 1 && (
                 <div className="mt-20 flex justify-center gap-2">
                    {products.links.map((link, i) => (
                       <Link
                          key={i}
                          href={link.url || '#'}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                          className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                             link.active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white text-gray-400 hover:bg-gray-50'
                          } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                       />
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </UserLayout>
  );
}
