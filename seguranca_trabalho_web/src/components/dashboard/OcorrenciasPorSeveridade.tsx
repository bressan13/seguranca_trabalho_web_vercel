import React from 'react';

export function OcorrenciasPorSeveridade() {
  // Em um cenário real, estes dados viriam de uma API
  const data = {
    labels: ['Alta', 'Média', 'Baixa'],
    datasets: [
      {
        data: [28, 67, 61],
        backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Simulação visual do gráfico de pizza */}
      <div className="relative w-48 h-48 mb-4">
        <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
        <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
        <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%, 50% 0, 0 0)' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">156</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <div>
            <div className="text-sm font-medium">Alta</div>
            <div className="text-lg font-semibold">28</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
          <div>
            <div className="text-sm font-medium">Média</div>
            <div className="text-lg font-semibold">67</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <div>
            <div className="text-sm font-medium">Baixa</div>
            <div className="text-lg font-semibold">61</div>
          </div>
        </div>
      </div>
    </div>
  );
}
