import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados para o MVP
const imagens = [
  {
    id: 1,
    nome: 'Setor A - Entrada',
    camera: 'CAM01',
    data: '2025-04-18 14:32:45',
    local: 'Setor A',
    status: 'processada',
    ocorrencias: 2,
    thumbnail: '/images/thumb1.jpg',
    caminho: '/images/img1.jpg'
  },
  {
    id: 2,
    nome: 'Setor B - Área de Produção',
    camera: 'CAM02',
    data: '2025-04-18 14:30:12',
    local: 'Setor B',
    status: 'processada',
    ocorrencias: 0,
    thumbnail: '/images/thumb2.jpg',
    caminho: '/images/img2.jpg'
  },
  {
    id: 3,
    nome: 'Setor C - Depósito',
    camera: 'CAM03',
    data: '2025-04-18 14:28:55',
    local: 'Setor C',
    status: 'processada',
    ocorrencias: 3,
    thumbnail: '/images/thumb3.jpg',
    caminho: '/images/img3.jpg'
  },
  {
    id: 4,
    nome: 'Setor D - Escritório',
    camera: 'CAM04',
    data: '2025-04-18 14:25:33',
    local: 'Setor D',
    status: 'processada',
    ocorrencias: 1,
    thumbnail: '/images/thumb4.jpg',
    caminho: '/images/img4.jpg'
  },
  {
    id: 5,
    nome: 'Setor A - Saída',
    camera: 'CAM05',
    data: '2025-04-18 14:22:18',
    local: 'Setor A',
    status: 'processada',
    ocorrencias: 0,
    thumbnail: '/images/thumb5.jpg',
    caminho: '/images/img5.jpg'
  },
  {
    id: 6,
    nome: 'Setor B - Refeitório',
    camera: 'CAM06',
    data: '2025-04-18 14:20:05',
    local: 'Setor B',
    status: 'processada',
    ocorrencias: 0,
    thumbnail: '/images/thumb6.jpg',
    caminho: '/images/img6.jpg'
  },
  {
    id: 7,
    nome: 'Setor C - Estacionamento',
    camera: 'CAM07',
    data: '2025-04-18 14:18:42',
    local: 'Setor C',
    status: 'processada',
    ocorrencias: 1,
    thumbnail: '/images/thumb7.jpg',
    caminho: '/images/img7.jpg'
  },
  {
    id: 8,
    nome: 'Setor D - Recepção',
    camera: 'CAM08',
    data: '2025-04-18 14:15:30',
    local: 'Setor D',
    status: 'processada',
    ocorrencias: 0,
    thumbnail: '/images/thumb8.jpg',
    caminho: '/images/img8.jpg'
  }
];

export async function GET(request: NextRequest) {
  // Obter parâmetros de consulta
  const searchParams = request.nextUrl.searchParams;
  const local = searchParams.get('local');
  const camera = searchParams.get('camera');
  const data = searchParams.get('data');
  const status = searchParams.get('status');
  
  // Filtrar imagens com base nos parâmetros
  let filteredImagens = [...imagens];
  
  if (local) {
    filteredImagens = filteredImagens.filter(i => i.local.toLowerCase() === local.toLowerCase());
  }
  
  if (camera) {
    filteredImagens = filteredImagens.filter(i => i.camera.toLowerCase() === camera.toLowerCase());
  }
  
  if (data) {
    // Simplificação para o MVP - apenas verifica se a data está contida na string de data
    filteredImagens = filteredImagens.filter(i => i.data.includes(data));
  }
  
  if (status) {
    filteredImagens = filteredImagens.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  
  return NextResponse.json({ imagens: filteredImagens });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    if (!body.nome || !body.camera || !body.local) {
      return NextResponse.json(
        { error: 'Dados incompletos. Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }
    
    // Criar nova imagem
    const novaImagem = {
      id: imagens.length + 1,
      nome: body.nome,
      camera: body.camera,
      data: new Date().toISOString().replace('T', ' ').substring(0, 19),
      local: body.local,
      status: 'pendente',
      ocorrencias: 0,
      thumbnail: body.thumbnail || '/images/default_thumb.jpg',
      caminho: body.caminho || '/images/default.jpg'
    };
    
    // Adicionar à lista (em um sistema real, seria salvo no banco de dados)
    imagens.push(novaImagem);
    
    return NextResponse.json({ imagem: novaImagem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}
