import { ListingCard } from "@/components/ListingCard";

export default function FormacaoPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Formação e Capacitação</h2>
                    <p className="text-slate-500">Cursos e workshops para o seu desenvolvimento.</p>
                </div>
            </div>

            <div className="space-y-4">
                <ListingCard
                    title="Agricultura de Precisão"
                    description="Curso intensivo sobre uso de drones e sensores para otimização de colheitas."
                    category="Curso Online"
                    href="#"
                    badgeColor="green"
                />
                <ListingCard
                    title="Gestão Financeira para Agronegócios"
                    description="Workshop prático sobre fluxo de caixa, crédito e investimentos rurais."
                    category="Workshop"
                    href="#"
                    badgeColor="blue"
                />
                <ListingCard
                    title="Técnicas de Irrigação Sustentável"
                    description="Aprenda métodos modernos para economizar água e aumentar a produtividade."
                    category="Técnico"
                    href="#"
                    badgeColor="purple"
                />
            </div>
        </div>
    );
}
