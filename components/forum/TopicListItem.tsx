'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Eye, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TopicListItemProps {
    topic: {
        id: string;
        title: string;
        user_id: string | null;
        created_at: string;
        views_count: number | null;
    };
    categorySlug: string;
}

export const TopicListItem: React.FC<TopicListItemProps> = ({ topic, categorySlug }) => {
    return (
        <Link
            href={`/forum/topic/${topic.id}`}
            className="block p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[8px] hover:border-emerald-500 transition-all group"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-grow">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors mb-2">
                        {topic.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true, locale: ptBR })}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-zinc-500 dark:text-zinc-500 shrink-0">
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">{topic.views_count || 0}</span>
                        <span className="text-[10px] uppercase tracking-wider flex items-center gap-1">
                            <Eye size={12} /> Visualizações
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
