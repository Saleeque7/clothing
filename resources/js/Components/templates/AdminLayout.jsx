import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogOut, ChevronLeft, Menu, Bell, Search } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { navList, allowedUsers } from '@/constants';

const SidebarItem = ({ href, icon, children, active, collapsed }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
      active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    } ${collapsed ? 'justify-center mx-2' : 'mx-3'}`}
  >
    <FontAwesomeIcon icon={icon} className={`w-4 h-4 flex-shrink-0 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
    {!collapsed && <span className="font-semibold text-[13px] tracking-tight">{children}</span>}
  </Link>
);

export default function AdminLayout({ children }) {
  const { props, url } = usePage();
  const { flash, auth } = props;
  const admin = auth.admin;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash]);

  const filteredNav = navList.filter(item => {
     const pageKey = item.text.toLowerCase().replace(' management', '').replace(' ', '');
     const permissions = allowedUsers[pageKey === 'salesreport' ? 'salesReport' : pageKey];
     return !permissions || permissions.includes(admin?.role_id);
  });

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900 font-sans antialiased">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Sidebar - Clean, Structured */}
      <aside 
        className={`bg-white border-r border-slate-200 flex flex-col pt-6 pb-4 sticky top-0 h-screen transition-all duration-300 z-20 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`flex items-center mb-8 px-6 ${collapsed ? 'justify-center' : 'justify-between'}`}>
           {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">T</div>
                <span className="font-bold text-slate-900 tracking-tight text-lg">Staff Portal</span>
              </div>
           )}
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all border border-slate-100"
           >
             {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
           </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1 no-scrollbar">
          {filteredNav.map((item, index) => (
             <SidebarItem 
               key={index}
               href={item.href} 
               icon={item.icon} 
               collapsed={collapsed}
               active={url === item.href || (item.href !== '/admin/dashboard' && url.startsWith(item.href))}
             >
               {item.text}
             </SidebarItem>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
          {/* Top Bar - Minimal horizontal anchor */}
          <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-end">
              <div className="flex items-center gap-4">
                  <div className="pr-4 border-r border-slate-100">
                      <div className="px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200 shadow-sm">
                          <p className="text-xs font-bold text-slate-700 tracking-tight">{admin?.name || 'Authorized Staff'}</p>
                      </div>
                  </div>

                  <Link 
                    method="post" 
                    as="button" 
                    href={route('admin.logout')}
                    className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </Link>
              </div>
          </header>

          {/* Main Content Area - Better Padding and Hierarchy */}
          <main className="p-10 max-w-[1600px]">
            {children}
          </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        body { background-color: #fcfcfd; }
      `}} />
    </div>
  );
}
