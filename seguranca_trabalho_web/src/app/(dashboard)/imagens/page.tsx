import React from 'react';
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Imagens - Sistema de Verificação de Normas de Segurança",
  description: "Gerenciamento de imagens do sistema de verificação de normas de segurança do trabalho",
};

export default function ImagensPage() {
  // Em um cenário real, estes dados viriam de uma API
  const imagens = [
    {
      id: 1,
      nome: 'Setor A - Entrada',
      camera: 'CAM01',
      data: '2025-04-18 14:32:45',
      local: 'Setor A',
      status: 'processada',
      ocorrencias: 2,
      thumbnail: '/images/thumb1.jpg'
    },
    {
      id: 2,
      nome: 'Setor B - Área de Produção',
      camera: 'CAM02',
      data: '2025-04-18 14:30:12',
      local: 'Setor B',
      status: 'processada',
      ocorrencias: 0,
      thumbnail: '/images/thumb2.jpg'
    },
    {
      id: 3,
      nome: 'Setor C - Depósito',
      camera: 'CAM03',
      data: '2025-04-18 14:28:55',
      local: 'Setor C',
      status: 'processada',
      ocorrencias: 3,
      thumbnail: '/images/thumb3.jpg'
    },
    {
      id: 4,
      nome: 'Setor D - Escritório',
      camera: 'CAM04',
      data: '2025-04-18 14:25:33',
      local: 'Setor D',
      status: 'processada',
      ocorrencias: 1,
      thumbnail: '/images/thumb4.jpg'
    },
    {
      id: 5,
      nome: 'Setor A - Saída',
      camera: 'CAM05',
      data: '2025-04-18 14:22:18',
      local: 'Setor A',
      status: 'processada',
      ocorrencias: 0,
      thumbnail: '/images/thumb5.jpg'
    },
    {
      id: 6,
      nome: 'Setor B - Refeitório',
      camera: 'CAM06',
      data: '2025-04-18 14:20:05',
      local: 'Setor B',
      status: 'processada',
      ocorrencias: 0,
      thumbnail: '/images/thumb6.jpg'
    },
    {
      id: 7,
      nome: 'Setor C - Estacionamento',
      camera: 'CAM07',
      data: '2025-04-18 14:18:42',
      local: 'Setor C',
      status: 'processada',
      ocorrencias: 1,
      thumbnail: '/images/thumb7.jpg'
    },
    {
      id: 8,
      nome: 'Setor D - Recepção',
      camera: 'CAM08',
      data: '2025-04-18 14:15:30',
      local: 'Setor D',
      status: 'processada',
      ocorrencias: 0,
      thumbnail: '/images/thumb8.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Imagens</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">Importar Imagens</button>
          <button className="btn-primary">Capturar Nova</button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
              <label htmlFor="camera" className="block text-sm font-medium text-gray-700">Câmera</label>
              <select id="camera" name="camera" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="">Todas</option>
                <option value="cam01">CAM01</option>
                <option value="cam02">CAM02</option>
                <option value="cam03">CAM03</option>
                <option value="cam04">CAM04</option>
                <option value="cam05">CAM05</option>
                <option value="cam06">CAM06</option>
                <option value="cam07">CAM07</option>
                <option value="cam08">CAM08</option>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {imagens.map((imagem) => (
            <div key={imagem.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Imagem</span>
                </div>
                {imagem.ocorrencias > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {imagem.ocorrencias} ocorrência{imagem.ocorrencias > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">{imagem.nome}</h3>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <div>{imagem.camera}</div>
                  <div>{imagem.local}</div>
                </div>
                <div className="mt-1 text-xs text-gray-500">{imagem.data}</div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    imagem.status === 'processada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {imagem.status === 'processada' ? 'Processada' : 'Pendente'}
                  </span>
                  <a href={`/imagens/${imagem.id}`} className="text-sm text-blue-600 hover:text-blue-800">
                    Detalhes
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">8</span> de <span className="font-medium">24</span> imagens
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
