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
                "description": "Professional cricket training with world-class facilities including nets, coaching, and practice sessions. Experience the thrill of this gentleman's game.",
                "image_url": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Cricket Nets", "Practice Pitches", "Coaching", "Equipment", "Match Grounds"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Football",
                "description": "Football training with professional coaches and state-of-the-art turf facilities. Master the beautiful game with our expert guidance.",
                "image_url": "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Football Turf", "Goal Posts", "Coaching", "Fitness Training", "Match Pitches"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Badminton",
                "description": "Indoor badminton courts with professional coaching and equipment rental. Perfect for players of all skill levels.",
                "image_url": "https://images.unsplash.com/photo-1544717117-8b808532ee78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Indoor Courts", "Professional Coaching", "Equipment Rental", "Tournament Facilities"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Table Tennis",
                "description": "Professional table tennis facilities with expert coaching and tournaments. Fast-paced action in a controlled environment.",
                "image_url": "https://images.unsplash.com/photo-1593766806881-75d3ef5c3402?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Multiple Tables", "Professional Coaching", "Tournament Facilities", "Practice Sessions"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Kabaddi",
                "description": "Traditional Indian sport that combines strength, agility, and strategy. Experience the ancient art of Kabaddi with professional training.",
                "image_url": "https://images.unsplash.com/photo-1700319021396-95aec8e168ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Kabaddi Mat", "Training Ground", "Coaching", "Fitness Training", "Team Formation"],
                "coaching_available": True
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Basketball",
                "description": "Indoor basketball courts with professional coaching and competitive leagues. Develop your skills and teamwork.",
                "image_url": "https://images.unsplash.com/photo-1602674809970-89073c530b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "facilities": ["Indoor Courts", "Professional Coaching", "League Matches", "Fitness Training"],
                "coaching_available": True
            }
        ]
        db.sports.insert_many(sports_data)
        
        # Insert facilities data
        facilities_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "State of the Art Facilities",
                "description": "We aim to provide the best for our players. These turfs are made of the best in the industry polyvinyl derivatives, and we source our equipment from the topmost sports suppliers.",
                "image_url": "https://images.unsplash.com/photo-1705593136686-d5f32b611aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "location": "Both Branches",
                "features": ["Professional Turf", "Modern Equipment", "Safety Standards", "Regular Maintenance", "Climate Control"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Professional Coaching",
                "description": "Our coaches are graduates of Sports Ministry of India's mandatory A++ programmes. Four of them have an undergraduate degree in sports sciences and studies as well.",
                "image_url": "https://images.unsplash.com/photo-1632064914162-1d99c4cb571c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "location": "Both Branches",
                "features": ["Certified Coaches", "Structured Training", "Individual Attention", "Performance Analysis", "Sports Science"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Training & Fitness Center",
                "description": "Comprehensive fitness facilities with modern equipment and expert trainers to help athletes reach their peak performance.",
                "image_url": "https://images.unsplash.com/photo-1620188500179-32ac33c60848?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "location": "Both Branches",
                "features": ["Modern Gym Equipment", "Personal Trainers", "Fitness Programs", "Nutrition Guidance", "Recovery Centers"]
            }
        ]
        db.facilities.insert_many(facilities_data)
        
        # Insert coaches data
        coaches_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Albert James",
                "designation": "CEO & Co-Founder",
                "description": "Ex-Employee at Accenture, Avid fan of Chelsea, foodie, Gym freak. Expert in football training and sports management.",
                "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "sports": ["Football", "General Fitness", "Sports Management"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Jameel Pasha",
                "designation": "CTO & Co-Founder",
                "description": "Ex-Employee at Zomato, Avid fan of Tottenham, Football freak. Specializes in sports technology and football coaching.",
                "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "sports": ["Football", "Sports Technology", "Team Strategy"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Keertan Kumar",
                "designation": "COO & Co-Founder",
                "description": "Ex-Employee at NVIDIA, Avid fan of CSK, Cricket fan. Expert in cricket coaching and operations management.",
                "image_url": "https://images.unsplash.com/photo-1500648767791-c0739923b432?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "sports": ["Cricket", "Operations", "Team Management"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Priya Sharma",
                "designation": "Head Badminton Coach",
                "description": "Former state-level badminton player with 10+ years of coaching experience. Specializes in technique and mental training.",
                "image_url": "https://images.unsplash.com/photo-1632064460079-dae5e6a25054?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "sports": ["Badminton", "Mental Training", "Youth Development"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Rajesh Patel",
                "designation": "Kabaddi Master Coach",
                "description": "National-level Kabaddi player turned coach. Expert in traditional Indian sports and fitness training.",
                "image_url": "https://images.pexels.com/photos/6296021/pexels-photo-6296021.jpeg?auto=compress&cs=tinysrgb&w=400",
                "sports": ["Kabaddi", "Traditional Sports", "Strength Training"]
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