import { config } from 'dotenv';
import express from 'express';
import achievementRouter from './routers/achievementRouter';
import categoryRouter from './routers/categoryRouter';
import userRouter from './routers/userRouter';
import { isAuthenticated } from './services/authService';

config();

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

export enum StatusCode {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503
}
app.use(isAuthenticated);
app.use('/api/achievement', achievementRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
	console.log(`AchieveIT 💪 listening on port ${port}`);
});
