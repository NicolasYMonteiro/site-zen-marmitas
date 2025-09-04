import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'menu.json');

// POST - Adicionar categoria
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nome da categoria é obrigatório' },
        { status: 400 }
      );
    }

    // Ler arquivo atual
    const fileContent = await fs.readFile(MENU_FILE_PATH, 'utf8');
    const menuData = JSON.parse(fileContent);
    
    // Gerar ID único para categoria
    const newId = menuData.categories.length > 0 
      ? Math.max(...menuData.categories.map((cat: { id: number }) => cat.id)) + 1 
      : 1;
    
    // Adicionar nova categoria
    const newCategory = {
      id: newId,
      name: name.trim(),
      items: []
    };
    
    menuData.categories.push(newCategory);
    
    // Atualizar timestamp
    menuData.lastUpdated = new Date().toISOString();
    
    // Salvar arquivo
    await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, data: newCategory });
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar categoria' },
      { status: 500 }
    );
  }
}
