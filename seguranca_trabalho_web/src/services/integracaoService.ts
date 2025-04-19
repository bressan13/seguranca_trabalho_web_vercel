import React from 'react';

// Serviço para integração com o sistema existente
const integracaoService = {
  // Processar imagem
  processarImagem: async (caminho, local) => {
    try {
      const response = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'processar_imagem',
          parametros: {
            caminho,
            local
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao processar imagem');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de integração:', error);
      throw error;
    }
  },
  
  // Verificar regras
  verificarRegras: async (local, regra_id = null) => {
    try {
      const response = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'verificar_regras',
          parametros: {
            local,
            regra_id
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao verificar regras');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de integração:', error);
      throw error;
    }
  },
  
  // Gerar relatório
  gerarRelatorio: async (tipo, data_inicio = null, data_fim = null, local = null) => {
    try {
      const response = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'gerar_relatorio',
          parametros: {
            tipo,
            data_inicio,
            data_fim,
            local
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao gerar relatório');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de integração:', error);
      throw error;
    }
  }
};

export default integracaoService;
