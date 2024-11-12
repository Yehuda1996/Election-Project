import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connnectDb from './config/db';
import userRoutes from '../src/routes/userRoutes';
import candidateRoutes from '../src/routes/candidateRoutes'
import voteRoutes from '../src/routes/voteRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors());
connnectDb();

app.use('/api', userRoutes);
app.use('/api', candidateRoutes);
app.use('/api', voteRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

export default app;
