import { ProductEditor } from "@/components/admin/ProductEditor";

export default function NewProductPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <ProductEditor isNew />
        </div>
    );
}
