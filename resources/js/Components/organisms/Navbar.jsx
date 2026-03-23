import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Heart, User, Search, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '@/Components/atoms/Button';

export default function Navbar() {
  const { auth, cartCount } = usePage().props;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={route('home')} className="text-2xl font-black text-indigo-600 tracking-tighter hover:scale-105 transition-transform">
          TIKTIK<span className="text-gray-900 line-through decoration-indigo-300">NEW</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={route('home')} className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
          <Link href={route('shop')} className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">Clothing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <Heart size={22} />
          </Link>
          <Link href={route('cart.index')} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {auth?.user ? (
            <div className="flex items-center gap-3">
              <Link href={route('profile.show')} className="hidden sm:flex items-center gap-2 group">
                <span className="text-xs font-semibold text-gray-600 group-hover:text-indigo-600 transition-colors">{auth.user.name}</span>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 overflow-hidden">
                  {auth.user.image ? 
                    <img src={`/storage/${auth.user.image}`} className="w-full h-full object-cover" alt="" /> :
                    <User size={16} className="text-indigo-600" />
                  }
                </div>
              </Link>
              <Link href={route('logout')} method="post" as="button" title="Logout" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                <LogOut size={20} />
              </Link>
            </div>
          ) : (
            <Link href={route('login')}>
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
