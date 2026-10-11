const { useState, useEffect, useRef } = React;

// ============================================================================
// 1. LUCIDE-STYLE SVG ICONS (Self-contained, pixel-perfect, scalable)
// ============================================================================

const IconShieldLeaf = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M20 3L7 8.5V18.2C7 27.1 12.5 35.3 20 37.8C27.5 35.3 33 27.1 33 18.2V8.5L20 3Z" 
      fill="#075B50" 
    />
    <path 
      d="M20 7.2L10 11.4V18.5C10 25.5 14.3 31.9 20 33.9C25.7 31.9 30 25.5 30 18.5V11.4L20 7.2Z" 
      fill="#176B57" 
    />
    <path 
      d="M20 12C20 12 14.5 17 14.5 22C14.5 25.04 16.96 27.5 20 27.5C23.04 27.5 25.5 25.04 25.5 22C25.5 17 20 12 20 12Z" 
      fill="#FFFFFF" 
    />
    <path d="M20 15V26" stroke="#176B57" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17.5 19.5C18.5 20.2 19.5 20.8 20 21" stroke="#176B57" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M22.5 18C21.5 18.9 20.5 19.7 20 20" stroke="#176B57" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const Home = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const MapPin = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Users = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldCheck = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ShieldAlert = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Bell = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Clock = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Calendar = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Settings = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Radio = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </svg>
);

const Crosshair = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

const Plus = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Minus = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeft = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckCircle2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlertTriangle = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Bot = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="14" x="3" y="6" rx="2" />
    <path d="M12 2v4" />
    <circle cx="8" cy="13" r="1" />
    <circle cx="16" cy="13" r="1" />
    <path d="M9 17h6" />
  </svg>
);

const X = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Compass = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const Layers = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const Navigation = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const Send = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const RefreshCw = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const Menu = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const Search = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const Filter = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const Phone = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Battery = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
  </svg>
);

const Check = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Trash2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const ExternalLink = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Info = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Flame = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const ChevronRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);


// ============================================================================
// 2. SHARED DATA MODELS: TOUR GUIDE (JUMANA) & 4 TOURISTS
// ============================================================================

const TOUR_GUIDE = {
  name: "Jumana",
  role: "Tour Guide",
  passId: "#TG-GUIDE-MUNNAR-01",
  assignedGroup: "Munnar Highlands Expedition",
  battery: "98%",
  signal: "Mesh Signal 100% Online",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
};

const INITIAL_TOURISTS = [
  {
    id: "hisha",
    name: "Hisha",
    fullName: "Hisha Mariyam",
    status: "Safe", // "Safe", "Overdue", "Emergency"
    locationStatus: "With Group", // "With Group", "Separated", "Reunited", "Location Unavailable"
    lat: 10.0935,
    lng: 77.0640,
    locationLabel: "Old Munnar Tea Trail (600m NE)",
    battery: "92%",
    lastCheckIn: "4 mins ago",
    initials: "HM",
    phone: "+91 98471 23001",
    notes: "Trekking along tea garden path with group partner Rinsha. Standard pace.",
    medicalNotes: "No known allergies. Carrying personal hydration pack.",
    emergencyContact: "+91 94471 00112 (Family - Brother)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "rinsha",
    name: "Rinsha",
    fullName: "Rinsha Fathima",
    status: "Safe",
    locationStatus: "With Group",
    lat: 10.0845,
    lng: 77.0520,
    locationLabel: "Attukad Ridge Overlook (850m SW)",
    battery: "85%",
    lastCheckIn: "6 mins ago",
    initials: "RF",
    phone: "+91 98471 23002",
    notes: "Comfortable trekking pace. Taking landscape photographs at ridge bend.",
    medicalNotes: "Mild asthma inhaler in side pocket. Fit for mountain walks.",
    emergencyContact: "+91 94471 00223 (Emergency Contact - Spouse)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "sana",
    name: "Sana",
    fullName: "Sana Parveen",
    status: "Safe",
    locationStatus: "With Group",
    lat: 10.0910,
    lng: 77.0550,
    locationLabel: "Blossom Hydel Path (450m NW)",
    battery: "78%",
    lastCheckIn: "2 mins ago",
    initials: "SP",
    phone: "+91 98471 23003",
    notes: "Walking near visitor garden center. Steady heart rate and telemetry.",
    medicalNotes: "Carries epi-pen. All clear on trail health assessment.",
    emergencyContact: "+91 94471 00334 (Guardian - Mother)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "dilrooba",
    name: "Dilrooba",
    fullName: "Dilrooba Jasim",
    status: "Safe",
    locationStatus: "With Group",
    lat: 10.0820,
    lng: 77.0680,
    locationLabel: "Pothamedu Rest Point (1.1km SE)",
    battery: "64%",
    lastCheckIn: "8 mins ago",
    initials: "DJ",
    phone: "+91 98471 23004",
    notes: "Resting at scenic tea plantation gazebo. In regular beacon contact.",
    medicalNotes: "Standard first aid clearance. No medical alerts.",
    emergencyContact: "+91 94471 00445 (Emergency Contact - Parent)",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80"
  }
];

const DEFAULT_MEETING_POINT = {
  id: "mp-1",
  name: "Munnar Tea Museum & Visitor Checkpoint",
  lat: 10.0889,
  lng: 77.0595,
  description: "Designated safe assembly hub with certified rangers, clean water, first aid, and sat-comm."
};

const PRESET_MEETING_POINTS = [
  { id: "mp-1", name: "Munnar Tea Museum & Visitor Checkpoint", lat: 10.0889, lng: 77.0595, description: "Main assembly hub with ranger station and mesh repeater." },
  { id: "mp-2", name: "Old Munnar Town Square Checkpoint", lat: 10.0895, lng: 77.0610, description: "Central police outpost and pilgrim medical booth." },
  { id: "mp-3", name: "Hydel Park Gate 1 Pavilion", lat: 10.0840, lng: 77.0600, description: "Park ranger pavilion with emergency shelter." },
  { id: "mp-4", name: "Attukad Bridge Ranger Post", lat: 10.0820, lng: 77.0515, description: "Highland pass checkpost with satellite transmitter." }
];

// ============================================================================
// 2.5 BACKEND REST API CLIENT (Connected to http://127.0.0.1:5000)
// ============================================================================

const API_BASE = (() => {
  if (typeof window !== "undefined") {
    // If hosted on Vercel or any remote production domain
    if (window.location.hostname !== "127.0.0.1" && window.location.hostname !== "localhost") {
      return `${window.location.origin}/api`;
    }
  }
  // Local development fallback (port 5000 REST backend)
  return "http://127.0.0.1:5000/api";
})();

const apiService = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },
  async getDashboardSummary(groupId = "grp-munnar-01") {
    const res = await fetch(`${API_BASE}/dashboard/summary?groupId=${groupId}`);
    if (!res.ok) throw new Error("Failed to fetch dashboard summary");
    return res.json();
  },
  async getMembers(groupId = "grp-munnar-01") {
    const res = await fetch(`${API_BASE}/groups/${groupId}/members`);
    if (!res.ok) throw new Error("Failed to fetch members");
    return res.json();
  },
  async getAlerts() {
    const res = await fetch(`${API_BASE}/alerts`);
    if (!res.ok) throw new Error("Failed to fetch alerts");
    return res.json();
  },
  async triggerSos({ touristId, groupId = "grp-munnar-01", category, priority, description }) {
    const res = await fetch(`${API_BASE}/alerts/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourist_id: touristId, group_id: groupId, category, priority, description })
    });
    if (!res.ok) throw new Error("Failed to record SOS in database");
    return res.json();
  },
  async resolveAlert(alertId) {
    const res = await fetch(`${API_BASE}/alerts/${alertId}/resolve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Failed to resolve alert in database");
    return res.json();
  },
  async reopenAlert(alertId) {
    const res = await fetch(`${API_BASE}/alerts/${alertId}/reopen`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Failed to reopen alert in database");
    return res.json();
  },
  async getReunion(groupId = "grp-munnar-01") {
    const res = await fetch(`${API_BASE}/groups/${groupId}/reunion`);
    if (!res.ok) throw new Error("Failed to fetch reunion records");
    return res.json();
  },
  async updateMeetingPoint(groupId = "grp-munnar-01", name, lat, lng) {
    const res = await fetch(`${API_BASE}/groups/${groupId}/meeting-point`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meeting_point_name: name, meeting_point_lat: lat, meeting_point_lng: lng })
    });
    if (!res.ok) throw new Error("Failed to update meeting point");
    return res.json();
  },
  async markTouristReunited(touristId) {
    const res = await fetch(`${API_BASE}/members/${touristId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ membership_status: "with_group", reunion_status: "reunited" })
    });
    if (!res.ok) throw new Error("Failed to update reunion status");
    return res.json();
  },
  async getNotifications() {
    const res = await fetch(`${API_BASE}/notifications`);
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
  },
  async sendAssistantChat(message) {
    const res = await fetch(`${API_BASE}/assistant/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error("Failed to query AI assistant backend");
    return res.json();
  },
  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error("Failed to fetch tour guide profile");
    return res.json();
  },
  async updateProfile({ name, phone }) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to update profile in database");
    }
    return res.json();
  }
};

// ============================================================================
// 3. REUSABLE SHARED NAVIGATION & DIALOG COMPONENTS
// ============================================================================

// --- Tour Guide Profile Modal ---
function EditProfileModal({ isOpen, onClose, tourGuide, onSaveProfile }) {
  if (!isOpen) return null;
  const [name, setName] = useState(tourGuide?.name || "");
  const [phone, setPhone] = useState(tourGuide?.phone || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter a valid tour guide name.");
      return;
    }
    setErrorMsg("");
    setIsSaving(true);
    try {
      await onSaveProfile({ name: name.trim(), phone: phone.trim() });
      setSuccessMsg("Tour Guide profile updated and saved to database!");
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to save profile to database.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm modal-enter">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#075B50]/15 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-[#075B50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF7F0] flex items-center justify-center text-[#075B50]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#075B50]">Edit Tour Guide Profile</h3>
            <p className="text-xs text-[#507A70]">Updates guide name across all 9 screens & database</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#075B50] mb-1">Tour Guide Full Name *</label>
            <input 
              type="text" 
              required
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amina or Jumana"
              disabled={isSaving}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 focus:outline-none focus:ring-2 focus:ring-[#075B50]/30 text-xs text-[#1A332D]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#075B50] mb-1">Contact Phone Number</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98471 23456"
              disabled={isSaving}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 focus:outline-none focus:ring-2 focus:ring-[#075B50]/30 text-xs text-[#1A332D]"
            />
          </div>

          <div className="p-3 bg-[#EAF7F0]/60 rounded-xl border border-[#075B50]/10 text-[11px] text-[#176B57]">
            Badge ID: <strong>{tourGuide?.passId || "#TG-GUIDE-MUNNAR-01"}</strong> • Sector: <strong>{tourGuide?.assignedGroup || "Munnar Highlands Expedition"}</strong>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#075B50] hover:bg-[#176B57] text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving to Database..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Shared Confirmation Modal ---
function ConfirmationModal({ isOpen, title, message, confirmText, confirmColor = "bg-[#075B50]", onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm modal-enter">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#075B50]/15 relative">
        <h3 className="text-xl font-bold text-[#075B50] mb-2">{title}</h3>
        <p className="text-sm text-[#1A332D]/80 leading-relaxed mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-md cursor-pointer ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Member Detail Modal ---
function MemberDetailModal({ tourist, isOpen, onClose, onLocate, onStartReunion, onTriggerSos, hasActiveSos, alertRecord, onViewAlert, tourGuide }) {
  if (!isOpen || !tourist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm modal-enter">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#075B50]/15 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#075B50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-5">
          <img 
            src={tourist.avatar} 
            alt={tourist.fullName} 
            className="w-16 h-16 rounded-full object-cover border-2 border-[#075B50]/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#075B50]">{tourist.fullName}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                tourist.status === 'Safe' ? 'bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20' :
                tourist.status === 'Overdue' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700 animate-pulse'
              }`}>
                {tourist.status}
              </span>
            </div>
            <p className="text-xs text-[#176B57] font-medium">Group Connection: <strong>{tourist.locationStatus}</strong></p>
            <p className="text-xs text-[#507A70] mt-0.5">Last Check-in: {tourist.lastCheckIn}</p>
          </div>
        </div>

        {hasActiveSos && (
          <div className="p-3.5 mb-5 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-600 animate-bounce" />
              <div>
                <p className="text-xs font-bold text-red-700">Active SOS Emergency Alert</p>
                <p className="text-[11px] text-red-600">Urgent support recorded by tour guide {tourGuide?.name || "Tour Guide"}.</p>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onViewAlert(alertRecord.id); }}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer"
            >
              View SOS Details
            </button>
          </div>
        )}

        <div className="space-y-4 text-xs text-[#1A332D]">
          <div className="bg-[#EAF7F0]/60 p-4 rounded-2xl border border-[#075B50]/10">
            <h4 className="font-bold text-[#075B50] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#176B57]" /> Recorded Telemetry Location (Demo Data)
            </h4>
            <p className="font-semibold text-sm">{tourist.locationLabel}</p>
            <p className="text-[11px] text-[#507A70] mt-1">Coordinates: {tourist.lat.toFixed(4)}° N, {tourist.lng.toFixed(4)}° E</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-[#507A70]">Battery & Mesh Telemetry</span>
              <p className="font-bold text-sm text-[#075B50] mt-1 flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-emerald-600" /> {tourist.battery}
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-[#507A70]">Contact Mobile</span>
              <p className="font-bold text-sm text-[#075B50] mt-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#176B57]" /> {tourist.phone}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-[#075B50] mb-1">Guide Notes & Observation</h4>
            <p className="text-[#507A70] leading-relaxed">{tourist.notes}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-[#075B50] mb-1">Medical Assessment & Emergency Contact</h4>
            <p className="text-[#507A70] leading-relaxed">{tourist.medicalNotes}</p>
            <p className="text-[11px] font-medium text-[#176B57] mt-1.5">Next of Kin: {tourist.emergencyContact}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => { onClose(); onLocate(tourist.id); }}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" /> View on Live Location
          </button>
          <button
            onClick={() => { onClose(); onStartReunion(tourist.id); }}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#075B50] hover:bg-[#176B57] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" /> Start Reunion
          </button>
          {!hasActiveSos && (
            <button
              onClick={() => { onClose(); onTriggerSos(tourist.id); }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Record SOS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Shared App Header (Screens 2 through 9) ---
function SharedAppHeader({ currentScreen, onNavigate, unreadAlertsCount, onOpenMobileNav, backendStatus, tourGuide, onEditProfile }) {
  const screenTitles = {
    'dashboard': 'Tour Guide Dashboard (Screen 2)',
    'sos': 'SOS Emergency Support (Screen 3)',
    'alert-details': 'Alert Details (Screen 4)',
    'reunion': 'Reunion Mode (Screen 5)',
    'members': 'Group Members (Screen 6)',
    'location': 'Live Location (Screen 7)',
    'alerts': 'Alerts & Notifications (Screen 8)',
    'assistant': 'AI Travel Assistant (Screen 9)'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#075B50]/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Mobile hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl text-[#075B50] hover:bg-[#EAF7F0] transition-colors"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
            title="Travel Guard Safety Network"
          >
            <IconShieldLeaf className="w-9 h-9 drop-shadow-sm flex-shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-[#075B50] leading-tight">Travel Guard</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20">
                  Munnar Grid
                </span>
                {backendStatus && (
                  <span className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    backendStatus.connected ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${backendStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {backendStatus.connected ? 'API Online :5000' : 'Offline Mode'}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-[#176B57] hidden sm:block">Safer Journeys. Happier Memories.</p>
            </div>
          </div>
        </div>

        {/* Center: Current Screen Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF7F0] text-[#075B50] text-xs font-semibold border border-[#075B50]/15">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{screenTitles[currentScreen] || 'Tour Operator Network'}</span>
        </div>

        {/* Right: Quick Action Buttons & Guide Profile */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('sos')}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-sm transition-all btn-emergency-glow cursor-pointer"
            title="Record emergency incident"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trigger SOS</span>
          </button>

          <button
            onClick={() => onNavigate('alerts')}
            className="p-2 rounded-full hover:bg-[#EAF7F0] text-[#075B50] relative transition-colors cursor-pointer"
            title="Group Alerts & Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Guide dynamic badge (Click to Edit Profile) */}
          <div 
            onClick={onEditProfile}
            className="flex items-center gap-2 pl-2 border-l border-[#075B50]/15 cursor-pointer hover:opacity-85 transition-opacity"
            title="Click to view and edit Tour Guide profile"
          >
            <img 
              src={tourGuide?.avatar || TOUR_GUIDE.avatar} 
              alt={tourGuide?.name || "Tour Guide"} 
              className="w-8 h-8 rounded-full object-cover border border-[#075B50]/30 shadow-sm"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[#075B50] leading-none">{tourGuide?.name || "Tour Guide"}</span>
              <span className="text-[10px] text-[#176B57] font-medium flex items-center gap-1">
                <span>Guide</span>
                <span className="text-[9px] text-[#075B50] font-bold underline">(Edit)</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

// --- Shared Sidebar Navigation (Screens 2 through 9) ---
function SharedSidebar({ currentScreen, onNavigate, unreadAlertsCount, isOpenOnMobile, onCloseMobile, tourGuide, onEditProfile }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'members', label: 'Group Members', icon: Users, badge: '4' },
    { id: 'location', label: 'Live Location', icon: MapPin, badge: null },
    { id: 'sos', label: 'SOS Emergency', icon: ShieldAlert, badge: null, isEmergency: true },
    { id: 'reunion', label: 'Reunion Mode', icon: Compass, badge: null },
    { id: 'alerts', label: 'Alerts & Notices', icon: Bell, badge: unreadAlertsCount > 0 ? String(unreadAlertsCount) : null, badgeColor: 'bg-red-500 text-white' },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'AI', badgeColor: 'bg-[#075B50] text-white' }
  ];

  const content = (
    <div className="flex flex-col h-full justify-between p-4 bg-white border-r border-[#075B50]/10 w-64">
      {/* Top Section */}
      <div>
        <div className="px-3 py-2 mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#176B57]">
            TOUR OPERATOR CONTROLS
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#EAF7F0] text-[#075B50] font-bold border-l-4 border-[#075B50] shadow-sm' 
                    : item.isEmergency
                    ? 'text-red-700 hover:bg-red-50 hover:text-red-800'
                    : 'text-[#1A332D]/80 hover:bg-slate-50 hover:text-[#075B50]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#075B50]' : item.isEmergency ? 'text-red-600' : 'text-[#507A70]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-[#EAF7F0] text-[#075B50]'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switcher: Back to Welcome Page (Screen 1) */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <button
          onClick={() => {
            onNavigate('welcome');
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-[#EAF7F0] text-[#176B57] transition-all border border-[#075B50]/15 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <IconShieldLeaf className="w-4 h-4 text-[#075B50]" />
            <span>Screen 1 (Welcome)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#075B50]" />
        </button>

        <div className="p-3 bg-[#EAF7F0]/60 rounded-xl border border-[#075B50]/10 text-[10px] text-[#507A70] leading-snug">
          <div className="flex items-center justify-between">
            <strong className="text-[#075B50] font-bold text-xs">{tourGuide?.name || "Tour Guide"}</strong>
            {onEditProfile && (
              <button 
                onClick={onEditProfile} 
                className="text-[10px] text-[#075B50] font-bold underline hover:text-[#176B57] cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <p className="mt-0.5">{tourGuide?.role || "Tour Guide"} • {tourGuide?.passId || "#TG-GUIDE-01"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenOnMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10 w-64 h-full bg-white shadow-2xl modal-enter">
            {content}
          </div>
        </div>
      )}
    </>
  );
}


// ============================================================================
// 4. SCREEN 1: WELCOME & LANDING PAGE (PRESERVED & POLISHED)
// ============================================================================

function WelcomeFeatureModal({ feature, onClose }) {
  if (!feature) return null;
  const IconComp = feature.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm modal-enter">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#075B50]/15 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-[#075B50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center shadow-sm`}>
            <IconComp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/15">
              {feature.tag}
            </span>
            <h3 className="text-xl font-bold text-[#075B50] mt-1">{feature.title}</h3>
          </div>
        </div>

        <p className="text-sm font-semibold text-[#1A332D] mb-2">{feature.description}</p>
        <p className="text-xs text-[#507A70] leading-relaxed mb-6">{feature.detail}</p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-[#075B50] hover:bg-[#176B57] text-white font-semibold py-3 px-6 rounded-full text-xs shadow-md transition-all cursor-pointer"
          >
            Close Feature Guide
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeRegistrationModal({ isOpen, onClose, onGoToDashboard, onUpdateGuideProfile, tourGuide }) {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({ fullName: tourGuide?.name || '', phone: tourGuide?.phone || '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = formData.fullName.trim();
    if (!cleanName) {
      setErrorMsg("Please enter a valid full name.");
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      if (onUpdateGuideProfile) {
        await onUpdateGuideProfile({ name: cleanName, phone: formData.phone.trim() });
      }
      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || "Failed to save profile to database. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setFormData({ fullName: '', phone: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm modal-enter">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#075B50]/15 relative">
        <button 
          onClick={handleReset} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-[#075B50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#EAF7F0] flex items-center justify-center text-[#075B50]">
            <IconShieldLeaf className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#075B50]">Generate Travel Pass</h3>
          <p className="text-xs text-[#176B57] mt-1">Start your guided exploration with instant safety telemetry.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#EAF7F0] rounded-2xl border border-[#075B50]/20 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#075B50] mx-auto mb-2" />
              <h4 className="font-bold text-[#075B50] text-sm">Safety Pass Activated & Saved in Database!</h4>
              <p className="text-xs text-[#176B57] mt-1">
                Welcome, <strong>{formData.fullName}</strong>. Telemetry network and guide profile synchronized.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { handleReset(); onGoToDashboard(); }}
                className="flex-1 bg-[#075B50] hover:bg-[#176B57] text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#075B50] mb-1">
                Full Name or Group Leader *
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                placeholder="e.g. Amina or Jumana"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 focus:outline-none focus:ring-2 focus:ring-[#075B50]/30 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#075B50] mb-1">
                Mobile Number (for Safety SMS & Beacon) *
              </label>
              <input
                type="tel"
                required
                disabled={isSubmitting}
                placeholder="+91 98471 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 focus:outline-none focus:ring-2 focus:ring-[#075B50]/30 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#075B50] hover:bg-[#176B57] text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <span>Activate Safety Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ onGoToDashboard, onUpdateGuideProfile, tourGuide }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: "stay-connected",
      title: "Stay Connected",
      icon: MapPin,
      iconBg: "bg-[#EAF7F0]",
      iconColor: "text-[#075B50]",
      tag: "Live Group Beacon",
      description: "Track your group in real time.",
      detail: "Share live breadcrumb coordinates with family and trekking partners even in low-signal valleys. Get automatic alerts if a member strays beyond safety boundaries.",
      actionLabel: "Explore radar view"
    },
    {
      id: "get-help-fast",
      title: "Get Help Fast",
      icon: ShieldAlert,
      iconBg: "bg-red-50",
      iconColor: "text-[#F52935]",
      tag: "Emergency SOS",
      description: "Instant emergency support.",
      detail: "One-touch SOS button dispatches your exact GPS coordinates, medical history, and battery status to nearest mountain rangers, pilgrim marshals, and emergency helplines.",
      actionLabel: "Test SOS system",
      isSos: true
    },
    {
      id: "travel-with-confidence",
      title: "Travel with Confidence",
      icon: Users,
      iconBg: "bg-[#EAF7F0]",
      iconColor: "text-[#075B50]",
      tag: "Safe Community",
      description: "Never feel alone on your journey.",
      detail: "Access verified pilgrim sanctuaries, certified guides, clean drinking water checkpoints, and live community safety reports from thousands of fellow travelers on the trail.",
      actionLabel: "View safety guides"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFCFB] text-[#1A332D]">
      
      {/* 1. Header with Shield-leaf Logo, Title & Tagline */}
      <header className="relative w-full z-40 bg-white/80 backdrop-blur-md border-b border-[#075B50]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex-shrink-0 cursor-pointer" title="Travel Guard Safety Network">
              <IconShieldLeaf className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#075B50]">
                  Travel Guard
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20">
                  Live Safe Net
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#176B57] tracking-normal">
                Safer Journeys. Happier Memories.
              </p>
            </div>
          </div>

          <button 
            onClick={onGoToDashboard}
            className="px-4 py-2 rounded-full text-xs font-bold bg-[#075B50] text-white hover:bg-[#176B57] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Tour Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Scenic Mountain Lake Hero Section with Backpacker */}
      <section className="relative w-full pt-4 sm:pt-6 pb-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-[#075B50]/10 border border-[#075B50]/15">
            
            <div className="relative w-full h-[440px] sm:h-[500px] md:h-[560px] lg:h-[600px] overflow-hidden">
              <img 
                src="./assets/hero-lake.jpg" 
                alt="Scenic mountain lake hero image with the backpacker" 
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-1000 ease-out"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80'; }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-black/20 md:bg-gradient-to-r md:from-white/95 md:via-white/75 md:to-transparent" />
              
              <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#075B50]/20 shadow-sm text-xs sm:text-sm font-semibold text-[#075B50]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="w-2 h-2 -ml-3 rounded-full bg-emerald-500" />
                  <span>Active Safety Grid • 1.2M+ Travelers Protected</span>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 sm:p-10 md:p-14 lg:p-16 max-w-2xl z-10">
                
                {/* Handwritten “Explore Safe Together” text and paper airplane illustration */}
                <div className="inline-flex items-center gap-3 mb-2.5">
                  <span className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#075B50] font-bold select-none rotate-[-2deg] drop-shadow-sm">
                    Explore Safe Together
                  </span>
                  <div className="airplane-doodle inline-block">
                    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="rotate-[4deg]">
                      <path d="M2 18C10 24 16 14 22 17" stroke="#075B50" strokeWidth="1.4" strokeDasharray="2 3" strokeLinecap="round"/>
                      <path d="M22 17L32 9L20 12L22 17Z" fill="#EAF7F0" stroke="#075B50" strokeWidth="1.4" strokeLinejoin="round"/>
                      <path d="M32 9L22 17L23 23L26 19" stroke="#075B50" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#176B57] bg-[#EAF7F0]/90 px-3 py-1 rounded-md border border-[#075B50]/15 w-fit mb-3">
                  <Compass className="w-3.5 h-3.5 text-[#075B50]" />
                  Official Traveler & Pilgrim Safety
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#075B50] leading-[1.15] mb-3 sm:mb-4">
                  Explore Safe Together
                </h1>

                <p className="text-base sm:text-lg md:text-xl font-normal text-[#1A332D]/90 leading-relaxed max-w-xl mb-6">
                  Real-time tracking, instant alerts, and smart assistance for tourists and pilgrims.
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-[#075B50]">
                  <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#075B50]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#176B57]" />
                    <span>Zero-Deadzone Mesh</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#075B50]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#176B57]" />
                    <span>1-Tap Ranger SOS</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#075B50]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#176B57]" />
                    <span>Group Geofence</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="relative w-full -mt-1 leading-none text-[#FAFCFB]">
              <svg className="w-full h-8 sm:h-12 md:h-14 block" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
                <path d="M0,0 C320,65 1120,65 1440,0 L1440,80 L0,80 Z" fill="#FAFCFB" />
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Feature Highlights */}
      <section className="relative w-full py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF7F0] text-[#075B50] mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#176B57]" />
              Always Protected By Your Side
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#075B50] tracking-tight">
              Designed for Trailblazers & Pilgrims
            </h2>
            <p className="text-sm sm:text-base text-[#176B57]/90 mt-2 font-normal">
              Whether navigating high-altitude mountain passes or crowded spiritual shrines, Travel Guard keeps every step secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature)}
                  className={`feature-card group cursor-pointer bg-white rounded-2xl p-7 border transition-all duration-300 relative flex flex-col justify-between ${
                    feature.isSos ? 'border-red-100 hover:border-red-300 shadow-sm' : 'border-[#075B50]/10 hover:border-[#075B50]/30 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-13 h-13 p-3.5 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md ${
                        feature.isSos ? 'bg-red-50 text-[#F52935] border border-red-200' : 'bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/15'
                      }`}>
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#075B50] mb-2 group-hover:text-[#176B57] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-base font-semibold text-[#1A332D] mb-3 leading-snug">
                      {feature.description}
                    </p>

                    <p className="text-xs sm:text-sm text-[#507A70] leading-relaxed mb-4">
                      {feature.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#075B50] group-hover:text-[#176B57]">
                    <span className="flex items-center gap-1.5">{feature.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Action Button: Prominent Green Get Started (Only Primary Action Button) */}
      <section className="relative w-full py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center">
            <button
              id="btn-get-started"
              onClick={() => setIsRegisterOpen(true)}
              className="w-full sm:w-auto min-w-[240px] bg-[#075B50] hover:bg-[#176B57] active:bg-[#05433a] text-white font-semibold text-base py-4 px-9 rounded-full shadow-lg shadow-[#075B50]/25 flex items-center justify-center gap-3 group transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer btn-teal-glow"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Decorative Mountain Footer with "Safe Travels Always ♡" */}
      <footer className="relative w-full mt-12 sm:mt-16 pt-12 pb-10 bg-gradient-to-b from-[#FAFCFB] via-[#F4FBF7] to-[#EAF7F0] overflow-hidden border-t border-[#075B50]/10">
        <div className="relative w-full max-w-5xl mx-auto px-4 mb-6">
          <svg viewBox="0 0 1000 240" fill="none" className="w-full h-auto max-h-48 mx-auto drop-shadow-sm select-none" aria-hidden="true">
            <path d="M100 220 L260 90 L340 150 L480 50 L600 160 L750 70 L920 220 Z" fill="#D4EFE0" opacity="0.65" />
            <path d="M480 50 L450 85 L470 95 L490 85 L510 92 L480 50 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M750 70 L725 105 L745 112 L770 102 L750 70 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M0 240 L160 120 L280 200 L420 100 L560 190 L710 110 L880 210 L1000 140 L1000 240 Z" fill="#EAF7F0" />
            <path d="M40 240 L120 170 L220 240 M320 240 L380 185 L460 240 M620 240 L690 180 L760 240 M820 240 L900 175 L980 240" stroke="#176B57" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
            <path d="M120 170 L110 195 H130 Z" fill="#176B57" opacity="0.3" />
            <path d="M380 185 L372 208 H388 Z" fill="#176B57" opacity="0.3" />
            <path d="M690 180 L682 205 H698 Z" fill="#176B57" opacity="0.3" />
            <path d="M900 175 L892 200 H908 Z" fill="#176B57" opacity="0.3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-4">
            <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#075B50] font-bold tracking-wide select-none hover:scale-105 transition-transform inline-block">
              Safe Travels Always ♡
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#176B57] font-medium max-w-md mx-auto mb-6">
            Dedicated to the protection, peace of mind, and safe return of every explorer and pilgrim.
          </p>
          <div className="text-[11px] text-[#507A70]/80">
            © {new Date().getFullYear()} Travel Guard Safety Technologies. Built for tourists & pilgrimages worldwide.
          </div>
        </div>
      </footer>

      <WelcomeRegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onGoToDashboard={onGoToDashboard} 
        onUpdateGuideProfile={onUpdateGuideProfile}
        tourGuide={tourGuide}
      />

      <WelcomeFeatureModal 
        feature={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />

    </div>
  );
}

// ============================================================================
// 5. SCREEN 2: TOUR GUIDE DASHBOARD (MAIN OVERVIEW)
// ============================================================================

function DashboardScreen({ tourists, alerts, onNavigate, onSelectTourist, onSimulateAlert, tourGuide, onEditProfile }) {
  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);

  // Dynamic calculations
  const safeCount = tourists.filter(t => t.status === 'Safe').length;
  const overdueCount = tourists.filter(t => t.status === 'Overdue' || t.locationStatus === 'Separated').length;
  const activeSosCount = alerts.filter(a => a.category === 'SOS Emergency' && a.status === 'Active').length;

  // Initialize Leaflet Live Group Map
  useEffect(() => {
    if (typeof L === 'undefined' || !mapRef.current) return;

    if (leafletMapInstance.current) {
      leafletMapInstance.current.remove();
      leafletMapInstance.current = null;
    }

    try {
      const map = L.map(mapRef.current, {
        center: [10.0889, 77.0595],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Safe perimeter circle (2km)
      L.circle([10.0889, 77.0595], {
        color: '#075B50',
        fillColor: '#EAF7F0',
        fillOpacity: 0.25,
        radius: 1800,
        dashArray: '5, 8'
      }).addTo(map);

      // Markers for each tourist
      tourists.forEach((tourist) => {
        const isEmergency = tourist.status === 'Emergency';
        const isOverdue = tourist.status === 'Overdue';
        const borderColor = isEmergency ? '#F52935' : isOverdue ? '#F59E0B' : '#10B981';

        const customIcon = L.divIcon({
          className: 'custom-tourist-pin',
          html: `<div style="transform: translate(-50%, -100%); display:flex; flex-direction:column; align-items:center;">
            <div style="width:38px; height:38px; border-radius:50%; background:#fff; border:3px solid ${borderColor}; box-shadow:0 4px 10px rgba(0,0,0,0.2); overflow:hidden;">
              <img src="${tourist.avatar}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="background:#fff; border:1px solid #075B50; border-radius:9999px; padding:1px 7px; font-size:10px; font-weight:700; color:#075B50; margin-top:2px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
              ${tourist.name}
            </div>
          </div>`,
          iconSize: [40, 50],
          iconAnchor: [20, 50]
        });

        const m = L.marker([tourist.lat, tourist.lng], { icon: customIcon }).addTo(map);
        m.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
            <strong style="color:#075B50; font-size:13px;">${tourist.fullName}</strong>
            <p style="margin:2px 0; font-size:11px; color:#1A332D;">Status: <strong>${tourist.status}</strong> (${tourist.locationStatus})</p>
            <p style="margin:2px 0; font-size:10px; color:#507A70;">📍 ${tourist.locationLabel}</p>
            <p style="margin:2px 0; font-size:10px; color:#507A70;">🔋 ${tourist.battery} • ${tourist.lastCheckIn}</p>
          </div>
        `);
      });

      leafletMapInstance.current = map;
    } catch (err) {
      console.warn("Leaflet map init warning:", err);
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [tourists]);

  return (
    <div className="space-y-6">
      
      {/* Munnar Aesthetic Welcome Banner */}
      <div className="bg-[#EAF7F0] rounded-3xl p-6 sm:p-8 border border-[#075B50]/15 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-[#075B50] border border-[#075B50]/20 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Munnar, Kerala • Active Group Trip</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
              Good morning, {tourGuide?.name || "Tour Guide"}!
            </h1>
            {onEditProfile && (
              <button
                onClick={onEditProfile}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#075B50] hover:bg-[#176B57] text-white shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                title="Edit tour guide profile name and phone"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          <p className="text-sm sm:text-base text-[#176B57] mt-1.5 font-normal leading-relaxed">
            “Here's your group status and live location.” All 4 registered tourists are connected to your safety beacon network.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#075B50]">
            <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#075B50]/15">
              Verified Guide {tourGuide?.passId || "#TG-GUIDE-MUNNAR-01"}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#075B50]/15">
              Simulated Telemetry Grid (Demo Environment)
            </span>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <IconShieldLeaf className="w-72 h-72 text-[#075B50]" />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <div className="flex items-center justify-between text-xs text-[#507A70] font-bold uppercase mb-2">
            <span>Safe Tourists</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#075B50]">{safeCount} / {tourists.length}</div>
          <p className="text-[11px] text-[#176B57] mt-1">Within safe zone bounds</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <div className="flex items-center justify-between text-xs text-[#507A70] font-bold uppercase mb-2">
            <span>Separated / Overdue</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">{overdueCount}</div>
          <p className="text-[11px] text-[#507A70] mt-1">Requires check-in ping</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <div className="flex items-center justify-between text-xs text-[#507A70] font-bold uppercase mb-2">
            <span>Active SOS Alerts</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600">{activeSosCount}</div>
          <p className="text-[11px] text-red-500 mt-1">Immediate action needed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <div className="flex items-center justify-between text-xs text-[#507A70] font-bold uppercase mb-2">
            <span>Mesh Telemetry</span>
            <Radio className="w-4 h-4 text-[#075B50]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#075B50]">100%</div>
          <p className="text-[11px] text-emerald-700 mt-1">Zero dead-zone coverage</p>
        </div>
      </div>

      {/* Centerpiece: Live Group Map */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#075B50]/15 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#075B50] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#176B57]" />
              Live Group Map — Munnar Highlands
            </h2>
            <p className="text-xs text-[#507A70]">
              2km safe radius centered on Munnar Tea Museum Checkpoint.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('location')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Full Screen Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (leafletMapInstance.current) {
                  leafletMapInstance.current.setView([10.0889, 77.0595], 14);
                }
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors cursor-pointer"
            >
              Recenter
            </button>
          </div>
        </div>

        <div ref={mapRef} className="map-container rounded-2xl border border-slate-200" style={{ height: '420px' }}>
          {/* Leaflet mounts here */}
        </div>
      </div>

      {/* Two Column Layout: Group Status Panel & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tourist Status Panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#075B50] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#176B57]" />
              Group Status (4 Tourists)
            </h3>
            <button
              onClick={() => onNavigate('members')}
              className="text-xs font-bold text-[#075B50] hover:underline cursor-pointer"
            >
              Manage Group →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {tourists.map((tourist) => (
              <div 
                key={tourist.id}
                onClick={() => onSelectTourist(tourist)}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-[#EAF7F0]/40 border border-slate-100 hover:border-[#075B50]/20 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={tourist.avatar} 
                    alt={tourist.name} 
                    className="w-11 h-11 rounded-full object-cover border border-[#075B50]/20 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#075B50]">{tourist.fullName}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        tourist.status === 'Safe' ? 'bg-emerald-500' :
                        tourist.status === 'Overdue' ? 'bg-amber-500' : 'bg-red-500 animate-ping'
                      }`} />
                    </div>
                    <p className="text-[11px] text-[#507A70] truncate max-w-[150px]">{tourist.locationLabel}</p>
                    <span className="text-[10px] text-[#176B57] font-medium">🔋 {tourist.battery} • {tourist.lastCheckIn}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#507A70]" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Panel */}
        <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#075B50] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#176B57]" />
                Recent Alerts
              </h3>
              <button
                onClick={() => onNavigate('alerts')}
                className="text-xs font-bold text-[#075B50] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {alerts.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#507A70] space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto opacity-70" />
                <p className="font-semibold text-[#075B50]">No recent alerts</p>
                <p className="text-[11px]">All group members are operating inside standard safety protocols.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {alerts.slice(0, 3).map((a) => (
                  <div 
                    key={a.id} 
                    onClick={() => onNavigate('alert-details', { alertId: a.id })}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      a.priority === 'Emergency' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className={a.priority === 'Emergency' ? 'text-red-700' : 'text-amber-800'}>{a.alertType}</span>
                      <span className="text-[10px] text-[#507A70]">{a.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#1A332D] mt-0.5 font-medium">{a.touristName} — {a.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={onSimulateAlert}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#075B50] transition-colors cursor-pointer text-center"
            >
              Simulate Demo Advisory Alert
            </button>
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#075B50]/15 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#075B50] uppercase tracking-wider">Quick Operator Actions:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('sos')}
            className="px-4 py-2 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all flex items-center gap-1.5 shadow-sm btn-emergency-glow cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Record SOS Emergency
          </button>
          <button
            onClick={() => onNavigate('reunion')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#075B50] hover:bg-[#176B57] text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" /> Reunion Mode
          </button>
          <button
            onClick={() => onNavigate('location')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" /> Live Location
          </button>
          <button
            onClick={() => onNavigate('assistant')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#075B50] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" /> Ask AI Assistant
          </button>
        </div>
      </div>

    </div>
  );
}

// ============================================================================
// 6. SCREEN 3: SOS EMERGENCY SUPPORT (DEDICATED SCREEN)
// ============================================================================

function SOSEmergencyScreen({ tourists, alerts, onTriggerSosConfirm, onNavigate, tourGuide }) {
  const [selectedTouristId, setSelectedTouristId] = useState(tourists[0]?.id || "hisha");
  const [category, setCategory] = useState("Medical");
  const [priority, setPriority] = useState("Emergency");
  const [description, setDescription] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const selectedTourist = tourists.find(t => t.id === selectedTouristId) || tourists[0];
  const activeEmergencies = alerts.filter(a => a.category === 'SOS Emergency' && a.status === 'Active');

  const handleTriggerClick = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsConfirmOpen(false);
    onTriggerSosConfirm({
      touristId: selectedTourist.id,
      touristName: selectedTourist.fullName,
      category,
      priority,
      description: description.trim() || `${category} emergency recorded for ${selectedTourist.fullName}.`,
      location: selectedTourist.locationLabel
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-red-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-2">
            <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
            <span>Emergency Operations Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            SOS Emergency Support
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Respond quickly when a tourist needs urgent assistance.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Logged In Tour Guide: <strong>{tourGuide?.name || "Tour Guide"}</strong> ({tourGuide?.passId || "#TG-GUIDE-MUNNAR-01"})
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Safety & Compliance Notice:</strong> This action records an in-app emergency alert in demo mode for tour monitoring. It does <em>not</em> automatically transmit signals to external 112/108 government emergency services or dispatch rescue helicopters. Always dial local mountain emergency rescue directly if life is in danger.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Emergency Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#075B50]">Record New Incident</h2>

          <form onSubmit={handleTriggerClick} className="space-y-5">
            
            {/* Tourist Selection */}
            <div>
              <label className="block text-xs font-bold text-[#075B50] mb-2 uppercase tracking-wide">
                1. Select Affected Tourist *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tourists.map((t) => {
                  const isSelected = selectedTouristId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTouristId(t.id)}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-red-500 bg-red-50/50 shadow-sm' 
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-12 h-12 rounded-full mx-auto object-cover border border-[#075B50]/20 mb-2"
                      />
                      <p className="text-xs font-bold text-[#075B50]">{t.name}</p>
                      <p className="text-[10px] text-[#507A70]">{t.status}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Tourist Telemetry Preview */}
            <div className="bg-[#EAF7F0]/60 p-4 rounded-2xl border border-[#075B50]/15 text-xs text-[#1A332D]">
              <div className="flex items-center justify-between font-bold text-[#075B50] mb-1">
                <span>Selected: {selectedTourist.fullName}</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#075B50]/20">Demo Telemetry</span>
              </div>
              <p className="text-[#507A70]">📍 Current Location: {selectedTourist.locationLabel}</p>
              <p className="text-[#507A70]">🔋 Battery: {selectedTourist.battery} • Last Check-in: {selectedTourist.lastCheckIn}</p>
              <p className="text-[#176B57] mt-1 font-medium">Medical notes: {selectedTourist.medicalNotes}</p>
            </div>

            {/* Emergency Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#075B50] mb-2 uppercase tracking-wide">
                  2. Emergency Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
                >
                  <option value="Medical">Medical Emergency (Injury / Altitude / Illness)</option>
                  <option value="Lost/Separated">Lost / Separated Tourist</option>
                  <option value="Safety Threat">Safety Threat / Wildlife Encounter</option>
                  <option value="Severe Weather">Severe Weather / Flash Mist / Landslip</option>
                  <option value="Other">Other Urgent Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#075B50] mb-2 uppercase tracking-wide">
                  3. Priority Indicator *
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#075B50]/20 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
                >
                  <option value="Emergency">Emergency (Immediate Intervention)</option>
                  <option value="Urgent">Urgent (Requires Prompt Assistance)</option>
                  <option value="Moderate">Moderate (Advisory Telemetry)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#075B50] mb-2 uppercase tracking-wide">
                4. Description / Field Notes (Optional)
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Slipped along rocky bend near Attukad trail. Companion reporting minor ankle sprain."
                className="w-full p-3 rounded-xl border border-[#075B50]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg flex items-center justify-center gap-2 btn-emergency-glow cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Trigger SOS Alert</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right 1 Col: Active SOS Emergencies */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#075B50] flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-600" />
            Active Emergencies ({activeEmergencies.length})
          </h2>

          {activeEmergencies.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#507A70] space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-semibold text-[#075B50]">No active emergencies</p>
              <p className="text-[11px]">All 4 tourists are currently recorded Safe without open SOS alerts.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeEmergencies.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-700">{alert.alertType}</span>
                    <span className="text-[10px] text-red-600 font-semibold">{alert.timestamp}</span>
                  </div>
                  <p className="font-semibold text-[#1A332D]">{alert.touristName}</p>
                  <p className="text-[11px] text-[#507A70]">{alert.description}</p>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onNavigate('alert-details', { alertId: alert.id })}
                      className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Alert Details
                    </button>
                    <button
                      onClick={() => onNavigate('location', { highlightTouristId: alert.touristId })}
                      className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                    >
                      Live Location
                    </button>
                    <button
                      onClick={() => onNavigate('reunion', { preselectedTouristId: alert.touristId })}
                      className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                    >
                      Reunion Mode
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Dialog */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Confirm Emergency SOS Trigger"
        message={`Are you sure you want to record an emergency SOS for ${selectedTourist.fullName}? This will mark their status as Emergency in the group dashboard and log an urgent alert event.`}
        confirmText="Confirm & Trigger SOS"
        confirmColor="bg-red-600 hover:bg-red-700"
        onConfirm={handleFinalConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />

    </div>
  );
}


// ============================================================================
// 7. SCREEN 4: ALERT DETAILS (DEDICATED SCREEN)
// ============================================================================

function AlertDetailsScreen({ alertId, alerts, tourists, onResolveAlert, onReopenAlert, onNavigate, tourGuide }) {
  const [isResolveConfirmOpen, setIsResolveConfirmOpen] = useState(false);
  const [isReopenConfirmOpen, setIsReopenConfirmOpen] = useState(false);

  const alert = alerts.find(a => a.id === alertId);
  const associatedTourist = alert ? tourists.find(t => t.id === alert.touristId || t.name.toLowerCase() === alert.touristName.toLowerCase()) : null;

  // Gracefully handle not-found or missing alert ID
  if (!alert) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#075B50]/15 shadow-sm text-center max-w-xl mx-auto space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[#075B50]">Alert Record Not Found</h2>
        <p className="text-xs text-[#507A70] leading-relaxed">
          The requested alert identifier (<code>{String(alertId)}</code>) does not match any stored records. It may have been resolved, archived, or was never generated.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('alerts')}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#075B50] hover:bg-[#176B57] text-white shadow-md transition-all cursor-pointer"
          >
            ← Return to Alerts & Notifications
          </button>
        </div>
      </div>
    );
  }

  const isEmergency = alert.priority === 'Emergency' || alert.category === 'SOS Emergency';
  const isResolved = alert.status === 'Resolved';

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isResolved ? 'bg-slate-100 text-slate-700' :
              isEmergency ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {alert.category || 'Safety Alert'} • {alert.status}
            </span>
            <span className="text-xs text-[#507A70] font-medium">ID: {alert.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            Alert Details
          </h1>
          <p className="text-xs text-[#176B57] mt-1 font-medium">
            Recorded at {alert.timestamp} for {alert.touristName}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => onNavigate('alerts')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Alerts
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-colors cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Visual Urgency Banner if Active SOS */}
      {!isResolved && isEmergency && (
        <div className="p-4 bg-red-50 rounded-2xl border-2 border-red-400 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-red-700 uppercase tracking-wider">
                High Priority Emergency SOS
              </h3>
              <p className="text-xs text-red-600">
                Action required by tour guide {tourGuide?.name || "Tour Guide"}. Guide tourist to meeting point or confirm safety.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">Active</span>
        </div>
      )}

      {/* Grid: Alert Info & Location / Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Summary & Tourist Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Incident Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#075B50]">Incident Summary</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-[#507A70]">Alert Type</span>
                <p className="font-bold text-sm text-[#075B50] mt-0.5">{alert.alertType}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-[#507A70]">Priority Level</span>
                <p className={`font-bold text-sm mt-0.5 ${
                  alert.priority === 'Emergency' ? 'text-red-600' : 'text-amber-700'
                }`}>{alert.priority}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-[#507A70]">Status</span>
                <p className={`font-bold text-sm mt-0.5 ${
                  isResolved ? 'text-emerald-700' : 'text-red-600'
                }`}>{alert.status}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#507A70]">Event Description</span>
              <p className="text-sm text-[#1A332D] mt-1 font-medium leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div className="bg-[#EAF7F0]/60 p-4 rounded-2xl border border-[#075B50]/15 text-xs text-[#1A332D]">
              <span className="text-[10px] uppercase font-bold text-[#176B57]">Telemetry Location (Demo Data)</span>
              <p className="font-bold text-sm text-[#075B50] mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#176B57]" /> {alert.location || 'Munnar Highlands Circuit'}
              </p>
              <p className="text-[11px] text-[#507A70] mt-1">Coordinates: Simulated mesh beacon telemetry around Munnar, Kerala.</p>
            </div>
          </div>

          {/* Associated Tourist Record */}
          {associatedTourist && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#075B50]">Associated Tourist Profile</h2>
              
              <div className="flex items-center gap-4">
                <img 
                  src={associatedTourist.avatar} 
                  alt={associatedTourist.fullName} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#075B50]/20 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#075B50]">{associatedTourist.fullName}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF7F0] text-[#075B50]">
                      {associatedTourist.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#507A70]">Mobile: {associatedTourist.phone}</p>
                  <p className="text-xs text-[#176B57]">Last check-in: {associatedTourist.lastCheckIn} • Battery: {associatedTourist.battery}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-[#507A70]">
                <strong>Medical Notes:</strong> {associatedTourist.medicalNotes}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#075B50]">Incident Activity Timeline</h2>
            
            <div className="space-y-3">
              {(alert.timeline || [
                { event: "Alert created", timestamp: alert.timestamp, note: `Logged by Tour Guide ${tourGuide?.name || "Tour Guide"}` }
              ]).map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#075B50] mt-1.5 flex-shrink-0" />
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between font-bold text-[#075B50]">
                      <span>{event.event}</span>
                      <span className="text-[10px] text-[#507A70] font-normal">{event.timestamp}</span>
                    </div>
                    {event.note && <p className="text-[11px] text-[#507A70] mt-0.5">{event.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Location Panel & Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#075B50] uppercase tracking-wider mb-2">Available Actions</h3>

            <button
              onClick={() => onNavigate('location', { highlightTouristId: alert.touristId })}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Locate on Live Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('reunion', { preselectedTouristId: alert.touristId })}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#075B50] hover:bg-[#176B57] text-white transition-colors flex items-center justify-between cursor-pointer shadow-sm"
            >
              <span className="flex items-center gap-2"><Compass className="w-4 h-4" /> Guide to Meeting Point</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 border-t border-slate-100">
              {!isResolved ? (
                <button
                  onClick={() => setIsResolveConfirmOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" /> Resolve Incident Alert
                </button>
              ) : (
                <button
                  onClick={() => setIsReopenConfirmOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reopen Incident Alert
                </button>
              )}
            </div>
          </div>

          {/* Location Map Preview Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#075B50] flex items-center justify-between">
              <span>Location Telemetry</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">Demo Data</span>
            </h3>

            <div className="bg-[#EAF7F0] p-4 rounded-2xl border border-[#075B50]/15 text-xs space-y-2">
              <p className="font-semibold text-[#075B50]">📍 {alert.location || 'Munnar District Circuit'}</p>
              <p className="text-[11px] text-[#507A70]">
                Telemetry is currently being received from the guide's portable mesh antenna.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#176B57]">
                <span>Beacon Signal: Strong</span>
                <span>Accuracy: ±15m</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationModal
        isOpen={isResolveConfirmOpen}
        title="Resolve Safety Alert"
        message={`Confirm that the incident for ${alert.touristName} has been addressed and the tourist is in a safe condition?`}
        confirmText="Confirm & Mark Resolved"
        confirmColor="bg-emerald-600 hover:bg-emerald-700"
        onConfirm={() => {
          setIsResolveConfirmOpen(false);
          onResolveAlert(alert.id);
        }}
        onCancel={() => setIsResolveConfirmOpen(false)}
      />

      <ConfirmationModal
        isOpen={isReopenConfirmOpen}
        title="Reopen Safety Alert"
        message={`Are you sure you want to reopen this alert for ${alert.touristName}? It will be restored as an active unresolved incident.`}
        confirmText="Confirm Reopen"
        confirmColor="bg-amber-600 hover:bg-amber-700"
        onConfirm={() => {
          setIsReopenConfirmOpen(false);
          onReopenAlert(alert.id);
        }}
        onCancel={() => setIsReopenConfirmOpen(false)}
      />

    </div>
  );
}

// ============================================================================
// 8. SCREEN 5: REUNION MODE (DEDICATED SCREEN)
// ============================================================================

function ReunionModeScreen({ 
  tourists, 
  meetingPoint, 
  reunionActivity, 
  preselectedTouristId, 
  onUpdateMeetingPoint, 
  onMarkTouristReunited, 
  onNavigate,
  tourGuide
}) {
  const [selectedId, setSelectedId] = useState(preselectedTouristId || tourists[0]?.id || "hisha");
  const [activeTab, setActiveTab] = useState("map");
  const [customPointName, setCustomPointName] = useState(meetingPoint.name);
  const [directionsStep, setDirectionsStep] = useState(null);
  const [isConfirmReunitedOpen, setIsConfirmReunitedOpen] = useState(false);
  const [locationNotice, setLocationNotice] = useState(null);

  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);

  const selectedTourist = tourists.find(t => t.id === selectedId) || tourists[0];

  // Dynamic Reunion Summary Counters
  const totalTourists = tourists.length;
  const reunitedCount = tourists.filter(t => t.locationStatus === 'Reunited' || (t.status === 'Safe' && t.locationStatus === 'With Group')).length;
  const separatedCount = tourists.filter(t => t.locationStatus === 'Separated' || t.status === 'Overdue').length;
  const unavailableCount = tourists.filter(t => t.locationStatus === 'Location Unavailable').length;

  // Initialize Reunion Leaflet Map
  useEffect(() => {
    if (typeof L === 'undefined' || !mapRef.current) return;

    if (leafletMapInstance.current) {
      leafletMapInstance.current.remove();
      leafletMapInstance.current = null;
    }

    try {
      const map = L.map(mapRef.current, {
        center: [meetingPoint.lat, meetingPoint.lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Meeting point pin (Dark Teal with White Star)
      const mpIcon = L.divIcon({
        className: 'custom-mp-pin',
        html: `<div style="transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center;">
          <div style="width:40px; height:40px; border-radius:50%; background:#075B50; border:3px solid #fff; box-shadow:0 6px 15px rgba(7,91,80,0.4); display:flex; align-items:center; justify-content:center; color:#fff; font-size:16px;">
            ★
          </div>
          <div style="background:#075B50; color:#fff; font-size:10px; font-weight:700; padding:2px 8px; border-radius:9999px; margin-top:2px; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.15);">
            Meeting Point
          </div>
        </div>`,
        iconSize: [40, 50],
        iconAnchor: [20, 50]
      });

      const mpMarker = L.marker([meetingPoint.lat, meetingPoint.lng], { icon: mpIcon }).addTo(map);
      mpMarker.bindPopup(`<strong>${meetingPoint.name}</strong><br><span style="font-size:11px;">${meetingPoint.description}</span>`);

      // Selected tourist marker
      if (selectedTourist) {
        const tIcon = L.divIcon({
          className: 'custom-reunion-t-pin',
          html: `<div style="transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center;">
            <div style="width:38px; height:38px; border-radius:50%; background:#fff; border:3px solid #F59E0B; box-shadow:0 4px 10px rgba(0,0,0,0.2); overflow:hidden;">
              <img src="${selectedTourist.avatar}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="background:#fff; border:1px solid #075B50; font-size:10px; font-weight:700; color:#075B50; padding:1px 6px; border-radius:9999px; margin-top:2px;">
              ${selectedTourist.name}
            </div>
          </div>`,
          iconSize: [40, 50],
          iconAnchor: [20, 50]
        });

        const tMarker = L.marker([selectedTourist.lat, selectedTourist.lng], { icon: tIcon }).addTo(map);
        tMarker.bindPopup(`<strong>${selectedTourist.fullName}</strong><br><span style="font-size:11px;">📍 ${selectedTourist.locationLabel}</span>`);

        // Connect with dotted line to indicate path
        L.polyline([
          [selectedTourist.lat, selectedTourist.lng],
          [meetingPoint.lat, meetingPoint.lng]
        ], {
          color: '#176B57',
          weight: 3,
          dashArray: '6, 8',
          opacity: 0.75
        }).addTo(map);
      }

      leafletMapInstance.current = map;
    } catch (err) {
      console.warn("Leaflet reunion map error:", err);
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [meetingPoint, selectedTourist]);

  // Request browser location for guide's device
  const handleUseCurrentLocation = () => {
    setLocationNotice("Requesting guide's device location from browser...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLocationNotice(`Guide device coordinates obtained: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E. Note: This identifies ${tourGuide?.name || "the guide"}'s mobile device, not tourist hardware.`);
          onUpdateMeetingPoint({
            id: `mp-guide-${Date.now()}`,
            name: `Guide ${tourGuide?.name || "Guide"}'s Current Location Checkpoint`,
            lat,
            lng,
            description: "Updated to guide's live device location via browser GPS."
          });
        },
        (err) => {
          setLocationNotice(`Browser location permission denied or unavailable: ${err.message}. Retaining designated Munnar checkpoint.`);
        }
      );
    } else {
      setLocationNotice("Geolocation is not supported by your browser. Using designated Munnar checkpoint.");
    }
  };

  // Get Directions Guidance
  const handleGetDirections = () => {
    setDirectionsStep({
      summary: `Estimated walking path from ${selectedTourist.locationLabel} to ${meetingPoint.name}.`,
      notes: "Follow marked tea plantation path towards Munnar Tea Museum checkpoint. Pass through Blossom Hydel footbridge, keep left at Old Munnar crossroads. (Demo guidance: Routing service simulates offline trail trailheads)."
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20 mb-2">
            <Compass className="w-4 h-4 text-[#176B57]" />
            <span>Group Assembly & Reunion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            Reunion Mode
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Helping everyone find their way back together.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Tour Guide in Charge: <strong>{tourGuide?.name || "Tour Guide"}</strong> ({tourGuide?.passId || "#TG-GUIDE-MUNNAR-01"})
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Reunion Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Total Tourists</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#075B50] mt-1">{totalTourists}</div>
          <p className="text-[11px] text-[#176B57]">In registered group</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Reunited / With Group</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{reunitedCount}</div>
          <p className="text-[11px] text-emerald-600">At designated hub</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Separated / Overdue</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{separatedCount}</div>
          <p className="text-[11px] text-amber-600">Guidance active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Location Unavailable</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-600 mt-1">{unavailableCount}</div>
          <p className="text-[11px] text-[#507A70]">Requires mesh ping</p>
        </div>
      </div>

      {/* Tourist Selection Row */}
      <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#075B50] uppercase tracking-wider">
          Select Tourist to Guide or Reconnect:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {tourists.map((tourist) => {
            const isSelected = selectedId === tourist.id;
            return (
              <div 
                key={tourist.id}
                onClick={() => setSelectedId(tourist.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#075B50] bg-[#EAF7F0]/70 shadow-sm ring-2 ring-[#075B50]/20' 
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={tourist.avatar} 
                      alt={tourist.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#075B50]/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#075B50]">{tourist.fullName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tourist.locationStatus === 'Separated' ? 'bg-amber-100 text-amber-800' : 'bg-[#EAF7F0] text-[#075B50]'
                      }`}>
                        {tourist.locationStatus}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#507A70] line-clamp-1">📍 {tourist.locationLabel}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-[#176B57] font-semibold">{isSelected ? 'Active Focus' : 'Click to select'}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#075B50]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map and Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Meeting Point Interactive Map */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#075B50] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#176B57]" />
                Reunion Map — Munnar Meeting Hub
              </h3>
              <p className="text-xs text-[#507A70]">
                Designated Hub: <strong>{meetingPoint.name}</strong>
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#075B50] self-start sm:self-center">
              Simulated Route (Demo Data)
            </span>
          </div>

          <div ref={mapRef} className="map-container rounded-2xl border border-slate-200" style={{ height: '420px' }}>
            {/* Leaflet map mounts here */}
          </div>

          {directionsStep && (
            <div className="p-4 bg-[#EAF7F0] rounded-2xl border border-[#075B50]/20 text-xs text-[#1A332D] space-y-1">
              <strong className="text-[#075B50] block">{directionsStep.summary}</strong>
              <p className="text-[#507A70]">{directionsStep.notes}</p>
            </div>
          )}

          {locationNotice && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              {locationNotice}
            </div>
          )}
        </div>

        {/* Right Col: Controls & Activity History */}
        <div className="space-y-6">
          
          {/* Meeting Point Controls */}
          <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#075B50] uppercase tracking-wider">Meeting Point Controls</h3>

            <div>
              <label className="block text-xs font-semibold text-[#075B50] mb-1.5">
                Set Designated Checkpoint:
              </label>
              <select
                value={meetingPoint.id}
                onChange={(e) => {
                  const pt = PRESET_MEETING_POINTS.find(p => p.id === e.target.value);
                  if (pt) onUpdateMeetingPoint(pt);
                }}
                className="w-full p-2.5 rounded-xl border border-[#075B50]/20 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
              >
                {PRESET_MEETING_POINTS.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleUseCurrentLocation}
                className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#075B50] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crosshair className="w-3.5 h-3.5" /> Use Guide's Device Location
              </button>

              <button
                onClick={handleGetDirections}
                className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" /> Get Directions Guidance
              </button>

              <button
                onClick={() => setIsConfirmReunitedOpen(true)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#075B50] hover:bg-[#176B57] text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Mark {selectedTourist.name} as Reunited
              </button>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#075B50] uppercase tracking-wider">Reunion Activity History</h3>

            {reunionActivity.length === 0 ? (
              <p className="text-xs text-[#507A70] py-4 text-center">No reunion events recorded yet.</p>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto">
                {reunionActivity.map((act) => (
                  <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#075B50]">
                      <span>{act.event}</span>
                      <span className="text-[10px] text-[#507A70] font-normal">{act.timestamp}</span>
                    </div>
                    {act.note && <p className="text-[11px] text-[#507A70] mt-0.5">{act.note}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Confirmation Dialog */}
      <ConfirmationModal
        isOpen={isConfirmReunitedOpen}
        title="Confirm Reunion Verification"
        message={`Confirm that ${selectedTourist.fullName} has physically arrived at ${meetingPoint.name} and is verified safe with the group?`}
        confirmText="Confirm Reunited"
        confirmColor="bg-[#075B50] hover:bg-[#176B57]"
        onConfirm={() => {
          setIsConfirmReunitedOpen(false);
          onMarkTouristReunited(selectedTourist.id);
        }}
        onCancel={() => setIsConfirmReunitedOpen(false)}
      />

    </div>
  );
}

// ============================================================================
// 9. SCREEN 6: GROUP MEMBERS (DEDICATED SCREEN)
// ============================================================================

function GroupMembersScreen({ 
  tourists, 
  alerts, 
  onSelectTouristForModal, 
  onNavigate,
  tourGuide
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Summary counts
  const totalMembers = tourists.length;
  const withGroupCount = tourists.filter(t => t.locationStatus === 'With Group').length;
  const separatedCount = tourists.filter(t => t.locationStatus === 'Separated' || t.status === 'Overdue').length;
  const reunitedCount = tourists.filter(t => t.locationStatus === 'Reunited').length;
  const unavailableCount = tourists.filter(t => t.locationStatus === 'Location Unavailable').length;

  // Search & Filter combined
  const filteredTourists = tourists.filter((t) => {
    // Search matching
    const searchMatch = 
      t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.locationLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm);

    if (!searchMatch) return false;

    // Filter matching
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'with-group') return t.locationStatus === 'With Group';
    if (selectedFilter === 'separated') return t.locationStatus === 'Separated' || t.status === 'Overdue';
    if (selectedFilter === 'reunited') return t.locationStatus === 'Reunited';
    if (selectedFilter === 'unavailable') return t.locationStatus === 'Location Unavailable';
    if (selectedFilter === 'sos') {
      return alerts.some(a => a.touristId === t.id && a.status === 'Active' && a.category === 'SOS Emergency');
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20 mb-2">
            <Users className="w-4 h-4 text-[#176B57]" />
            <span>Group Roster & Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            Group Members
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Manage your group and keep every traveller connected.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Tour Guide: <strong>{tourGuide?.name || "Tour Guide"}</strong> • Group: {tourGuide?.assignedGroup || "Munnar Highlands Expedition"}
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Total Members</span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#075B50] mt-1">{totalMembers}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">With Group</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">{withGroupCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Separated</span>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1">{separatedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Reunited</span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#075B50] mt-1">{reunitedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Location Unavailable</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-600 mt-1">{unavailableCount}</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#075B50]/15 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#507A70] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, phone, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#075B50]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Members' },
              { id: 'with-group', label: 'With Group' },
              { id: 'separated', label: 'Separated' },
              { id: 'reunited', label: 'Reunited' },
              { id: 'unavailable', label: 'Unavailable' },
              { id: 'sos', label: 'Active SOS' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-[#075B50] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#507A70]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tourist Cards Grid */}
        {filteredTourists.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#507A70] space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-[#075B50]">No matching tourists found</p>
            <p>Try refining your search keyword or active filter pill.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTourists.map((tourist) => {
              const activeSos = alerts.find(a => a.touristId === tourist.id && a.status === 'Active' && a.category === 'SOS Emergency');
              return (
                <div 
                  key={tourist.id}
                  className="p-5 rounded-2xl bg-white border border-[#075B50]/15 hover:border-[#075B50]/35 shadow-sm transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={tourist.avatar} 
                        alt={tourist.fullName} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#075B50]/20 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#075B50]">{tourist.fullName}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tourist.status === 'Safe' ? 'bg-[#EAF7F0] text-[#075B50]' :
                            tourist.status === 'Overdue' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700'
                          }`}>
                            {tourist.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#507A70] mt-0.5">{tourist.locationStatus}</p>
                        <p className="text-xs text-[#176B57] font-medium">{tourist.phone}</p>
                      </div>
                    </div>

                    {activeSos && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-600 text-white animate-pulse">
                        SOS ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Telemetry info */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-[#507A70] space-y-1">
                    <p className="font-semibold text-[#1A332D]">📍 {tourist.locationLabel}</p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span>🔋 Battery: {tourist.battery}</span>
                      <span>Last Seen: {tourist.lastCheckIn}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 justify-end text-xs">
                    <button
                      onClick={() => onSelectTouristForModal(tourist)}
                      className="px-3.5 py-1.5 rounded-full font-semibold bg-slate-100 hover:bg-slate-200 text-[#075B50] transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onNavigate('location', { highlightTouristId: tourist.id })}
                      className="px-3.5 py-1.5 rounded-full font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-colors cursor-pointer"
                    >
                      View Location
                    </button>
                    <button
                      onClick={() => onNavigate('reunion', { preselectedTouristId: tourist.id })}
                      className="px-3.5 py-1.5 rounded-full font-semibold bg-[#075B50] hover:bg-[#176B57] text-white transition-colors cursor-pointer"
                    >
                      Start Reunion
                    </button>
                    {activeSos && (
                      <button
                        onClick={() => onNavigate('alert-details', { alertId: activeSos.id })}
                        className="px-3.5 py-1.5 rounded-full font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
                      >
                        SOS Details
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}


// ============================================================================
// 10. SCREEN 7: LIVE LOCATION (DEDICATED SCREEN)
// ============================================================================

function LiveLocationScreen({ 
  tourists, 
  meetingPoint, 
  alerts, 
  highlightTouristId, 
  onSelectTouristForModal, 
  onNavigate,
  tourGuide
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeLocateId, setActiveLocateId] = useState(highlightTouristId || null);
  const [statusMessage, setStatusMessage] = useState(null);

  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);
  const markersRef = useRef({});

  // Dynamic summary
  const totalTourists = tourists.length;
  const availableCount = tourists.filter(t => t.locationStatus !== 'Location Unavailable').length;
  const unavailableCount = tourists.filter(t => t.locationStatus === 'Location Unavailable').length;
  const separatedCount = tourists.filter(t => t.locationStatus === 'Separated' || t.status === 'Overdue').length;
  const activeSosCount = alerts.filter(a => a.status === 'Active' && a.category === 'SOS Emergency').length;

  // Filter tourists
  const filteredTourists = tourists.filter((t) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'with-group') return t.locationStatus === 'With Group';
    if (selectedFilter === 'separated') return t.locationStatus === 'Separated' || t.status === 'Overdue';
    if (selectedFilter === 'reunited') return t.locationStatus === 'Reunited';
    if (selectedFilter === 'sos') {
      return alerts.some(a => a.touristId === t.id && a.status === 'Active');
    }
    if (selectedFilter === 'unavailable') return t.locationStatus === 'Location Unavailable';
    return true;
  });

  // Initialize Leaflet Live Map
  useEffect(() => {
    if (typeof L === 'undefined' || !mapRef.current) return;

    if (leafletMapInstance.current) {
      leafletMapInstance.current.remove();
      leafletMapInstance.current = null;
    }

    try {
      const map = L.map(mapRef.current, {
        center: [10.0889, 77.0595],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Safe geofence boundary (2km)
      L.circle([10.0889, 77.0595], {
        color: '#075B50',
        fillColor: '#EAF7F0',
        fillOpacity: 0.2,
        radius: 2000,
        dashArray: '6, 8'
      }).addTo(map);

      // Meeting point pin
      const mpIcon = L.divIcon({
        className: 'custom-mp-live',
        html: `<div style="transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center;">
          <div style="width:36px; height:36px; border-radius:50%; background:#075B50; color:#fff; border:3px solid #fff; box-shadow:0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:14px;">
            ★
          </div>
          <div style="background:#075B50; color:#fff; font-size:9px; font-weight:700; padding:1px 6px; border-radius:9999px; margin-top:2px;">
            Meeting Point
          </div>
        </div>`,
        iconSize: [36, 46],
        iconAnchor: [18, 46]
      });

      L.marker([meetingPoint.lat, meetingPoint.lng], { icon: mpIcon }).addTo(map)
        .bindPopup(`<strong>${meetingPoint.name}</strong><br><span style="font-size:11px;">Designated Hub</span>`);

      // Tourist markers
      const markerMap = {};
      tourists.forEach((tourist) => {
        const isSos = alerts.some(a => a.touristId === tourist.id && a.status === 'Active');
        const isSeparated = tourist.locationStatus === 'Separated' || tourist.status === 'Overdue';
        const isReunited = tourist.locationStatus === 'Reunited';

        const borderColor = isSos ? '#F52935' : isSeparated ? '#F59E0B' : isReunited ? '#3B82F6' : '#10B981';

        const customIcon = L.divIcon({
          className: 'custom-live-t-pin',
          html: `<div style="transform:translate(-50%,-100%); display:flex; flex-direction:column; align-items:center;">
            <div style="width:42px; height:42px; border-radius:50%; background:#fff; border:3.5px solid ${borderColor}; box-shadow:0 4px 14px rgba(0,0,0,0.25); overflow:hidden; position:relative;">
              <img src="${tourist.avatar}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="background:#fff; border:1px solid #075B50; font-size:10px; font-weight:800; color:#075B50; padding:2px 8px; border-radius:9999px; margin-top:2px; box-shadow:0 2px 5px rgba(0,0,0,0.12);">
              ${tourist.name}
            </div>
          </div>`,
          iconSize: [44, 54],
          iconAnchor: [22, 54]
        });

        const m = L.marker([tourist.lat, tourist.lng], { icon: customIcon }).addTo(map);
        m.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
            <strong style="color:#075B50; font-size:13px;">${tourist.fullName}</strong>
            <p style="margin:3px 0; font-size:11px; color:#1A332D;">Status: <strong>${tourist.status}</strong> (${tourist.locationStatus})</p>
            <p style="margin:2px 0; font-size:10px; color:#507A70;">📍 ${tourist.locationLabel}</p>
            <p style="margin:2px 0; font-size:10px; color:#507A70;">🔋 ${tourist.battery} • ${tourist.lastCheckIn}</p>
          </div>
        `);

        markerMap[tourist.id] = m;
      });

      markersRef.current = markerMap;
      leafletMapInstance.current = map;

      // If active locate tourist ID was provided, pan to them immediately
      if (activeLocateId && markerMap[activeLocateId]) {
        const target = tourists.find(t => t.id === activeLocateId);
        if (target) {
          map.setView([target.lat, target.lng], 16, { animate: true });
          markerMap[activeLocateId].openPopup();
        }
      }
    } catch (err) {
      console.warn("Leaflet live map error:", err);
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, [tourists, meetingPoint, alerts]);

  // Pan to specific tourist
  const handleLocateTourist = (tourist) => {
    setActiveLocateId(tourist.id);
    if (leafletMapInstance.current && markersRef.current[tourist.id]) {
      leafletMapInstance.current.setView([tourist.lat, tourist.lng], 16, { animate: true });
      markersRef.current[tourist.id].openPopup();
    }
  };

  // Telemetry refresh simulation
  const handleRefreshLocation = () => {
    setStatusMessage("Transmitting fresh telemetry ping to 4 tourist beacons...");
    setTimeout(() => {
      setStatusMessage("Telemetry refreshed. All 4 tourist beacons acknowledged on Munnar mesh network.");
      setTimeout(() => setStatusMessage(null), 4000);
    }, 800);
  };

  // Browser geolocation for guide's device
  const handleUseDeviceLocation = () => {
    setStatusMessage("Requesting browser GPS for guide's mobile terminal...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setStatusMessage(`Guide device located at ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E. (Guide terminal only; tourist hardware is tracked via simulated mesh telemetry).`);
          if (leafletMapInstance.current) {
            leafletMapInstance.current.setView([lat, lng], 15, { animate: true });
          }
        },
        (err) => {
          setStatusMessage(`Geolocation unavailable: ${err.message}. Retaining Munnar Highlands center.`);
        }
      );
    } else {
      setStatusMessage("Browser geolocation unsupported on this client.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20 mb-2">
            <MapPin className="w-4 h-4 text-[#176B57]" />
            <span>Interactive Real-Time Radar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            Live Location
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Know where your group is and help everyone travel safely.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Tour Guide: <strong>{tourGuide?.name || "Tour Guide"}</strong> • Sector: Munnar, Kerala, India
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Location KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Total Tourists</span>
          <div className="text-xl sm:text-2xl font-extrabold text-[#075B50] mt-1">{totalTourists}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Location Available</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">{availableCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Unavailable</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-600 mt-1">{unavailableCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Separated</span>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1">{separatedCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Active SOS Alerts</span>
          <div className="text-xl sm:text-2xl font-extrabold text-red-600 mt-1">{activeSosCount}</div>
        </div>
      </div>

      {/* Controls & Filter Pills */}
      <div className="bg-white rounded-3xl p-5 border border-[#075B50]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Tourists' },
            { id: 'with-group', label: 'With Group' },
            { id: 'separated', label: 'Separated' },
            { id: 'reunited', label: 'Reunited' },
            { id: 'sos', label: 'Active SOS' },
            { id: 'unavailable', label: 'Unavailable' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#075B50] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#507A70]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleRefreshLocation}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
          </button>
          <button
            onClick={handleUseDeviceLocation}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" /> Guide GPS
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 bg-[#EAF7F0] rounded-2xl border border-[#075B50]/20 text-xs text-[#075B50] font-medium flex items-center gap-2">
          <Info className="w-4 h-4 text-[#176B57] flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Map Centerpiece and Tourist List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Full Map */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#075B50] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#176B57]" />
              Munnar Interactive Grid (Leaflet)
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#075B50]">
                2km Boundary Circle
              </span>
              <button
                onClick={() => {
                  if (leafletMapInstance.current) {
                    leafletMapInstance.current.setView([10.0889, 77.0595], 14);
                  }
                }}
                className="text-xs text-[#075B50] font-bold hover:underline cursor-pointer"
              >
                Reset Center
              </button>
            </div>
          </div>

          <div ref={mapRef} className="map-container rounded-2xl border border-slate-200" style={{ height: '480px' }}>
            {/* Leaflet map mounts here */}
          </div>

          {/* Marker Legend */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#507A70]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" /> With Group (Safe)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" /> Separated / Overdue
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-white" /> Active SOS
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-[#075B50] text-white flex items-center justify-center text-[8px]">★</span> Meeting Hub
            </span>
          </div>
        </div>

        {/* Right 1 Col: Tourist Radar List */}
        <div className="bg-white rounded-3xl p-6 border border-[#075B50]/15 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#075B50] flex items-center justify-between">
            <span>Tourists on Radar ({filteredTourists.length})</span>
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filteredTourists.map((tourist) => {
              const activeSos = alerts.find(a => a.touristId === tourist.id && a.status === 'Active');
              return (
                <div 
                  key={tourist.id}
                  className={`p-4 rounded-2xl border transition-all text-xs space-y-2.5 ${
                    activeLocateId === tourist.id ? 'bg-[#EAF7F0]/60 border-[#075B50]' : 'bg-slate-50 border-slate-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={tourist.avatar} 
                        alt={tourist.name} 
                        className="w-9 h-9 rounded-full object-cover border border-[#075B50]/20"
                      />
                      <div>
                        <span className="font-bold text-[#075B50] block">{tourist.fullName}</span>
                        <span className="text-[10px] text-[#507A70]">{tourist.locationStatus}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeSos ? 'bg-red-500 text-white animate-pulse' :
                      tourist.status === 'Safe' ? 'bg-[#EAF7F0] text-[#075B50]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activeSos ? 'SOS' : tourist.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#507A70] font-medium line-clamp-1">📍 {tourist.locationLabel}</p>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={() => handleLocateTourist(tourist)}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#075B50] hover:bg-[#176B57] text-white transition-colors cursor-pointer"
                    >
                      Locate on Map
                    </button>
                    <button
                      onClick={() => onSelectTouristForModal(tourist)}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onNavigate('reunion', { preselectedTouristId: tourist.id })}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer"
                    >
                      Reunion
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

// ============================================================================
// 11. SCREEN 8: ALERTS & NOTIFICATIONS (DEDICATED SCREEN)
// ============================================================================

function AlertsNotificationsScreen({ 
  alerts, 
  onResolveAlert, 
  onReopenAlert, 
  onMarkAllAsRead, 
  onNavigate,
  tourGuide
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [confirmModalConfig, setConfirmModalConfig] = useState(null);

  // Dynamic calculations
  const allCount = alerts.length;
  const activeSosCount = alerts.filter(a => a.category === 'SOS Emergency' && a.status === 'Active').length;
  const unresolvedCount = alerts.filter(a => a.status === 'Active').length;
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;

  // Filter & Search & Sort
  const processedAlerts = alerts
    .filter((a) => {
      const matchSearch = 
        a.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.alertType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchSearch) return false;

      if (categoryFilter === 'all') return true;
      if (categoryFilter === 'sos') return a.category === 'SOS Emergency';
      if (categoryFilter === 'unresolved') return a.status === 'Active';
      if (categoryFilter === 'resolved') return a.status === 'Resolved';
      if (categoryFilter === 'emergency') return a.priority === 'Emergency';
      if (categoryFilter === 'warning') return a.priority === 'Urgent' || a.priority === 'Moderate';
      if (categoryFilter === 'info') return a.priority === 'Low' || a.category === 'General Safety Alert';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return (b.createdAt || b.id) - (a.createdAt || a.id);
      if (sortBy === 'oldest') return (a.createdAt || a.id) - (b.createdAt || b.id);
      if (sortBy === 'priority') {
        const order = { 'Emergency': 3, 'Urgent': 2, 'Moderate': 1, 'Low': 0 };
        return (order[b.priority] || 0) - (order[a.priority] || 0);
      }
      return 0;
    });

  const handleResolveClick = (alert) => {
    setConfirmModalConfig({
      title: "Resolve Incident Alert",
      message: `Mark the alert for ${alert.touristName} (${alert.alertType}) as resolved?`,
      confirmText: "Confirm Resolved",
      confirmColor: "bg-emerald-600 hover:bg-emerald-700",
      action: () => onResolveAlert(alert.id)
    });
  };

  const handleReopenClick = (alert) => {
    setConfirmModalConfig({
      title: "Reopen Incident Alert",
      message: `Restore the alert for ${alert.touristName} (${alert.alertType}) to Active status?`,
      confirmText: "Confirm Reopen",
      confirmColor: "bg-amber-600 hover:bg-amber-700",
      action: () => onReopenAlert(alert.id)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20 mb-2">
            <Bell className="w-4 h-4 text-[#176B57]" />
            <span>Incident Log & Telemetry Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            Alerts & Notifications
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Stay informed about your group's safety.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Tour Guide: <strong>{tourGuide?.name || "Tour Guide"}</strong> • Unresolved Alerts: <strong>{unresolvedCount}</strong>
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">All Alerts</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#075B50] mt-1">{allCount}</div>
          <p className="text-[11px] text-[#176B57]">Recorded across session</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Active SOS</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">{activeSosCount}</div>
          <p className="text-[11px] text-red-500">Requires guide intervention</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Unresolved Alerts</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{unresolvedCount}</div>
          <p className="text-[11px] text-amber-600">Pending review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#075B50]/10 shadow-sm summary-card">
          <span className="text-[10px] uppercase font-bold text-[#507A70]">Resolved Incidents</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{resolvedCount}</div>
          <p className="text-[11px] text-emerald-600">Successfully handled</p>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#075B50]/15 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#507A70] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by tourist, alert type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#075B50]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-[#507A70] font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-xl border border-[#075B50]/20 bg-white text-xs font-semibold text-[#075B50]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Highest Priority First</option>
            </select>

            {unresolvedCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#075B50] transition-colors cursor-pointer"
              >
                Mark Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'sos', label: 'Active SOS' },
            { id: 'unresolved', label: 'Unresolved' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'emergency', label: 'Emergency' },
            { id: 'warning', label: 'Warning' },
            { id: 'info', label: 'Information' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setCategoryFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === f.id
                  ? 'bg-[#075B50] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#507A70]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Alert Cards List */}
        {processedAlerts.length === 0 ? (
          <div className="py-14 text-center text-xs text-[#507A70] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto opacity-70" />
            <p className="font-bold text-[#075B50]">No matching alerts</p>
            <p>All recorded telemetry events are in clear state or do not match current filters.</p>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {processedAlerts.map((alert) => {
              const isEmerg = alert.priority === 'Emergency' || alert.category === 'SOS Emergency';
              const isResolved = alert.status === 'Resolved';

              return (
                <div 
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isResolved 
                      ? 'bg-slate-50 border-slate-200 opacity-90' 
                      : isEmerg 
                      ? 'bg-red-50/60 border-red-300 shadow-sm' 
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isResolved ? 'bg-slate-200 text-slate-700' :
                        isEmerg ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {alert.category || 'Safety Notice'}
                      </span>
                      <h3 className="text-sm font-bold text-[#075B50]">{alert.alertType}</h3>
                      <span className="text-xs text-[#507A70]">for <strong>{alert.touristName}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#507A70] font-medium">{alert.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#1A332D] font-medium leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[11px] text-[#507A70]">
                      📍 {alert.location || 'Munnar Sector Circuit'} (Demo Telemetry)
                    </span>

                    <div className="flex flex-wrap gap-2 justify-end">
                      <button
                        onClick={() => onNavigate('alert-details', { alertId: alert.id })}
                        className="px-3.5 py-1.5 rounded-full font-bold bg-[#075B50] hover:bg-[#176B57] text-white transition-colors cursor-pointer text-xs"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onNavigate('location', { highlightTouristId: alert.touristId })}
                        className="px-3 py-1.5 rounded-full font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer text-xs"
                      >
                        Locate
                      </button>
                      <button
                        onClick={() => onNavigate('reunion', { preselectedTouristId: alert.touristId })}
                        className="px-3 py-1.5 rounded-full font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-[#EAF7F0] transition-colors cursor-pointer text-xs"
                      >
                        Reunion
                      </button>
                      {!isResolved ? (
                        <button
                          onClick={() => handleResolveClick(alert)}
                          className="px-3 py-1.5 rounded-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer text-xs"
                        >
                          Resolve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReopenClick(alert)}
                          className="px-3 py-1.5 rounded-full font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer text-xs"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Confirmation Dialog */}
      {confirmModalConfig && (
        <ConfirmationModal
          isOpen={true}
          title={confirmModalConfig.title}
          message={confirmModalConfig.message}
          confirmText={confirmModalConfig.confirmText}
          confirmColor={confirmModalConfig.confirmColor}
          onConfirm={() => {
            confirmModalConfig.action();
            setConfirmModalConfig(null);
          }}
          onCancel={() => setConfirmModalConfig(null)}
        />
      )}

    </div>
  );
}

// ============================================================================
// 12. SCREEN 9: AI TRAVEL ASSISTANT (DEDICATED SCREEN)
// ============================================================================

function AIAssistantScreen({ tourists, alerts, onNavigate, tourGuide }) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "assistant",
      text: `Hello ${tourGuide?.name || "Tour Guide"}! I am your Travel Guard Safety Assistant for the Munnar Highlands Expedition. I have real-time visibility into your 4 group members (Hisha, Rinsha, Sana, and Dilrooba). How can I assist you with trail safety, emergency protocol, or weather guidance today?`,
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const activeSos = alerts.find(a => a.status === 'Active' && a.category === 'SOS Emergency');

  const suggestedQuestions = [
    "What should our group do in an emergency?",
    "How can we stay together during a trek?",
    "What should we do if someone gets separated?",
    "Give us a travel safety checklist.",
    "What should we do if a tourist's location is unavailable?",
    "What precautions should we take while travelling in Munnar?"
  ];

  // Local Knowledge Base for Munnar & Travel Safety
  const generateResponse = (prompt) => {
    const q = prompt.toLowerCase();
    const guideDisplayName = tourGuide?.name || "Tour Guide";

    if (q.includes("emergency") || q.includes("sos") || q.includes("danger")) {
      return `🚨 EMERGENCY PROTOCOL FOR TOUR GUIDE ${guideDisplayName.toUpperCase()}:

1. Stop the group and gather members in a safe, visible assembly point.
2. Open 'Screen 3: SOS Emergency Support' to record telemetry and incident priority.
3. Verify affected tourist's vitals and exact coordinates.
4. If life-threatening, immediately dial Kerala Mountain Rescue: 112 / 108.
5. Activate Reunion Mode to direct team members to Munnar Tea Museum Checkpoint.`;
    }

    if (q.includes("separated") || q.includes("lost") || q.includes("find")) {
      return `🧭 SEPARATED TOURIST RECOVERY PROTOCOL:

1. Instruct the separated tourist via SMS/Call to HALT and remain at their last landmark.
2. In Travel Guard, open 'Screen 5: Reunion Mode' and select the tourist (e.g. Rinsha or Hisha).
3. Confirm designated checkpoint (Munnar Tea Museum Hub).
4. Review beacon telemetry on 'Screen 7: Live Location' to assess distance and trail branch.
5. Guide tourist to meeting point and mark verified reunited.`;
    }

    if (q.includes("checklist") || q.includes("check list")) {
      return `✅ MUNNAR HIGHLANDS SAFETY CHECKLIST:

• Mesh Battery Health: Ensure all 4 tourist devices are above 50%.
• Weather Advisory: Keep raingear ready for afternoon mist.
• Geofence Boundaries: Maintain members within the 2km perimeter.
• Clean Water Points: Verified hydration posts at Blossom Hydel & Tea Museum.
• Ranger Beacon: Active check-in every 30 minutes with guide ${guideDisplayName}.`;
    }

    if (q.includes("unavailable") || q.includes("offline") || q.includes("signal")) {
      return `📡 LOCATION UNAVAILABLE TROUBLESHOOTING:

1. Valley shadows in Munnar tea hills may temporarily attenuate GPS.
2. The Travel Guard peer-to-peer mesh beacon will automatically relay telemetry through nearest companion devices.
3. Instruct tourist to move 10-15 meters onto open trail knoll away from dense tree canopy.
4. Click 'Refresh Telemetry' on Screen 7 to transmit priority ping.`;
    }

    if (q.includes("munnar") || q.includes("weather") || q.includes("precaution")) {
      return `🌿 MUNNAR TRAVEL PRECAUTIONS:

• Leeches & Wet Rocks: High mist on Attukad Ridge can make granite steps slippery.
• Altitude Shift: Munnar averages 1,600m above sea level; maintain steady hydration.
• Wild Elephants & Wildlife: Stay strictly on demarcated tea trails; avoid lone shortcuts.
• Assembly Hub: Always regroup at Munnar Tea Museum before dusk.`;
    }

    return `Thank you, ${guideDisplayName}. Regarding "${prompt}": All 4 members (Hisha, Rinsha, Sana, Dilrooba) are connected to your Munnar mesh network. For safety coordination, ensure you maintain direct beacon contact and utilize Reunion Mode if trail spacing widens. Let me know if you need specific emergency checklists or checkpoint guidance!`;
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await apiService.sendAssistantChat(text);
      const replyText = data && data.reply ? data.reply : generateResponse(text);
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn("[AI Assistant] Backend offline, using local engine:", err);
      const fallbackReply = generateResponse(text);
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionType) => {
    if (actionType === 'checklist') handleSendMessage("Give us a travel safety checklist.");
    if (actionType === 'emergency') handleSendMessage("What should our group do in an emergency?");
    if (actionType === 'lost') handleSendMessage("What should we do if someone gets separated?");
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#075B50]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F0] text-[#075B50] border border-[#075B50]/20 mb-2">
            <Bot className="w-4 h-4 text-[#176B57]" />
            <span>Smart Safety Companion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B50] tracking-tight">
            AI Travel Assistant
          </h1>
          <p className="text-sm text-[#176B57] mt-1 font-medium">
            “Your smart companion for safer journeys.”
          </p>
          <p className="text-xs text-[#507A70] mt-1">
            Tour Guide: <strong>{tourGuide?.name || "Tour Guide"}</strong> • Context: {tourGuide?.assignedGroup || "Munnar Highlands Expedition"}
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#1A332D] transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Active SOS Warning Link if exists */}
      {activeSos && (
        <div className="p-4 bg-red-50 rounded-2xl border border-red-300 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-600 animate-bounce" />
            <div>
              <p className="font-bold text-red-700">Active SOS in progress: {activeSos.touristName}</p>
              <p className="text-red-600 text-[11px]">{activeSos.description}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alert-details', { alertId: activeSos.id })}
            className="px-3.5 py-1.5 rounded-full font-bold bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Review SOS Details
          </button>
        </div>
      )}

      {/* Quick Actions Row */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#075B50]/15 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#075B50] uppercase tracking-wider">Safety Quick Guidance:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction('checklist')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EAF7F0] hover:bg-[#D4EFE0] text-[#075B50] transition-colors cursor-pointer"
          >
            ✓ Safety Checklist
          </button>
          <button
            onClick={() => handleQuickAction('emergency')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer"
          >
            🚨 Emergency Guide
          </button>
          <button
            onClick={() => handleQuickAction('lost')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
          >
            🧭 Lost Tourist Help
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-[#075B50]/15 shadow-sm overflow-hidden flex flex-col h-[560px]">
        
        {/* Chat Header Bar */}
        <div className="p-4 bg-[#EAF7F0]/60 border-b border-[#075B50]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#075B50] text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#075B50]">Travel Guard Safety AI</h3>
              <p className="text-[10px] text-[#176B57]">Honest Demo Assistant • Munnar Knowledge Base</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: `msg-${Date.now()}`,
                    sender: "assistant",
                    text: "Conversation refreshed. How can I help you ensure safe travels for your group?",
                    timestamp: "Just now"
                  }
                ]);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#075B50]/20 text-[#075B50] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              New Chat
            </button>
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              className="p-1.5 rounded-full text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-[#075B50] text-white shadow-sm' 
                    : 'bg-slate-50 border border-slate-100 text-[#1A332D]'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[10px] mt-2 text-right ${
                    isUser ? 'text-white/70' : 'text-[#507A70]'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-[#507A70] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#075B50] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#075B50] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#075B50] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-medium ml-1">Analyzing trail safety guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 overflow-x-auto">
          <div className="flex gap-2 text-[11px] whitespace-nowrap">
            {suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sq)}
                className="px-3 py-1 rounded-full bg-white border border-[#075B50]/15 hover:border-[#075B50]/40 text-[#075B50] font-medium transition-colors cursor-pointer"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Box */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask a safety question about your group or Munnar trails..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-full border border-[#075B50]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#075B50]/30"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 rounded-full bg-[#075B50] hover:bg-[#176B57] disabled:opacity-40 disabled:hover:bg-[#075B50] text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isClearConfirmOpen}
        title="Clear Conversation History"
        message="Are you sure you want to clear all chat messages in this session?"
        confirmText="Clear History"
        confirmColor="bg-red-600 hover:bg-red-700"
        onConfirm={() => {
          setIsClearConfirmOpen(false);
          setMessages([
            {
              id: `msg-${Date.now()}`,
              sender: "assistant",
              text: "Conversation cleared. Ready for your questions.",
              timestamp: "Just now"
            }
          ]);
        }}
        onCancel={() => setIsClearConfirmOpen(false)}
      />

    </div>
  );
}

// ============================================================================
// 13. MAIN ROOT APPLICATION COMPONENT (State & Screen Orchestrator)
// ============================================================================

function App() {
  // Screens: 'welcome' (Screen 1) | 'dashboard' (Screen 2) | 'sos' (Screen 3) |
  //          'alert-details' (Screen 4) | 'reunion' (Screen 5) | 'members' (Screen 6) |
  //          'location' (Screen 7) | 'alerts' (Screen 8) | 'assistant' (Screen 9)
  const [currentScreen, setCurrentScreen] = useState('welcome');

  // Shared Data States
  const [tourGuide, setTourGuide] = useState(TOUR_GUIDE);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [tourists, setTourists] = useState(INITIAL_TOURISTS);
  const [alerts, setAlerts] = useState([]); // Empty initial state per Requirement 6
  const [meetingPoint, setMeetingPoint] = useState(DEFAULT_MEETING_POINT);
  const [backendStatus, setBackendStatus] = useState({ connected: false, message: "Connecting..." });
  const [reunionActivity, setReunionActivity] = useState([
    {
      id: "act-1",
      event: "Reunion Mode initialized",
      timestamp: "Today",
      note: "Meeting point established at Munnar Tea Museum Checkpoint."
    }
  ]);

  // Contextual routing params
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [preselectedTouristId, setPreselectedTouristId] = useState(null);
  const [highlightTouristId, setHighlightTouristId] = useState(null);
  const [modalTourist, setModalTourist] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Synchronize Live Backend Data on Mount & Interval
  useEffect(() => {
    let isMounted = true;

    async function syncBackendData() {
      try {
        // 0. Live Tour Guide Profile from database
        try {
          const profileRes = await apiService.getProfile();
          if (profileRes && profileRes.user && isMounted) {
            setTourGuide(prev => ({
              ...prev,
              id: profileRes.user.user_id || prev.id,
              name: profileRes.user.name || prev.name,
              phone: profileRes.user.phone || prev.phone,
              email: profileRes.user.email || prev.email,
              role: profileRes.user.role === 'guide' ? "Lead Mountain Safety Guide" : (profileRes.user.role || prev.role)
            }));
          }
        } catch (profileErr) {
          console.warn("[Travel Guard Profile Sync]:", profileErr.message);
        }

        // 1. Live Alerts from SQLite / Express backend
        const alertsRes = await apiService.getAlerts();
        if (alertsRes && Array.isArray(alertsRes.alerts)) {
          const mappedAlerts = alertsRes.alerts.map(a => {
            const timeStr = a.created_at ? new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today';
            return {
              id: a.alert_id,
              alertType: a.alert_type === 'sos_emergency' ? `${a.category || 'Emergency'} SOS` : (a.category || 'General Safety Alert'),
              category: a.alert_type === 'sos_emergency' ? 'SOS Emergency' : 'General Safety Alert',
              priority: a.priority ? (a.priority.charAt(0).toUpperCase() + a.priority.slice(1)) : 'Critical',
              status: a.status === 'active' ? 'Active' : (a.status === 'investigating' ? 'Investigating' : 'Resolved'),
              timestamp: timeStr,
              createdAt: a.created_at ? new Date(a.created_at).getTime() : Date.now(),
              touristId: (a.tourist_name || 'hisha').toLowerCase(),
              touristName: a.tourist_name || 'Hisha Mariyam',
              description: a.description || 'Active alert in safety database.',
              location: 'Munnar Grid Telemetry',
              timeline: [
                {
                  event: `Alert ${a.status}`,
                  timestamp: timeStr,
                  note: `Recorded in backend database by ${a.creator_name || tourGuide?.name || 'Tour Guide'}.`
                }
              ]
            };
          });
          if (isMounted) setAlerts(mappedAlerts);
        }

        // 2. Live Group Members & Location Telemetry
        const membersRes = await apiService.getMembers("grp-munnar-01");
        if (membersRes && Array.isArray(membersRes.members) && membersRes.members.length > 0) {
          if (isMounted) {
            setTourists(prevTourists => {
              return prevTourists.map(t => {
                const liveMem = membersRes.members.find(m => m.name.toLowerCase() === t.name.toLowerCase());
                if (!liveMem) return t;
                const locStatus = liveMem.membership_status === 'with_group' ? 'With Group' :
                                  liveMem.membership_status === 'separated' ? 'Separated' :
                                  liveMem.membership_status === 'location_unavailable' ? 'Location Unavailable' : t.locationStatus;
                return {
                  ...t,
                  locationStatus: locStatus,
                  lat: liveMem.latitude || t.lat,
                  lng: liveMem.longitude || t.lng,
                  battery: liveMem.battery_pct ? `${liveMem.battery_pct}%` : t.battery
                };
              });
            });
          }
        }

        // 3. Live Reunion & Meeting Point
        const reunionRes = await apiService.getReunion("grp-munnar-01");
        if (reunionRes && reunionRes.meeting_point_name && isMounted) {
          setMeetingPoint(prev => ({
            ...prev,
            name: reunionRes.meeting_point_name,
            lat: reunionRes.meeting_point_lat || prev.lat,
            lng: reunionRes.meeting_point_lng || prev.lng
          }));
        }

        if (isMounted) {
          setBackendStatus({ connected: true, message: "Connected to REST API" });
        }
      } catch (err) {
        console.warn("[Travel Guard Backend Sync] Local fallback mode:", err.message);
        if (isMounted) {
          setBackendStatus({ connected: false, message: "Offline Demo Mode" });
        }
      }
    }

    syncBackendData();
    const timer = setInterval(syncBackendData, 20000);
    return () => { isMounted = false; clearInterval(timer); };
  }, []);

  // Navigation Handler
  const navigateTo = (screen, params = {}) => {
    setCurrentScreen(screen);
    setIsMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params.alertId !== undefined) setSelectedAlertId(params.alertId);
    if (params.preselectedTouristId !== undefined) setPreselectedTouristId(params.preselectedTouristId);
    if (params.highlightTouristId !== undefined) setHighlightTouristId(params.highlightTouristId);
  };

  // Tour Guide Profile Update Handler (Connected to Backend Database API)
  const handleUpdateGuideProfile = async ({ name, phone }) => {
    const res = await apiService.updateProfile({ name, phone });
    if (res && res.user) {
      setTourGuide(prev => ({
        ...prev,
        name: res.user.name,
        phone: res.user.phone || prev.phone,
        email: res.user.email || prev.email
      }));
      return res.user;
    }
  };

  // SOS Creation Handler (From Screen 3 - Connected to Backend API)
  const handleTriggerSosConfirm = async ({ touristId, touristName, category, priority, description, location }) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let createdAlertId = `sos-${Date.now()}`;

    try {
      const res = await apiService.triggerSos({
        touristId,
        groupId: "grp-munnar-01",
        category,
        priority: priority.toLowerCase(),
        description
      });
      if (res && res.alert && res.alert.alert_id) {
        createdAlertId = res.alert.alert_id;
      }
    } catch (err) {
      console.warn("Backend SOS API call failed, saved locally:", err);
    }

    const newAlert = {
      id: createdAlertId,
      alertType: `${category} Emergency`,
      category: "SOS Emergency",
      priority,
      status: "Active",
      timestamp,
      createdAt: Date.now(),
      touristId,
      touristName,
      description,
      location,
      timeline: [
        {
          event: "Alert created",
          timestamp,
          note: `Emergency SOS recorded in database by Tour Guide ${tourGuide?.name || "Tour Guide"} for ${touristName}.`
        }
      ]
    };

    // Update shared alerts array and tourist status
    setAlerts(prev => [newAlert, ...prev.filter(a => a.id !== createdAlertId)]);
    setTourists(prev => prev.map(t => (t.id === touristId || t.name.toLowerCase() === touristName.toLowerCase()) ? { ...t, status: 'Emergency', locationStatus: 'Separated' } : t));

    // Navigate to Alert Details (Screen 4)
    navigateTo('alert-details', { alertId: createdAlertId });
  };

  // Simulate Demo Advisory Alert (For Testing)
  const handleSimulateAlert = () => {
    const alertId = `adv-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const simulatedList = [
      {
        touristId: "rinsha",
        touristName: "Rinsha Fathima",
        alertType: "Weather Advisory",
        category: "General Safety Alert",
        priority: "Urgent",
        description: "Afternoon mist reducing visibility near Attukad Ridge Trail. Advised to hold at marked gazebo.",
        location: "Attukad Ridge Overlook (850m SW)"
      },
      {
        touristId: "hisha",
        touristName: "Hisha Mariyam",
        alertType: "Check-in Advisory",
        category: "Separated Tourist",
        priority: "Moderate",
        description: "Approaching scheduled 30m check-in checkpoint. Telemetry beacon pinged.",
        location: "Old Munnar Tea Trail (600m NE)"
      }
    ];

    const pick = simulatedList[alerts.length % simulatedList.length];
    const newAlert = {
      id: alertId,
      ...pick,
      status: "Active",
      timestamp,
      createdAt: Date.now(),
      timeline: [
        {
          event: "Alert created",
          timestamp,
          note: "Demo safety telemetry advisory simulated."
        }
      ]
    };

    setAlerts(prev => [newAlert, ...prev]);
  };

  // Resolve Alert Handler (Connected to Backend API)
  const handleResolveAlert = async (alertId) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      await apiService.resolveAlert(alertId);
    } catch (err) {
      console.warn("Backend resolveAlert API failed, resolving locally:", err);
    }

    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: "Resolved",
          timeline: [
            ...(a.timeline || []),
            { event: "Alert resolved", timestamp, note: `Marked resolved in database by Tour Guide ${tourGuide?.name || "Tour Guide"}.` }
          ]
        };
      }
      return a;
    }));

    // If tourist had emergency, restore to Safe if no other active SOS
    const targetAlert = alerts.find(a => a.id === alertId);
    if (targetAlert) {
      setTourists(prev => prev.map(t => {
        if (t.id === targetAlert.touristId || t.name.toLowerCase() === (targetAlert.touristName || '').toLowerCase()) {
          return { ...t, status: 'Safe' };
        }
        return t;
      }));
    }
  };

  // Reopen Alert Handler (Connected to Backend API)
  const handleReopenAlert = async (alertId) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      await apiService.reopenAlert(alertId);
    } catch (err) {
      console.warn("Backend reopenAlert API failed:", err);
    }

    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: "Active",
          timeline: [
            ...(a.timeline || []),
            { event: "Alert reopened", timestamp, note: `Reopened in database by Tour Guide ${tourGuide?.name || "Tour Guide"}.` }
          ]
        };
      }
      return a;
    }));
  };

  // Update Meeting Point (Connected to Backend API)
  const handleUpdateMeetingPoint = async (newPoint) => {
    setMeetingPoint(newPoint);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      await apiService.updateMeetingPoint("grp-munnar-01", newPoint.name, newPoint.lat, newPoint.lng);
    } catch (err) {
      console.warn("Backend updateMeetingPoint API failed:", err);
    }

    setReunionActivity(prev => [
      {
        id: `act-${Date.now()}`,
        event: "Meeting point updated",
        timestamp,
        note: `Checkpoint relocated to ${newPoint.name} in database.`
      },
      ...prev
    ]);
  };

  // Mark Tourist as Reunited (Connected to Backend API)
  const handleMarkTouristReunited = async (touristId) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetTourist = tourists.find(t => t.id === touristId || t.name.toLowerCase() === touristId.toLowerCase());

    try {
      await apiService.markTouristReunited(touristId);
    } catch (err) {
      console.warn("Backend markTouristReunited API failed:", err);
    }

    setTourists(prev => prev.map(t => {
      if (t.id === touristId || t.name.toLowerCase() === touristId.toLowerCase()) {
        return { ...t, status: 'Safe', locationStatus: 'Reunited', lastCheckIn: 'Just now' };
      }
      return t;
    }));

    setReunionActivity(prev => [
      {
        id: `act-${Date.now()}`,
        event: "Tourist marked as reunited",
        timestamp,
        note: `${targetTourist?.fullName || 'Tourist'} physically confirmed reunited at ${meetingPoint.name}.`
      },
      ...prev
    ]);
  };

  // Mark All Alerts as Read
  const handleMarkAllAsRead = async () => {
    try {
      await fetch(`${API_BASE}/notifications/read-all`, { method: 'PATCH' });
    } catch (e) {
      // ignore
    }
    alert("All active alerts acknowledged in database.");
  };

  const unreadAlertsCount = alerts.filter(a => a.status === 'Active').length;

  // Render Screen 1 (Welcome Page) as Full standalone view
  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen 
        onGoToDashboard={() => navigateTo('dashboard')} 
        onUpdateGuideProfile={handleUpdateGuideProfile}
        tourGuide={tourGuide}
      />
    );
  }

  // Render Screens 2 through 9 with Shared Header & Sidebar
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFCFB] text-[#1A332D]">
      
      {/* Shared Header for Guide Screens */}
      <SharedAppHeader 
        currentScreen={currentScreen} 
        onNavigate={navigateTo} 
        unreadAlertsCount={unreadAlertsCount}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        backendStatus={backendStatus}
        tourGuide={tourGuide}
        onEditProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Shared Left Sidebar Navigation */}
        <SharedSidebar 
          currentScreen={currentScreen} 
          onNavigate={navigateTo} 
          unreadAlertsCount={unreadAlertsCount}
          isOpenOnMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
          tourGuide={tourGuide}
          onEditProfile={() => setIsProfileModalOpen(true)}
        />

        {/* Main Content Body for Active Screen */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {currentScreen === 'dashboard' && (
            <DashboardScreen 
              tourists={tourists}
              alerts={alerts}
              onNavigate={navigateTo}
              onSelectTourist={(t) => setModalTourist(t)}
              onSimulateAlert={handleSimulateAlert}
              tourGuide={tourGuide}
              onEditProfile={() => setIsProfileModalOpen(true)}
            />
          )}

          {currentScreen === 'sos' && (
            <SOSEmergencyScreen 
              tourists={tourists}
              alerts={alerts}
              onTriggerSosConfirm={handleTriggerSosConfirm}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'alert-details' && (
            <AlertDetailsScreen 
              alertId={selectedAlertId}
              alerts={alerts}
              tourists={tourists}
              onResolveAlert={handleResolveAlert}
              onReopenAlert={handleReopenAlert}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'reunion' && (
            <ReunionModeScreen 
              tourists={tourists}
              meetingPoint={meetingPoint}
              reunionActivity={reunionActivity}
              preselectedTouristId={preselectedTouristId}
              onUpdateMeetingPoint={handleUpdateMeetingPoint}
              onMarkTouristReunited={handleMarkTouristReunited}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'members' && (
            <GroupMembersScreen 
              tourists={tourists}
              alerts={alerts}
              onSelectTouristForModal={(t) => setModalTourist(t)}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'location' && (
            <LiveLocationScreen 
              tourists={tourists}
              meetingPoint={meetingPoint}
              alerts={alerts}
              highlightTouristId={highlightTouristId}
              onSelectTouristForModal={(t) => setModalTourist(t)}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'alerts' && (
            <AlertsNotificationsScreen 
              alerts={alerts}
              onResolveAlert={handleResolveAlert}
              onReopenAlert={handleReopenAlert}
              onMarkAllAsRead={handleMarkAllAsRead}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

          {currentScreen === 'assistant' && (
            <AIAssistantScreen 
              tourists={tourists}
              alerts={alerts}
              onNavigate={navigateTo}
              tourGuide={tourGuide}
            />
          )}

        </main>
      </div>

      {/* Member Detail Modal */}
      {modalTourist && (
        <MemberDetailModal 
          tourist={modalTourist}
          isOpen={true}
          onClose={() => setModalTourist(null)}
          onLocate={(tId) => navigateTo('location', { highlightTouristId: tId })}
          onStartReunion={(tId) => navigateTo('reunion', { preselectedTouristId: tId })}
          onTriggerSos={(tId) => navigateTo('sos', { preselectedTouristId: tId })}
          hasActiveSos={alerts.some(a => a.touristId === modalTourist.id && a.status === 'Active')}
          alertRecord={alerts.find(a => a.touristId === modalTourist.id && a.status === 'Active')}
          onViewAlert={(aId) => navigateTo('alert-details', { alertId: aId })}
          tourGuide={tourGuide}
        />
      )}

      {/* Tour Guide Profile Edit Modal */}
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        tourGuide={tourGuide}
        onSaveProfile={handleUpdateGuideProfile}
      />

    </div>
  );
}

// React 18 Mounting
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
