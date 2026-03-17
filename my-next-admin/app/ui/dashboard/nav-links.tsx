'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Products', href: '/dashboard/Product' },
    {
        name: 'Cart',
        href: '/dashboard/Cart',

    },
    { name: 'Login', href: '/dashboard/Login', },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        // 使用 clsx 來動態管理 Class
                        className={clsx(
                            'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300',
                            'text-retro-slate hover:text-retro-ink hover:bg-white/50',
                            {
                                'bg-retro-ink text-retro-bg shadow-md': isActive,
                            }
                        )}
                    >
                        {/* 你可以在這裡放 Icon */}
                        <p className="">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}