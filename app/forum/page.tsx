'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ForumCategoryCard } from '@/components/forum/ForumCategoryCard';
import { PageHeader } from '@/components/PageHeader';
import { CommunityBanner } from '@/components/CommunityBanner';
import { Database } from '@/lib/database.types';

export default function ForumPage() {
    const [categories, setCategories] = useState<Database['public']['Tables']['forum_categories']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        async function loadCategories() {
            const { data, error } = await supabase
                .from('forum_categories')
                .select('*')
                .order('name');

            if (!error && data) {
                setCategories(data);
            }
            setLoading(true); // Wait, should be false
            setLoading(false);
        }

        loadCategories();
    }, [supabase]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20">
            <PageHeader
                title="Fórum de Debate"
                subtitle="O espaço de troca de experiências e conhecimentos para a comunidade agrícola."
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-[8px]"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <ForumCategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}

                <div className="mt-20">
                    <CommunityBanner
                        title="Tem uma dúvida ou quer partilhar algo?"
                        description="Participe na comunidade e ajude outros produtores a crescerem."
                    />
                </div>
            </div>
        </div>
    );
}
