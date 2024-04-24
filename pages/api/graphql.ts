import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../prisma/db";
import { PrismaClient } from "@prisma/client";

export type Context = {
	prisma: PrismaClient;
};

const typeDefs = `#graphql
	
	type Novel {
		id: ID!
		title: String
		image: String
		createdAt: String
		updatedAt: String
		authors: [Author]
	}

	type Author {
		id: ID!
		name: String
		novelId: String
	}
	# query meaning get request
	type Query {
		novels: [Novel]
	}
	# mutation meaning post, put, delete request
	type Mutation {
		addNovel: Novel
	}

`;

const resolvers = {
	Query: {
		novels: async (parent: any, args: any, context: Context) => {
			return await context.prisma.novel.findMany();
		},
	},
	Novel: {
		authors: async (parent: any, args: any, context: Context) => {
			return await context.prisma.author.findMany({
				where: {
					novelId: parent.id,
				},
			});
		},
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => {
		return {
			req,
			res,
			prisma,
		};
	},
});
