"use client";

import { Undo, Redo, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { toast } from "sonner";

interface UndoRedoPanelProps {
  onUndo?: (action: any) => Promise<void>;
  onRedo?: (action: any) => Promise<void>;
}

export function UndoRedoPanel({ onUndo, onRedo }: UndoRedoPanelProps) {
  const { history, currentIndex, undo, redo, canUndo, canRedo, clearHistory } = useUndoRedo();

  const handleUndo = async () => {
    const action = undo();
    if (action && onUndo) {
      try {
        await onUndo(action);
        toast.success(`Desfeito: ${action.description}`);
      } catch (error) {
        toast.error("Erro ao desfazer acção");
        console.error("Undo error:", error);
      }
    }
  };

  const handleRedo = async () => {
    const action = redo();
    if (action && onRedo) {
      try {
        await onRedo(action);
        toast.success(`Refeito: ${action.description}`);
      } catch (error) {
        toast.error("Erro ao refazer acção");
        console.error("Redo error:", error);
      }
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'restore': return '♻️';
      default: return '📝';
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'update': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'restore': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-black flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Histórico de Acções
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleUndo}
              disabled={!canUndo}
              className="flex items-center gap-2"
            >
              <Undo className="w-4 h-4" />
              Desfazer
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRedo}
              disabled={!canRedo}
              className="flex items-center gap-2"
            >
              <Redo className="w-4 h-4" />
              Refazer
            </Button>
            {history.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearHistory}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Nenhuma acção registada ainda</p>
            <p className="text-xs mt-1">As acções serão guardadas automaticamente</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((action, index) => (
              <div
                key={action.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  index === currentIndex
                    ? 'border-emerald-500 bg-emerald-50'
                    : index < currentIndex
                    ? 'border-slate-200 bg-slate-50 opacity-60'
                    : 'border-slate-200 bg-white opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getActionIcon(action.type)}</span>
                  <div>
                    <p className="font-medium text-sm">{action.description}</p>
                    <p className="text-xs text-slate-500">
                      {action.tableName} • {action.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge className={getActionColor(action.type)}>
                  {action.type}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
