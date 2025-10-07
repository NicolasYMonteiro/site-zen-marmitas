'use client';

import React, { useState } from 'react';
import { Complement, ComplementSelection } from '@/contexts/CartContext';

interface ComplementSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedComplements: ComplementSelection[]) => void;
  itemName: string;
  complements: Complement[];
  maxComplements: number;
}

export default function ComplementSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  complements,
  maxComplements
}: ComplementSelectionModalProps) {
  const [selectedComplements, setSelectedComplements] = useState<ComplementSelection[]>([]);

  const handleComplementToggle = (complement: Complement) => {
    setSelectedComplements(prev => {
      const isSelected = prev.some(selected => selected.complementId === complement.id);
      
      if (isSelected) {
        // Remove o complemento se já estiver selecionado
        return prev.filter(selected => selected.complementId !== complement.id);
      } else {
        // Adiciona o complemento se não estiver selecionado e não exceder o limite
        if (prev.length < maxComplements) {
          return [...prev, {
            complementId: complement.id,
            complementName: complement.name,
            price: complement.price
          }];
        }
        return prev;
      }
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedComplements);
    setSelectedComplements([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedComplements([]);
    onClose();
  };

  const calculateTotalPrice = () => {
    return selectedComplements.reduce((total, complement) => total + complement.price, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Escolha os Complementos</h2>
          <p className="text-white/90">{itemName}</p>
          <p className="text-sm text-white/80 mt-2">
            Selecione até {maxComplements} complemento{maxComplements > 1 ? 's' : ''}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complements.map((complement) => {
              const isSelected = selectedComplements.some(selected => selected.complementId === complement.id);
              const isDisabled = !isSelected && selectedComplements.length >= maxComplements;
              
              return (
                <button
                  key={complement.id}
                  onClick={() => handleComplementToggle(complement)}
                  disabled={isDisabled}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-[#5d7b3b] bg-[#5d7b3b]/10 text-[#5d7b3b]'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-[#5d7b3b]/50 hover:bg-[#5d7b3b]/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{complement.name}</h3>
                      {complement.price > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          +R$ {complement.price.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#5d7b3b] bg-[#5d7b3b]'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">
                {selectedComplements.length} de {maxComplements} complemento{maxComplements > 1 ? 's' : ''} selecionado{selectedComplements.length > 1 ? 's' : ''}
              </p>
              {selectedComplements.length > 0 && (
                <p className="text-lg font-bold text-[#5d7b3b]">
                  Total dos complementos: +R$ {calculateTotalPrice().toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-xl font-medium hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-200 transform hover:scale-105"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
