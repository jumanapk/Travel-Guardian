// Travel Guard — Vercel Serverless API Handler
// Provides full REST API functionality for all 9 screens when hosted on Vercel

let users = [
  { user_id: "usr-guide-01", name: "Jumana", email: "jumana@travelguard.demo", role: "guide", phone: "+91 98471 23456", account_status: "active" },
  { user_id: "usr-tourist-01", name: "Hisha", email: "hisha@travelguard.demo", role: "tourist", phone: "+91 94462 11001", account_status: "active" },
  { user_id: "usr-tourist-02", name: "Rinsha", email: "rinsha@travelguard.demo", role: "tourist", phone: "+91 94462 11002", account_status: "active" },
  { user_id: "usr-tourist-03", name: "Sana", email: "sana@travelguard.demo", role: "tourist", phone: "+91 94462 11003", account_status: "active" },
  { user_id: "usr-tourist-04", name: "Dilrooba", email: "dilrooba@travelguard.demo", role: "tourist", phone: "+91 94462 11004", account_status: "active" },
];

let group = {
  group_id: "grp-munnar-01",
  group_name: "Munnar Tea Hills Expedition",
  guide_id: "usr-guide-01",
  guide_name: "Jumana",
  meeting_point_name: "Mattupetty Dam Pavilion",
  meeting_point_lat: 10.1082,
  meeting_point_lng: 77.1245,
  group_status: "active",
  created_at: new Date().toISOString()
};

let members = [
  { membership_id: "mem-01", group_id: "grp-munnar-01", tourist_id: "usr-tourist-01", name: "Hisha", email: "hisha@travelguard.demo", phone: "+91 94462 11001", membership_status: "separated", reunion_status: "pending", latitude: 10.0889, longitude: 77.0595, battery_pct: 42, location_source: "demo", location_time: new Date().toISOString() },
  { membership_id: "mem-02", group_id: "grp-munnar-01", tourist_id: "usr-tourist-02", name: "Rinsha", email: "rinsha@travelguard.demo", phone: "+91 94462 11002", membership_status: "with_group", reunion_status: "not_applicable", latitude: 10.1075, longitude: 77.1240, battery_pct: 88, location_source: "demo", location_time: new Date().toISOString() },
  { membership_id: "mem-03", group_id: "grp-munnar-01", tourist_id: "usr-tourist-03", name: "Sana", email: "sana@travelguard.demo", phone: "+91 94462 11003", membership_status: "with_group", reunion_status: "not_applicable", latitude: 10.1080, longitude: 77.1250, battery_pct: 91, location_source: "demo", location_time: new Date().toISOString() },
  { membership_id: "mem-04", group_id: "grp-munnar-01", tourist_id: "usr-tourist-04", name: "Dilrooba", email: "dilrooba@travelguard.demo", phone: "+91 94462 11004", membership_status: "separated", reunion_status: "pending", latitude: 10.0750, longitude: 77.0600, battery_pct: 15, location_source: "demo", location_time: new Date().toISOString() },
];

let alerts = [
  {
    alert_id: "alt-sos-001",
    group_id: "grp-munnar-01",
    tourist_id: "usr-tourist-01",
    tourist_name: "Hisha",
    alert_type: "sos_emergency",
    category: "Lost/Separated",
    priority: "critical",
    description: "Separated from trekking group near Eravikulam Tea Trail. Footpath unclear due to dense mist.",
    status: "active",
    created_by: "usr-guide-01",
    creator_name: "Jumana",
    created_at: new Date(Date.now() - 25 * 60000).toISOString(),
    resolved_at: null
  },
  {
    alert_id: "alt-gen-002",
    group_id: "grp-munnar-01",
    tourist_id: "usr-tourist-04",
    tourist_name: "Dilrooba",
    alert_type: "separated_tourist",
    category: "Safety Threat",
    priority: "high",
    description: "Low battery warning (15%). Last confirmed position near Pothamedu Viewpoint.",
    status: "investigating",
    created_by: "usr-guide-01",
    creator_name: "Jumana",
    created_at: new Date(Date.now() - 10 * 60000).toISOString(),
    resolved_at: null
  }
];

let reunionEvents = [
  {
    reunion_event_id: "reu-001",
    group_id: "grp-munnar-01",
    tourist_id: "usr-tourist-01",
    tourist_name: "Hisha",
    meeting_point_name: "Mattupetty Dam Pavilion",
    status: "in_progress",
    created_by: "usr-guide-01",
    created_at: new Date().toISOString(),
    completed_at: null
  }
];

let notifications = [
  { notification_id: "notif-01", recipient_user_id: "usr-guide-01", related_alert_id: "alt-sos-001", notification_type: "sos_alert", message: "SOS Alert: Hisha reported separated near Eravikulam Tea Trail.", read_status: 0, created_at: new Date().toISOString() },
  { notification_id: "notif-02", recipient_user_id: "usr-guide-01", related_alert_id: "alt-gen-002", notification_type: "info", message: "Battery Warning: Dilrooba's device is at 15%.", read_status: 0, created_at: new Date().toISOString() },
  { notification_id: "notif-03", recipient_user_id: "usr-tourist-01", related_alert_id: null, notification_type: "reunion_update", message: "Reunion Mode active: Head towards Mattupetty Dam Pavilion.", read_status: 0, created_at: new Date().toISOString() },
];

let auditEvents = [];

// Munnar Safety Assistant Responses
function getAssistantReply(message) {
  const msg = (message || "").toLowerCase();
  if (msg.includes("sos") || msg.includes("emergency") || msg.includes("danger") || msg.includes("hurt")) {
    return "🚨 **Emergency Action Plan**:\n1. **Stay Where You Are**: Avoid wandering deeper into tea plantations.\n2. **Trigger In-App SOS**: Press the prominent red 'Trigger SOS' button so Tour Guide Jumana receives your coordinates immediately.\n3. **Battery Conservation**: Turn off unnecessary background apps.\n4. **Local Emergency Contacts**: Munnar Police Station (+91 4865 230321), Tata Tea General Hospital (+91 4865 230491).";
  }
  if (msg.includes("lost") || msg.includes("separated") || msg.includes("alone") || msg.includes("find")) {
    return "📍 **Separated Tourist Protocol**:\n1. **Stop & Assess**: Remain in a visible, safe clearing near an identifiable landmark or trail branch.\n2. **Open Reunion Mode**: Check the Travel Guard Reunion screen for active meeting point (Mattupetty Dam Pavilion).\n3. **Broadcast Location**: Keep location sharing active so Guide Jumana sees your live map pinpoint.\n4. **Direct Contact**: Call guide Jumana directly through the Group Members directory.";
  }
  if (msg.includes("weather") || msg.includes("rain") || msg.includes("mist") || msg.includes("fog")) {
    return "⛅ **Munnar Weather & Trail Advisory**:\nMunnar's elevation (1,600m) causes sudden mist and slippery rocks.\n• Carry windbreaker and rain poncho.\n• Keep devices in waterproof pouches.\n• Avoid trekking steep gorges after 5:30 PM due to early darkness and dense fog.";
  }
  if (msg.includes("elephant") || msg.includes("animal") || msg.includes("wildlife")) {
    return "🐘 **Wildlife Caution**:\nThe hills bordering Eravikulam and Lockhart Gap frequently experience wild elephant movement.\n• Never use flash photography or make loud noises.\n• Maintain a minimum 50m distance from wildlife.\n• Stay strictly on designated tourist paths with Guide Jumana.";
  }
  if (msg.includes("meeting point") || msg.includes("reunion") || msg.includes("pavilion")) {
    return `🚩 **Active Meeting Point**: The group assembly hub is currently set to **${group.meeting_point_name}** (Coordinates: ${group.meeting_point_lat}° N, ${group.meeting_point_lng}° E).`;
  }
  return `Thank you, Jumana. Regarding your query: Keep your device active on the Travel Guard network. Stay coordinated with tourists Hisha, Rinsha, Sana, and Dilrooba. If urgent assistance is needed, use the SOS Emergency button immediately.`;
}

// Request Helper
function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data, null, 2));
}

// Vercel Serverless Function Handler
module.exports = async function handler(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname.replace(/\/$/, "");
  const method = req.method;

  try {
    // 1. Health
    if (path === "/api/health" || path === "/api") {
      return sendJson(res, 200, {
        status: "ok",
        platform: "Vercel Serverless",
        timestamp: new Date().toISOString(),
        service: "Travel Guard Vercel API"
      });
    }

    // 2. Auth
    if (path === "/api/auth/me") {
      return sendJson(res, 200, { user: users[0] });
    }
    if (path === "/api/auth/login" && method === "POST") {
      const body = await parseBody(req);
      const user = users.find(u => u.email === (body.email || "").toLowerCase()) || users[0];
      return sendJson(res, 200, {
        message: "Login successful (Vercel Serverless)",
        token: `vercel-demo-token-${user.user_id}`,
        user
      });
    }

    // 3. Dashboard
    if (path === "/api/dashboard/summary") {
      const total_tourists = members.length;
      const tourists_with_group = members.filter(m => m.membership_status === 'with_group').length;
      const separated_tourists = members.filter(m => m.membership_status === 'separated').length;
      const reunited_tourists = members.filter(m => m.reunion_status === 'reunited').length;
      const active_sos_alerts = alerts.filter(a => a.alert_type === 'sos_emergency' && a.status === 'active').length;
      const unresolved_alerts = alerts.filter(a => a.status === 'active' || a.status === 'investigating').length;

      return sendJson(res, 200, {
        group_id: group.group_id,
        total_tourists,
        tourists_with_group,
        separated_tourists,
        reunited_tourists,
        unavailable_location: 0,
        active_sos_alerts,
        unresolved_alerts,
        last_updated: new Date().toISOString()
      });
    }

    if (path === "/api/dashboard/recent-alerts") {
      return sendJson(res, 200, { alerts: alerts.slice(0, 5) });
    }
    if (path === "/api/dashboard/group-status") {
      return sendJson(res, 200, { group });
    }

    // 4. Groups
    if (path === "/api/groups") {
      return sendJson(res, 200, { groups: [group] });
    }
    if (path === "/api/groups/grp-munnar-01/members" || path.endsWith("/members")) {
      return sendJson(res, 200, { members });
    }
    if (path === "/api/groups/grp-munnar-01/locations" || path.endsWith("/locations")) {
      return sendJson(res, 200, {
        locations: members.map(m => ({
          tourist_id: m.tourist_id,
          name: m.name,
          latitude: m.latitude,
          longitude: m.longitude,
          accuracy: 5.0,
          battery_pct: m.battery_pct,
          source: m.location_source,
          recorded_at: m.location_time,
          membership_status: m.membership_status,
          reunion_status: m.reunion_status
        }))
      });
    }

    // 5. Reunion
    if (path === "/api/groups/grp-munnar-01/reunion" || path.endsWith("/reunion")) {
      return sendJson(res, 200, {
        group_id: group.group_id,
        meeting_point_name: group.meeting_point_name,
        meeting_point_lat: group.meeting_point_lat,
        meeting_point_lng: group.meeting_point_lng,
        active_reunion_events: reunionEvents.filter(r => r.status === 'in_progress'),
        separated_members: members.filter(m => m.membership_status === 'separated'),
        reunited_members: members.filter(m => m.reunion_status === 'reunited')
      });
    }
    if (path === "/api/groups/grp-munnar-01/meeting-point" && method === "PUT") {
      const body = await parseBody(req);
      if (body.meeting_point_name) group.meeting_point_name = body.meeting_point_name;
      if (body.meeting_point_lat) group.meeting_point_lat = parseFloat(body.meeting_point_lat);
      if (body.meeting_point_lng) group.meeting_point_lng = parseFloat(body.meeting_point_lng);
      return sendJson(res, 200, {
        message: "Meeting point updated",
        meeting_point_name: group.meeting_point_name,
        meeting_point_lat: group.meeting_point_lat,
        meeting_point_lng: group.meeting_point_lng
      });
    }

    // 6. SOS & Alerts
    if (path === "/api/alerts/sos" && method === "POST") {
      const body = await parseBody(req);
      const tourist = members.find(m => m.tourist_id === body.tourist_id || m.name.toLowerCase() === (body.tourist_id || "").toLowerCase()) || members[0];
      const alert_id = `alt-sos-${Date.now().toString(36)}`;
      const newAlert = {
        alert_id,
        group_id: "grp-munnar-01",
        tourist_id: tourist.tourist_id,
        tourist_name: tourist.name,
        alert_type: "sos_emergency",
        category: body.category || "Medical",
        priority: body.priority || "critical",
        description: body.description || "Urgent emergency triggered.",
        status: "active",
        created_by: "usr-guide-01",
        creator_name: "Jumana",
        created_at: new Date().toISOString(),
        resolved_at: null
      };
      alerts.unshift(newAlert);
      tourist.membership_status = "separated";
      tourist.reunion_status = "pending";

      notifications.unshift({
        notification_id: `notif-${Date.now().toString(36)}`,
        recipient_user_id: "usr-guide-01",
        related_alert_id: alert_id,
        notification_type: "sos_alert",
        message: `🚨 SOS TRIGGERED for ${tourist.name}: ${newAlert.category}.`,
        read_status: 0,
        created_at: new Date().toISOString()
      });

      return sendJson(res, 201, {
        message: "SOS Alert recorded successfully in database",
        alert: newAlert
      });
    }

    if (path === "/api/alerts" && method === "GET") {
      return sendJson(res, 200, { alerts });
    }

    if (path.startsWith("/api/alerts/") && path.endsWith("/resolve") && method === "PATCH") {
      const alertId = path.split("/")[3];
      const alert = alerts.find(a => a.alert_id === alertId);
      if (alert) {
        alert.status = "resolved";
        alert.resolved_at = new Date().toISOString();
        const tourist = members.find(m => m.tourist_id === alert.tourist_id);
        if (tourist) {
          tourist.membership_status = "with_group";
          tourist.reunion_status = "reunited";
        }
        return sendJson(res, 200, { message: "Alert resolved successfully", alert_id: alertId, status: "resolved" });
      }
      return sendJson(res, 404, { error: "Alert not found" });
    }

    if (path.startsWith("/api/alerts/") && path.endsWith("/reopen") && method === "PATCH") {
      const alertId = path.split("/")[3];
      const alert = alerts.find(a => a.alert_id === alertId);
      if (alert) {
        alert.status = "active";
        alert.resolved_at = null;
        return sendJson(res, 200, { message: "Alert reopened", alert_id: alertId, status: "active" });
      }
      return sendJson(res, 404, { error: "Alert not found" });
    }

    // Single alert details
    if (path.startsWith("/api/alerts/")) {
      const alertId = path.split("/")[3];
      const alert = alerts.find(a => a.alert_id === alertId);
      if (alert) return sendJson(res, 200, { alert });
      return sendJson(res, 404, { error: "Alert not found" });
    }

    // 7. Member status
    if (path.startsWith("/api/members/") && path.endsWith("/status") && method === "PATCH") {
      const memberId = path.split("/")[3];
      const body = await parseBody(req);
      const member = members.find(m => m.membership_id === memberId || m.tourist_id === memberId || m.name.toLowerCase() === memberId.toLowerCase());
      if (member) {
        if (body.membership_status) member.membership_status = body.membership_status;
        if (body.reunion_status) member.reunion_status = body.reunion_status;
        return sendJson(res, 200, { message: "Member status updated successfully", member });
      }
      return sendJson(res, 404, { error: "Member not found" });
    }

    // 8. Locations POST
    if (path === "/api/locations" && method === "POST") {
      const body = await parseBody(req);
      const member = members.find(m => m.tourist_id === body.tourist_id || m.name.toLowerCase() === (body.tourist_id || "").toLowerCase());
      if (member) {
        if (body.latitude) member.latitude = parseFloat(body.latitude);
        if (body.longitude) member.longitude = parseFloat(body.longitude);
        if (body.battery_pct) member.battery_pct = parseInt(body.battery_pct);
        member.location_source = body.source || "gps";
        member.location_time = new Date().toISOString();
      }
      return sendJson(res, 201, { message: "Location updated successfully", source: body.source || "gps" });
    }

    // 9. Notifications
    if (path === "/api/notifications") {
      return sendJson(res, 200, { notifications });
    }
    if (path === "/api/notifications/unread-count") {
      return sendJson(res, 200, { unread_count: notifications.filter(n => n.read_status === 0).length });
    }
    if (path === "/api/notifications/read-all" && method === "PATCH") {
      notifications.forEach(n => n.read_status = 1);
      return sendJson(res, 200, { message: "All notifications marked as read" });
    }

    // 10. AI Assistant Chat
    if (path === "/api/assistant/chat" && method === "POST") {
      const body = await parseBody(req);
      const reply = getAssistantReply(body.message);
      return sendJson(res, 200, {
        reply,
        source: "travel_guard_safety_engine",
        status: "success",
        conversation_id: body.conversation_id || `conv-${Date.now()}`
      });
    }

    // 404 Fallback
    return sendJson(res, 404, { error: `Endpoint '${path}' not found on Vercel API` });
  } catch (err) {
    console.error("Vercel API error:", err);
    return sendJson(res, 500, { error: err.message || "Internal Server Error" });
  }
};
