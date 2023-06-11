import { Router } from 'express';

const achievementRouter = Router();

achievementRouter.get('/', (req, res) => {
	res.send('Hello from Achievementsrouter!');
});

achievementRouter.get('/:id', (req, res) => {
	res.send(`${req.params.id}`);
});

export default achievementRouter;
