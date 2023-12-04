import { Router } from 'express';
import { createToken } from '../prisma';
import { z } from 'zod';
import { validateRequestBody } from 'zod-express-middleware';
import exp from 'constants';
import { StatusCode } from '../app';

const tokenRouter = Router();

const requestCreateSchema = z.object({
	name: z.string().min(1).max(50),
	expiryAt: z.date().min(new Date()).optional()
});

tokenRouter.post(
	'/create',
	validateRequestBody(requestCreateSchema),
	async (req, res) => {
		let response;
		if (req.body.expiryAt) {
			response = await createToken(req.body.name, req.body.expiryAt);
		} else {
			response = await createToken(req.body.name);
		}
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Created).send(response);
	}
);
