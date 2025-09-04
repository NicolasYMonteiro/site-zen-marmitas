import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP' },
        { status: 400 }
      );
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const fileName = `item-${timestamp}${extension}`;
    
    // Caminho para salvar o arquivo
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'menu');
    const filePath = path.join(uploadDir, fileName);

    // Criar diretório se não existir
    await fs.mkdir(uploadDir, { recursive: true });

    // Converter File para Buffer e salvar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    // Retornar URL do arquivo
    const fileUrl = `/images/menu/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName 
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
