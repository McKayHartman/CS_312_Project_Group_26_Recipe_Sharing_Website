import React from 'react';
import Input from './Input';
import axios from 'axios';
import { useState } from 'react';

export default function CommentForm({ recipeId, parentId, onSubmit }) {
	const [content, setContent] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const comment = {
			recipe_id: recipeId,
			parent_comment_id: parentId,
			body: content,
		};

		try {
			const response = await axios.post('/api/comments', comment);
		} catch (error) {
			console.error("Error posting comment:", error);
		}

		// Clear the form
		setContent('');

		// Call the onSubmit callback to notify parent component
		if (onSubmit) {
			onSubmit();
		}
	}

	return(
		<div>
			<form className="mb-4">
				<label>
					Comment:
					<Input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
				</label>
				<button onClick={handleSubmit} type="submit" className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
					Post Comment
				</button>
			</form>
		</div>
	)
}