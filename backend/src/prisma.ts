import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Achievement

export const getAchievement = async (id: string) => {
	return await prisma.achievement.findUnique({
		where: {
			id: id
		}
	});
};

export const getAchievementFromCategory = async (categoryId: string) => {
	return await prisma.achievement.findMany({
		where: {
			category: {
				id: categoryId
			}
		}
	});
};

export const getAchievements = async () => {
	return await prisma.achievement.findMany();
};

export const createAchievement = async (
	name: string,
	description: string,
	image: string,
	category: string
) => {
	return await prisma.achievement.create({
		data: {
			name: name,
			description: description,
			image: image,
			category: {
				connect: {
					id: category
				}
			}
		}
	});
};

export const updateAchievement = async (
	id: string,
	name?: string,
	description?: string,
	image?: string,
	category?: string,
	isObtainable?: boolean
) => {
	return await prisma.achievement.update({
		where: {
			id: id
		},
		data: {
			name: name,
			description: description,
			image: image,
			category: {
				update: {
					id: category
				}
			},
			isObtainable: isObtainable
		}
	});
};

export const deleteAchievement = async (id: string) => {
	return await prisma.achievement.delete({
		where: {
			id: id
		}
	});
};

// Category

export const getCategory = async (id: string) => {
	return await prisma.category.findUnique({
		where: {
			id: id
		}
	});
};

export const getCategories = async () => {
	return await prisma.category.findMany();
};

export const createCategory = async (name: string) => {
	return await prisma.category.create({
		data: {
			name: name
		}
	});
};

export const updateCategory = async (id: string, name?: string) => {
	return await prisma.category.update({
		where: {
			id: id
		},
		data: {
			name: name
		}
	});
};

export const deleteCategory = async (id: string) => {
	return await prisma.category.delete({
		where: {
			id: id
		}
	});
};

// User

// You can use id or cid to get a user
export const getUser = async (id: string) => {
	return await prisma.user.findFirst({
		where: {
			OR: [{ id: id }, { cid: id }]
		}
	});
};

export const getUsers = async () => {
	return await prisma.user.findMany();
};

export const createUser = async (cid: string) => {
	return await prisma.user.create({
		data: {
			cid
		}
	});
};

export const deleteUser = async (id: string) => {
	return await prisma.user.delete({
		where: {
			id: id
		}
	});
};

// UserAchievement

export const getUserAchievements = async (cid: string) => {
	return await prisma.userAchievement.findMany({
		where: {
			cid: cid
		}
	});
};

export const giveAchievementToUser = async (
	cid: string,
	achievementId: string
) => {
	return await prisma.userAchievement.create({
		data: {
			user: {
				connect: {
					cid: cid
				}
			},
			achievement: {
				connect: {
					id: achievementId
				}
			}
		}
	});
};

export const removeAchievementFromUser = async (
	cid: string,
	achievementId: string
) => {
	return await prisma.userAchievement.delete({
		where: {
			cid_achievementId: {
				cid: cid,
				achievementId: achievementId
			}
		}
	});
};
