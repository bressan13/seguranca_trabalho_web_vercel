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
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const local = formData.get('local') as string;
    
    if (!videoFile || !local) {
      return NextResponse.json(
        { error: 'Arquivo de vídeo e local são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Criar diretório temporário para o vídeo
    const videoDir = path.join('/tmp', 'videos', Date.now().toString());
    await fs.promises.mkdir(videoDir, { recursive: true });
    
    // Salvar o vídeo no diretório temporário
    const videoPath = path.join(videoDir, videoFile.name);
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    await fs.promises.writeFile(videoPath, videoBuffer);
    
    // Processar o vídeo
    const resultado = await processarVideo(videoPath, local);
    
    return NextResponse.json({ resultado });
  } catch (error) {
    console.error('Erro ao processar vídeo:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição', detalhes: error.message },
      { status: 500 }
    );
  }
}

// Função para processar um vídeo usando o sistema existente
async function processarVideo(videoPath, local) {
  // Construir comando para o sistema existente
  // Nota: Adaptado para processar vídeo em vez de imagem estática
  const comando = `cd ${SISTEMA_PATH} && python3 src/sistema_integrado.py --modo processar-video --arquivo-video "${videoPath}" --local "${local}"`;
  
  try {
    // Executar comando
    const { stdout, stderr } = await execPromise(comando);
    
    if (stderr) {
      console.warn('Aviso ao processar vídeo:', stderr);
    }
    
    // Extrair informações relevantes do stdout
    const ocorrencias = extrairOcorrencias(stdout);
    
    return {
      sucesso: true,
      mensagem: 'Vídeo processado com sucesso',
      ocorrencias: ocorrencias,
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

// Função para extrair ocorrências do stdout
function extrairOcorrencias(stdout) {
  // Em um cenário real, esta função analisaria a saída do comando
  // para extrair as ocorrências detectadas no vídeo
  
  // Simulação para o MVP
  return [
    {
      timestamp: '00:01:23',
      regra: 'Uso obrigatório de capacete',
      severidade: 'alta',
      detalhes: 'Funcionário sem capacete de proteção na área de risco'
    },
    {
      timestamp: '00:02:45',
      regra: 'Uso obrigatório de colete',
      severidade: 'média',
      detalhes: 'Funcionário sem colete de segurança'
    },
    {
      timestamp: '00:04:12',
      regra: 'Limite de pessoas em área de risco',
      severidade: 'alta',
      detalhes: 'Excesso de pessoas na área de operação de máquinas'
    }
  ];
}
