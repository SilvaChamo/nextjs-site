import { createClient } from "@/utils/supabase/server";
import { ProfessionalEditor } from "@/components/admin/ProfessionalEditor";
import { notFound } from "next/navigation";

export default async function EditProfessionalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: professional } = await supabase.from('professionals').select('*').eq('id', id).single();

    if (!professional) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <ProfessionalEditor initialData={professional} />
        </div>
    );
}
