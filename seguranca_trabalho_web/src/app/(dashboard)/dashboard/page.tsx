import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOcorrencias } from "@/components/dashboard/RecentOcorrencias";
import { OcorrenciasPorSeveridade } from "@/components/dashboard/OcorrenciasPorSeveridade";
import { OcorrenciasPorLocal } from "@/components/dashboard/OcorrenciasPorLocal";

export const metadata: Metadata = {
  title: "Dashboard - Sistema de Verificação de Normas de Segurança",
  description: "Painel de controle do sistema de verificação de normas de segurança do trabalho",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div>
          <button className="btn-primary">Atualizar Dados</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total de Ocorrências" 
          value="156" 
          change="+12%" 
          trend="up" 
          description="Últimos 30 dias" 
          icon="alert-triangle"
        />
        <StatsCard 
          title="Ocorrências Críticas" 
          value="28" 
          change="-5%" 
          trend="down" 
          description="Últimos 30 dias" 
          icon="alert-octagon"
        />
        <StatsCard 
          title="Taxa de Conformidade" 
          value="78%" 
          change="+3%" 
          trend="up" 
          description="Últimos 30 dias" 
          icon="check-circle"
        />
        <StatsCard 
          title="Imagens Processadas" 
          value="1,245" 
          change="+18%" 
          trend="up" 
          description="Últimos 30 dias" 
          icon="image"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Ocorrências por Severidade</h2>
          <div className="h-80">
            <OcorrenciasPorSeveridade />
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Ocorrências por Local</h2>
          <div className="h-80">
            <OcorrenciasPorLocal />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Ocorrências Recentes</h2>
          <a href="/ocorrencias" className="text-sm text-blue-600 hover:text-blue-800">
            Ver todas
          </a>
        </div>
        <RecentOcorrencias />
      </Card>
    </div>
  );
}
