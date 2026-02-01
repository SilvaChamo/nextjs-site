"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PROVINCES } from "@/lib/constants";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    role: z.string().min(2, "Cargo/Título deve ter pelo menos 2 caracteres"),
    category: z.string().min(2, "Categoria é obrigatória"),
    location: z.string().min(3, "Localização é obrigatória"),
    province: z.string().min(1, "Província é obrigatória"),
    district: z.string().optional(),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Telefone inválido"),
    linkedin: z.string().url("URL do LinkedIn inválido").optional().or(z.literal("")),
    bio: z.string().min(10, "A biografia deve ser mais detalhada"),
    specialties: z.string().min(3, "Adicione pelo menos uma especialidade"),
    photo_url: z.string().optional(), // Optional initially, but recommended
});

export function ProfessionalRegistrationForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            category: "",
            location: "",
            province: "",
            district: "",
            email: "",
            phone: "",
            linkedin: "",
            bio: "",
            specialties: "",
            photo_url: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const { error } = await supabase
                .from("professionals")
                .insert({
                    name: values.name,
                    role: values.role,
                    category: values.category,
                    location: values.location,
                    province: values.province,
                    district: values.district,
                    email: values.email,
                    phone: values.phone,
                    linkedin: values.linkedin,
                    bio: values.bio,
                    specialties: values.specialties, // Storing as string for simplicity, or could split
                    photo_url: values.photo_url,
                    status: "pending",
                    rating: 5.0,
                    created_at: new Date().toISOString(),
                });

            if (error) throw error;

            setSuccess(true);
            toast.success("Registo enviado com sucesso!", {
                description: "O seu perfil será analisado pela nossa equipa."
            });

            // Reset form after 3 seconds or redirect
            setTimeout(() => {
                router.push("/servicos/talentos");
            }, 3000);

        } catch (error: any) {
            console.error("Erro ao registar:", error);
            toast.error("Erro ao submeter registo", {
                description: error.message || "Tente novamente mais tarde."
            });
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Registo Recebido!</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                    Obrigado por se juntar à nossa rede de talentos. O seu perfil foi enviado para aprovação e estará visível em breve.
                </p>
                <Button
                    onClick={() => router.push("/servicos/talentos")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-6 text-base"
                >
                    Voltar aos Talentos
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex gap-3 text-slate-600 text-sm">
                    <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p>Preencha os dados abaixo para criar o seu perfil profissional. Todos os campos marcados com * são obrigatórios.</p>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-xl text-slate-800 border-b pb-2">Informações Pessoais</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="seu.email@exemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone / WhatsApp *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+258 84 123 4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://linkedin.com/in/seu-perfil" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-xl text-slate-800 border-b pb-2">Perfil Profissional</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título / Cargo *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Engenheiro Agrónomo" {...field} />
                                    </FormControl>
                                    <FormDescription>Como quer ser identificado no cartão de visita.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Área de Actuação *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Agronomia, Veterinária, Gestão..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Especialidades (separadas por vírgula) *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Hidrologia, Irrigação, Solos" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biografia Profissional *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Descreva a sua experiência, formação e objectivos..."
                                        className="min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Mínimo 10 caracteres. Esta descrição aparecerá no seu perfil detalhado.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-xl text-slate-800 border-b pb-2">Localização & Mídia</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Província *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a província" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PROVINCES.map((prov) => (
                                                <SelectItem key={prov} value={prov}>
                                                    {prov}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Distrito (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Manhiça" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="col-span-full">
                                    <FormLabel>Morada / Localização Geral *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Bairro Central, Cidade de Maputo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormLabel className="block">Fota de Perfil (Opcional)</FormLabel>
                        <div className="max-w-xs">
                            <ImageUpload
                                value={form.watch('photo_url') || ""}
                                onChange={(url) => form.setValue('photo_url', url)}
                                label="Carregar Foto"
                                recommendedSize="Quadrada (1:1)"
                                folder="professionals"
                            />
                        </div>
                        <p className="text-[11px] text-slate-500">Uma boa foto aumenta a credibilidade do seu perfil.</p>
                    </div>
                </div>

                <div className="pt-6 border-t mt-8">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 rounded-xl px-10 text-lg shadow-lg shadow-emerald-600/20"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                A enviar...
                            </>
                        ) : (
                            "Registar Perfil Profissional"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
