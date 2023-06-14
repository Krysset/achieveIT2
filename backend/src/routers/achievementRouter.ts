import { Router } from 'express';
import { StatusCode } from '../app';
import {
	createAchievement,
	getAchievement,
	getAchievements,
	getCategory,
	giveAchievementToUser,
	removeAchievementFromUser,
	updateAchievement
} from '../prisma';
import { z } from 'zod';
import {
	validateRequestBody,
	validateRequestParams
} from 'zod-express-middleware';

const achievementRouter = Router();

achievementRouter.get('/', (req, res) => {
	const response = getAchievements();
	if (!response) {
		res.status(StatusCode.BadRequest).send('Something went wrong!');
		return;
	}
	res.status(StatusCode.Ok).send(response);
});

const requestAddSchema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(500),
	image: z.string().min(1),
	category: z.string().cuid()
});

achievementRouter.post(
	'/add',
	validateRequestBody(requestAddSchema),
	async (req, res) => {
		const categoryExistResponse = await getCategory(req.body.category);
		if (!categoryExistResponse) {
			res.status(StatusCode.BadRequest).send('Category does not exist!');
			return;
		}
		const response = await createAchievement(
			req.body.name,
			req.body.description,
			req.body.image,
			req.body.category
		);
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

achievementRouter.get(
	'/:id',
	validateRequestParams(requestGetSchema),
	async (req, res) => {
		const response = getAchievement(req.params.id);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

const requestUpdateSchema = z.object({
	id: z.string().cuid(),
	name: z.string().min(1).max(50).nullable(),
	description: z.string().min(1).max(500).nullable(),
	image: z.string().min(1).nullable(),
	category: z.string().cuid().nullable(),
	isObtainable: z.boolean().nullable()
});

achievementRouter.post(
	'/update',
	validateRequestBody(requestUpdateSchema),
	async (req, res) => {
		const response = await updateAchievement(req.body.id);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

const requestGiveTakeSchema = z.object({
	cid: z.string().min(1).max(50),
	achievementId: z.string().cuid()
});

achievementRouter.post(
	'/give',
	validateRequestBody(requestGiveTakeSchema),
	async (req, res) => {
		const response = await giveAchievementToUser(
			req.body.cid,
			req.body.achievementId
		);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Created).send(response);
	}
);

achievementRouter.post(
	'/take',
	validateRequestBody(requestGiveTakeSchema),
	async (req, res) => {
		const response = await removeAchievementFromUser(
			req.body.cid,
			req.body.achievementId
		);
		if (!response) {
			res.status(StatusCode.BadRequest).send('Something went wrong!');
			return;
		}
		res.status(StatusCode.Ok).send(response);
	}
);

export default achievementRouter;
