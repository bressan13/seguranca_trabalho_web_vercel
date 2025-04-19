import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados para o MVP
const relatorios = [
  {
    id: 1,
    nome: 'Relatório Semanal - Setor A',
    tipo: 'semanal',
    periodo: '12/04/2025 - 18/04/2025',
    local: 'Setor A',
    ocorrencias: 12,
    status: 'gerado',
    data_geracao: '18/04/2025 18:00:00',
    formato: 'PDF',
    url: '/relatorios/semanal_setorA_20250418.pdf'
  },
  {
    id: 2,
    nome: 'Relatório Semanal - Setor B',
    tipo: 'semanal',
    periodo: '12/04/2025 - 18/04/2025',
    local: 'Setor B',
    ocorrencias: 8,
    status: 'gerado',
    data_geracao: '18/04/2025 18:00:00',
    formato: 'PDF',
    url: '/relatorios/semanal_setorB_20250418.pdf'
  },
  {
    id: 3,
    nome: 'Relatório Semanal - Setor C',
    tipo: 'semanal',
    periodo: '12/04/2025 - 18/04/2025',
    local: 'Setor C',
    ocorrencias: 15,
    status: 'gerado',
    data_geracao: '18/04/2025 18:00:00',
    formato: 'PDF',
    url: '/relatorios/semanal_setorC_20250418.pdf'
  },
  {
    id: 4,
    nome: 'Relatório Semanal - Setor D',
    tipo: 'semanal',
    periodo: '12/04/2025 - 18/04/2025',
    local: 'Setor D',
    ocorrencias: 5,
    status: 'gerado',
    data_geracao: '18/04/2025 18:00:00',
    formato: 'PDF',
    url: '/relatorios/semanal_setorD_20250418.pdf'
  },
  {
    id: 5,
    nome: 'Relatório Mensal - Todos os Setores',
    tipo: 'mensal',
    periodo: '01/04/2025 - 30/04/2025',
    local: 'Todos',
    ocorrencias: 156,
    status: 'agendado',
    data_geracao: '30/04/2025 23:59:59',
    formato: 'PDF',
    url: null
  },
  {
    id: 6,
    nome: 'Relatório Personalizado - Uso de EPIs',
    tipo: 'personalizado',
    periodo: '01/03/2025 - 18/04/2025',
    local: 'Todos',
    ocorrencias: 87,
    status: 'gerado',
    data_geracao: '18/04/2025 10:15:22',
    formato: 'CSV',
    url: '/relatorios/personalizado_epis_20250418.csv'
  }
];

export async function GET(request: NextRequest) {
  // Obter parâmetros de consulta
  const searchParams = request.nextUrl.searchParams;
  const tipo = searchParams.get('tipo');
  const local = searchParams.get('local');
  const status = searchParams.get('status');
  const formato = searchParams.get('formato');
  
  // Filtrar relatórios com base nos parâmetros
  let filteredRelatorios = [...relatorios];
  
  if (tipo) {
    filteredRelatorios = filteredRelatorios.filter(r => r.tipo.toLowerCase() === tipo.toLowerCase());
  }
  
  if (local) {
    filteredRelatorios = filteredRelatorios.filter(r => r.local.toLowerCase() === local.toLowerCase());
  }
  
  if (status) {
    filteredRelatorios = filteredRelatorios.filter(r => r.status.toLowerCase() === status.toLowerCase());
  }
  
  if (formato) {
    filteredRelatorios = filteredRelatorios.filter(r => r.formato.toLowerCase() === formato.toLowerCase());
  }
  
  return NextResponse.json({ relatorios: filteredRelatorios });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.nome || !body.tipo || !body.local || !body.formato) {
      return NextResponse.json(
        { error: 'Dados incompletos. Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }
    
    // Determinar período com base no tipo
    let periodo = '';
    const hoje = new Date();
    
    if (body.tipo === 'diario') {
      const dataFormatada = hoje.toLocaleDateString('pt-BR');
      periodo = `${dataFormatada}`;
    } else if (body.tipo === 'semanal') {
      const inicioSemana = new Date(hoje);
      inicioSemana.setDate(hoje.getDate() - hoje.getDay());
      const fimSemana = new Date(inicioSemana);
      fimSemana.setDate(inicioSemana.getDate() + 6);
      
      periodo = `${inicioSemana.toLocaleDateString('pt-BR')} - ${fimSemana.toLocaleDateString('pt-BR')}`;
    } else if (body.tipo === 'mensal') {
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
      
      periodo = `${inicioMes.toLocaleDateString('pt-BR')} - ${fimMes.toLocaleDateString('pt-BR')}`;
    } else if (body.tipo === 'personalizado') {
      if (!body.dataInicio || !body.dataFim) {
        return NextResponse.json(
          { error: 'Para relatórios personalizados, dataInicio e dataFim são obrigatórios.' },
          { status: 400 }
        );
      }
      periodo = `${body.dataInicio} - ${body.dataFim}`;
    }
    
    // Criar novo relatório
    const novoRelatorio = {
      id: relatorios.length + 1,
      nome: body.nome,
      tipo: body.tipo,
      periodo: periodo,
      local: body.local,
      ocorrencias: 0, // Será calculado durante a geração real
      status: body.agendado ? 'agendado' : 'gerado',
      data_geracao: body.agendado ? body.dataAgendamento : new Date().toLocaleString('pt-BR'),
      formato: body.formato,
      url: body.agendado ? null : `/relatorios/${body.tipo}_${body.local.replace(' ', '')}_${hoje.toISOString().split('T')[0].replace(/-/g, '')}.${body.formato.toLowerCase()}`
    };
    
    // Adicionar à lista (em um sistema real, seria salvo no banco de dados)
    relatorios.push(novoRelatorio);
    
    return NextResponse.json({ relatorio: novoRelatorio }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}
