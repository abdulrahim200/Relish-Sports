from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from datetime import datetime

app = FastAPI(title="Relish Sports API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client.relish_sports

# Pydantic models
class Sport(BaseModel):
    id: str
    name: str
    description: str
    image_url: str
    facilities: List[str]
    coaching_available: bool

class Facility(BaseModel):
    id: str
    name: str
    description: str
    image_url: str
    location: str
    features: List[str]

class Coach(BaseModel):
    id: str
    name: str
    designation: str
    description: str
    image_url: str
    sports: List[str]

class Branch(BaseModel):
    id: str
    name: str
    location: str
    description: str
    image_url: str
    contact_info: dict

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    message: str
    subject: str

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Relish Sports API"}

@app.get("/api/sports", response_model=List[Sport])
async def get_sports():
    sports = list(db.sports.find({}, {"_id": 0}))
    return sports

@app.get("/api/facilities", response_model=List[Facility])
async def get_facilities():
    facilities = list(db.facilities.find({}, {"_id": 0}))
    return facilities

@app.get("/api/coaches", response_model=List[Coach])
async def get_coaches():
    coaches = list(db.coaches.find({}, {"_id": 0}))
    return coaches

@app.get("/api/branches", response_model=List[Branch])
async def get_branches():
    branches = list(db.branches.find({}, {"_id": 0}))
    return branches

@app.post("/api/contact")
async def submit_contact_form(contact_form: ContactForm):
    contact_data = contact_form.dict()
    contact_data["id"] = str(uuid.uuid4())
    contact_data["submitted_at"] = datetime.now().isoformat()
    
    try:
        result = db.contact_forms.insert_one(contact_data)
        return {"message": "Contact form submitted successfully", "id": contact_data["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/contact-forms")
async def get_contact_forms():
    forms = list(db.contact_forms.find({}, {"_id": 0}))
    return forms

# Initialize database with sample data
@app.on_event("startup")
async def initialize_db():
    # Check if data already exists
    if db.sports.count_documents({}) == 0:
        # Insert sample sports data
        sports_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Cricket",
                "description": "Professional cricket training with world-class facilities including nets, coaching, and practice sessions.",
                "image_url": "/images/cricket.jpg",
                "facilities": ["Cricket Nets", "Practice Pitches", "Coaching", "Equipment"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Football",
                "description": "Football training with professional coaches and state-of-the-art turf facilities.",
                "image_url": "/images/football.jpg",
                "facilities": ["Football Turf", "Goal Posts", "Coaching", "Fitness Training"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Badminton",
                "description": "Indoor badminton courts with professional coaching and equipment rental.",
                "image_url": "/images/badminton.jpg",
                "facilities": ["Indoor Courts", "Professional Coaching", "Equipment Rental"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Table Tennis",
                "description": "Professional table tennis facilities with expert coaching and tournaments.",
                "image_url": "/images/table-tennis.jpg",
                "facilities": ["Multiple Tables", "Professional Coaching", "Tournament Facilities"],
                "coaching_available": True
            }
        ]
        db.sports.insert_many(sports_data)
        
        # Insert facilities data
        facilities_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "State of the Art Facilities",
                "description": "We aim to provide the best for our players. These turfs are made of the best in the industry polyvinyl derivatives.",
                "image_url": "/images/facilities.jpg",
                "location": "Both Branches",
                "features": ["Professional Turf", "Modern Equipment", "Safety Standards", "Maintenance"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Professional Coaching",
                "description": "Our coaches are graduates of Sports Ministry of India's mandatory A++ programmes.",
                "image_url": "/images/coaching.jpg",
                "location": "Both Branches",
                "features": ["Certified Coaches", "Structured Training", "Individual Attention", "Performance Analysis"]
            }
        ]
        db.facilities.insert_many(facilities_data)
        
        # Insert coaches data
        coaches_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Albert James",
                "designation": "CEO & Co-Founder",
                "description": "Ex-Employee at Accenture, Avid fan of Chelsea, foodie, Gym freak.",
                "image_url": "/images/albert.jpg",
                "sports": ["Football", "General Fitness"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Jameel Pasha",
                "designation": "CTO & Co-Founder",
                "description": "Ex-Employee at Zomato, Avid fan of Tottenham, Football freak.",
                "image_url": "/images/jameel.jpg",
                "sports": ["Football", "Sports Technology"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Keertan Kumar",
                "designation": "COO & Co-Founder",
                "description": "Ex-Employee at NVIDIA, Avid fan of CSK, Cricket fan.",
                "image_url": "/images/keertan.jpg",
                "sports": ["Cricket", "Operations"]
            }
        ]
        db.coaches.insert_many(coaches_data)
        
        # Insert branches data
        branches_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Relish Bangalore",
                "location": "Bangalore",
                "description": "Opened in 2017, this is our Main Branch. Located in the heart of the IT hub, perfect for young professionals.",
                "image_url": "/images/bangalore.jpg",
                "contact_info": {
                    "address": "28-1-7/4, J.P.Nagar 4th block, Besides Prestige Towers, Bangalore, Karnataka, India",
                    "phone": "+41 97454 45321"
                }
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Relish Vizag",
                "location": "Visakhapatnam",
                "description": "Opened in 2021, this is our fastest growing branch. Located along the beautiful beach road.",
                "image_url": "/images/vizag.jpg",
                "contact_info": {
                    "address": "39-39-7/1, Muralinagar, Near Masjid-e-Nabwi, Visakhapatnam, India",
                    "phone": "+1 3(467)5 4986"
                }
            }
        ]
        db.branches.insert_many(branches_data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)