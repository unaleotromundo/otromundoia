import React, { useState } from 'react';
import { Sparkles, Image, Video, Share2, Download, Palette, Zap, Target, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { mockSocialContent } from './mock/mockData';

const ContentCreator = () => {
  const [selectedType, setSelectedType] = useState('flyer');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(mockSocialContent);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    style: 'vanguardista',
    colors: 'suculentas',
    targetAudience: 'general',
    promotionText: '',
    includePrice: true,
    includeContact: true
  });

  const contentTypes = [
    { 
      id: 'flyer', 
      name: 'Flyer Publicitario', 
      icon: Image,
      description: 'Diseños impactantes para promociones',
      color: 'from-pink-500 to-purple-600'
    },
    { 
      id: 'reel', 
      name: 'Reel/Short', 
      icon: Video,
      description: 'Videos cortos y dinámicos',
      color: 'from-green-500 to-teal-600'
    },
    { 
      id: 'story', 
      name: 'Historia/Story', 
      icon: Sparkles,
      description: 'Contenido temporal atractivo',
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'post', 
      name: 'Post Cuadrado', 
      icon: Target,
      description: 'Publicaciones estándar',
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
    { id: 'whatsapp', name: 'WhatsApp', color: 'bg-green-600' }
  ];

  const styles = [
    { id: 'vanguardista', name: 'Vanguardista', desc: 'Diseños atrevidos y modernos' },
    { id: 'minimalista', name: 'Minimalista', desc: 'Elegante y simple' },
    { id: 'vintage', name: 'Vintage', desc: 'Retro con personalidad' },
    { id: 'natural', name: 'Natural', desc: 'Orgánico y terroso' }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulamos la generación de contenido
    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        type: selectedType,
        title: formData.title,
        description: formData.description,
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&h=600&fit=crop",
        platform: selectedPlatform,
        status: 'generated',
        style: formData.style,
        timestamp: new Date().toISOString()
      };
      setGeneratedContent([newContent, ...generatedContent]);
      setGenerating(false);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'generated': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'published': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    const typeObj = contentTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : Image;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Creador de Contenido IA
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Genera flyers, reels y contenido publicitario con estilo vanguardista
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Creation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Selection */}
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <Wand2 className="w-6 h-6 mr-2" />
                  Tipo de Contenido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          selectedType === type.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800">{type.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card className="border-2 border-pink-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                <CardTitle className="flex items-center">
                  <Share2 className="w-6 h-6 mr-2" />
                  Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedPlatform === platform.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${platform.color} mx-auto mb-2`}></div>
                      <p className="font-medium text-gray-800">{platform.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Details */}
            <Card className="border-2 border-orange-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <CardTitle className="flex items-center">
                  <Palette className="w-6 h-6 mr-2" />
                  Detalles del Contenido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ej: Promoción Especial - 3x2 en Suculentas"
                    className="border-2 border-orange-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe tu promoción o mensaje..."
                    rows={3}
                    className="border-2 border-orange-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texto Promocional</label>
                  <Input
                    value={formData.promotionText}
                    onChange={(e) => setFormData({...formData, promotionText: e.target.value})}
                    placeholder="Ej: ¡Oferta limitada! ¡No te lo pierdas!"
                    className="border-2 border-orange-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-orange-200 focus:border-purple-400 rounded-lg"
                  >
                    {styles.map(style => (
                      <option key={style.id} value={style.id}>
                        {style.name} - {style.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includePrice}
                      onChange={(e) => setFormData({...formData, includePrice: e.target.checked})}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm text-gray-700">Incluir precios</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeContact}
                      onChange={(e) => setFormData({...formData, includeContact: e.target.checked})}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm text-gray-700">Incluir contacto</span>
                  </label>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={generating || !formData.title}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 transform hover:scale-105 transition-transform"
                >
                  {generating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Generando contenido...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Generar con IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Content */}
          <div className="space-y-6">
            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Contenido Generado
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {generatedContent.map((content) => {
                  const Icon = getTypeIcon(content.type);
                  return (
                    <div key={content.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-800">{content.title}</h4>
                        </div>
                        <Badge className={`${getStatusColor(content.status)} text-white text-xs`}>
                          {content.status}
                        </Badge>
                      </div>
                      
                      <img 
                        src={content.image} 
                        alt={content.title}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      
                      <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Descargar
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-1" />
                          Compartir
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;