import { createClient } from "@/utils/supabase/server";
import { ProfessionalEditor } from "@/components/admin/ProfessionalEditor";
import { notFound } from "next/navigation";

export default async function EditProfessionalPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: professional } = await supabase.from('professionals').select('*').eq('id', params.id).single();

    if (!professional) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <ProfessionalEditor initialData={professional} />
        </div>
    );
}
