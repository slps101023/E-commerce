export default function RegisterBackgroup() {
    return (
        <div className="hidden md:flex md:w-5/12 bg-retro-ink p-12 lg:p-16 flex-col justify-between text-retro-bg relative overflow-hidden">
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    {/* 這裡改成更細緻的菱形符號 */}
                    <div className="w-1.5 h-1.5 border border-retro-bg rotate-45 opacity-80" />
                    <span className="text-[9px] font-black tracking-[0.6em] uppercase opacity-40">
                        Archive Membership
                    </span>
                </div>
                <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85]">
                    JOIN THE <br />
                    <span className="opacity-20 italic">ARCHIVE</span>
                </h1>
            </div>

            <div className="relative z-10 space-y-10">
                <p className="max-w-xs text-[13px] font-medium leading-relaxed opacity-60 tracking-tight italic">
                    "Access your curated selection of daily pieces and historical archives. Designed for the modern collector."
                </p>

                <div className="flex gap-16 text-[9px] font-black tracking-[0.4em] uppercase opacity-30">
                    <div className="space-y-1">
                        <p className="opacity-50">Version</p>
                        <p className="text-retro-bg opacity-100 italic">2026.01</p>
                    </div>
                    <div className="space-y-1">
                        <p className="opacity-50">Access</p>
                        <p className="text-retro-bg opacity-100 italic">Verified</p>
                    </div>
                </div>
            </div>
        </div>
    );
}