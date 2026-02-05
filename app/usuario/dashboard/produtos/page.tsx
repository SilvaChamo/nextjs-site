"use client";

import { useState, useEffect } from "react";
import { Package, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function MeuConteudoPage() {
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState<"produtos" | "propriedades" | "conexoes">("produtos");
    const [user, setUser] = useState<User | null>(null);
    const [companyId, setCompanyId] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    // State for Product Form
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: ""
    });

    // Fetch user products
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (user) fetchProducts();
    }, [user]);

    const fetchProducts = async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setProducts(data);

        // Also fetch company_id
        const { data: companyData } = await supabase
            .from('companies')
            .select('id')
            .eq('user_id', user.id)
            .single();

        if (companyData) setCompanyId(companyData.id);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];

        try {
            const fileName = `products/${user?.id}-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage
                .from('public-assets')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('public-assets')
                .getPublicUrl(fileName);

            setProductForm(prev => ({ ...prev, imageUrl: publicUrl }));
        } catch (error) {
            console.error(error);
            alert("Erro no upload da imagem");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProduct = async () => {
        if (!user || !productForm.name || !productForm.price) {
            alert("Preencha os campos obrigatórios");
            return;
        }

        const { error, data: newProduct } = await supabase.from('products').insert({
            user_id: user.id,
            name: productForm.name,
            price: productForm.price,
            category: productForm.category,
            description: productForm.description,
            image_url: productForm.imageUrl,
            company_id: companyId
        }).select().single();

        if (error) {
            alert("Erro ao salvar: " + error.message);
        } else {
            alert("Produto salvo com sucesso!");

            // Trigger SMS notification for company products
            try {
                // Fetch company location for better targeting
                const { data: compData } = await supabase
                    .from('companies')
                    .select('province')
                    .eq('id', companyId)
                    .single();

                fetch('/api/sms/notify-new-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        product: productForm.name,
                        price: productForm.price,
                        location: compData?.province || 'Sua localização',
                        type: 'company'
                    })
                });
            } catch (smsErr) {
                console.error("SMS trigger error:", smsErr);
            }

            setIsAddingProduct(false);
            setProductForm({ name: "", price: "", category: "", description: "", imageUrl: "" });
            fetchProducts();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-[900] tracking-tight text-[#3a3f47]">Meu Conteúdo</h2>
                    <p className="text-slate-500">Gerencie seus produtos, propriedades e conexões.</p>
                </div>
                {activeTab === "produtos" && (
                    <Button
                        onClick={() => setIsAddingProduct(true)}
                        className="px-6 py-2 rounded-md bg-emerald-600 hover:bg-orange-500 text-white font-bold shadow-md transition-all hover:scale-105"
                    >
                        + Novo Produto
                    </Button>
                )}
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-300 mb-8">
                <button
                    onClick={() => setActiveTab("produtos")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "produtos"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-white"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Meus Produtos
                </button>
                <button
                    onClick={() => setActiveTab("propriedades")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "propriedades"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-white"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Minhas Propriedades
                </button>
                <button
                    onClick={() => setActiveTab("conexoes")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "conexoes"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-white"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Minhas Conexões
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === "produtos" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {isAddingProduct ? (
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg max-w-2xl mx-auto">
                                <h3 className="font-bold text-xl mb-6">Novo Produto</h3>
                                <div className="space-y-4">
                                    <input
                                        className="w-full border border-slate-200 bg-slate-50 p-[10px] rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-sans font-semibold text-slate-600"
                                        value={productForm.name}
                                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                        placeholder="NOME DO PRODUTO: Ex: Milho Branco"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            className="w-full border border-slate-200 bg-slate-50 p-[10px] rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-sans font-semibold text-slate-600"
                                            value={productForm.price}
                                            onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                            placeholder="PREÇO (MT): Ex: 0.00"
                                        />
                                        <input
                                            className="w-full border border-slate-200 bg-slate-50 p-[10px] rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-sans font-semibold text-slate-600"
                                            value={productForm.category}
                                            onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                            placeholder="CATEGORIA: Ex: Grãos"
                                        />
                                    </div>
                                    <textarea
                                        className="w-full border border-slate-200 bg-slate-50 p-[10px] rounded-lg h-32 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-sans font-semibold text-slate-600 leading-relaxed resize-none"
                                        value={productForm.description}
                                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                        placeholder="DESCRIÇÃO: Detalhes, qualidade, origem do produto..."
                                    />
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-2 block">Imagem</label>
                                        <div className="flex items-center gap-4">
                                            {productForm.imageUrl && <img src={productForm.imageUrl} className="w-16 h-16 object-cover rounded shadow-sm" />}
                                            <input type="file" onChange={handleImageUpload} disabled={uploading} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                                            {uploading && <span className="text-sm text-orange-500 animate-pulse">Enviando...</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button variant="outline" onClick={() => setIsAddingProduct(false)}>Cancelar</Button>
                                        <Button onClick={handleSaveProduct} className="bg-emerald-600 text-white hover:bg-emerald-700">Salvar Produto</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                            <Package className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-lg text-slate-700">Você ainda não tem produtos</h3>
                                            <p className="text-sm max-w-xs mx-auto mt-1">Comece a adicionar seus produtos para que apareçam no mercado.</p>
                                        </div>
                                        <Button
                                            onClick={() => setIsAddingProduct(true)}
                                            variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600 hover:border-orange-200"
                                        >
                                            Adicionar Primeiro Produto
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {products.map((p, i) => (
                                            <div key={i} className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                                <div className="h-40 bg-slate-100 relative overflow-hidden">
                                                    {p.image_url ? (
                                                        <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-slate-300"><Package className="w-8 h-8" /></div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-slate-800 line-clamp-1">{p.name}</h4>
                                                        <button
                                                            onClick={async () => {
                                                                const newStatus = p.available === false ? true : false;
                                                                const { error } = await supabase.from('products').update({ available: newStatus }).eq('id', p.id);
                                                                if (!error) fetchProducts();
                                                            }}
                                                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border transition-colors ${p.available !== false ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}
                                                        >
                                                            {p.available !== false ? 'Em Stock' : 'Esgotado'}
                                                        </button>
                                                    </div>
                                                    <p className="text-orange-600 font-bold text-base">{p.price} MT</p>
                                                    <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {activeTab === "propriedades" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-700">Nenhuma propriedade cadastrada</h3>
                                <p className="text-sm max-w-xs mx-auto mt-1">Adicione suas fazendas, terrenos ou instalações.</p>
                            </div>
                            <Button variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600 hover:border-orange-200">
                                Adicionar Propriedade
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === "conexoes" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-700">Sem conexões ativas</h3>
                                <p className="text-sm max-w-xs mx-auto mt-1">Conecte-se com outros produtores e empresas da rede.</p>
                            </div>
                            <Button variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600 hover:border-orange-200">
                                Buscar Parceiros
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

