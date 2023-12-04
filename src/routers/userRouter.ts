import { Router } from 'express';
import { createUser, deleteUser } from '../prisma';
import { validateRequestBody } from 'zod-express-middleware';
import { z } from 'zod';
import { StatusCode } from '../app';

const userRouter = Router();

const requestCreateDeleteSchema = z.object({
	cid: z.string().min(1).max(50)
});

userRouter.post(
	'/create',
	validateRequestBody(requestCreateDeleteSchema),
	async (req, res) => {
		const response = await createUser(req.body.cid);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Created).send(response);
	}
);

userRouter.post(
	'/delete',
	validateRequestBody(requestCreateDeleteSchema),
	async (req, res) => {
		const response = await deleteUser(req.body.cid);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

export default userRouter;
