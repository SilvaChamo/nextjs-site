"use client";

import { ProfessionalEditor } from "@/components/admin/ProfessionalEditor";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function EditProfessionalPage() {
    const params = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            if (!params.id) return;

            const { data: professional } = await supabase
                .from('professionals')
                .select('*')
                .eq('id', params.id)
                .single();

            if (professional) setData(professional);
            setLoading(false);
        };

        fetchData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="h-[calc(100vh-80px)] p-6">
            <ProfessionalEditor initialData={data} />
        </div>
    );
}
