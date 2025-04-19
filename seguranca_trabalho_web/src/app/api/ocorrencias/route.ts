import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados para o MVP
const ocorrencias = [
  {
    id: 1,
    regra: 'Uso obrigatório de capacete',
    local: 'Setor A',
    camera: 'CAM01',
    timestamp: '2025-04-18 14:32:45',
    severidade: 'alta',
    status: 'aberta',
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
    status: 'aberta',
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
    status: 'aberta',
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
    status: 'resolvida',
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
    status: 'resolvida',
    detalhes: 'Funcionário sem capacete de proteção na área de risco',
    imagem: '/images/ocorrencia5.jpg'
  },
  {
    id: 6,
    regra: 'Proibido acesso sem autorização',
    local: 'Setor D',
    camera: 'CAM08',
    timestamp: '2025-04-17 10:42:18',
    severidade: 'alta',
    status: 'resolvida',
    detalhes: 'Pessoa não autorizada na área restrita',
    imagem: '/images/ocorrencia6.jpg'
  }
];

export async function GET(request: NextRequest) {
  // Obter parâmetros de consulta
  const searchParams = request.nextUrl.searchParams;
  const local = searchParams.get('local');
  const severidade = searchParams.get('severidade');
  const status = searchParams.get('status');
  const data = searchParams.get('data');
  
  // Filtrar ocorrências com base nos parâmetros
  let filteredOcorrencias = [...ocorrencias];
  
  if (local) {
    filteredOcorrencias = filteredOcorrencias.filter(o => o.local.toLowerCase() === local.toLowerCase());
  }
  
  if (severidade) {
    filteredOcorrencias = filteredOcorrencias.filter(o => o.severidade.toLowerCase() === severidade.toLowerCase());
  }
  
  if (status) {
    filteredOcorrencias = filteredOcorrencias.filter(o => o.status.toLowerCase() === status.toLowerCase());
  }
  
  if (data) {
    // Simplificação para o MVP - apenas verifica se a data está contida na string de timestamp
    filteredOcorrencias = filteredOcorrencias.filter(o => o.timestamp.includes(data));
  }
  
  return NextResponse.json({ ocorrencias: filteredOcorrencias });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.regra || !body.local || !body.camera || !body.severidade || !body.detalhes) {
      return NextResponse.json(
        { error: 'Dados incompletos. Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }
    
    // Criar nova ocorrência
    const novaOcorrencia = {
      id: ocorrencias.length + 1,
      regra: body.regra,
      local: body.local,
      camera: body.camera,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      severidade: body.severidade,
      status: 'aberta',
      detalhes: body.detalhes,
      imagem: body.imagem || '/images/default.jpg'
    };
    
    // Adicionar à lista (em um sistema real, seria salvo no banco de dados)
    ocorrencias.push(novaOcorrencia);
    
    return NextResponse.json({ ocorrencia: novaOcorrencia }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}
