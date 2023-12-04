import { Router } from 'express';
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory
} from '../prisma';
import { StatusCode } from '../app';
import { z } from 'zod';
import {
	validateRequestBody,
	validateRequestParams
} from 'zod-express-middleware';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
	const categories = await getCategories();
	res.status(StatusCode.Ok).send(categories);
});

const requestAddSchema = z.object({
	name: z.string().min(1).max(50)
});

categoryRouter.post(
	'/add',
	validateRequestBody(requestAddSchema),
	async (req, res) => {
		const response = await createCategory(req.body.name);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Created).send(response);
	}
);

const requestGetSchema = z.object({
	id: z.string().cuid()
});

categoryRouter.get(
	'/:id',
	validateRequestParams(requestGetSchema),
	async (req, res) => {
		const response = await getCategory(req.params.id);
		if (!response) {
			res.status(StatusCode.NotFound).send('Category not found!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

const requestDeleteSchema = z.object({
	id: z.string().cuid()
});

categoryRouter.post(
	'/delete',
	validateRequestBody(requestDeleteSchema),
	async (req, res) => {
		const response = await deleteCategory(req.body.id);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

export default categoryRouter;
