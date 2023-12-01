import { StatusCode } from '../app';
import { isTokenValid } from '../prisma';

export const isAuthenticated = async (req: any, res: any, next: any) => {
	if (req.method === 'GET') {
		next();
		return;
	}

	const auth = req.headers.authorization;

	if (!auth) {
		console.log('No auth header');
		res.status(StatusCode.Unauthorized).send('Unauthorized');
		return;
	}

	const token = auth.split(' ')[1];

	if (!token || !(await isTokenValid(token))) {
		res.status(StatusCode.Unauthorized).send('Unauthorized');
		return;
	}

	next();
};
