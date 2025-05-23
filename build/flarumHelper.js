const FLARUM_API_BASE = process.env.FLARUM_API_BASE;
const FLARUM_API_KEY = process.env.FLARUM_API_KEY;
const FLARUM_USER_ID = process.env.FLARUM_USER_ID;
async function fetchFromFlarum(endpoint, options = {}) {
    try {
        const response = await fetch(`${FLARUM_API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${FLARUM_API_KEY}${FLARUM_USER_ID ? `; userId=${FLARUM_USER_ID}` : ''}`,
                ...options.headers,
            },
        });
        if (!response.ok) {
            throw new Error(`Flarum API request failed: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching from Flarum API:', error);
        throw error;
    }
}
export async function getDiscussions(tag) {
    const endpoint = tag
        ? `/discussions?filter[tag]=${encodeURIComponent(tag)}`
        : '/discussions';
    return await fetchFromFlarum(endpoint);
}
export async function getDiscussion(discussionId) {
    return await fetchFromFlarum(`/discussions/${discussionId}`);
}
export async function getTags() {
    return await fetchFromFlarum('/tags');
}
export async function getTag(tagId) {
    return await fetchFromFlarum(`/tags/${tagId}`);
}
export async function getPosts() {
    return await fetchFromFlarum(`/posts`);
}
export async function getPost(postId) {
    return await fetchFromFlarum(`/posts/${postId}`);
}
export async function createPost(content) {
    return await fetchFromFlarum(`/posts`, {
        method: 'POST',
        body: JSON.stringify({ content }),
    });
}
export async function updatePost(postId, content) {
    return await fetchFromFlarum(`/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
    });
}
export async function deletePost(postId) {
    return await fetchFromFlarum(`/posts/${postId}`, {
        method: 'DELETE',
    });
}
