import { createClient } from "@/utils/supabase/server";
import { CompanyEditor } from "@/components/admin/CompanyEditor";
import { notFound } from "next/navigation";

export default async function EditCompanyPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: company } = await supabase.from('companies').select('*').eq('id', params.id).single();

    if (!company) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <CompanyEditor initialData={company} />
        </div>
    );
}
