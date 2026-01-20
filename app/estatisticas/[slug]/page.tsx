import { StatsDashboard } from "@/components/stats/StatsDashboard";

export async function generateStaticParams() {
    return [
        { slug: 'empresas' },
        { slug: 'producao' },
        { slug: 'economia' },
        { slug: 'emprego' },
    ];
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    return (
        <main className="min-h-screen bg-[#F8F8F8] pb-20">
            <StatsDashboard slug={slug} />
        </main>
    );
}
