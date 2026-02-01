"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { GraduationCap, Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle, User } from "lucide-react";
import { notFound } from "next/navigation";
import React, { useState, use } from "react";
import { TrainingEnrollmentForm } from "@/components/TrainingEnrollmentForm";

// Training data (in a real app, this would come from a database)
const trainingsData: Record<string, any> = {
    "agricultura-precisao": {
        title: "Agricultura de Precisão com Drones",
        date: "15-17 Fevereiro 2025",
        duration: "3 dias (24 horas)",
        location: "Maputo, Moçambique",
        venue: "Centro de Formação Base Agro Data, Av. Julius Nyerere",
        instructor: {
            name: "Eng. Carlos Matola",
            title: "Especialista em Agricultura de Precisão",
            bio: "Engenheiro Agrónomo com mais de 10 anos de experiência em tecnologias de precisão. Mestrado em Agricultura Digital pela Universidade Eduardo Mondlane. Consultor certificado em sistemas de drones agrícolas.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        description: "Esta formação intensiva oferece conhecimentos práticos e teóricos sobre o uso de drones na agricultura moderna. Os participantes aprenderão a operar drones, interpretar dados aéreos e aplicar tecnologias de precisão para optimizar a produção agrícola.",
        topics: [
            "Fundamentos de agricultura de precisão",
            "Operação e manutenção de drones agrícolas",
            "Captura e processamento de imagens aéreas",
            "Análise de dados multiespectrais",
            "Mapeamento de culturas e detecção de pragas",
            "Aplicação prática em campo"
        ],
        requirements: [
            "Conhecimentos básicos de agronomia",
            "Computador portátil (será fornecido software)",
            "Interesse em tecnologias agrícolas"
        ],
        includes: [
            "Material didáctico completo",
            "Certificado de participação",
            "Almoços e coffee breaks",
            "Acesso a drones para prática",
            "Suporte pós-formação (30 dias)"
        ],
        price: "15.000 MT",
        spots: "12 vagas disponíveis"
    },
    "gestao-financeira": {
        title: "Gestão Financeira para Agro-Negócios",
        date: "22-23 Fevereiro 2025",
        duration: "2 dias (16 horas)",
        location: "Beira, Moçambique",
        venue: "Hotel Tivoli, Sala de Conferências",
        instructor: {
            name: "Dra. Ana Santos",
            title: "Consultora Financeira Agrícola",
            bio: "Doutorada em Economia Agrícola com especialização em gestão financeira. 15 anos de experiência em consultoria para empresas do sector agrário. Autora de diversos artigos sobre finanças rurais.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        description: "Aprenda a gerir as finanças do seu agro-negócio de forma profissional. Esta formação cobre desde o básico de contabilidade até estratégias avançadas de investimento e gestão de fluxo de caixa.",
        topics: [
            "Fundamentos de contabilidade agrícola",
            "Gestão de fluxo de caixa",
            "Análise de custos de produção",
            "Planeamento financeiro e orçamentação",
            "Acesso a crédito e financiamento",
            "Ferramentas digitais de gestão financeira"
        ],
        requirements: [
            "Experiência em gestão de negócios (preferencial)",
            "Calculadora",
            "Vontade de aprender"
        ],
        includes: [
            "Manual de gestão financeira",
            "Planilhas Excel personalizadas",
            "Certificado de participação",
            "Refeições incluídas",
            "Consultoria de acompanhamento (60 dias)"
        ],
        price: "12.000 MT",
        spots: "15 vagas disponíveis"
    },
    "marketing-digital": {
        title: "Marketing Digital para Produtos Agrícolas",
        date: "1-2 Março 2025",
        duration: "2 dias (16 horas)",
        location: "Nampula, Moçambique",
        venue: "Centro de Negócios Nampula Plaza",
        instructor: {
            name: "Lic. João Macamo",
            title: "Especialista em Marketing Digital",
            bio: "Licenciado em Marketing com certificações internacionais em Marketing Digital. Fundador de agência especializada em agro-negócios. Ajudou mais de 50 empresas agrícolas a expandirem online.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        },
        description: "Descubra como promover os seus produtos agrícolas online e alcançar novos mercados através de estratégias digitais eficazes. Aprenda a usar redes sociais, e-commerce e marketing de conteúdo.",
        topics: [
            "Fundamentos de marketing digital",
            "Estratégias para redes sociais (Facebook, Instagram)",
            "Criação de conteúdo visual atrativo",
            "E-commerce para produtos agrícolas",
            "WhatsApp Business para vendas",
            "Métricas e análise de resultados"
        ],
        requirements: [
            "Smartphone ou computador",
            "Conta nas redes sociais",
            "Fotos dos seus produtos"
        ],
        includes: [
            "Guia prático de marketing digital",
            "Templates para redes sociais",
            "Certificado de participação",
            "Coffee breaks e almoços",
            "Grupo de suporte WhatsApp"
        ],
        price: "10.000 MT",
        spots: "20 vagas disponíveis"
    },
    "iot-agricultura": {
        title: "IoT e Sensores na Agricultura",
        date: "8-10 Março 2025",
        duration: "3 dias (24 horas)",
        location: "Maputo, Moçambique",
        venue: "Centro de Formação Base Agro Data, Av. Julius Nyerere",
        instructor: {
            name: "Eng. Sofia Cossa",
            title: "Engenheira de Sistemas IoT",
            bio: "Engenheira Electrotécnica especializada em Internet das Coisas. Mestrado em Sistemas Inteligentes. Implementou soluções IoT em mais de 30 fazendas em Moçambique e África Austral.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
        },
        description: "Aprenda a implementar sistemas de monitorização inteligente na sua fazenda. Esta formação técnica cobre sensores, conectividade e análise de dados para agricultura inteligente.",
        topics: [
            "Introdução à Internet das Coisas (IoT)",
            "Tipos de sensores agrícolas (solo, clima, água)",
            "Instalação e configuração de sensores",
            "Conectividade e transmissão de dados",
            "Plataformas de monitorização em tempo real",
            "Automação de sistemas de irrigação"
        ],
        requirements: [
            "Conhecimentos básicos de informática",
            "Interesse em tecnologia",
            "Computador portátil"
        ],
        includes: [
            "Kit de sensores para prática",
            "Acesso à plataforma IoT (1 ano)",
            "Material técnico completo",
            "Certificado de participação",
            "Refeições incluídas",
            "Suporte técnico (90 dias)"
        ],
        price: "18.000 MT",
        spots: "10 vagas disponíveis"
    }
};

export default function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const training = trainingsData[id];

    if (!training) {
        notFound();
    }

    const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={training.title}
                icon={GraduationCap}
                backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Formação", href: "/servicos/formacao" },
                    { label: training.title, href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Training Info */}
                        <div className="bg-white rounded-[15px] shadow-lg shadow-slate-200/50 border border-slate-200 p-8">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Informações da Formação</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Data</p>
                                        <p className="font-bold text-slate-900">{training.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Duração</p>
                                        <p className="font-bold text-slate-900">{training.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Local</p>
                                        <p className="font-bold text-slate-900">{training.venue}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Vagas</p>
                                        <p className="font-bold text-emerald-600">{training.spots}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="font-black text-lg text-slate-900 mb-3">Sobre a Formação</h3>
                                <p className="text-slate-600 leading-relaxed">{training.description}</p>
                            </div>
                        </div>

                        {/* Topics Covered */}
                        <div className="bg-white rounded-[15px] shadow-lg shadow-slate-200/50 border border-slate-200 p-8">
                            <h3 className="font-black text-lg text-slate-900 mb-4">Tópicos Abordados</h3>
                            <ul className="space-y-3">
                                {training.topics.map((topic: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-[15px] shadow-lg shadow-slate-200/50 border border-slate-200 p-8">
                            <h3 className="font-black text-lg text-slate-900 mb-4">Requisitos</h3>
                            <ul className="space-y-2">
                                {training.requirements.map((req: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-[#f97316] font-bold">•</span>
                                        <span className="text-slate-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What's Included */}
                        <div className="bg-white rounded-[15px] shadow-lg shadow-slate-200/50 border border-slate-200 p-8">
                            <h3 className="font-black text-lg text-slate-900 mb-4">O que está incluído</h3>
                            <ul className="space-y-3">
                                {training.includes.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Instructor Card */}
                        <div className="bg-white rounded-[15px] shadow-lg shadow-slate-200/50 border border-slate-200 p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-4">
                                <User className="w-5 h-5 text-slate-600" />
                                <h3 className="font-black text-lg text-slate-900">Formador</h3>
                            </div>

                            <div className="text-center mb-4">
                                <img
                                    src={training.instructor.image}
                                    alt={training.instructor.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                                />
                                <h4 className="font-bold text-slate-900">{training.instructor.name}</h4>
                                <p className="text-sm text-slate-600">{training.instructor.title}</p>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                {training.instructor.bio}
                            </p>

                            <div className="border-t border-slate-200 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-slate-600">Investimento:</span>
                                    <span className="text-2xl font-black text-[#f97316]">{training.price}</span>
                                </div>

                                <button
                                    onClick={() => setEnrollmentOpen(true)}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6a0a] text-white font-bold px-6 py-4 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Inscrever-se Agora
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <p className="text-xs text-center text-slate-500 mt-3">
                                    {training.spots}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEnrollmentOpen && (
                <TrainingEnrollmentForm
                    trainingId={id}
                    trainingTitle={training.title}
                    onClose={() => setEnrollmentOpen(false)}
                />
            )}
        </main>
    );
}
