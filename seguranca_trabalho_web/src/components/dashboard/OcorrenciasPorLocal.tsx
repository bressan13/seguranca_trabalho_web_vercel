import React from 'react';

export function OcorrenciasPorLocal() {
  // Em um cenário real, estes dados viriam de uma API
  const data = {
    labels: ['Setor A', 'Setor B', 'Setor C', 'Setor D'],
    datasets: [
      {
        data: [42, 35, 58, 21],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      },
    ],
  };

  return (
    <div className="h-full">
      {/* Simulação visual do gráfico de barras */}
      <div className="flex flex-col h-full">
        <div className="flex items-end h-64 space-x-6 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '168px' }}></div>
            <span className="mt-2 text-xs font-medium text-gray-500">Setor A</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 bg-green-500 rounded-t-md" style={{ height: '140px' }}></div>
            <span className="mt-2 text-xs font-medium text-gray-500">Setor B</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 bg-amber-500 rounded-t-md" style={{ height: '232px' }}></div>
            <span className="mt-2 text-xs font-medium text-gray-500">Setor C</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 bg-purple-500 rounded-t-md" style={{ height: '84px' }}></div>
            <span className="mt-2 text-xs font-medium text-gray-500">Setor D</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-auto">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <div>
              <div className="text-sm font-medium">Setor A</div>
              <div className="text-lg font-semibold">42</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <div>
              <div className="text-sm font-medium">Setor B</div>
              <div className="text-lg font-semibold">35</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
            <div>
              <div className="text-sm font-medium">Setor C</div>
              <div className="text-lg font-semibold">58</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <div>
              <div className="text-sm font-medium">Setor D</div>
              <div className="text-lg font-semibold">21</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
