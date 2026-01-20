export default function ContactosDashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Meus Contactos</h2>
            <p className="text-muted-foreground">Gerencie as mensagens e contactos recebidos.</p>
            <div className="border rounded-lg h-64 flex items-center justify-center bg-white">
                <p className="text-slate-400">Nenhuma mensagem recente.</p>
            </div>
        </div>
    );
}
