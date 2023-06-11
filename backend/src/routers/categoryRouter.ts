import { Router } from 'express';
import { getCategories } from '../prisma';
import { StatusCode } from '../app';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
	const categories = await getCategories();
	res.status(StatusCode.Ok).send(categories);
});

categoryRouter.post('/add', (req, res) => {});

categoryRouter.get('/:id', (req, res) => {
	res.send(`${req.params.id}`);
});

export default categoryRouter;
