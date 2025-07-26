import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Globe, BookOpen, Microscope, Camera, MapPin, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "¡Hola! Soy la Dra. Elena Verdant, botánica e investigadora especializada en suculentas 🌵. He dedicado más de 20 años estudiando plantas en desiertos de México, Chile, Sudáfrica y Madagascar. ¿En qué puedo ayudarte con tus suculentas hoy?",
      timestamp: new Date().toLocaleTimeString(),
      emotion: 'enthusiastic'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock responses para demostración
  const mockResponses = {
    'cuidados': "¡Excelente pregunta! En mis expediciones por el desierto de Atacama, aprendí que las suculentas necesitan tres cosas fundamentales: **drenaje perfecto** (como en su hábitat natural), **luz brillante pero indirecta** durante el día, y **riego profundo pero espaciado**. ¿Tienes alguna suculenta específica en mente?",
    'riego': "Ah, el riego... ¡Es el arte más delicado! Durante mis estudios en Madagascar, observé que las suculentas prefieren el método 'soak and dry' - regar abundantemente hasta que drene por los agujeros, luego esperar a que el sustrato se seque completamente. En primavera-verano cada 7-10 días, en invierno cada 15-20 días. ¿Has notado algún problema con el riego?",
    'luz': "¡La luz es crucial! En mis investigaciones en Sudáfrica, documenté que las suculentas necesitan entre 6-8 horas de luz brillante pero **no directa** durante las horas más intensas. Una ventana este u oeste es ideal. Si las hojas se estiran (etoliación), necesitan más luz. Si se ponen rojizas o amarillas, quizás demasiada luz directa.",
    'plagas': "En mis viajes por diferentes continentes, he encontrado que las plagas más comunes son: **cochinillas** (como algodoncitos blancos), **pulgones** (pequenos insectos verdes), y **ácaros** (telarañas finas). Mi remedio natural favorito: alcohol isopropílico al 70% con un hisopo. ¿Has visto algo extraño en tus plantas?",
    'reproduccion': "¡La reproducción es fascinante! Durante mis estudios de campo, he observado múltiples métodos: **esquejes de hojas** (mi favorito para principiantes), **división de hijuelos**, y **esquejes de tallo**. Las suculentas tienen una capacidad increíble de regeneración. ¿Quieres que te guíe paso a paso?",
    'sustrato': "El sustrato perfecto lo desarrollé después de años de investigación: 40% tierra para cactus, 30% perlita, 20% arena gruesa, y 10% piedra pómez. ¡Debe drenar en segundos! En la naturaleza, crecen en suelos rocosos y arenosos. Nunca uses tierra común de jardín.",
    'default': "¡Qué interesante! En mis años de investigación alrededor del mundo, he aprendido que cada suculenta tiene su propia personalidad. Cuéntame más detalles sobre tu consulta y te ayudo con mi experiencia de campo. ¿Es sobre cuidados, identificación, o reproducción?"
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('riego') || lowerMessage.includes('agua')) {
      return mockResponses.riego;
    } else if (lowerMessage.includes('luz') || lowerMessage.includes('sol')) {
      return mockResponses.luz;
    } else if (lowerMessage.includes('plaga') || lowerMessage.includes('insecto') || lowerMessage.includes('bichos')) {
      return mockResponses.plagas;
    } else if (lowerMessage.includes('reproducir') || lowerMessage.includes('esqueje') || lowerMessage.includes('propagar')) {
      return mockResponses.reproduccion;
    } else if (lowerMessage.includes('sustrato') || lowerMessage.includes('tierra') || lowerMessage.includes('suelo')) {
      return mockResponses.sustrato;
    } else if (lowerMessage.includes('cuidado') || lowerMessage.includes('como') || lowerMessage.includes('ayuda')) {
      return mockResponses.cuidados;
    } else {
      return mockResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString(),
        emotion: 'helpful'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "¿Cómo riego mis suculentas?",
    "¿Qué luz necesitan?",
    "¿Cómo reproducir por esquejes?",
    "¿Qué sustrato usar?",
    "¿Cómo identificar plagas?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Chat con Experta en Botánica
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conversa con la Dra. Elena Verdant, investigadora especializada en suculentas
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Expert Profile */}
          <Card className="border-2 border-green-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <CardTitle className="flex items-center">
                <Microscope className="w-6 h-6 mr-2" />
                Experta
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-green-200">
                  <AvatarImage src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face" />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl font-bold">EV</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-green-800">Dra. Elena Verdant</h3>
                <p className="text-sm text-gray-600">Botánica e Investigadora</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span>20+ años de experiencia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Expediciones mundiales</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Camera className="w-4 h-4 text-purple-600" />
                  <span>Documentación científica</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-green-800 mb-2">Especialidades:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Suculentas</Badge>
                  <Badge variant="secondary" className="text-xs">Cactáceas</Badge>
                  <Badge variant="secondary" className="text-xs">Propagación</Badge>
                  <Badge variant="secondary" className="text-xs">Cuidados</Badge>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-green-800 mb-2">Ubicaciones estudiadas:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Desierto de Atacama, Chile</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Karoo, Sudáfrica</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Desierto de Sonora, México</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Madagascar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 border-2 border-teal-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
              <CardTitle className="flex items-center">
                <Bot className="w-6 h-6 mr-2" />
                Consulta Botánica
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Quick Questions */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-2">💡 Preguntas rápidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(question)}
                      className="text-xs hover:bg-teal-50 hover:border-teal-300"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-800">Dra. Elena</span>
                          </div>
                        )}
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800">Dra. Elena</span>
                        <span className="text-xs text-gray-500">escribiendo...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pregunta sobre cuidados, identificación, reproducción..."
                    className="flex-1 border-2 border-teal-200 focus:border-blue-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;