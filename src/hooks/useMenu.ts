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
      
      const response = await fetch('/api/menu');
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

  // Salvar dados do menu
  const saveMenu = async (newMenuData: MenuData) => {
    try {
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenuData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar cardápio');
      }

      const result = await response.json();
      setMenuData(result.data);
      
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


  // Adicionar novo item
  const addItem = async (categoryId: number, item: Omit<MenuItem, 'id'>) => {
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, item }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao adicionar item');
      }

      const result = await response.json();
      
      // Atualizar estado local
      if (menuData) {
        const updatedMenuData = {
          ...menuData,
          categories: menuData.categories.map(category => 
            category.id === categoryId
              ? { ...category, items: [...category.items, result.data] }
              : category
          ),
          lastUpdated: new Date().toISOString()
        };
        setMenuData(updatedMenuData);
      }

      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao adicionar item' 
      };
    }
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
    try {
      const response = await fetch(`/api/menu?itemId=${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao remover item');
      }

      // Atualizar estado local
      if (menuData) {
        const updatedMenuData = {
          ...menuData,
          categories: menuData.categories.map(category => ({
            ...category,
            items: category.items.filter(item => item.id !== itemId)
          })),
          lastUpdated: new Date().toISOString()
        };
        setMenuData(updatedMenuData);
      }

      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao remover item' 
      };
    }
  };

  // Adicionar nova categoria
  const addCategory = async (name: string) => {
    try {
      const response = await fetch('/api/menu/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao adicionar categoria');
      }

      const result = await response.json();
      
      // Atualizar estado local
      if (menuData) {
        const updatedMenuData = {
          ...menuData,
          categories: [...menuData.categories, result.data],
          lastUpdated: new Date().toISOString()
        };
        setMenuData(updatedMenuData);
      }

      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao adicionar categoria' 
      };
    }
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
