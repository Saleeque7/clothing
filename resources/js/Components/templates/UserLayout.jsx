import Navbar from '@/Components/organisms/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UserLayout({ children }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-black text-[#1D9E75] tracking-tighter uppercase italic">PACKPAL</h4>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Premium Carry Store</p>
          </div>
          <div className="flex gap-8 text-sm font-semibold text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
          <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest">
            © {new Date().getFullYear()} PACKPAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar 
        theme="dark"
        toastClassName="p-4 rounded-xl shadow-2xl bg-gray-900 border border-gray-800 text-white font-semibold text-sm"
      />
    </div>
  );
}
