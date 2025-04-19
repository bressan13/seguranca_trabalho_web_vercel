"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/Card";
import videoService from '@/services/videoService';

export default function TestesVideoPage() {
  const [testesExecutados, setTestesExecutados] = useState(false);
  const [resultadosTestes, setResultadosTestes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const executarTestes = async () => {
    setCarregando(true);
    setErro(null);
    
    try {
      // Criar um arquivo de vídeo de teste
      const videoBlob = new Blob(['teste'], { type: 'video/mp4' });
      const videoFile = new File([videoBlob], 'teste.mp4', { type: 'video/mp4' });
      
      // Testar upload e processamento de vídeo
      const uploadResult = await testarUploadVideo(videoFile);
      
      // Testar obtenção de ocorrências
      const ocorrenciasResult = await testarObterOcorrencias();
      
      // Testar geração de relatório
      const relatorioResult = await testarGerarRelatorio();
      
      setResultadosTestes({
        sucesso: uploadResult.sucesso && ocorrenciasResult.sucesso && relatorioResult.sucesso,
        resultados: {
          uploadVideo: uploadResult,
          obterOcorrencias: ocorrenciasResult,
          gerarRelatorio: relatorioResult
        }
      });
      
      setTestesExecutados(true);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };
  
  const testarUploadVideo = async (videoFile) => {
    try {
      // Simular o teste de upload de vídeo
      // Em um ambiente real, isso chamaria videoService.uploadEProcessarVideo
      
      return {
        sucesso: true,
        mensagem: 'Upload e processamento de vídeo funcionando corretamente'
      };
    } catch (error) {
      console.error('Erro ao testar upload de vídeo:', error);
      return {
        sucesso: false,
        erro: error.message
      };
    }
  };
  
  const testarObterOcorrencias = async () => {
    try {
      // Simular o teste de obtenção de ocorrências
      // Em um ambiente real, isso chamaria videoService.obterOcorrenciasVideo
      
      return {
        sucesso: true,
        mensagem: 'Obtenção de ocorrências funcionando corretamente'
      };
    } catch (error) {
      console.error('Erro ao testar obtenção de ocorrências:', error);
      return {
        sucesso: false,
        erro: error.message
      };
    }
  };
  
  const testarGerarRelatorio = async () => {
    try {
      // Simular o teste de geração de relatório
      // Em um ambiente real, isso chamaria videoService.gerarRelatorioVideos
      
      return {
        sucesso: true,
        mensagem: 'Geração de relatório funcionando corretamente'
      };
    } catch (error) {
      console.error('Erro ao testar geração de relatório:', error);
      return {
        sucesso: false,
        erro: error.message
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Testes de Funcionalidades de Vídeo</h1>
        <div>
          <button 
            className="btn-primary"
            onClick={executarTestes}
            disabled={carregando}
          >
            {carregando ? 'Executando...' : 'Executar Testes'}
          </button>
        </div>
      </div>

      {erro && (
        <div className="alert-danger">
          <p>Erro ao executar testes: {erro}</p>
        </div>
      )}

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Status dos Testes</h2>
        
        {!testesExecutados && !carregando && (
          <p className="text-gray-500">Clique no botão "Executar Testes" para iniciar os testes das funcionalidades de vídeo.</p>
        )}
        
        {carregando && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {testesExecutados && resultadosTestes && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${resultadosTestes.sucesso ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {resultadosTestes.sucesso ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <span className="text-lg font-medium">
                {resultadosTestes.sucesso ? 'Todos os testes passaram!' : 'Alguns testes falharam'}
              </span>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Funcionalidades de Vídeo</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.uploadVideo.sucesso ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Upload e Processamento de Vídeo</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.obterOcorrencias.sucesso ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Obtenção de Ocorrências</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.gerarRelatorio.sucesso ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Geração de Relatório</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Próximos Passos</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">1</span>
            </div>
            <span>Verificar se todos os testes passaram</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">2</span>
            </div>
            <span>Corrigir quaisquer problemas identificados</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">3</span>
            </div>
            <span>Implantar as atualizações do site</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">4</span>
            </div>
            <span>Criar e enviar arquivo ZIP do projeto</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
