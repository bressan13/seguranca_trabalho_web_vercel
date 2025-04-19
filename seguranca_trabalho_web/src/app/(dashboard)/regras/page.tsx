import React from 'react';
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Regras - Sistema de Verificação de Normas de Segurança",
  description: "Gerenciamento de regras do sistema de verificação de normas de segurança do trabalho",
};

export default function RegrasPage() {
  // Em um cenário real, estes dados viriam de uma API
  const regras = [
    {
      id: 1,
      nome: 'Uso obrigatório de capacete',
      tipo: 'EPI',
      local: 'Setor A',
      severidade: 'alta',
      status: 'ativa',
      descricao: 'Todos os funcionários devem utilizar capacete de proteção na área de construção'
    },
    {
      id: 2,
      nome: 'Uso obrigatório de colete',
      tipo: 'EPI',
      local: 'Setor B',
      severidade: 'média',
      status: 'ativa',
      descricao: 'Todos os funcionários devem utilizar colete de segurança na área de produção'
    },
    {
      id: 3,
      nome: 'Uso obrigatório de luvas',
      tipo: 'EPI',
      local: 'Setor C',
      severidade: 'média',
      status: 'ativa',
      descricao: 'Todos os funcionários devem utilizar luvas de proteção na área de manuseio de produtos químicos'
    },
    {
      id: 4,
      nome: 'Limite de pessoas em área de risco',
      tipo: 'Zona',
      local: 'Setor A',
      severidade: 'alta',
      status: 'ativa',
      descricao: 'Máximo de 3 pessoas permitidas simultaneamente na área de operação de máquinas'
    },
    {
      id: 5,
      nome: 'Proibido acesso sem autorização',
      tipo: 'Zona',
      local: 'Setor D',
      severidade: 'alta',
      status: 'ativa',
      descricao: 'Acesso restrito à área de armazenamento de materiais perigosos'
    },
    {
      id: 6,
      nome: 'Uso obrigatório de óculos de proteção',
      tipo: 'EPI',
      local: 'Setor B',
      severidade: 'média',
      status: 'inativa',
      descricao: 'Todos os funcionários devem utilizar óculos de proteção na área de solda'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Regras</h1>
        <div>
          <button className="btn-primary">Nova Regra</button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
              <select id="tipo" name="tipo" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todos</option>
                <option value="epi">EPI</option>
                <option value="zona">Zona</option>
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
              <label htmlFor="severidade" className="block text-sm font-medium text-gray-700">Severidade</label>
              <select id="severidade" name="severidade" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todas</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
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
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
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
              {regras.map((regra) => (
                <tr key={regra.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{regra.nome}</div>
                    <div className="text-sm text-gray-500">{regra.descricao.substring(0, 50)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{regra.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{regra.local}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      regra.severidade === 'alta' ? 'bg-red-100 text-red-800' : 
                      regra.severidade === 'média' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {regra.severidade.charAt(0).toUpperCase() + regra.severidade.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      regra.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {regra.status.charAt(0).toUpperCase() + regra.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={`/regras/${regra.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Editar
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900">
                      {regra.status === 'ativa' ? 'Desativar' : 'Ativar'}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">6</span> de <span className="font-medium">6</span> regras
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
