'use client';

import React, { useState, useEffect } from 'react';
import { ComboSelection } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

interface SubItem {
  id: string;
  name: string;
  description: string;
}

interface ComboCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: ComboSelection[]) => void;
  comboName: string;
  subItems: SubItem[];
  maxSelections: number;
}

export default function ComboCustomizationModal({
  isOpen,
  onClose,
  onConfirm,
  comboName,
  subItems,
  maxSelections
}: ComboCustomizationModalProps) {
  const [selections, setSelections] = useState<ComboSelection[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelections([]);
    }
  }, [isOpen]);

  const getTotalSelections = () => {
    return selections.reduce((total, selection) => total + selection.quantity, 0);
  };

  const updateSelection = (subItemId: string, subItemName: string, quantity: number) => {
    if (quantity === 0) {
      setSelections(prev => prev.filter(s => s.subItemId !== subItemId));
      return;
    }

    setSelections(prev => {
      const existing = prev.find(s => s.subItemId === subItemId);
      if (existing) {
        return prev.map(s => 
          s.subItemId === subItemId 
            ? { ...s, quantity }
            : s
        );
      } else {
        return [...prev, { subItemId, subItemName, quantity }];
      }
    });
  };

  const getSelectionQuantity = (subItemId: string) => {
    const selection = selections.find(s => s.subItemId === subItemId);
    return selection ? selection.quantity : 0;
  };

  const handleConfirm = () => {
    const total = getTotalSelections();
    
    if (total === 0) {
      toast.error('Selecione pelo menos uma refeição para o combo');
      return;
    }

    if (total > maxSelections) {
      toast.error(`Você pode selecionar no máximo ${maxSelections} refeições`);
      return;
    }

    onConfirm(selections);
    onClose();
    toast.success('Combo personalizado adicionado ao carrinho!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Personalizar</h2>
          <p className="text-white/90">{comboName}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm">
              Selecione até {maxSelections} refeições
            </span>
            <span className="text-sm font-medium">
              {getTotalSelections()}/{maxSelections} selecionadas
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {subItems.map((subItem) => {
              const quantity = getSelectionQuantity(subItem.id);
              const canIncrease = getTotalSelections() < maxSelections;
              
              return (
                <div key={subItem.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {subItem.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {subItem.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => updateSelection(subItem.id, subItem.name, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        -
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={() => updateSelection(subItem.id, subItem.name, quantity + 1)}
                        disabled={!canIncrease}
                        className="w-8 h-8 rounded-full bg-[#5d7b3b] text-white flex items-center justify-center hover:bg-[#4a622f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-lg hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all transform hover:scale-105"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
