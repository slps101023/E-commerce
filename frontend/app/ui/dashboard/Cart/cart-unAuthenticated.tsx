import Navbar from '@/app/ui/dashboard/Navbar';
import Link from 'next/link';

export default function CartUnAuthenticated() {
    return (
        <main>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">

                <div className="w-32 h-32 mb-8 text-retro-slate opacity-50">
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-black text-retro-ink mb-4 tracking-wide">
                    PLEASE LOG IN FIRST
                </h1>

                <p className="text-retro-slate mb-8 max-w-md">
                    登入後即可查看您的購物車。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
                    <Link
                        href="/dashboard/Login"
                        className="px-8 py-3 bg-retro-ink text-retro-bg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg text-center"
                    >
                        Log In
                    </Link>

                    <Link
                        href="/dashboard/Register"
                        className="px-8 py-3 bg-transparent border-2 border-retro-ink text-retro-ink font-bold rounded-full hover:bg-retro-ink/5 transition-colors duration-300 text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </main>
    );
}