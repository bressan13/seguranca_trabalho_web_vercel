import React from 'react';
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Relatórios - Sistema de Verificação de Normas de Segurança",
  description: "Geração de relatórios do sistema de verificação de normas de segurança do trabalho",
};

export default function RelatoriosPage() {
  // Em um cenário real, estes dados viriam de uma API
  const relatorios = [
    {
      id: 1,
      nome: 'Relatório Semanal - Setor A',
      tipo: 'semanal',
      periodo: '12/04/2025 - 18/04/2025',
      local: 'Setor A',
      ocorrencias: 12,
      status: 'gerado',
      data_geracao: '18/04/2025 18:00:00',
      formato: 'PDF'
    },
    {
      id: 2,
      nome: 'Relatório Semanal - Setor B',
      tipo: 'semanal',
      periodo: '12/04/2025 - 18/04/2025',
      local: 'Setor B',
      ocorrencias: 8,
      status: 'gerado',
      data_geracao: '18/04/2025 18:00:00',
      formato: 'PDF'
    },
    {
      id: 3,
      nome: 'Relatório Semanal - Setor C',
      tipo: 'semanal',
      periodo: '12/04/2025 - 18/04/2025',
      local: 'Setor C',
      ocorrencias: 15,
      status: 'gerado',
      data_geracao: '18/04/2025 18:00:00',
      formato: 'PDF'
    },
    {
      id: 4,
      nome: 'Relatório Semanal - Setor D',
      tipo: 'semanal',
      periodo: '12/04/2025 - 18/04/2025',
      local: 'Setor D',
      ocorrencias: 5,
      status: 'gerado',
      data_geracao: '18/04/2025 18:00:00',
      formato: 'PDF'
    },
    {
      id: 5,
      nome: 'Relatório Mensal - Todos os Setores',
      tipo: 'mensal',
      periodo: '01/04/2025 - 30/04/2025',
      local: 'Todos',
      ocorrencias: 156,
      status: 'agendado',
      data_geracao: '30/04/2025 23:59:59',
      formato: 'PDF'
    },
    {
      id: 6,
      nome: 'Relatório Personalizado - Uso de EPIs',
      tipo: 'personalizado',
      periodo: '01/03/2025 - 18/04/2025',
      local: 'Todos',
      ocorrencias: 87,
      status: 'gerado',
      data_geracao: '18/04/2025 10:15:22',
      formato: 'CSV'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <div>
          <button className="btn-primary">Novo Relatório</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Gerar Relatório</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="tipo-relatorio" className="block text-sm font-medium text-gray-700">Tipo de Relatório</label>
              <select id="tipo-relatorio" name="tipo-relatorio" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
            <div>
              <label htmlFor="local" className="block text-sm font-medium text-gray-700">Local</label>
              <select id="local" name="local" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="todos">Todos</option>
                <option value="setor-a">Setor A</option>
                <option value="setor-b">Setor B</option>
                <option value="setor-c">Setor C</option>
                <option value="setor-d">Setor D</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="data-inicio" className="block text-sm font-medium text-gray-700">Data Início</label>
                <input type="date" id="data-inicio" name="data-inicio" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
              </div>
              <div>
                <label htmlFor="data-fim" className="block text-sm font-medium text-gray-700">Data Fim</label>
                <input type="date" id="data-fim" name="data-fim" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="formato" className="block text-sm font-medium text-gray-700">Formato</label>
              <select id="formato" name="formato" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Gerar Relatório
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Agendar Relatório</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome-relatorio" className="block text-sm font-medium text-gray-700">Nome do Relatório</label>
              <input type="text" id="nome-relatorio" name="nome-relatorio" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" placeholder="Ex: Relatório Semanal - Setor A" />
            </div>
            <div>
              <label htmlFor="tipo-relatorio-agendado" className="block text-sm font-medium text-gray-700">Tipo de Relatório</label>
              <select id="tipo-relatorio-agendado" name="tipo-relatorio-agendado" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
            <div>
              <label htmlFor="local-agendado" className="block text-sm font-medium text-gray-700">Local</label>
              <select id="local-agendado" name="local-agendado" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="todos">Todos</option>
                <option value="setor-a">Setor A</option>
                <option value="setor-b">Setor B</option>
                <option value="setor-c">Setor C</option>
                <option value="setor-d">Setor D</option>
              </select>
            </div>
            <div>
              <label htmlFor="frequencia" className="block text-sm font-medium text-gray-700">Frequência</label>
              <select id="frequencia" name="frequencia" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Agendar Relatório
              </button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Relatórios Recentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Período
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ocorrências
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relatorios.map((relatorio) => (
                <tr key={relatorio.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{relatorio.nome}</div>
                    <div className="text-xs text-gray-500">{relatorio.data_geracao}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{relatorio.tipo.charAt(0).toUpperCase() + relatorio.tipo.slice(1)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{relatorio.periodo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{relatorio.local}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{relatorio.ocorrencias}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      relatorio.status === 'gerado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {relatorio.status.charAt(0).toUpperCase() + relatorio.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {relatorio.status === 'gerado' && (
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                        Download {relatorio.formato}
                      </a>
                    )}
                    <a href={`/relatorios/${relatorio.id}`} className="text-blue-600 hover:text-blue-900">
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
