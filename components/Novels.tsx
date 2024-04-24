import React from "react";
import { useQuery } from "@apollo/client";
import { GET_NOVELS } from "@/graphql/queries";

const Novels = () => {
	const { data, loading, error } = useQuery(GET_NOVELS);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	console.log(data);
	return (
		<>
			{data?.novels.map((novel: any) => (
				<div key={novel.id}>
					<div>{novel.id}</div>
					<div>{novel.title}</div>
					<div>{novel.image}</div>
					{novel.authors.map((author: any) => (
						<div key={author.id}>
							<div>{author.name}</div>
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default Novels;
