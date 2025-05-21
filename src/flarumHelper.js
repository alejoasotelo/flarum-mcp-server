const fetch = require('node-fetch');

const FLARUM_API_BASE = 'https://your-flarum-instance.com/api';

async function fetchFromFlarum(endpoint, options = {}) {
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

async function getDiscussions() {
  return await fetchFromFlarum('/discussions');
}

async function getPosts(discussionId) {
  return await fetchFromFlarum(`/discussions/${discussionId}/posts`);
}

async function createPost(discussionId, content) {
  return await fetchFromFlarum(`/discussions/${discussionId}/posts`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

async function updatePost(postId, content) {
  return await fetchFromFlarum(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
  });
}

async function deletePost(postId) {
  return await fetchFromFlarum(`/posts/${postId}`, {
    method: 'DELETE',
  });
}

module.exports = {
  getDiscussions,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
