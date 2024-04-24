import { Context } from "@/pages/api/graphql";

export const resolvers = {
	// we find all the novels in the database and return them as an array of novels in the response
	// parent is the root object that the query is being fetched for which in this case is empty
	// args is the arguments passed to the query which in this case is empty
	// context is the context object that we passed to the ApolloServer which contains the prisma client instance that we can use to query the database with prisma client methods like findMany and findUnique etc.
	Query: {
		novels: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.findMany();
		},
		// we find a single novel by the novel id and return it in the response if it exists in the database otherwise return null
		novel: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.findUnique({
				where: {
					id: args.id,
				},
			});
		},
	},
	// we find all the authors of a novel by the novel id and return them as an array of authors in the response
	// parent is the Novel object that the authors are being fetched for
	// args is the arguments passed to the query which in this case is empty
	Novel: {
		authors: async (parent: any, args: any, context: Context) => {
			return await context.prisma.author.findMany({
				where: {
					novelId: parent.id,
				},
			});
		},
	},

	Mutation: {
		addNovel: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.create({
				data: {
					image: args.image,
					title: args.title,
				},
			});
		},
		addAuthor: async (parent: any, args: any, context: Context) => {
			return await context.prisma.author.create({
				data: {
					name: args.name,
					novelId: args.novelId,
				},
			});
		},
		updateNovel: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.update({
				where: {
					id: args.id,
				},
				data: {
					image: args.image,
					title: args.title,
				},
			});
		},

		deleteNovel: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.delete({
				where: {
					id: args.id,
				},
			});
		},
		deleteAuthor: async (parent: any, args: any, context: Context) => {
			return await context.prisma.author.delete({
				where: {
					id: args.id,
				},
			});
		},
	},
};
