import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { fetchFileFromGithub, readGithubConfigFromEnv, updateFileOnGithub } from '@/src/lib/github';

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'menu.json');

export async function GET() {
  try {
    const gh = readGithubConfigFromEnv();
    let fileContent: string | null = null;
    if (gh) {
      fileContent = await fetchFileFromGithub(gh, 'public/data/menu.json');
    }
    if (!fileContent) {
      fileContent = await fs.readFile(MENU_FILE_PATH, 'utf8');
    }
    const menuData = JSON.parse(fileContent);
    return NextResponse.json(menuData);
  } catch (error) {
    console.error('Erro ao ler arquivo do menu:', error);
    return NextResponse.json({ error: 'Erro ao carregar cardápio' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminToken = process.env.ADMIN_TOKEN || '';
    const authHeader = request.headers.get('authorization') || '';
    const provided = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!adminToken || provided !== adminToken) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const menuData = await request.json();
    if (!menuData.categories || !Array.isArray(menuData.categories)) {
      return NextResponse.json({ error: 'Estrutura de dados inválida' }, { status: 400 });
    }

    menuData.lastUpdated = new Date().toISOString();

    const gh = readGithubConfigFromEnv();
    if (gh) {
      await updateFileOnGithub(gh, {
        path: 'public/data/menu.json',
        contentJson: menuData,
        message: 'chore(menu): update menu.json via admin',
      });
    } else {
      await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf8');
    }

    return NextResponse.json({ success: true, data: menuData });
  } catch (error) {
    console.error('Erro ao salvar arquivo do menu:', error);
    return NextResponse.json({ error: 'Erro ao salvar cardápio' }, { status: 500 });
  }
}


