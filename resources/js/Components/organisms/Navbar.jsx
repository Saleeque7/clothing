import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Heart, User, Search, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from 'clsx';
import Button from '@/Components/atoms/Button';
import { memberNavList } from '@/constants';

export default function Navbar() {
  const { auth, cartCount, url } = usePage().props;
  const user = auth.user;
  const isAdmin = user?.is_admin;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={route('home')} className="hover:scale-105 transition-transform flex items-center">
          <img src="/branding/logo.svg" alt="PackPal" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {memberNavList.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={clsx(
                "text-sm font-bold transition-colors flex items-center gap-2",
                url === item.href ? "text-[#1D9E75]" : "text-gray-600 hover:text-[#085041]"
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="w-4 h-4 opacity-70" />
              {item.text}
            </Link>
          ))}
          {/* Portal link removed for clean public view */}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <Heart size={22} />
          </Link>
          <Link href={route('cart.index')} className="p-2 text-gray-400 hover:text-[#085041] hover:bg-[#E1F5EE] rounded-full transition-all relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EF9F27] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAdmin && user && (
            <div className="flex items-center gap-3">
              <Link href={route('profile.show')} className="hidden sm:flex items-center gap-2 group">
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#1D9E75] transition-colors">{user.name}</span>
                <div className="w-8 h-8 rounded-full bg-[#E1F5EE] flex items-center justify-center border border-[#5DCAA5]/20 overflow-hidden">
                  {user.image ? 
                    <img src={`/storage/${user.image}`} className="w-full h-full object-cover" alt="" /> :
                    <User size={16} className="text-[#1D9E75]" />
                  }
                </div>
              </Link>
              <Link 
                href={route('logout')} 
                method="post" 
                as="button" 
                title="Logout" 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <LogOut size={20} />
              </Link>
            </div>
          )}

          {isAdmin && (
            <div className="flex items-center gap-3">
              <Link 
                href={route('admin.logout')} 
                method="post" 
                as="button" 
                title="Logout" 
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <LogOut size={20} />
              </Link>
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link href={route('register')} className="text-sm font-bold text-gray-500 hover:text-[#085041] transition-colors px-2 py-1">
                Register
              </Link>
              <Link href={route('login')}>
                <Button size="sm" className="bg-[#1D9E75] hover:bg-[#085041] text-white shadow-lg shadow-[#1D9E75]/20">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
