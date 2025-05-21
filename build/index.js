import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getDiscussions, getDiscussion, getTags, getTag, getPosts, createPost, updatePost, deletePost } from "./flarumHelper.js";
const FLARUM_API_BASE = process.env.FLARUM_API_BASE;
// Create server instance
const server = new McpServer({
    name: "flarum",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Register Flarum tools
server.tool("get-discussions", "Get discussions from Flarum", {}, async () => {
    const discussions = await getDiscussions();
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(discussions, null, 2),
            },
        ],
    };
});
server.tool("get-discussion", "Get a specific discussion from Flarum", {
    discussionId: z.string().describe("ID of the discussion"),
}, async ({ discussionId }) => {
    const discussion = await getDiscussion(discussionId);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(discussion, null, 2),
            },
        ],
    };
});
server.tool("get-tags", "Get tags from Flarum", {}, async () => {
    const tags = await getTags();
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(tags, null, 2),
            },
        ],
    };
});
server.tool("get-tag", "Get a specific tag from Flarum", {
    tagId: z.string().describe("ID of the tag"),
}, async ({ tagId }) => {
    const tag = await getTag(tagId);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(tag, null, 2),
            },
        ],
    };
});
server.tool("get-posts", "Get posts from a Flarum discussion", {
    discussionId: z.string().describe("ID of the discussion"),
}, async ({ discussionId }) => {
    const posts = await getPosts(discussionId);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(posts, null, 2),
            },
        ],
    };
});
server.tool("create-post", "Create a new post in a Flarum discussion", {
    discussionId: z.string().describe("ID of the discussion"),
    content: z.string().describe("Content of the post"),
}, async ({ discussionId, content }) => {
    const post = await createPost(discussionId, content);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(post, null, 2),
            },
        ],
    };
});
server.tool("update-post", "Update a post in Flarum", {
    postId: z.string().describe("ID of the post"),
    content: z.string().describe("New content of the post"),
}, async ({ postId, content }) => {
    const post = await updatePost(postId, content);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(post, null, 2),
            },
        ],
    };
});
server.tool("delete-post", "Delete a post in Flarum", {
    postId: z.string().describe("ID of the post"),
}, async ({ postId }) => {
    await deletePost(postId);
    return {
        content: [
            {
                type: "text",
                text: `Post ${postId} deleted successfully`,
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Flarum MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
