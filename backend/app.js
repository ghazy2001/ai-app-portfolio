const express = require('express');
const cors = require('cors');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
// Use origin: true to allow any origin while still supporting credentials
// This essentially reflects the request origin back in the allow header
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/tp', require('./routes/testimonialPartnerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
