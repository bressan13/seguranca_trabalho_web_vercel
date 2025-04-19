import React from 'react';

export function RecentOcorrencias() {
  // Em um cenário real, estes dados viriam de uma API
  const ocorrencias = [
    {
      id: 1,
      regra: 'Uso obrigatório de capacete',
      local: 'Setor A',
      camera: 'CAM01',
      timestamp: '2025-04-18 14:32:45',
      severidade: 'alta',
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
      detalhes: 'Funcionário sem capacete de proteção na área de risco',
      imagem: '/images/ocorrencia5.jpg'
    }
  ];

  return (
    <div className="overflow-hidden">
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
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ocorrencias.map((ocorrencia) => (
            <tr key={ocorrencia.id}>
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={`/ocorrencias/${ocorrencia.id}`} className="text-blue-600 hover:text-blue-900">
                  Detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
