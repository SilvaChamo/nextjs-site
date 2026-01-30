import { createClient } from "@/utils/supabase/server";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: product } = await supabase.from('produtos').select('*').eq('id', id).single();

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <ProductEditor initialData={product} />
        </div>
    );
}
