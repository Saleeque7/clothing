import { useForm, Head } from '@inertiajs/react';
import { Mail, Lock, LogIn, ShieldAlert } from 'lucide-react';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] selection:bg-indigo-500 selection:text-white px-4">
            <Head title="Admin Login" />
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-500/20 mb-6 group transition-transform hover:scale-110">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2 italic">Admin Panel</h1>
                    <p className="text-slate-400 text-sm font-medium tracking-wide">Enter your credentials to access the dashboard</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        {errors.email && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold animate-pulse">
                                <ShieldAlert size={16} />
                                {errors.email}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 font-medium"
                                    placeholder="admin@tiktiknew.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded bg-white/5 border-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-xs font-bold text-slate-400">Keep me authenticated</span>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
                        >
                            {processing ? 'Authorizing...' : 'Log In to Console'}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <a href={route('home')} className="text-xs font-bold text-slate-500 hover:text-white transition-colors tracking-widest uppercase inline-flex items-center gap-2">
                        ← Back to Storefront
                    </a>
                </div>
            </div>
        </div>
    );
}
