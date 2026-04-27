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
        <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center p-6 selection:bg-indigo-500 selection:text-white">
            <Head title={isAdminPortal ? "Staff Portal" : "Member Login"} />

            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 mb-4 animate-bounce">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                        {isAdminPortal ? <><span className="text-indigo-500">ADMIN</span> PANEL</> : <><span className="text-indigo-500">MEMBER</span> ACCESS</>}
                    </h1>
                    <p className="text-slate-400 font-medium text-sm">Enter your credentials to access the {isAdminPortal ? 'dashboard' : 'your account'}</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-slate-950/50 border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white font-semibold placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input 
                                    type="password" 
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-slate-950/50 border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white font-semibold placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.password}</p>}
                        </div>

                        <div className="flex items-center ml-4">
                            <input 
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                            />
                            <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Keep me authenticated</span>
                        </div>

                        <Button 
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all text-sm"
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
