'use client';

import { useState, useEffect } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: string;
  image: string;
  available: boolean;
}

export interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
  lastUpdated: string;
}

export const useMenu = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do menu
  const loadMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/data/menu.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar cardápio');
      }
      
      const data = await response.json();
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Salvar dados do menu (simulado - em produção seria uma API)
  const saveMenu = async (newMenuData: MenuData) => {
    try {
      // Em um ambiente real, isso seria uma chamada para uma API
      // Por enquanto, apenas atualizamos o estado local
      setMenuData(newMenuData);
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao salvar' 
      };
    }
  };

  // Obter todos os itens do menu
  const getAllItems = (): MenuItem[] => {
    if (!menuData) return [];
    return menuData.categories.flatMap(category => category.items);
  };

  // Obter item por ID
  const getItemById = (id: number): MenuItem | undefined => {
    const allItems = getAllItems();
    return allItems.find(item => item.id === id);
  };

  // Obter próxima ID disponível
  const getNextId = (): number => {
    const allItems = getAllItems();
    if (allItems.length === 0) return 1;
    return Math.max(...allItems.map(item => item.id)) + 1;
  };

  // Adicionar novo item
  const addItem = async (categoryId: number, item: Omit<MenuItem, 'id'>) => {
    if (!menuData) return { success: false, error: 'Menu não carregado' };

    const newItem: MenuItem = {
      ...item,
      id: getNextId()
    };

    const updatedMenuData = {
      ...menuData,
      categories: menuData.categories.map(category => 
        category.id === categoryId
          ? { ...category, items: [...category.items, newItem] }
          : category
      ),
      lastUpdated: new Date().toISOString()
    };

    return await saveMenu(updatedMenuData);
  };

  // Atualizar item
  const updateItem = async (itemId: number, updatedItem: Partial<MenuItem>) => {
    if (!menuData) return { success: false, error: 'Menu não carregado' };

    const updatedMenuData = {
      ...menuData,
      categories: menuData.categories.map(category => ({
        ...category,
        items: category.items.map(item =>
          item.id === itemId ? { ...item, ...updatedItem } : item
        )
      })),
      lastUpdated: new Date().toISOString()
    };

    return await saveMenu(updatedMenuData);
  };

  // Remover item
  const removeItem = async (itemId: number) => {
    if (!menuData) return { success: false, error: 'Menu não carregado' };

    const updatedMenuData = {
      ...menuData,
      categories: menuData.categories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== itemId)
      })),
      lastUpdated: new Date().toISOString()
    };

    return await saveMenu(updatedMenuData);
  };

  // Adicionar nova categoria
  const addCategory = async (name: string) => {
    if (!menuData) return { success: false, error: 'Menu não carregado' };

    const newCategory: MenuCategory = {
      id: Math.max(...menuData.categories.map(cat => cat.id)) + 1,
      name,
      items: []
    };

    const updatedMenuData = {
      ...menuData,
      categories: [...menuData.categories, newCategory],
      lastUpdated: new Date().toISOString()
    };

    return await saveMenu(updatedMenuData);
  };

  // Carregar menu na inicialização
  useEffect(() => {
    loadMenu();
  }, []);

  return {
    menuData,
    loading,
    error,
    loadMenu,
    saveMenu,
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    removeItem,
    addCategory
  };
};
