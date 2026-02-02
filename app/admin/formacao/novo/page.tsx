"use client";

import { TrainingEditor } from "@/components/admin/TrainingEditor";

export default function NewTrainingPage() {
    return (
        <div className="h-[calc(100vh-80px)] p-6">
            <TrainingEditor isNew={true} />
        </div>
    );
}
