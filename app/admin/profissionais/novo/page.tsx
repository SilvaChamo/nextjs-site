"use client";

import { ProfessionalEditor } from "@/components/admin/ProfessionalEditor";

export default function NewProfessionalPage() {
    return (
        <div className="h-[calc(100vh-80px)] p-6">
            <ProfessionalEditor isNew={true} />
        </div>
    );
}
