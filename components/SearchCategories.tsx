import { ArrowRight } from "lucide-react";

export function SearchCategories() {
    return (
        <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Buscas por Categoria</h3>
            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-700">Cereais</span>
                        <span className="text-[#3a3f47]">42%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[42%] rounded-full"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-700">Leguminosas</span>
                        <span className="text-[#3a3f47]">28%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[28%] rounded-full"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-700">Oleaginosas</span>
                        <span className="text-[#3a3f47]">18%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[18%] rounded-full"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-700">Tubérculos</span>
                        <span className="text-[#3a3f47]">12%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-[12%] rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
