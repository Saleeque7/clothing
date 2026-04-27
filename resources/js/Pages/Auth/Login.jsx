import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, ChevronLeft } from 'lucide-react';
import Button from '@/Components/atoms/Button';

export default function Login({ status, canResetPassword, isAdminPortal = false }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // Standardized route names for Ziggy compatibility
        const loginRoute = window.location.pathname.startsWith('/admin') ? 'admin.login' : 'login';
        post(route(loginRoute));
    };

    return (
        <div className="min-h-screen bg-[#085041] flex flex-col justify-center items-center p-6 selection:bg-[#1D9E75] selection:text-white">
            <Head title={isAdminPortal ? "Staff Portal | PackPal" : "Member Login | PackPal"} />

            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl shadow-[#1D9E75]/20 mb-4 overflow-hidden p-3 animate-pulse">
                        <img src="/branding/favicon.svg" alt="PackPal" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                        {isAdminPortal ? <><span className="text-[#EF9F27]">ADMIN</span> PANEL</> : <><span className="text-[#EF9F27]">MEMBER</span> ACCESS</>}
                    </h1>
                    <p className="text-[#5DCAA5] font-medium text-sm">Enter your credentials to access {isAdminPortal ? 'the dashboard' : 'your account'}</p>
                </div>

                <div className="bg-[#053d32]/50 backdrop-blur-xl border border-[#1D9E75]/20 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5DCAA5]/70 ml-4">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5DCAA5]/50 group-focus-within:text-[#EF9F27] transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-[#042b23]/50 border-[#1D9E75]/10 rounded-2xl pl-12 pr-4 py-4 text-white font-semibold placeholder:text-[#5DCAA5]/30 focus:ring-2 focus:ring-[#EF9F27] focus:border-transparent transition-all outline-none"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5DCAA5]/70 ml-4">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5DCAA5]/50 group-focus-within:text-[#EF9F27] transition-colors" size={20} />
                                <input 
                                    type="password" 
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-[#042b23]/50 border-[#1D9E75]/10 rounded-2xl pl-12 pr-4 py-4 text-white font-semibold placeholder:text-[#5DCAA5]/30 focus:ring-2 focus:ring-[#EF9F27] focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.password}</p>}
                        </div>

                        <div className="flex items-center ml-4">
                            <input 
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="rounded bg-[#042b23] border-[#1D9E75]/20 text-[#1D9E75] focus:ring-[#1D9E75] focus:ring-offset-[#085041]"
                            />
                            <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-[#5DCAA5]/70">Keep me authenticated</span>
                        </div>

                        <Button 
                            disabled={processing}
                            className="w-full bg-[#1D9E75] hover:bg-[#158060] text-white rounded-2xl py-4 font-black uppercase tracking-widest shadow-xl shadow-[#1D9E75]/20 active:scale-95 transition-all text-sm border border-[#5DCAA5]/20"
                        >
                            {isAdminPortal ? "Log In To Console" : "Access Account"}
                        </Button>
                    </form>
                </div>

                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                        <ChevronLeft size={14} /> Back to Storefront
                    </Link>
                </div>
            </div>
        </div>
    );
}
