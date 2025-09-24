import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { fetchFileFromGithub, readGithubConfigFromEnv } from '@/lib/github';

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'menu.json');

export async function GET() {
  try {
    const gh = readGithubConfigFromEnv();
    let fileContent: string | null = null;

    // Prefer GitHub live content when configured
    if (gh) {
      fileContent = await fetchFileFromGithub(gh, 'public/data/menu.json');
    }

    // Fallback to deployed file
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


