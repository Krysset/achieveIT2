import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Achievement

export const getAchievement = async (id: number) => {
	return await prisma.achievement.findUnique({
		where: {
			id: id
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
	id: number,
	name?: string,
	description?: string,
	image?: string,
	category?: string
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
			}
		}
	});
};

export const deleteAchievement = async (id: number) => {
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
