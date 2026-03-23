import AdminLayout from '@/Components/templates/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/atoms/Button';
import { Users, Search, Ban, CheckCircle, Mail } from 'lucide-react';

export default function Index({ users }) {
  const { post } = useForm();

  const toggleBlock = (user) => {
    const routeName = user.is_blocked ? 'admin.users.unblock' : 'admin.users.block';
    post(route(routeName, user.id));
  };

  return (
    <AdminLayout>
      <Head title="Customer Management" />

      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
           <div className="flex gap-4 items-center">
              <Users className="text-indigo-600" />
              <span className="font-black text-gray-950 uppercase tracking-tighter text-lg">{users.total} Registered Customers</span>
           </div>
           
           <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 placeholder="Search Customers..." 
                 className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all font-sans"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full">
              <thead>
                 <tr className="text-left border-b border-gray-50 uppercase tracking-widest text-[10px] font-black text-gray-400">
                    <th className="pb-6 pl-4 font-black">Customer Details</th>
                    <th className="pb-6 text-center font-black">Status</th>
                    <th className="pb-6 text-center font-black">Joined</th>
                    <th className="pb-6 pr-4 text-right font-black">Account Safety</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {users.data.map((user) => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                       <td className="py-6 pl-4">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 font-bold border-2 border-white shadow-sm overflow-hidden">
                                {user.image ? 
                                    <img src={`/storage/${user.image}`} className="w-full h-full object-cover" alt="" /> : 
                                    user.name[0]
                                }
                             </div>
                             <div>
                                <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                                <div className="flex items-center gap-1.5 text-gray-400 font-semibold text-xs mt-0.5">
                                   <Mail size={12} />
                                   {user.email}
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="py-6 text-center">
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                            user.is_blocked ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.is_blocked ? 'bg-red-500' : 'bg-green-500'}`} />
                            {user.is_blocked ? 'Suspended' : 'Verified Member'}
                          </div>
                       </td>
                       <td className="py-6 text-center text-xs font-bold text-gray-400 uppercase tracking-tight">
                          {new Date(user.created_at).toLocaleDateString('en-GB')}
                       </td>
                       <td className="py-6 pr-4 text-right">
                          <Button 
                             onClick={() => toggleBlock(user)}
                             variant="ghost" 
                             size="sm" 
                             className={`rounded-xl px-4 py-2 border font-black text-[10px] uppercase tracking-[0.05em] transition-all duration-300 ${
                               user.is_blocked ? 'text-green-600 border-green-100 hover:bg-green-50' : 'text-red-600 border-red-100 hover:bg-red-50'
                             }`}
                          >
                             {user.is_blocked ? (<><CheckCircle size={14} className="mr-2"/> Restore Access</>) : (<><Ban size={14} className="mr-2"/> Suspend</>)}
                          </Button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </AdminLayout>
  );
}
