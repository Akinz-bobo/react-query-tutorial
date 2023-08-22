import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "DELETE" }
    );
    return response.json();
}

async function updatePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
    );
    return response.json();
}

export function PostDetail({ post }) {
    // replace with useQuery
    const { data, error, isLoading } = useQuery(['comments', post.id], () => fetchComments(post.id), { staleTime: 2000, });

    // mutations
    const updateMutation = useMutation((postId) => updatePost(postId));
    const deleteMutation = useMutation((postId) => deletePost(postId));

    if (isLoading) return <h3>Loading comments...</h3>
    if (error) return <h3>Error...</h3>
    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
            {updateMutation.error && <h3 style={{ color: 'red' }}>Error updating the post</h3>}
            {updateMutation.isLoading && <h3 style={{ color: 'purple' }}> Updating the post</h3>}
            {updateMutation.isSuccess && <h3 style={{ color: 'green' }}>Post successfully updated</h3>}

            {deleteMutation.error && <h3 style={{ color: 'red' }}> Error deleting the post! </h3>}
            {deleteMutation.isLoading && <h3 style={{ color: 'purple' }}>Deleting the post... </h3>}
            {deleteMutation.isSuccess && <h3 style={{ color: 'green' }}> Successfully deleted the post! </h3>}

            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
