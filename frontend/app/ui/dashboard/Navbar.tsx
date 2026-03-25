import NavLinks from "@/app/ui/dashboard/nav-links";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 flex h-16 items-center justify-between px-6 py-4 md:h-20 md:px-10bg-retro-bg/80 backdrop-blur-md border-b border-retro-ink/5 shadow-sm">
            <Link href="/">
                <div className="text-retro-ink font-extrabold text-2xl tracking-tighter cursor-pointer">
                    MY STORE
                </div>
            </Link>
            <nav className="flex items-center gap-6">
                <NavLinks />
            </nav>
        </div>
    );
}