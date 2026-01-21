import { ListingCard } from "@/components/ListingCard";

import { DashboardPageHeader } from "@/components/DashboardPageHeader";

export default function ContactosPage() {
    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Contactos e Mensagens"
                description="Gerencie suas conversas com compradores e parceiros."
            />

            <div className="space-y-4">
                <ListingCard
                    title="Interesse em Milho Branco"
                    description="Olá, gostaria de saber se vocês têm disponibilidade para entrega de 5 toneladas em Nampula..."
                    category="Nova Mensagem"
                    href="#"
                    badgeColor="blue"
                />
                <ListingCard
                    title="Parceria de Transporte"
                    description="Somos uma empresa de logística e gostaríamos de propor uma parceria para transporte de..."
                    category="Proposta"
                    href="#"
                    badgeColor="purple"
                />
            </div>
        </div>
    );
}
