"use client";

import { User, Mail, Phone, MapPin, Globe, Linkedin, Facebook, Instagram, Award, BookOpen, MessageSquare, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

interface ProfessionalProfileClientProps {
    professional: any;
}

export default function ProfessionalProfileClient({ professional }: ProfessionalProfileClientProps) {
    // Determine the display name and role
    const name = professional.name || "Profissional";
    const role = professional.role || professional.profession || "Especialista";
    const photo = professional.photo_url || professional.image_url;

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHeader
                title={name}
                backgroundImage="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Repositório", href: "/repositorio" },
                    { label: "Profissionais", href: "/repositorio/profissionais" },
                    { label: name, href: undefined }
                ]}
            />

            <main className="container-site py-12">
                <div className="mb-8">
                    <Link href="/repositorio/profissionais">
                        <Button variant="ghost" className="gap-2 text-slate-500 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4" />
                            Voltar à Lista
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Details & Specialties */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bio / About */}
                        <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm p-8 md:p-10">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                                Perfil Profissional
                            </h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                                {professional.bio ? (
                                    professional.bio.split('\n').map((para: string, i: number) => (
                                        <p key={i} className="mb-4">{para}</p>
                                    ))
                                ) : (
                                    <p className="italic text-slate-400">Este profissional ainda não disponibilizou uma biografia detalhada.</p>
                                )}
                            </div>
                        </div>

                        {/* Specialties & academic */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Specialties */}
                            <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm p-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-emerald-500" />
                                    Especialidades
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {professional.specialties ? (
                                        professional.specialties.split(',').map((spec: string, i: number) => (
                                            <span key={i} className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                                                {spec.trim()}
                                            </span>
                                        ))
                                    ) : professional.category ? (
                                        <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                                            {professional.category}
                                        </span>
                                    ) : (
                                        <p className="text-sm italic text-slate-400">Não listadas.</p>
                                    )}
                                </div>
                            </div>

                            {/* Academic Level */}
                            <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm p-8">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-emerald-500" />
                                    Formação Académica
                                </h3>
                                <div>
                                    {professional.academic_level ? (
                                        <p className="text-slate-700 font-bold bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            {professional.academic_level}
                                        </p>
                                    ) : (
                                        <p className="text-sm italic text-slate-400">Não informado.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Info / Category Badge Area */}
                        <div className="bg-emerald-800 rounded-[15px] p-8 relative overflow-hidden group">
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <p className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-center md:text-left">Categoria Principal</p>
                                    <h4 className="text-2xl font-black text-white">{professional.category || "Consultoria Técnica"}</h4>
                                </div>
                                <Link href="/servicos/talentos">
                                    <Button className="bg-white hover:bg-slate-50 text-emerald-950 font-black uppercase tracking-widest text-[10px] py-6 px-10 rounded-xl transition-all shadow-xl shadow-emerald-950/20">
                                        Procurar outros talentos
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Compact Identity Card */}
                        <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm p-6 text-center">
                            {/* Circular Photo - Reverted as requested */}
                            <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-sm mx-auto mb-4 overflow-hidden relative">
                                {photo ? (
                                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-slate-200 absolute inset-0 m-auto" />
                                )}
                            </div>

                            {/* Identity Info - Name/Stars left, Status right */}
                            <div className="flex items-center justify-between gap-4 border-t pt-4 border-slate-50">
                                <div className="text-left">
                                    <h1 className="text-base font-black text-slate-900 leading-tight mb-1">{name}</h1>
                                    <div className="flex items-center gap-1 text-orange-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < (professional.rating || 5) ? "fill-current" : ""}`} />
                                        ))}
                                        <span className="ml-1 text-[9px] font-bold text-slate-400">({professional.rating || "5.0"})</span>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <div className="w-1.2 h-1.2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[9px] font-black uppercase">Disponível</span>
                                </div>
                            </div>
                        </div>

                        {/* Contacts Card */}
                        <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm p-6">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center border-b pb-4">Informação de Contacto</h3>

                            <div className="space-y-4">
                                {professional.phone && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Telefone</p>
                                            <p className="text-sm font-bold text-slate-800">{professional.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {professional.whatsapp && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">WhatsApp</p>
                                            <p className="text-sm font-bold text-slate-800">{professional.whatsapp}</p>
                                        </div>
                                    </div>
                                )}

                                {professional.email && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Email</p>
                                            <p className="text-sm font-bold text-slate-800 truncate">{professional.email}</p>
                                        </div>
                                    </div>
                                )}

                                {professional.province && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Localização</p>
                                            <p className="text-sm font-bold text-slate-800">{professional.province}{professional.district ? ` · ${professional.district}` : ''}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <div className="flex justify-center gap-4">
                                    {professional.linkedin && (
                                        <a href={professional.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {professional.facebook && (
                                        <a href={professional.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-100 hover:text-blue-700 transition-all">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                    )}
                                    {professional.instagram && (
                                        <a href={professional.instagram.startsWith('http') ? professional.instagram : `https://instagram.com/${professional.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-pink-100 hover:text-pink-600 transition-all">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
