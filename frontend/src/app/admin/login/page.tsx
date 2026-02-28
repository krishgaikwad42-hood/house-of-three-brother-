"use client";
import { Suspense } from 'react';
import { useState, FormEvent } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield } from 'lucide-react';

function AdminLoginForm() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const { setAuth } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/admin';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const handleRequestOtp = async (e: FormEvent) => {
        e.preventDefault();
        setError(''); setInfo('');
        if (!email) { setError('Email is required'); return; }
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/admin/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.status === 429) {
                setError(data.message);
            } else if (data.success) {
                setStep(2);
                setInfo('A secure code has been dispatched.');
                if (data.devOtp) {
                    setInfo(`DEV MODE — OTP: ${data.devOtp}`);
                }
            } else {
                setError(data.message || 'Failed to initiate login');
            }
        } catch {
            setError('Network error. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) { setError('Enter the 6-digit code'); return; }
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/admin/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (res.status === 403) {
                setError('Access denied. Admin privileges required.');
            } else if (data.success) {
                setAuth(data.data);
                router.push(redirectTo);
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch {
            setError('Network error. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="w-full max-w-[380px]">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 border border-white/20 mb-6">
                        <Shield className="w-5 h-5 text-white/70" />
                    </div>
                    <h1 className="text-white text-xl font-bold uppercase tracking-[0.3em]">H T B</h1>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2">Admin Access</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                    <div className="mb-8">
                        <h2 className="text-white text-sm font-semibold uppercase tracking-[0.2em]">
                            {step === 1 ? 'Enter Credentials' : 'Verify Identity'}
                        </h2>
                        <p className="text-white/40 text-xs mt-1">
                            {step === 1 ? 'Admin access is restricted to authorized personnel only.' : `Code dispatched to ${email}`}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 py-3 px-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider">
                            {error}
                        </div>
                    )}
                    {info && !error && (
                        <div className="mb-6 py-3 px-4 bg-white/5 border border-white/20 text-white/60 text-xs font-mono">
                            {info}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleRequestOtp} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full h-[48px] bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-sm px-0 transition-colors placeholder:text-white/20"
                                    placeholder="admin@example.com"
                                    suppressHydrationWarning
                                    required
                                />
                            </div>
                            <button disabled={loading} className="w-full h-[50px] bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-opacity disabled:opacity-40 mt-4" suppressHydrationWarning>
                                {loading ? 'Verifying...' : 'Request Secure Code'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Secure Code</label>
                                    <button type="button" onClick={() => { setStep(1); setOtp(''); setError(''); setInfo(''); }} className="text-[10px] text-white/30 hover:text-white/60 uppercase tracking-widest transition-colors">Back</button>
                                </div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="w-full h-[48px] bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-2xl tracking-[0.6em] text-center transition-colors"
                                    placeholder="——————"
                                    suppressHydrationWarning
                                    required
                                />
                            </div>
                            <button disabled={loading || otp.length !== 6} className="w-full h-[50px] bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-opacity disabled:opacity-40 mt-4" suppressHydrationWarning>
                                {loading ? 'Authenticating...' : 'Confirm Access'}
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-8">
                    Unauthorized access is strictly prohibited
                </p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-white/30 text-xs uppercase tracking-widest">Loading...</div>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
