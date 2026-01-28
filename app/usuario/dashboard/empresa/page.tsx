"use client";

import { useState, useEffect } from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { MOZ_DATA, SECTORS, VALUE_CHAINS } from "@/lib/agro-data";

export default function EmpresaPage() {
    const supabase = createClient();
    const [isRegistered, setIsRegistered] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);
    const [logoError, setLogoError] = useState<string | null>(null);
    const [companyId, setCompanyId] = useState<string | null>(null);

    const [companyForm, setCompanyForm] = useState({
        name: "",
        nuit: "",
        contact: "",
        email: "",
        province: "",
        district: "",
        category: "",
        description: "",
        address: "",
        logo_url: "",
        value_chain: ""
    });

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    useEffect(() => {
        const fetchCompany = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setIsRegistered(true);
                setCompanyId(data.id);
                setCompanyForm({
                    name: data.name || "",
                    nuit: data.nuit || "",
                    contact: data.contact || "",
                    email: data.email || "",
                    province: data.province || "",
                    district: data.district || "",
                    category: data.category || "",
                    description: data.description || "",
                    address: data.address || "",
                    logo_url: data.logo_url || "",
                    value_chain: data.value_chain || ""
                });
            } else {
                setIsRegistered(false);
            }
        };
        fetchCompany();
    }, [user]);

    const handleCompanyLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setLogoError("Formato inválido. Use JPG ou PNG.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setLogoError("O arquivo é muito grande. Máximo 2MB.");
            return;
        }

        setLogoError(null);
        setIsUploadingLogo(true);
        const fileName = `logos/${user?.id}-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
            .from('public-assets')
            .upload(fileName, file);

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from('public-assets')
                .getPublicUrl(fileName);
            setCompanyForm(prev => ({ ...prev, logo_url: publicUrl }));
        } else {
            setLogoError(`Erro no upload: ${uploadError.message}`);
        }
        setIsUploadingLogo(false);
    };

    const handleUpdateCompany = async () => {
        if (!user || !companyId) return;

        const { error } = await supabase
            .from('companies')
            .update({
                name: companyForm.name,
                nuit: companyForm.nuit,
                contact: companyForm.contact,
                email: companyForm.email,
                province: companyForm.province,
                district: companyForm.district,
                category: companyForm.category,
                description: companyForm.description,
                address: companyForm.address,
                logo_url: companyForm.logo_url,
                value_chain: companyForm.value_chain,
                updated_at: new Date().toISOString()
            })
            .eq('id', companyId);

        if (error) {
            alert("Erro ao atualizar empresa: " + error.message);
        } else {
            setShowSuccessPopup(true);
            setIsEditingCompany(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Sucesso!</h3>
                        <p className="text-slate-500 mb-8">Os dados da sua empresa foram atualizados com sucesso.</p>
                        <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-lg"
                            onClick={() => setShowSuccessPopup(false)}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-[900] tracking-tight text-[#3a3f47]">Minha Empresa</h2>
                <p className="text-slate-500">Gerencie os dados e o perfil público da sua empresa.</p>
            </div>

            <div className="min-h-[400px]">
                {isRegistered ? (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-emerald-600" />
                                Dados da Empresa
                            </h3>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase rounded-full tracking-wide">
                                Verificada
                            </span>
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="space-y-8">
                                {/* Top Section: Logo & Grid(Info | Description) */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Logo Section */}
                                    <div className="w-full md:w-auto flex-shrink-0 flex justify-center md:justify-start">
                                        <div className="w-40 h-40 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-[15px] relative group">
                                            {isUploadingLogo && (
                                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
                                                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}

                                            {companyForm.logo_url ? (
                                                <img src={companyForm.logo_url} alt={companyForm.name} className="w-full h-full object-contain" />
                                            ) : companyForm.name ? (
                                                <div className="w-full h-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-3xl">
                                                    {companyForm.name.charAt(0)}
                                                </div>
                                            ) : (
                                                <Building2 className="w-12 h-12 text-slate-300" />
                                            )}

                                            {isEditingCompany && (
                                                <>
                                                    <label htmlFor="logo-upload" className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center">
                                                        <div className="bg-white/90 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                        </div>
                                                    </label>
                                                    <input type="file" id="logo-upload" onChange={handleCompanyLogoUpload} className="hidden" accept="image/png, image/jpeg, image/jpg" />
                                                </>
                                            )}
                                        </div>
                                        {logoError && <p className="text-xs text-red-500 mt-2 text-center md:text-left">{logoError}</p>}
                                    </div>

                                    {/* Info & Description Section */}
                                    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left Column: Basic Info */}
                                        <div className="space-y-4">
                                            <input
                                                className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                                value={companyForm.name}
                                                onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                                                disabled={!isEditingCompany}
                                                placeholder="Razão social"
                                            />
                                            <input
                                                className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                                value={companyForm.contact}
                                                onChange={e => setCompanyForm({ ...companyForm, contact: e.target.value })}
                                                placeholder="Telefone"
                                                disabled={!isEditingCompany}
                                            />
                                            <input
                                                className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                                value={companyForm.address}
                                                onChange={e => setCompanyForm({ ...companyForm, address: e.target.value })}
                                                disabled={!isEditingCompany}
                                                placeholder="Endereço/Avenida"
                                            />
                                        </div>

                                        {/* Right Column: Description */}
                                        <div className="h-full">
                                            <textarea
                                                className="w-full h-full min-h-[140px] border border-slate-200 bg-slate-50 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm leading-relaxed resize-none disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                                value={companyForm.description}
                                                onChange={e => setCompanyForm({ ...companyForm, description: e.target.value })}
                                                disabled={!isEditingCompany}
                                                placeholder="Descrição"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section: Remaining Fields Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <input
                                        className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                        value={companyForm.nuit}
                                        onChange={e => setCompanyForm({ ...companyForm, nuit: e.target.value })}
                                        disabled={!isEditingCompany}
                                        placeholder="Nuit"
                                    />
                                    <input
                                        className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                        value={companyForm.email}
                                        onChange={e => setCompanyForm({ ...companyForm, email: e.target.value })}
                                        disabled={!isEditingCompany}
                                        placeholder="Email"
                                    />
                                    <select
                                        className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300 disabled:appearance-none pr-8"
                                        value={companyForm.value_chain}
                                        onChange={e => setCompanyForm({ ...companyForm, value_chain: e.target.value })}
                                        disabled={!isEditingCompany}
                                    >
                                        <option value="">Cadeia de valor</option>
                                        {VALUE_CHAINS.map(vc => <option key={vc} value={vc}>{vc}</option>)}
                                    </select>
                                    <div className="relative">
                                        <select
                                            className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300 disabled:appearance-none pr-8"
                                            value={SECTORS.includes(companyForm.category) ? companyForm.category : "Outro"}
                                            onChange={e => {
                                                if (e.target.value === "Outro") setCompanyForm({ ...companyForm, category: "" });
                                                else setCompanyForm({ ...companyForm, category: e.target.value });
                                            }}
                                            disabled={!isEditingCompany}
                                        >
                                            <option value="">Setor</option>
                                            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {((!SECTORS.includes(companyForm.category) && companyForm.category !== "") || (!SECTORS.includes(companyForm.category) && companyForm.category === "")) && (
                                            <input
                                                className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg mt-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300"
                                                placeholder="Especifique o setor..."
                                                value={companyForm.category}
                                                onChange={e => setCompanyForm({ ...companyForm, category: e.target.value })}
                                                disabled={!isEditingCompany}
                                            />
                                        )}
                                    </div>
                                    <select
                                        className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300 disabled:appearance-none pr-8"
                                        value={companyForm.province}
                                        onChange={e => setCompanyForm({ ...companyForm, province: e.target.value, district: "" })}
                                        disabled={!isEditingCompany}
                                    >
                                        <option value="">Província</option>
                                        {Object.keys(MOZ_DATA).map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <select
                                        className="w-full border border-slate-200 bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-[#3a3f47] font-semibold disabled:opacity-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-300 disabled:appearance-none pr-8"
                                        value={companyForm.district}
                                        onChange={e => setCompanyForm({ ...companyForm, district: e.target.value })}
                                        disabled={!companyForm.province || !isEditingCompany}
                                    >
                                        <option value="">Distrito</option>
                                        {companyForm.province && MOZ_DATA[companyForm.province]?.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                                {isEditingCompany ? (
                                    <>
                                        <Button variant="outline" onClick={() => setIsEditingCompany(false)}>Cancelar</Button>
                                        <Button onClick={handleUpdateCompany} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Salvar Alterações</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline" className="border-slate-300 text-slate-600 hover:text-slate-800" onClick={() => setIsEditingCompany(true)}>Editar Dados</Button>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Visualizar Perfil Público</Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-8 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 text-emerald-600"><Building2 className="w-7 h-7" /></div>
                            <h3 className="text-2xl font-black text-[#3a3f47] mb-3">Registar a minha Empresa</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed max-w-lg">Junte-se ao maior diretório de empresas do setor agrário em Moçambique.</p>
                            <Link href="/usuario/registo-empresa">
                                <Button className="h-12 px-8 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                                    Começar Registo <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
