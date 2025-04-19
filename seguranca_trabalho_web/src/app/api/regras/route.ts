import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados para o MVP
const regras = [
  {
    id: 1,
    nome: 'Uso obrigatório de capacete',
    tipo: 'EPI',
    local: 'Setor A',
    severidade: 'alta',
    status: 'ativa',
    descricao: 'Todos os funcionários devem utilizar capacete de proteção na área de construção'
  },
  {
    id: 2,
    nome: 'Uso obrigatório de colete',
    tipo: 'EPI',
    local: 'Setor B',
    severidade: 'média',
    status: 'ativa',
    descricao: 'Todos os funcionários devem utilizar colete de segurança na área de produção'
  },
  {
    id: 3,
    nome: 'Uso obrigatório de luvas',
    tipo: 'EPI',
    local: 'Setor C',
    severidade: 'média',
    status: 'ativa',
    descricao: 'Todos os funcionários devem utilizar luvas de proteção na área de manuseio de produtos químicos'
  },
  {
    id: 4,
    nome: 'Limite de pessoas em área de risco',
    tipo: 'Zona',
    local: 'Setor A',
    severidade: 'alta',
    status: 'ativa',
    descricao: 'Máximo de 3 pessoas permitidas simultaneamente na área de operação de máquinas'
  },
  {
    id: 5,
    nome: 'Proibido acesso sem autorização',
    tipo: 'Zona',
    local: 'Setor D',
    severidade: 'alta',
    status: 'ativa',
    descricao: 'Acesso restrito à área de armazenamento de materiais perigosos'
  },
  {
    id: 6,
    nome: 'Uso obrigatório de óculos de proteção',
    tipo: 'EPI',
    local: 'Setor B',
    severidade: 'média',
    status: 'inativa',
    descricao: 'Todos os funcionários devem utilizar óculos de proteção na área de solda'
  }
];

export async function GET(request: NextRequest) {
  // Obter parâmetros de consulta
  const searchParams = request.nextUrl.searchParams;
  const tipo = searchParams.get('tipo');
  const local = searchParams.get('local');
  const severidade = searchParams.get('severidade');
  const status = searchParams.get('status');
  
  // Filtrar regras com base nos parâmetros
  let filteredRegras = [...regras];
  
  if (tipo) {
    filteredRegras = filteredRegras.filter(r => r.tipo.toLowerCase() === tipo.toLowerCase());
  }
  
  if (local) {
    filteredRegras = filteredRegras.filter(r => r.local.toLowerCase() === local.toLowerCase());
  }
  
  if (severidade) {
    filteredRegras = filteredRegras.filter(r => r.severidade.toLowerCase() === severidade.toLowerCase());
  }
  
  if (status) {
    filteredRegras = filteredRegras.filter(r => r.status.toLowerCase() === status.toLowerCase());
  }
  
  return NextResponse.json({ regras: filteredRegras });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.nome || !body.tipo || !body.local || !body.severidade || !body.descricao) {
      return NextResponse.json(
        { error: 'Dados incompletos. Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }
    
    // Criar nova regra
    const novaRegra = {
      id: regras.length + 1,
      nome: body.nome,
      tipo: body.tipo,
      local: body.local,
      severidade: body.severidade,
      status: 'ativa',
      descricao: body.descricao
    };
    
    // Adicionar à lista (em um sistema real, seria salvo no banco de dados)
    regras.push(novaRegra);
    
    return NextResponse.json({ regra: novaRegra }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID da regra é obrigatório' },
        { status: 400 }
      );
    }
    
    // Encontrar regra
    const index = regras.findIndex(r => r.id === body.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Regra não encontrada' },
        { status: 404 }
      );
    }
    
    // Atualizar regra
    const regraAtualizada = {
      ...regras[index],
      nome: body.nome || regras[index].nome,
      tipo: body.tipo || regras[index].tipo,
      local: body.local || regras[index].local,
      severidade: body.severidade || regras[index].severidade,
      status: body.status || regras[index].status,
      descricao: body.descricao || regras[index].descricao
    };
    
    regras[index] = regraAtualizada;
    
    return NextResponse.json({ regra: regraAtualizada });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}
