
export default function LoginBackgroup() {
    return (
        <div className="hidden md:flex md:w-5/12 bg-retro-ink p-12 lg:p-16 flex-col justify-between text-retro-bg relative overflow-hidden">
            {/* 裝飾背景 */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 border border-retro-bg rotate-45 opacity-80" />
                    <span className="text-[9px] font-black tracking-[0.6em] uppercase opacity-40">
                        Archive Core
                    </span>
                </div>
                <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85]">
                    ACCESS <br />
                    <span className="opacity-20 italic">CORE</span>
                </h1>
            </div>

            <div className="relative z-10 space-y-10">
                <p className="max-w-xs text-[13px] font-medium leading-relaxed opacity-60 tracking-tight italic">
                    "Your daily curated selection starts here. Please provide your unique identification credentials."
                </p>

                {/* 系統狀態徽章 */}
                <div className="flex items-center gap-3 bg-white/5 w-max px-5 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-90">Systems Online</span>
                </div>

                <div className="flex gap-16 text-[9px] font-black tracking-[0.4em] uppercase opacity-30">
                    <div className="space-y-1">
                        <p className="opacity-50">Identity</p>
                        <p className="text-retro-bg opacity-100 italic">Encrypted</p>
                    </div>
                    <div className="space-y-1">
                        <p className="opacity-50">Terminal</p>
                        <p className="text-retro-bg opacity-100 italic">V2026.01</p>
                    </div>
                </div>
            </div>
        </div>
    );
}