from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
import uuid
from datetime import datetime
from typing import List, Optional
import base64

# Import models
from models.succulent import (
    Succulent, SucculentCreate, SucculentUpdate, 
    ImageGenerationRequest, ContentGenerationRequest, 
    GeneratedContent, ChatMessage, ChatRequest
)

# Import services
from services.image_service import ImageService
from services.chat_service import ChatService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
image_service = ImageService()
chat_service = ChatService()

# Create the main app
app = FastAPI(title="Succulent Business API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Succulent Business API is running!", "version": "1.0.0"}

# ===================== SUCCULENT CATALOG ENDPOINTS =====================

@api_router.get("/succulents", response_model=List[Succulent])
async def get_succulents():
    """Get all succulents"""
    try:
        succulents = await db.succulents.find().to_list(1000)
        return [Succulent(**succulent) for succulent in succulents]
    except Exception as e:
        logger.error(f"Error fetching succulents: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching succulents")

@api_router.get("/succulents/{succulent_id}", response_model=Succulent)
async def get_succulent(succulent_id: str):
    """Get a specific succulent"""
    try:
        succulent = await db.succulents.find_one({"id": succulent_id})
        if not succulent:
            raise HTTPException(status_code=404, detail="Succulent not found")
        return Succulent(**succulent)
    except Exception as e:
        logger.error(f"Error fetching succulent {succulent_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching succulent")

@api_router.post("/succulents", response_model=Succulent)
async def create_succulent(succulent: SucculentCreate):
    """Create a new succulent"""
    try:
        new_succulent = Succulent(**succulent.dict())
        await db.succulents.insert_one(new_succulent.dict())
        return new_succulent
    except Exception as e:
        logger.error(f"Error creating succulent: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating succulent")

@api_router.put("/succulents/{succulent_id}", response_model=Succulent)
async def update_succulent(succulent_id: str, succulent_update: SucculentUpdate):
    """Update a succulent"""
    try:
        existing_succulent = await db.succulents.find_one({"id": succulent_id})
        if not existing_succulent:
            raise HTTPException(status_code=404, detail="Succulent not found")
        
        update_data = succulent_update.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        await db.succulents.update_one(
            {"id": succulent_id},
            {"$set": update_data}
        )
        
        updated_succulent = await db.succulents.find_one({"id": succulent_id})
        return Succulent(**updated_succulent)
    except Exception as e:
        logger.error(f"Error updating succulent {succulent_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error updating succulent")

@api_router.delete("/succulents/{succulent_id}")
async def delete_succulent(succulent_id: str):
    """Delete a succulent"""
    try:
        result = await db.succulents.delete_one({"id": succulent_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Succulent not found")
        return {"message": "Succulent deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting succulent {succulent_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error deleting succulent")

# ===================== IMAGE GENERATION ENDPOINTS =====================

@api_router.post("/generate-image/openai")
async def generate_image_openai(request: ImageGenerationRequest):
    """Generate image using OpenAI"""
    try:
        image_base64 = await image_service.generate_image_openai(
            prompt=request.prompt,
            model=request.model,
            number_of_images=request.number_of_images
        )
        return {"image_base64": image_base64}
    except Exception as e:
        logger.error(f"Error generating image with OpenAI: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

@api_router.post("/generate-image/gemini")
async def generate_image_gemini(request: ImageGenerationRequest):
    """Generate image using Gemini"""
    try:
        image_base64 = await image_service.generate_image_gemini(
            prompt=request.prompt,
            model=request.model if request.model != "gpt-image-1" else "imagen-3.0-generate-002",
            number_of_images=request.number_of_images
        )
        return {"image_base64": image_base64}
    except Exception as e:
        logger.error(f"Error generating image with Gemini: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

@api_router.post("/generate-succulent-image")
async def generate_succulent_image(
    succulent_name: str = Form(...),
    description: str = Form(...),
    provider: str = Form("openai")
):
    """Generate image for a succulent"""
    try:
        image_base64 = await image_service.generate_succulent_image(
            succulent_name=succulent_name,
            description=description,
            provider=provider
        )
        return {"image_base64": image_base64}
    except Exception as e:
        logger.error(f"Error generating succulent image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

# ===================== CONTENT GENERATION ENDPOINTS =====================

@api_router.post("/generate-content", response_model=GeneratedContent)
async def generate_content(request: ContentGenerationRequest):
    """Generate marketing content"""
    try:
        # Generate image for the content
        image_base64 = await image_service.generate_marketing_content(
            content_request=request,
            provider="openai"  # Default to OpenAI for marketing content
        )
        
        # Create content record
        content = GeneratedContent(
            title=request.title,
            description=request.description,
            type=request.type,
            platform=request.platform,
            style=request.style,
            image_base64=image_base64
        )
        
        # Save to database
        await db.generated_content.insert_one(content.dict())
        
        return content
    except Exception as e:
        logger.error(f"Error generating content: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating content: {str(e)}")

@api_router.get("/generated-content", response_model=List[GeneratedContent])
async def get_generated_content():
    """Get all generated content"""
    try:
        content = await db.generated_content.find().sort("created_at", -1).to_list(100)
        return [GeneratedContent(**item) for item in content]
    except Exception as e:
        logger.error(f"Error fetching generated content: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching generated content")

# ===================== CHAT ENDPOINTS =====================

@api_router.post("/chat")
async def chat_with_expert(request: ChatRequest):
    """Chat with the botany expert"""
    try:
        # Get response from expert
        response = await chat_service.get_expert_response(
            session_id=request.session_id,
            message=request.message
        )
        
        # Save chat message to database
        chat_message = ChatMessage(
            session_id=request.session_id,
            message=request.message,
            response=response
        )
        await db.chat_messages.insert_one(chat_message.dict())
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error in chat: {str(e)}")

@api_router.get("/chat-history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id}
        ).sort("timestamp", 1).to_list(100)
        
        return [ChatMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching chat history")

# ===================== FILE UPLOAD ENDPOINTS =====================

@api_router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file and return base64"""
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read file content
        content = await file.read()
        
        # Convert to base64
        image_base64 = base64.b64encode(content).decode('utf-8')
        
        return {"image_base64": image_base64, "filename": file.filename}
    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)