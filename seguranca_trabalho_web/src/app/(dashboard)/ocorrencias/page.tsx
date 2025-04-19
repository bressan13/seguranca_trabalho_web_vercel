import React from 'react';
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Ocorrências - Sistema de Verificação de Normas de Segurança",
  description: "Gerenciamento de ocorrências do sistema de verificação de normas de segurança do trabalho",
};

export default function OcorrenciasPage() {
  // Em um cenário real, estes dados viriam de uma API
  const ocorrencias = [
    {
      id: 1,
      regra: 'Uso obrigatório de capacete',
      local: 'Setor A',
      camera: 'CAM01',
      timestamp: '2025-04-18 14:32:45',
      severidade: 'alta',
      status: 'aberta',
      detalhes: 'Funcionário sem capacete de proteção na área de risco',
      imagem: '/images/ocorrencia1.jpg'
    },
    {
      id: 2,
      regra: 'Limite de pessoas em área de risco',
      local: 'Setor C',
      camera: 'CAM03',
      timestamp: '2025-04-18 11:15:22',
      severidade: 'alta',
      status: 'aberta',
      detalhes: 'Excesso de pessoas na área de operação de máquinas',
      imagem: '/images/ocorrencia2.jpg'
    },
    {
      id: 3,
      regra: 'Uso obrigatório de colete',
      local: 'Setor B',
      camera: 'CAM02',
      timestamp: '2025-04-18 09:47:10',
      severidade: 'média',
      status: 'aberta',
      detalhes: 'Funcionário sem colete de segurança',
      imagem: '/images/ocorrencia3.jpg'
    },
    {
      id: 4,
      regra: 'Uso obrigatório de luvas',
      local: 'Setor D',
      camera: 'CAM04',
      timestamp: '2025-04-17 16:23:51',
      severidade: 'baixa',
      status: 'resolvida',
      detalhes: 'Funcionário sem luvas de proteção',
      imagem: '/images/ocorrencia4.jpg'
    },
    {
      id: 5,
      regra: 'Uso obrigatório de capacete',
      local: 'Setor A',
      camera: 'CAM01',
      timestamp: '2025-04-17 13:05:33',
      severidade: 'alta',
      status: 'resolvida',
      detalhes: 'Funcionário sem capacete de proteção na área de risco',
      imagem: '/images/ocorrencia5.jpg'
    },
    {
      id: 6,
      regra: 'Proibido acesso sem autorização',
      local: 'Setor D',
      camera: 'CAM08',
      timestamp: '2025-04-17 10:42:18',
      severidade: 'alta',
      status: 'resolvida',
      detalhes: 'Pessoa não autorizada na área restrita',
      imagem: '/images/ocorrencia6.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Ocorrências</h1>
        <div>
          <button className="btn-primary">Exportar Relatório</button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div>
              <label htmlFor="severidade" className="block text-sm font-medium text-gray-700">Severidade</label>
              <select id="severidade" name="severidade" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todas</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
            <div>
              <label htmlFor="local" className="block text-sm font-medium text-gray-700">Local</label>
              <select id="local" name="local" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todos</option>
                <option value="setor-a">Setor A</option>
                <option value="setor-b">Setor B</option>
                <option value="setor-c">Setor C</option>
                <option value="setor-d">Setor D</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="status" name="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todos</option>
                <option value="aberta">Aberta</option>
                <option value="resolvida">Resolvida</option>
              </select>
            </div>
            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
              <input type="date" id="data" name="data" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
            </div>
          </div>
          <div>
            <button className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Filtrar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ocorrência
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severidade
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
              {ocorrencias.map((ocorrencia) => (
                <tr key={ocorrencia.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {ocorrencia.regra}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ocorrencia.detalhes.substring(0, 30)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ocorrencia.local}</div>
                    <div className="text-sm text-gray-500">{ocorrencia.camera}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ocorrencia.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ocorrencia.severidade === 'alta' ? 'bg-red-100 text-red-800' : 
                      ocorrencia.severidade === 'média' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ocorrencia.severidade.charAt(0).toUpperCase() + ocorrencia.severidade.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ocorrencia.status === 'aberta' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {ocorrencia.status.charAt(0).toUpperCase() + ocorrencia.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/ocorrencias/${ocorrencia.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Detalhes
                    </a>
                    {ocorrencia.status === 'aberta' && (
                      <a href="#" className="text-green-600 hover:text-green-900">
                        Resolver
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">6</span> de <span className="font-medium">6</span> ocorrências
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Próxima
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
