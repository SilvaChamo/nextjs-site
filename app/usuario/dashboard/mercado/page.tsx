import { ListingCard } from "@/components/ListingCard";

export default function MercadoPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Mercado Agrícola</h2>
                    <p className="text-slate-500">Compre e venda produtos diretamente na plataforma.</p>
                </div>
            </div>

            <div className="space-y-4">
                <ListingCard
                    title="Terra Nova Agro Solutions"
                    description="Specializing in precision irrigation systems and soil analysis for large-scale crops."
                    category="Sustainable Farming"
                    href="#"
                    badgeColor="green"
                />
                <ListingCard
                    title="GreenHarvest Machinery"
                    description="Heavy-duty tractors and automated harvesting solutions for modern agriculture."
                    category="Equipment & Tools"
                    href="#"
                    badgeColor="orange"
                />
                <ListingCard
                    title="MozExports Logistics"
                    description="Connecting local farmers to international markets with cold-chain logistics."
                    category="Export & Distribution"
                    href="#"
                    badgeColor="blue"
                />
            </div>
        </div>
    );
}
