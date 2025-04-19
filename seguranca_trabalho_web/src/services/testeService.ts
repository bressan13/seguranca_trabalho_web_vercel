import React from 'react';

// Serviço para testes de integração
const testeService = {
  // Testar conexão com API
  testarConexaoAPI: async () => {
    try {
      // Testar API de ocorrências
      const ocorrenciasResponse = await fetch('/api/ocorrencias');
      const ocorrenciasOk = ocorrenciasResponse.ok;
      
      // Testar API de regras
      const regrasResponse = await fetch('/api/regras');
      const regrasOk = regrasResponse.ok;
      
      // Testar API de imagens
      const imagensResponse = await fetch('/api/imagens');
      const imagensOk = imagensResponse.ok;
      
      // Testar API de relatórios
      const relatoriosResponse = await fetch('/api/relatorios');
      const relatoriosOk = relatoriosResponse.ok;
      
      return {
        sucesso: ocorrenciasOk && regrasOk && imagensOk && relatoriosOk,
        resultados: {
          ocorrencias: ocorrenciasOk,
          regras: regrasOk,
          imagens: imagensOk,
          relatorios: relatoriosOk
        }
      };
    } catch (error) {
      console.error('Erro ao testar conexão com API:', error);
      return {
        sucesso: false,
        erro: error.message
      };
    }
  },
  
  // Testar integração com sistema existente
  testarIntegracao: async () => {
    try {
      // Testar processamento de imagem
      const processarImagemResponse = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'processar_imagem',
          parametros: {
            caminho: '/home/ubuntu/seguranca_trabalho_mvp/data/imagens/teste.jpg',
            local: 'Setor A'
          }
        }),
      });
      
      const processarImagemOk = processarImagemResponse.ok;
      
      // Testar verificação de regras
      const verificarRegrasResponse = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'verificar_regras',
          parametros: {
            local: 'Setor A'
          }
        }),
      });
      
      const verificarRegrasOk = verificarRegrasResponse.ok;
      
      // Testar geração de relatório
      const gerarRelatorioResponse = await fetch('/api/integracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comando: 'gerar_relatorio',
          parametros: {
            tipo: 'diario'
          }
        }),
      });
      
      const gerarRelatorioOk = gerarRelatorioResponse.ok;
      
      return {
        sucesso: processarImagemOk && verificarRegrasOk && gerarRelatorioOk,
        resultados: {
          processarImagem: processarImagemOk,
          verificarRegras: verificarRegrasOk,
          gerarRelatorio: gerarRelatorioOk
        }
      };
    } catch (error) {
      console.error('Erro ao testar integração:', error);
      return {
        sucesso: false,
        erro: error.message
      };
    }
  },
  
  // Executar todos os testes
  executarTodosTestes: async () => {
    const conexaoAPIResult = await testeService.testarConexaoAPI();
    const integracaoResult = await testeService.testarIntegracao();
    
    return {
      sucesso: conexaoAPIResult.sucesso && integracaoResult.sucesso,
      resultados: {
        conexaoAPI: conexaoAPIResult,
        integracao: integracaoResult
      }
    };
  }
};

export default testeService;
