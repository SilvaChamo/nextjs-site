import { createClient } from "@/utils/supabase/server";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: property } = await supabase.from('properties').select('*').eq('id', params.id).single();

    if (!property) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <PropertyEditor initialData={property} />
        </div>
    );
}
