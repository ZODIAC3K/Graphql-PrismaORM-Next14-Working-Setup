export const typeDefs = `#graphql
	
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
	# query meaning get request basically the endpoint that we can fetch data from
	type Query {
		novel(id: ID!): Novel # get a single novel by id and end point name is 'novel'.
		novels: [Novel] # get all novels and end point name is 'novels'.
	}
	# mutation meaning post, put, delete request basically the endpoint that we can create, update and delete data from
	type Mutation {
		addNovel(image: String, title: String,): Novel # create a novel and end point name is 'addNovel'.
		addAuthor(name: String, novelId: String): Author # create an author and end point name is 'addAuthor'.
		updateNovel(id: ID!, image: String, title: String): Novel # update a novel by id and end point name is 'updateNovel'.
		deleteNovel(id: ID!): Novel # delete a novel by id and end point name is 'deleteNovel'.
		deleteAuthor(id: ID!): Author # delete an author by id and end point name is 'deleteAuthor'.
	}

`;
