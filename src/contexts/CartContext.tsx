'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos
export interface ComboSelection {
  subItemId: string;
  subItemName: string;
  quantity: number;
}

export interface Complement {
  id: string;
  name: string;
  price: number;
}

export interface ComplementSelection {
  complementId: string;
  complementName: string;
  price: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  isCombo?: boolean;
  comboSelections?: ComboSelection[];
  hasComplements?: boolean;
  maxComplements?: number;
  complements?: Complement[];
  selectedComplements?: ComplementSelection[];
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  complement?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  addComboItem: (item: Omit<CartItem, 'quantity'>, comboSelections: ComboSelection[]) => void;
  addItemWithComplements: (item: Omit<CartItem, 'quantity'>, selectedComplements: ComplementSelection[]) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('zen-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('zen-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === newItem.id && 
        (!item.isCombo || JSON.stringify(item.comboSelections) === JSON.stringify(newItem.comboSelections))
      );
      
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === newItem.id && 
          (!item.isCombo || JSON.stringify(item.comboSelections) === JSON.stringify(newItem.comboSelections))
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se é um novo item, adiciona com quantidade 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const addComboItem = (newItem: Omit<CartItem, 'quantity'>, comboSelections: ComboSelection[]) => {
    const comboItem = {
      ...newItem,
      isCombo: true,
      comboSelections,
      quantity: 1
    };
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === newItem.id && 
        item.isCombo && 
        JSON.stringify(item.comboSelections) === JSON.stringify(comboSelections)
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id && 
          item.isCombo && 
          JSON.stringify(item.comboSelections) === JSON.stringify(comboSelections)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, comboItem];
      }
    });
  };

  const addItemWithComplements = (newItem: Omit<CartItem, 'quantity'>, selectedComplements: ComplementSelection[]) => {
    const itemWithComplements = {
      ...newItem,
      selectedComplements,
      quantity: 1
    };
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === newItem.id && 
        !item.isCombo && 
        JSON.stringify(item.selectedComplements) === JSON.stringify(selectedComplements)
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id && 
          !item.isCombo && 
          JSON.stringify(item.selectedComplements) === JSON.stringify(selectedComplements)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, itemWithComplements];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('zen-cart');
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    const complementsPrice = item.selectedComplements?.reduce((complementsTotal, complement) => 
      complementsTotal + (complement.price * item.quantity), 0) || 0;
    return total + itemPrice + complementsPrice;
  }, 0);


  const value: CartContextType = {
    items,
    addItem,
    addComboItem,
    addItemWithComplements,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
