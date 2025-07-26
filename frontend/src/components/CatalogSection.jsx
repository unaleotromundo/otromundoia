import React, { useState } from 'react';
import { Plus, Edit, Trash2, Camera, Upload, Sparkles, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { mockSucculents, mockPricing } from './mock/mockData';

const CatalogSection = () => {
  const [succulents, setSucculents] = useState(mockSucculents);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    care: '',
    image: '',
    category: '',
    difficulty: 'Fácil'
  });

  const categories = ['all', ...new Set(succulents.map(s => s.category))];
  const difficulties = ['Muy Fácil', 'Fácil', 'Intermedio', 'Avanzado'];

  const filteredSucculents = succulents.filter(succulent => {
    const matchesSearch = succulent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         succulent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || succulent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSucculents(succulents.map(s => 
        s.id === editingId ? { ...s, ...formData } : s
      ));
      setEditingId(null);
    } else {
      const newSucculent = {
        id: Date.now(),
        ...formData
      };
      setSucculents([...succulents, newSucculent]);
    }
    setFormData({
      name: '',
      description: '',
      care: '',
      image: '',
      category: '',
      difficulty: 'Fácil'
    });
    setIsAdding(false);
  };

  const handleEdit = (succulent) => {
    setFormData(succulent);
    setEditingId(succulent.id);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    setSucculents(succulents.filter(s => s.id !== id));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Muy Fácil': return 'bg-green-500';
      case 'Fácil': return 'bg-blue-500';
      case 'Intermedio': return 'bg-yellow-500';
      case 'Avanzado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Catálogo de Suculentas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona tu colección de suculentas con estilo y elegancia
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar suculentas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 text-lg border-2 border-green-200 focus:border-purple-400"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-green-200 focus:border-purple-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas las categorías' : cat}
                </option>
              ))}
            </select>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white px-6 py-3 h-12 transform hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar Suculenta
            </Button>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-green-100 to-purple-100 rounded-xl p-6 mb-8 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-4">💰 Precios en Pesos Uruguayos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-bold text-green-700 mb-2">🪴 Macetas Chicas</h4>
              <div className="space-y-1 text-sm">
                <div>1 planta: <span className="font-bold text-green-600">$250</span></div>
                <div>2 plantas: <span className="font-bold text-green-600">$400</span></div>
                <div>3 plantas: <span className="font-bold text-green-600">$500</span></div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-bold text-purple-700 mb-2">🏺 Macetas Medianas</h4>
              <div className="space-y-1 text-sm">
                <div>1 planta: <span className="font-bold text-purple-600">$450</span></div>
                <div>2 plantas: <span className="font-bold text-purple-600">$800</span></div>
                <div>3 plantas: <span className="font-bold text-purple-600">$1100</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <Card className="mb-8 border-2 border-purple-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-purple-600 text-white">
              <CardTitle className="flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                {editingId ? 'Editar Suculenta' : 'Agregar Nueva Suculenta'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-2 border-green-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      className="border-2 border-green-200 focus:border-purple-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={3}
                    className="border-2 border-green-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuidados</label>
                  <Textarea
                    value={formData.care}
                    onChange={(e) => setFormData({...formData, care: e.target.value})}
                    required
                    rows={3}
                    className="border-2 border-green-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dificultad</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-green-200 focus:border-purple-400 rounded-lg"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Cargar desde disco
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <Camera className="w-4 h-4 mr-2" />
                      Tomar foto
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar con IA
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 text-white">
                    {editingId ? 'Actualizar' : 'Agregar'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                      setFormData({
                        name: '',
                        description: '',
                        care: '',
                        image: '',
                        category: '',
                        difficulty: 'Fácil'
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Succulents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSucculents.map((succulent) => (
            <Card key={succulent.id} className="group overflow-hidden border-2 border-green-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={succulent.image} 
                  alt={succulent.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(succulent)}
                    className="bg-white/90 hover:bg-white text-green-600 hover:text-green-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(succulent.id)}
                    className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge className={`${getDifficultyColor(succulent.difficulty)} text-white`}>
                    {succulent.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/90 text-green-700">
                    {succulent.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-green-800">{succulent.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-gray-300 text-gray-300" />
                  </div>
                </div>
                
                <p className="text-gray-600 line-clamp-3">{succulent.description}</p>
                
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Cuidados
                  </h4>
                  <p className="text-sm text-green-700">{succulent.care}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSucculents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌵</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron suculentas</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda o agrega nuevas suculentas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogSection;