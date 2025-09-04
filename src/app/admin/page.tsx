'use client';

import React, { useState } from 'react';
import { useMenu, MenuItem } from '@/hooks/useMenu';

// CPF autorizado para acesso admin (em produção, isso seria uma lista ou validação mais robusta)
const AUTHORIZED_CPF = '12345678901'; // Substitua pelo CPF real do admin

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    menuData,
    loading: menuLoading,
    error: menuError,
    addItem,
    updateItem,
    removeItem,
    addCategory
  } = useMenu();

  // Estados para formulários
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  // Formulário de novo item
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    calories: 0,
    protein: '',
    image: '',
    available: true
  });

  // Estados para upload de imagem
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingEditImage, setUploadingEditImage] = useState(false);

  // Formulário de nova categoria
  const [newCategory, setNewCategory] = useState({
    name: ''
  });

  // Autenticação por CPF
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular validação (em produção, seria uma validação real de CPF)
    setTimeout(() => {
      const cleanCpf = cpf.replace(/\D/g, '');
      if (cleanCpf === AUTHORIZED_CPF) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('CPF não autorizado para acesso administrativo');
      }
      setLoading(false);
    }, 1000);
  };

  // Adicionar novo item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addItem(selectedCategoryId, newItem);
    
    if (result.success) {
      setNewItem({
        name: '',
        description: '',
        price: 0,
        calories: 0,
        protein: '',
        image: '',
        available: true
      });
      setShowAddItem(false);
    } else {
      alert('Erro ao adicionar item: ' + result.error);
    }
  };

  // Adicionar nova categoria
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addCategory(newCategory.name);
    
    if (result.success) {
      setNewCategory({ name: '' });
      setShowAddCategory(false);
    } else {
      alert('Erro ao adicionar categoria: ' + result.error);
    }
  };

  // Editar item
  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const result = await updateItem(editingItem.id, editingItem);
    
    if (result.success) {
      setEditingItem(null);
    } else {
      alert('Erro ao atualizar item: ' + result.error);
    }
  };

  // Remover item
  const handleRemoveItem = async (itemId: number) => {
    if (confirm('Tem certeza que deseja remover este item?')) {
      const result = await removeItem(itemId);
      
      if (!result.success) {
        alert('Erro ao remover item: ' + result.error);
      }
    }
  };

  // Formatação de CPF
  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Upload de imagem
  const handleImageUpload = async (file: File, isEdit: boolean = false) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (isEdit) {
        setUploadingEditImage(true);
      } else {
        setUploadingImage(true);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no upload');
      }

      const result = await response.json();
      
      if (isEdit && editingItem) {
        setEditingItem({ ...editingItem, image: result.url });
      } else {
        setNewItem({ ...newItem, image: result.url });
      }

      return result.url;
    } catch (error) {
      alert('Erro ao fazer upload da imagem: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      return null;
    } finally {
      if (isEdit) {
        setUploadingEditImage(false);
      } else {
        setUploadingImage(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white text-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Administrativo</h1>
              <p className="text-gray-600">Digite seu CPF para acessar o painel de administração</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white font-medium rounded-lg hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verificando...' : 'Acessar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                CPF de teste: 123.456.789-01
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (menuLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  if (menuError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white flex text-gray-800 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-4">{menuError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Última atualização: {menuData?.lastUpdated ? new Date(menuData.lastUpdated).toLocaleString('pt-BR') : 'N/A'}
              </span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botões de ação */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowAddItem(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-lg hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-300"
          >
            + Adicionar Item
          </button>
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#8c2121] to-[#a52a2a] text-white rounded-lg hover:from-[#6b1a1a] hover:to-[#8c2121] transition-all duration-300"
          >
            + Adicionar Categoria
          </button>
        </div>

        {/* Lista de categorias e itens */}
        <div className="space-y-8">
          {menuData?.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-[#5d7b3b] hover:text-[#4a622f] transition-colors duration-200"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-[#5d7b3b]">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.available ? 'Disponível' : 'Indisponível'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Adicionar Item */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Adicionar Novo Item</h3>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                >
                  {menuData?.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calorias</label>
                  <input
                    type="number"
                    value={newItem.calories}
                    onChange={(e) => setNewItem({ ...newItem, calories: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proteína</label>
                <input
                  type="text"
                  value={newItem.protein}
                  onChange={(e) => setNewItem({ ...newItem, protein: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  placeholder="ex: 25g"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, false);
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#5d7b3b] transition-colors duration-200 ${
                        uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploadingImage ? 'Enviando...' : 'Escolher Imagem'}
                    </label>
                  </div>
                  
                  {newItem.image && (
                    <div className="relative">
                      <img
                        src={newItem.image}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setNewItem({ ...newItem, image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG, WebP. Máximo 5MB.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="available" className="text-sm text-gray-700">Disponível</label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-lg hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-300"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Adicionar Categoria */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Adicionar Nova Categoria</h3>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Categoria *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  placeholder="ex: Sobremesas"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-[#8c2121] to-[#a52a2a] text-white rounded-lg hover:from-[#6b1a1a] hover:to-[#8c2121] transition-all duration-300"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Item */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Editar Item</h3>
            
            <form onSubmit={handleEditItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calorias</label>
                  <input
                    type="number"
                    value={editingItem.calories}
                    onChange={(e) => setEditingItem({ ...editingItem, calories: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proteína</label>
                <input
                  type="text"
                  value={editingItem.protein}
                  onChange={(e) => setEditingItem({ ...editingItem, protein: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20"
                  placeholder="ex: 25g"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, true);
                        }
                      }}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <label
                      htmlFor="edit-image-upload"
                      className={`px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#5d7b3b] transition-colors duration-200 ${
                        uploadingEditImage ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploadingEditImage ? 'Enviando...' : 'Alterar Imagem'}
                    </label>
                  </div>
                  
                  {editingItem.image && (
                    <div className="relative">
                      <img
                        src={editingItem.image}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG, WebP. Máximo 5MB.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-available"
                  checked={editingItem.available}
                  onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="edit-available" className="text-sm text-gray-700">Disponível</label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-lg hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-300"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
