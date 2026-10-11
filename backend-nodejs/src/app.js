const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const groupsRoutes = require('./routes/groups');
const alertsRoutes = require('./routes/alerts');
const locationsRoutes = require('./routes/locations');
const reunionRoutes = require('./routes/reunion');
const notificationsRoutes = require('./routes/notifications');
const assistantRoutes = require('./routes/assistant');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Travel Guard Express API' });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/reunion-events', reunionRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/assistant', assistantRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
