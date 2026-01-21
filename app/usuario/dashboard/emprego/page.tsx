import { ListingCard } from "@/components/ListingCard";

export default function EmpregoPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Vagas de Emprego</h2>
                    <p className="text-slate-500">Encontre talentos ou oportunidades no setor.</p>
                </div>
            </div>

            <div className="space-y-4">
                <ListingCard
                    title="Engenheiro Agrónomo"
                    description="Responsável pelo planejamento e execução de projetos agrícolas em grande escala na província de Manica."
                    category="Técnico"
                    href="#"
                    badgeColor="purple"
                />
                <ListingCard
                    title="Operador de Máquinas Pesadas"
                    description="Operação de tratores e colheitadeiras com experiência mínima de 2 anos."
                    category="Operacional"
                    href="#"
                    badgeColor="orange"
                />
                <ListingCard
                    title="Gestor de Fazenda"
                    description="Supervisão geral de operações, gestão de equipes e controle de insumos."
                    category="Gestão"
                    href="#"
                    badgeColor="blue"
                />
            </div>
        </div>
    );
}
