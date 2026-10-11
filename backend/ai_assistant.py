import re

MUNNAR_KNOWLEDGE_BASE = {
    "sos": (
        "🚨 **Emergency Action Plan**:\n"
        "1. **Stay Where You Are**: Avoid wandering deeper into tea plantations or unpaved forest trails.\n"
        "2. **Trigger In-App SOS**: Press the prominent red 'Trigger SOS' button so Tour Guide Jumana receives your coordinates immediately.\n"
        "3. **Battery Conservation**: Turn off unnecessary background apps and screen brightness.\n"
        "4. **Local Assistance**: For acute life-threatening emergencies, Munnar Police Station is (+91 4865 230321) and Tata Tea General Hospital is (+91 4865 230491)."
    ),
    "separated": (
        "📍 **Separated Tourist Protocol**:\n"
        "1. **Stop & Assess**: Remain in a visible, safe clearing near an identifiable landmark or road.\n"
        "2. **Open Reunion Mode**: Check the Travel Guard Reunion screen for the active meeting point (Mattupetty Dam Pavilion).\n"
        "3. **Broadcast Location**: Ensure location sharing is active so Guide Jumana can view your live pinpoint on the map.\n"
        "4. **Direct Contact**: Call your guide Jumana directly through the Group Members directory."
    ),
    "weather": (
        "⛅ **Munnar Weather & Trail Advisory**:\n"
        "Munnar's elevation (1,600m) causes sudden mist, temperature drops, and slippery moss on granite rocks.\n"
        "• Carry a windbreaker and rain poncho.\n"
        "• Keep devices protected in waterproof pouches.\n"
        "• Avoid trekking near steep gorges after 5:30 PM due to early darkness and fog."
    ),
    "wildlife": (
        "🐘 **Wildlife & Forest Caution**:\n"
        "The hills bordering Eravikulam and Lockhart Gap frequently experience wild elephant movement:\n"
        "• Never use flash photography or make loud honking noises.\n"
        "• Maintain a distance of at least 50 meters from wild animals.\n"
        "• Stay strictly on designated tourist paths with Guide Jumana."
    ),
    "first_aid": (
        "🩹 **First Aid & Health Guidance**:\n"
        "• **Leech Bites**: Do not pull violently. Apply salt, tobacco powder, or antiseptic cream.\n"
        "• **Altitude / Motion Sickness**: Sip warm water or ginger tea, take deep breaths, and rest in shaded areas.\n"
        "• **Hydration**: Drink bottled or boiled water; high altitude increases dehydration."
    ),
    "meeting_point": (
        "🚩 **Meeting Point Information**:\n"
        "The current designated group reunion point is **Mattupetty Dam Pavilion** (Coordinates: 10.1082° N, 77.1245° E). "
        "Guide Jumana has set this as the primary safe zone."
    )
}

def generate_assistant_response(user_message: str) -> dict:
    msg = user_message.lower()
    
    if any(k in msg for k in ["sos", "emergency", "danger", "help me", "hurt", "bleeding"]):
        reply = MUNNAR_KNOWLEDGE_BASE["sos"]
    elif any(k in msg for k in ["lost", "separated", "alone", "can't find", "missed group", "where is"]):
        reply = MUNNAR_KNOWLEDGE_BASE["separated"]
    elif any(k in msg for k in ["weather", "rain", "mist", "cold", "fog", "forecast"]):
        reply = MUNNAR_KNOWLEDGE_BASE["weather"]
    elif any(k in msg for k in ["elephant", "animal", "wildlife", "snake", "danger", "forest"]):
        reply = MUNNAR_KNOWLEDGE_BASE["wildlife"]
    elif any(k in msg for k in ["leech", "medic", "hospital", "doctor", "headache", "first aid", "sick"]):
        reply = MUNNAR_KNOWLEDGE_BASE["first_aid"]
    elif any(k in msg for k in ["meeting point", "where to meet", "rendezvous", "pavilion", "reunion"]):
        reply = MUNNAR_KNOWLEDGE_BASE["meeting_point"]
    elif any(k in msg for k in ["jumana", "guide", "contact"]):
        reply = "Tour Guide Jumana is leading the Munnar Tea Hills Expedition. You can contact her directly via the Group Members screen (+91 98471 23456)."
    elif any(k in msg for k in ["hello", "hi", "hey"]):
        reply = "Hello! I am your Travel Guard AI Safety Assistant. How can I assist you with trail safety, reunion points, or emergency procedures in Munnar today?"
    else:
        reply = (
            f"Here is safety guidance for your query: Stay in designated areas, keep your Travel Guard location active, "
            f"and coordinate with Guide Jumana. If you are experiencing an urgent emergency, use the SOS button or contact the guide immediately."
        )
        
    return {
        "reply": reply,
        "source": "travel_guard_safety_engine",
        "status": "success"
    }
