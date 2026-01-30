import { CompanyEditor } from "@/components/admin/CompanyEditor";

export default function NewCompanyPage() {
    return (
        <div className="max-w-5xl mx-auto py-8">
            <CompanyEditor isNew />
        </div>
    );
}
