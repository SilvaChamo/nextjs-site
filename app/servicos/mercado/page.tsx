"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ShoppingBag, TrendingUp, BarChart3, ArrowUpRight, Tags, ShieldCheck, ArrowRight } from "lucide-react";

export default function MercadoPage() {
    const marketInfo = [
        {
            title: "Cotações do Dia",
            description: "Acompanhe os preços médios do milho, feijão e outros produtos nas principais praças nacionais.",
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            val: "+5.2%"
        },
        {
            title: "Ofertas de Venda",
            description: "Explore anúncios de produtores que procuram escoar grandes quantidades de produção.",
            icon: Tags,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
            val: "1.2k+"
        },
        {
            title: "Garantia de Negócio",
            description: "Transações seguras e monitoradas para garantir que o pagamento e a entrega ocorram sem falhas.",
            icon: ShieldCheck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            val: "100%"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Compra & Venda"
                icon={ShoppingBag}
                backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Mercado", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                O mercado agrário com <span className="text-[#f97316]">transparência e segurança.</span>
                            </h2>
                            <div className="space-y-4 text-slate-500 font-medium leading-relaxed">
                                <p>
                                    Bem-vindo ao maior hub de comercialização agrícola de Moçambique. Nossa plataforma elimina intermediários desnecessários, conectando quem produz directamente a quem compra.
                                </p>
                                <p>
                                    Aqui, os produtores encontram <strong>liquidez imediata</strong> para suas colheitas, enquanto grandes compradores garantem acesso a produtos de qualidade com rastreabilidade. Oferecemos cotações em tempo real e um ambiente seguro para negociações.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Info Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {marketInfo.map((item, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                                        <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#f97316] transition-colors">{item.title}</h3>
                                        <span className="text-2xl font-black text-slate-900">{item.val}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">{item.description}</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors pt-4">
                                Ver Detalhes <ArrowUpRight className="h-3 w-3" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Como Funciona */}
                <div className="bg-white rounded-3xl p-10 md:p-12 mb-20 border border-slate-100 shadow-sm">
                    <h3 className="text-3xl font-black text-slate-800 mb-12 text-center">Como negociar na plataforma?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-slate-100 -z-0"></div>

                        {/* Step 1 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white border-4 border-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-3xl font-black">1</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Registe-se Grátis</h4>
                            <p className="text-slate-500 text-sm">Crie a sua conta de produtor ou comprador em menos de 2 minutos.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white border-4 border-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-3xl font-black">2</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Publique ou Pesquise</h4>
                            <p className="text-slate-500 text-sm">Insira seus produtos com fotos e preços, ou busque o que precisa.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-3xl font-black">3</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2">Negociação Segura</h4>
                            <p className="text-slate-500 text-sm">Feche negócio directamente e utilize nossa rede logística para entrega.</p>
                        </div>
                    </div>
                </div>

                {/* Diferenciais */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">Verificação de Qualidade</h4>
                                <p className="text-slate-500 mt-2">Todos os produtores passam por um processo de verificação para garantir a qualidade dos produtos ofertados.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <BarChart3 className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">Preços Justos</h4>
                                <p className="text-slate-500 mt-2">Nossa ferramenta de cotação ajuda a definir preços competitivos baseados na média nacional.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">Mix Diversificado</h4>
                                <p className="text-slate-500 mt-2">De hortícolas frescas a grãos e tubérculos. Encontre tudo o que o campo produz em um só lugar.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <h4 className="font-black text-slate-800 mb-6 uppercase tracking-wider text-sm">Categorias em Alta</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Milho", "Feijão Nhemba", "Tomate", "Cebola", "Batata Reno", "Arroz", "Mandioca", "Soja", "Gergelim", "Castanha"].map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 font-bold text-xs hover:border-[#f97316] hover:text-[#f97316] cursor-pointer transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#f97316] rounded-[12px] p-12 text-left relative overflow-hidden shadow-2xl shadow-orange-500/20 text-white">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black leading-tight">Comece a vender agora!</h3>
                            <p className="text-orange-50 font-medium">Publique o seu stock e conecte-se com centenas de compradores em todo o país.</p>
                        </div>
                        <button className="px-12 py-4 bg-white text-[#f97316] rounded-md font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 shadow-xl transition-all">
                            Anunciar Produto
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
