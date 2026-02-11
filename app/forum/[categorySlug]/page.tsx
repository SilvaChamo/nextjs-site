'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TopicListItem } from '@/components/forum/TopicListItem';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { Database } from '@/lib/database.types';

export default function CategoryPage() {
    const { categorySlug } = useParams();
    const router = useRouter();
    const [category, setCategory] = useState<Database['public']['Tables']['forum_categories']['Row'] | null>(null);
    const [topics, setTopics] = useState<Database['public']['Tables']['forum_topics']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        async function loadCategoryAndTopics() {
            // Load category
            const { data: catData, error: catError } = await supabase
                .from('forum_categories')
                .select('*')
                .eq('slug', categorySlug)
                .single();

            if (catError || !catData) {
                router.push('/forum');
                return;
            }

            setCategory(catData);

            // Load topics
            const { data: topData, error: topError } = await supabase
                .from('forum_topics')
                .select('*')
                .eq('category_id', catData.id)
                .order('created_at', { ascending: false });

            if (!topError && topData) {
                setTopics(topData);
            }
            setLoading(false);
        }

        loadCategoryAndTopics();
    }, [categorySlug, supabase, router]);

    if (loading) return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20">
            <PageHeader
                title={category?.name || 'Carregando...'}
                subtitle={category?.description}
            />

            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/forum')}
                        className="text-zinc-600 hover:text-emerald-600 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Voltar ao Fórum
                    </Button>

                    <Button
                        onClick={() => router.push(`/forum/novo-topico?category=${category?.id}`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-[8px]"
                    >
                        <Plus size={20} className="mr-2" /> Novo Tópico
                    </Button>
                </div>

                {topics.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 p-12 rounded-[8px] border border-zinc-200 dark:border-zinc-800 text-center">
                        <h3 className="text-xl font-bold mb-4">Ainda não há tópicos nesta categoria.</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Seja o primeiro a iniciar uma discussão sobre este tema!</p>
                        <Button
                            onClick={() => router.push(`/forum/novo-topico?category=${category?.id}`)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-[8px]"
                        >
                            Criar Primeiro Tópico
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {topics.map((topic) => (
                            <TopicListItem key={topic.id} topic={topic} categorySlug={categorySlug as string} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
