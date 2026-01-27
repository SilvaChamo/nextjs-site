
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DesignSystem() {
    return (
        <div className="min-h-screen bg-background p-10 space-y-10">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
                <p className="text-muted-foreground text-lg">
                    Ambiente de desenvolvimento e testes de componentes.
                </p>
            </div>

            <section className="space-y-4 border-b pb-10">
                <h2 className="text-2xl font-semibold">Módulos & Páginas (Workspaces)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/design-system/podcast" className="block p-6 bg-white border rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600">AgroCast (Podcast)</h3>
                        <p className="text-sm text-slate-500">Desenvolvimento do componente de vídeo e podcast.</p>
                    </a>
                    <a href="/design-system/arquivo-produtos" className="block p-6 bg-white border rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600">Arquivo de Produtos</h3>
                        <p className="text-sm text-slate-500">Listagem de produtos das empresas.</p>
                    </a>
                    <a href="/design-system/detalhes-empresa" className="block p-6 bg-white border rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600">Detalhes da Empresa</h3>
                        <p className="text-sm text-slate-500">Página de perfil e detalhes.</p>
                    </a>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Inputs</h2>
                <div className="max-w-sm space-y-2">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Cards</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content area. You can put anything here.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Action</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Modals & Sheets</h2>
                <div className="flex gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Open Dialog (Modal)</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This is a modal dialog. You can put forms or confirmation
                                    messages here.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Open Sheet (Sidebar)</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit Profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </section>
        </div>
    );
}
