import React from 'react';

// Serviço para integração com o sistema existente para processamento de vídeos
const videoService = {
  // Upload e processamento de vídeo
  uploadEProcessarVideo: async (videoFile, local) => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('local', local);
      
      const response = await fetch('/api/videos', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Erro ao processar vídeo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de vídeo:', error);
      throw error;
    }
  },
  
  // Obter ocorrências detectadas em um vídeo específico
  obterOcorrenciasVideo: async (videoId) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/ocorrencias`);
      
      if (!response.ok) {
        throw new Error('Erro ao obter ocorrências do vídeo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de vídeo:', error);
      throw error;
    }
  },
  
  // Obter lista de vídeos processados
  obterVideosProcessados: async () => {
    try {
      const response = await fetch('/api/videos');
      
      if (!response.ok) {
        throw new Error('Erro ao obter lista de vídeos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de vídeo:', error);
      throw error;
    }
  },
  
  // Gerar relatório baseado em vídeos processados
  gerarRelatorioVideos: async (filtros) => {
    try {
      const response = await fetch('/api/relatorios/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filtros),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao gerar relatório de vídeos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de vídeo:', error);
      throw error;
    }
  }
};

export default videoService;
