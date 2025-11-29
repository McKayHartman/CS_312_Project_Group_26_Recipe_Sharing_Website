// Nested comments section component
// Renders comments and replies, with ability to reply to any comment
// and delete only the users own comments.
// PROPS: recipe_id

import React from "react"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import CommentForm from "./CommentForm"
import CommentCard from "./CommentCard"
import { UserContext } from '../context/UserContext'


export default function CommentsSection ({ recipe_id }) {
	const { loggedInUser } = useContext(UserContext);
	
	const [comments, setComments] = useState([]);

	////////////////// HELPER FUNCTIONS/////////////// 
	// fetch all comments with ascociated id
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axios.get(`/api/comments/${recipe_id}`);
				setComments(res.data);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};

		fetchComments();
	}, [recipe_id]);

	//////////////////////Component///////////////////////

	return (
		<div className="comments-section">
			<h2 className="text-xl font-semibold mb-4">Comments</h2>

			{/* Top Level comments here */}
			<CommentForm
				recipeId={recipe_id}
				parentId={null}
				onSubmit={() => window.location.reload()}
			/>

			{/* Render comments below */}
			<div className="mt-6">
				{comments.map((comment) => (
					<CommentCard
						key={comment.comment_id}
						comment={comment}
						recipeId={recipe_id}
					/>
				))}
			</div>
		</div>
	);
}

