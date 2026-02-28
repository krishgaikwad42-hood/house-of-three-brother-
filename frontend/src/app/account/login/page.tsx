"use client";
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setAuth } = useAuthStore();
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const handleRequestOtp = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Email is required');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.success) {
                setStep(2);
                if (data.devOtp) {
                    // For dev environment auto-fill so user knows what OTP is generated
                    console.log('DEV OTP:', data.devOtp);
                }
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError('OTP must be exactly 6 digits');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Receive httpOnly cookie
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();

            if (data.success) {
                setAuth(data.data);
                // Redirect based on role
                if (data.data.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/shop');
                }
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#fafafa] px-4 fade-in-section">
            <div className="max-w-[400px] w-full bg-white p-10 md:p-14 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] border border-[#EAEAEA]">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#111] mb-2">
                        Client Login
                    </h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {step === 1 ? 'Unlock your account via Email' : 'Enter the secure code sent to you'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs text-center border border-red-100 uppercase tracking-wider font-semibold">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form className="space-y-6" onSubmit={handleRequestOtp}>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[50px] border-b border-[#EAEAEA] bg-transparent focus:border-black outline-none transition-colors text-sm px-2"
                                placeholder="Enter your email"
                                suppressHydrationWarning
                                required
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="w-full h-[56px] bg-black text-white uppercase tracking-[0.2em] text-[11px] font-bold mt-8 transition-opacity hover:opacity-85 disabled:opacity-50"
                        >
                            {loading ? 'Sending Code...' : 'Send Secure Code'}
                        </button>
                    </form>
                ) : (
                    <form className="space-y-6" onSubmit={handleVerifyOtp}>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                    Secure Code (OTP)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => { setStep(1); setOtp(''); setError(''); }}
                                    className="text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
                                >
                                    Change Email
                                </button>
                            </div>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // numerical only
                                className="w-full h-[50px] border-b border-[#EAEAEA] bg-transparent focus:border-black outline-none transition-colors text-lg tracking-[0.5em] text-center"
                                placeholder="------"
                                suppressHydrationWarning
                                required
                            />
                        </div>
                        <button
                            disabled={loading || otp.length !== 6}
                            className="w-full h-[56px] bg-black text-white uppercase tracking-[0.2em] text-[11px] font-bold mt-8 transition-opacity hover:opacity-85 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Sign In'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
