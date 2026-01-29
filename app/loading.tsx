export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                <div className="mt-4 text-emerald-800 text-sm font-medium animate-pulse">Carregando...</div>
            </div>
        </div>
    );
}
