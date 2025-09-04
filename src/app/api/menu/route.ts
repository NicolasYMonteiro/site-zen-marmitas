import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'menu.json');

// GET - Ler o cardápio
export async function GET() {
  try {
    const fileContent = await fs.readFile(MENU_FILE_PATH, 'utf8');
    const menuData = JSON.parse(fileContent);
    return NextResponse.json(menuData);
  } catch (error) {
    console.error('Erro ao ler arquivo do menu:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar cardápio' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar o cardápio
export async function PUT(request: NextRequest) {
  try {
    const menuData = await request.json();
    
    // Validar estrutura básica
    if (!menuData.categories || !Array.isArray(menuData.categories)) {
      return NextResponse.json(
        { error: 'Estrutura de dados inválida' },
        { status: 400 }
      );
    }

    // Adicionar timestamp de atualização
    menuData.lastUpdated = new Date().toISOString();

    // Salvar no arquivo
    await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, data: menuData });
  } catch (error) {
    console.error('Erro ao salvar arquivo do menu:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar cardápio' },
      { status: 500 }
    );
  }
}

// POST - Adicionar item
export async function POST(request: NextRequest) {
  try {
    const { categoryId, item } = await request.json();
    
    // Ler arquivo atual
    const fileContent = await fs.readFile(MENU_FILE_PATH, 'utf8');
    const menuData = JSON.parse(fileContent);
    
    // Encontrar categoria
    const category = menuData.categories.find((cat: { id: number }) => cat.id === categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    // Gerar ID único
    const allItems = menuData.categories.flatMap((cat: { items: { id: number }[] }) => cat.items);
    const newId = allItems.length > 0 ? Math.max(...allItems.map((item: { id: number }) => item.id)) + 1 : 1;
    
    // Adicionar item
    const newItem = { ...item, id: newId };
    category.items.push(newItem);
    
    // Atualizar timestamp
    menuData.lastUpdated = new Date().toISOString();
    
    // Salvar arquivo
    await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar item' },
      { status: 500 }
    );
  }
}

// DELETE - Remover item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    
    if (!itemId) {
      return NextResponse.json(
        { error: 'ID do item é obrigatório' },
        { status: 400 }
      );
    }

    // Ler arquivo atual
    const fileContent = await fs.readFile(MENU_FILE_PATH, 'utf8');
    const menuData = JSON.parse(fileContent);
    
    // Remover item de todas as categorias
    menuData.categories.forEach((category: { items: { id: number }[] }) => {
      category.items = category.items.filter((item: { id: number }) => item.id !== parseInt(itemId));
    });
    
    // Atualizar timestamp
    menuData.lastUpdated = new Date().toISOString();
    
    // Salvar arquivo
    await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover item:', error);
    return NextResponse.json(
      { error: 'Erro ao remover item' },
      { status: 500 }
    );
  }
}
