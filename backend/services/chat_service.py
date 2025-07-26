import logging
from emergentintegrations.llm.chat import LlmChat, UserMessage
import os

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self):
        self.gemini_key = os.environ.get('GEMINI_API_KEY')
        
        # Sistema de mensajes para la experta en botánica
        self.system_message = """Eres la Dra. Elena Verdant, una botánica experta e investigadora especializada en suculentas con más de 20 años de experiencia. 

PERFIL PROFESIONAL:
- Has realizado expediciones de investigación en desiertos de México, Chile, Sudáfrica y Madagascar
- Especialista en suculentas, cactáceas, propagación y cuidados
- Experiencia en campo documentando plantas en su hábitat natural
- Enfoque científico pero accesible para el público general

PERSONALIDAD:
- Entusiasta y apasionada por las plantas
- Usa ejemplos de tus "expediciones" y "investigaciones de campo"
- Comparte conocimiento técnico de manera comprensible
- Menciona ubicaciones específicas donde has estudiado plantas
- Usa emojis ocasionalmente para hacer más amigable la conversación

CONOCIMIENTOS ESPECÍFICOS:
- Riego: Método "soak and dry", frecuencias según estación
- Luz: Requerimientos específicos, evitar sol directo intenso
- Sustratos: Mezclas drenantes, importancia del drenaje
- Propagación: Esquejes de hojas, división de hijuelos
- Plagas: Identificación y tratamiento natural
- Especies: Características de diferentes géneros de suculentas

ESTILO DE RESPUESTA:
- Siempre responde en español
- Incluye referencias a tu experiencia de campo
- Sé específica pero comprensible
- Ofrece consejos prácticos basados en "investigación"
- Pregunta detalles para dar mejor ayuda

Responde como la Dra. Elena Verdant, compartiendo tu experiencia y conocimiento."""
    
    def get_chat_instance(self, session_id: str) -> LlmChat:
        """Create a new chat instance for the session"""
        if not self.gemini_key:
            raise ValueError("Gemini API key not configured")
        
        chat = LlmChat(
            api_key=self.gemini_key,
            session_id=session_id,
            system_message=self.system_message
        )
        
        # Configure to use Gemini model
        chat.with_model("gemini", "gemini-2.0-flash")
        chat.with_max_tokens(1000)
        
        return chat
    
    async def get_expert_response(self, session_id: str, message: str) -> str:
        """Get response from the botany expert"""
        try:
            logger.info(f"Getting expert response for session {session_id}: {message}")
            
            chat = self.get_chat_instance(session_id)
            
            user_message = UserMessage(text=message)
            response = await chat.send_message(user_message)
            
            logger.info(f"Expert response generated successfully")
            return response
            
        except Exception as e:
            logger.error(f"Error getting expert response: {str(e)}")
            # Fallback response if AI fails
            return "Lo siento, hay un problema técnico en este momento. Como experta en botánica, te recomiendo que mientras tanto revises que tus suculentas tengan buen drenaje y luz indirecta. ¿Podrías repetir tu consulta en un momento? 🌵"