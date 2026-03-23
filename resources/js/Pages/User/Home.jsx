import UserLayout from '@/Components/templates/UserLayout';
import { Head, Link } from '@inertiajs/react';
import ProductCard from '@/Components/molecules/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home({ banners, featuredProducts, categories, brands }) {
  return (
    <UserLayout>
      <Head title="Premium Timepieces" />

      {/* Hero Section */}
      <section className="mb-12 sm:mb-20 overflow-hidden rounded-3xl sm:rounded-[3rem] shadow-2xl bg-gray-900 border border-gray-800">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet bg-white/30 w-3 h-3 mx-1 inline-block rounded-full cursor-pointer', bulletActiveClass: 'bg-white w-8 transition-all' }}
          className="h-[400px] sm:h-[600px] w-full"
        >
          {banners?.length > 0 ? (
            banners.map(banner => (
              <SwiperSlide key={banner.id}>
                <div className="relative h-full w-full group">
                  <img src={`/storage/${banner.image}`} alt={banner.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col justify-center items-start p-8 sm:p-20 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent">
                    <h2 className="text-4xl sm:text-7xl font-black text-white leading-none tracking-tighter mb-4 max-w-2xl uppercase">
                      {banner.title}
                    </h2>
                    <p className="text-gray-300 text-lg sm:text-2xl font-semibold mb-8 max-w-xl">Curated high-end fashion for the modern individual.</p>
                    <Link 
                      href={banner.link ?? route('shop')} 
                      className="bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-600/20 active:scale-95"
                    >
                      EXPLORE COLLECTION
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
             <SwiperSlide>
                <div className="relative h-full w-full flex items-center justify-center bg-gray-950">
                  <h2 className="text-white text-4xl font-black uppercase tracking-tighter opacity-20">Premium Clothing</h2>
                </div>
             </SwiperSlide>
          )}
        </Swiper>
      </section>

      {/* Categories Grid */}
      <section className="mb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">The Collections</h3>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Curated masterpieces by category</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 4).map(cat => (
            <Link 
              key={cat.id} 
              href={route('shop', { category: cat.slug })}
              className="relative aspect-square rounded-3xl bg-white border border-gray-100 flex flex-col items-center justify-center group hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
            >
              <div className="p-8 transform group-hover:scale-110 transition-transform duration-500">
                 {/* Placeholder for category icon/image */}
                 <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    {cat.name[0]}
                 </div>
              </div>
              <span className="font-black text-gray-800 uppercase tracking-tighter text-sm group-hover:text-indigo-600 transition-colors uppercase">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
          <div>
             <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Trending Now</h3>
             <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Most coveted timepieces of the season</p>
          </div>
          <Link href={route('shop')} className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform inline-flex items-center gap-2">
            View All Apparel <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brands Slider Placeholder */}
      <section className="bg-white rounded-[3rem] p-12 sm:p-20 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <h4 className="text-center text-gray-400 font-black uppercase tracking-[0.3em] text-xs mb-12">Authorized Retailer</h4>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 items-center opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
           {brands.map(brand => (
             <div key={brand.id} className="flex justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-xl tracking-tighter">{brand.name}</span>
             </div>
           ))}
        </div>
      </section>
    </UserLayout>
  );
}
