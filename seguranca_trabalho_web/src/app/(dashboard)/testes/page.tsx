"use client";

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";
import testeService from '@/services/testeService';

export default function TestesPage() {
  const [testesExecutados, setTestesExecutados] = useState(false);
  const [resultadosTestes, setResultadosTestes] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const executarTestes = async () => {
    setCarregando(true);
    setErro(null);
    
    try {
      const resultados = await testeService.executarTodosTestes();
      setResultadosTestes(resultados);
      setTestesExecutados(true);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Testes do Sistema</h1>
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
          <p className="text-gray-500">Clique no botão "Executar Testes" para iniciar os testes do sistema.</p>
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
              <h3 className="text-md font-medium mb-2">Conexão com API</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.conexaoAPI.resultados.ocorrencias ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>API de Ocorrências</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.conexaoAPI.resultados.regras ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>API de Regras</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.conexaoAPI.resultados.imagens ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>API de Imagens</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.conexaoAPI.resultados.relatorios ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>API de Relatórios</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Integração com Sistema Existente</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.integracao.resultados.processarImagem ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Processamento de Imagens</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.integracao.resultados.verificarRegras ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Verificação de Regras</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 ${resultadosTestes.resultados.integracao.resultados.gerarRelatorio ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Geração de Relatórios</span>
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
            <span>Implantar o site permanentemente</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">4</span>
            </div>
            <span>Apresentar o site finalizado ao usuário</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
