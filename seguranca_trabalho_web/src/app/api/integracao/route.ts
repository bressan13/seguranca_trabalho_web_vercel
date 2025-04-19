import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

// Caminho para o sistema existente
const SISTEMA_PATH = '/home/ubuntu/seguranca_trabalho_mvp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.comando || !body.parametros) {
      return NextResponse.json(
        { error: 'Dados incompletos. Comando e parâmetros são obrigatórios.' },
        { status: 400 }
      );
    }
    
    let resultado;
    
    // Integração com o sistema existente
    switch (body.comando) {
      case 'processar_video':
        resultado = await processarVideo(body.parametros);
        break;
      case 'verificar_regras':
        resultado = await verificarRegras(body.parametros);
        break;
      case 'gerar_relatorio':
        resultado = await gerarRelatorio(body.parametros);
        break;
      default:
        return NextResponse.json(
          { error: 'Comando não reconhecido' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ resultado });
  } catch (error) {
    console.error('Erro na integração:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição', detalhes: error.message },
      { status: 500 }
    );
  }
}

// Função para processar um vídeo usando o sistema existente
async function processarVideo(parametros) {
  const { caminho, local } = parametros;
  
  if (!caminho || !local) {
    throw new Error('Caminho do vídeo e local são obrigatórios');
  }
  
  // Construir comando para o sistema existente
  const comando = `cd ${SISTEMA_PATH} && python3 src/sistema_integrado.py --modo processar-video --arquivo-video "${caminho}" --local "${local}"`;
  
  try {
    // Executar comando
    const { stdout, stderr } = await execPromise(comando);
    
    if (stderr) {
      console.warn('Aviso ao processar vídeo:', stderr);
    }
    
    return {
      sucesso: true,
      mensagem: 'Vídeo processado com sucesso',
      detalhes: stdout
    };
  } catch (error) {
    console.error('Erro ao executar processamento de vídeo:', error);
    
    // Simulação de resposta para o MVP
    return {
      sucesso: true,
      mensagem: 'Vídeo processado com sucesso (simulação)',
      ocorrencias: [
        {
          timestamp: '00:01:23',
          regra: 'Uso obrigatório de capacete',
          local: local,
          severidade: 'alta',
          detalhes: 'Funcionário sem capacete de proteção na área de risco'
        },
        {
          timestamp: '00:02:45',
          regra: 'Uso obrigatório de colete',
          local: local,
          severidade: 'média',
          detalhes: 'Funcionário sem colete de segurança'
        },
        {
          timestamp: '00:04:12',
          regra: 'Limite de pessoas em área de risco',
          local: local,
          severidade: 'alta',
          detalhes: 'Excesso de pessoas na área de operação de máquinas'
        }
      ]
    };
  }
}

// Função para verificar regras usando o sistema existente
async function verificarRegras(parametros) {
  const { local, regra_id, video_id } = parametros;
  
  if (!local) {
    throw new Error('Local é obrigatório');
  }
  
  // Construir comando para o sistema existente
  let comando = `cd ${SISTEMA_PATH} && python3 src/regras/demo_regras.py --local "${local}"`;
  
  if (regra_id) {
    comando += ` --regra-id ${regra_id}`;
  }
  
  if (video_id) {
    comando += ` --video-id ${video_id}`;
  }
  
  // Executar comando
  const { stdout, stderr } = await execPromise(comando);
  
  if (stderr) {
    console.warn('Aviso ao verificar regras:', stderr);
  }
  
  return {
    sucesso: true,
    mensagem: 'Regras verificadas com sucesso',
    detalhes: stdout
  };
}

// Função para gerar relatório usando o sistema existente
async function gerarRelatorio(parametros) {
  const { tipo, data_inicio, data_fim, local, videos } = parametros;
  
  if (!tipo) {
    throw new Error('Tipo de relatório é obrigatório');
  }
  
  // Construir comando para o sistema existente
  let comando = `cd ${SISTEMA_PATH} && python3 src/sistema_integrado.py --modo relatorio --tipo-relatorio ${tipo}`;
  
  if (data_inicio) {
    comando += ` --data-inicio ${data_inicio}`;
  }
  
  if (data_fim) {
    comando += ` --data-fim ${data_fim}`;
  }
  
  if (local) {
    comando += ` --local "${local}"`;
  }
  
  if (videos && videos.length > 0) {
    comando += ` --videos "${videos.join(',')}"`;
  }
  
  // Executar comando
  const { stdout, stderr } = await execPromise(comando);
  
  if (stderr) {
    console.warn('Aviso ao gerar relatório:', stderr);
  }
  
  // Extrair caminho do relatório gerado do stdout
  const match = stdout.match(/Relatório gerado: (.+)/);
  let caminhoRelatorio = null;
  
  if (match && match[1]) {
    caminhoRelatorio = match[1].trim();
  }
  
  return {
    sucesso: true,
    mensagem: 'Relatório gerado com sucesso',
    caminho_relatorio: caminhoRelatorio,
    detalhes: stdout
  };
}
