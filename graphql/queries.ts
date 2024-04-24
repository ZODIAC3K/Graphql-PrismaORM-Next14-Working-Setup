import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
	query Query {
		novels {
			authors {
				name
				id
				novelId
			}
			createdAt
			id
			image
			title
			updatedAt
		}
	}
`;
