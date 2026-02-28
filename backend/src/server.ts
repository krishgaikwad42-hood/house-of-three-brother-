import app from './app';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Database connection will be initialized here later
        // await mongoose.connect(process.env.MONGODB_URI as string);
        // console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
