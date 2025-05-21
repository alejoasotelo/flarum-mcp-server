const FLARUM_API_BASE = process.env.FLARUM_API_BASE;
const FLARUM_API_KEY = process.env.FLARUM_API_KEY;

async function fetchFromFlarum(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${FLARUM_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FLARUM_API_KEY}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Flarum API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching from Flarum API:', errorMessage);
    throw error;
  }
}

export async function getDiscussions() {
  return await fetchFromFlarum('/discussions');
}

export async function getPosts(discussionId: string) {
  return await fetchFromFlarum(`/discussions/${discussionId}/posts`);
}

export async function createPost(discussionId: string, content: string) {
  return await fetchFromFlarum(`/discussions/${discussionId}/posts`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

export async function updatePost(postId: string, content: string) {
  return await fetchFromFlarum(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
  });
}

export async function deletePost(postId: string) {
  return await fetchFromFlarum(`/posts/${postId}`, {
    method: 'DELETE',
  });
}
