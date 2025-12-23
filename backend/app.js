const express = require('express');
const cors = require('cors');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());

// Enable pre-flight across-the-board
app.options(/.*/, cors());

// Debugging Middleware
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url} | Origin: ${req.headers.origin}`);
    next();
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        deployment: 'CORS_FIX_REFLECT_ORIGIN_V2', 
        timestamp: new Date().toISOString() 
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/tp', require('./routes/testimonialPartnerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

// Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
