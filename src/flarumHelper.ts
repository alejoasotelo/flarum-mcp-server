const FLARUM_API_BASE = 'https://your-flarum-instance.com/api';

async function fetchFromFlarum(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${FLARUM_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Flarum API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Flarum API:', error);
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
