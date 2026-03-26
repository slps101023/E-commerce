export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
            <div className="w-24 h-24 bg-retro-ink/10 rounded-full mb-6"></div>
            <div className="h-6 w-48 bg-retro-ink/10 rounded mb-4"></div>
            <div className="h-4 w-64 bg-retro-ink/10 rounded"></div>
        </div>
    );
}