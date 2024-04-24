import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../prisma/db";
import { PrismaClient } from "@prisma/client";

// we import the typeDefs and resolvers from the graphql folder to make the code more modular and easier to read
import { typeDefs } from "../../graphql/typedefs";
import { resolvers } from "../../graphql/resolvers";

// we define the context type which is an object that contains the prisma client instance that we pass this context object to the ApolloServer instance so that we can access the prisma client instance in the resolvers to query the database with prisma client methods like findMany and findUnique etc.
export type Context = {
	prisma: PrismaClient;
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
