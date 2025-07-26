from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid


class Succulent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    care: str
    category: str
    difficulty: str = "Fácil"
    image_base64: Optional[str] = None
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class SucculentCreate(BaseModel):
    name: str
    description: str
    care: str
    category: str
    difficulty: str = "Fácil"
    image_base64: Optional[str] = None
    image_url: Optional[str] = None


class SucculentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    care: Optional[str] = None
    category: Optional[str] = None
    difficulty: Optional[str] = None
    image_base64: Optional[str] = None
    image_url: Optional[str] = None


class ImageGenerationRequest(BaseModel):
    prompt: str
    model: str = "gpt-image-1"
    number_of_images: int = 1


class ContentGenerationRequest(BaseModel):
    title: str
    description: str
    type: str  # flyer, reel, story, post
    platform: str  # instagram, facebook, tiktok, whatsapp
    style: str = "vanguardista"
    include_price: bool = True
    include_contact: bool = True
    promotion_text: Optional[str] = None


class GeneratedContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    type: str
    platform: str
    style: str
    image_base64: Optional[str] = None
    status: str = "generated"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    message: str
    response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    session_id: str
    message: str