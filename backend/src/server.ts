import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn('⚠️ WARNING: MONGODB_URI not found in environment. Database features will not work.');
            console.warn('Please update MONGODB_URI in your .env file.');
        } else {
            await mongoose.connect(process.env.MONGODB_URI as string);
            console.log('✅ Connected to MongoDB');
        }
    } catch (error: any) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        console.warn('⚠️ Server will start without database connectivity.');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`🔗 Admin Panel API: http://localhost:${PORT}/api/v1`);
    });
};

startServer();
