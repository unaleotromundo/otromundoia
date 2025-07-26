import base64
import logging
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
from emergentintegrations.llm.gemeni.image_generation import GeminiImageGeneration
import os

logger = logging.getLogger(__name__)


class ImageService:
    def __init__(self):
        self.openai_key = os.environ.get('OPENAI_API_KEY')
        self.gemini_key = os.environ.get('GEMINI_API_KEY')
        
        if self.openai_key:
            self.openai_generator = OpenAIImageGeneration(api_key=self.openai_key)
        if self.gemini_key:
            self.gemini_generator = GeminiImageGeneration(api_key=self.gemini_key)
    
    async def generate_image_openai(self, prompt: str, model: str = "gpt-image-1", number_of_images: int = 1) -> str:
        """Generate image using OpenAI and return base64 string"""
        try:
            if not self.openai_key:
                raise ValueError("OpenAI API key not configured")
            
            logger.info(f"Generating image with OpenAI: {prompt}")
            images = await self.openai_generator.generate_images(
                prompt=prompt,
                model=model,
                number_of_images=number_of_images
            )
            
            if images and len(images) > 0:
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                return image_base64
            else:
                raise ValueError("No image was generated")
                
        except Exception as e:
            logger.error(f"Error generating image with OpenAI: {str(e)}")
            raise
    
    async def generate_image_gemini(self, prompt: str, model: str = "imagen-3.0-generate-002", number_of_images: int = 1) -> str:
        """Generate image using Gemini and return base64 string"""
        try:
            if not self.gemini_key:
                raise ValueError("Gemini API key not configured")
            
            logger.info(f"Generating image with Gemini: {prompt}")
            images = await self.gemini_generator.generate_images(
                prompt=prompt,
                model=model,
                number_of_images=number_of_images
            )
            
            if images and len(images) > 0:
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                return image_base64
            else:
                raise ValueError("No image was generated")
                
        except Exception as e:
            logger.error(f"Error generating image with Gemini: {str(e)}")
            raise
    
    async def generate_succulent_image(self, succulent_name: str, description: str, provider: str = "openai") -> str:
        """Generate image for a succulent"""
        prompt = f"Professional photography of {succulent_name}, a beautiful succulent plant. {description}. High quality, natural lighting, botanical style, detailed textures, green and colorful, indoor plant photography, 4K resolution"
        
        if provider.lower() == "openai":
            return await self.generate_image_openai(prompt)
        elif provider.lower() == "gemini":
            return await self.generate_image_gemini(prompt)
        else:
            raise ValueError("Provider must be 'openai' or 'gemini'")
    
    async def generate_marketing_content(self, content_request, provider: str = "openai") -> str:
        """Generate marketing content images"""
        style_prompts = {
            "vanguardista": "avant-garde, bold, modern, vibrant gradients, abstract geometric shapes",
            "minimalista": "clean, minimal, simple, lots of white space, elegant typography",
            "vintage": "retro, vintage colors, aged textures, classic typography",
            "natural": "organic, earthy tones, natural textures, botanical elements"
        }
        
        platform_specs = {
            "instagram": "square format 1080x1080, Instagram optimized",
            "facebook": "rectangular format 1200x630, Facebook optimized",
            "tiktok": "vertical format 1080x1920, TikTok optimized",
            "whatsapp": "square format 1080x1080, WhatsApp optimized"
        }
        
        style_desc = style_prompts.get(content_request.style, "modern and attractive")
        platform_spec = platform_specs.get(content_request.platform, "social media optimized")
        
        prompt = f"""Create a {content_request.type} for {content_request.platform} social media about succulent plants business. 
        Title: {content_request.title}
        Description: {content_request.description}
        Style: {style_desc}
        Format: {platform_spec}
        Include: Beautiful succulent plants, brand "Otro Mundo", modern design, eye-catching colors
        Business info: Succulent plant store, Uruguay
        Make it: Professional, marketing-focused, visually appealing, {content_request.style} style
        """
        
        if content_request.promotion_text:
            prompt += f"\nPromotion text: {content_request.promotion_text}"
        
        if provider.lower() == "openai":
            return await self.generate_image_openai(prompt)
        elif provider.lower() == "gemini":
            return await self.generate_image_gemini(prompt)
        else:
            raise ValueError("Provider must be 'openai' or 'gemini'")