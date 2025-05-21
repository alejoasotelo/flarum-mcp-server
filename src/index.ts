import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getDiscussions, getPosts, createPost, updatePost, deletePost } from "./flarumHelper";

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
server.tool(
  "get-discussions",
  "Get discussions from Flarum",
  {},
  async () => {
    const discussions = await getDiscussions();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(discussions, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "get-posts",
  "Get posts from a Flarum discussion",
  {
    discussionId: z.string().describe("ID of the discussion"),
  },
  async ({ discussionId }) => {
    const posts = await getPosts(discussionId);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(posts, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "create-post",
  "Create a new post in a Flarum discussion",
  {
    discussionId: z.string().describe("ID of the discussion"),
    content: z.string().describe("Content of the post"),
  },
  async ({ discussionId, content }) => {
    const post = await createPost(discussionId, content);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(post, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "update-post",
  "Update a post in Flarum",
  {
    postId: z.string().describe("ID of the post"),
    content: z.string().describe("New content of the post"),
  },
  async ({ postId, content }) => {
    const post = await updatePost(postId, content);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(post, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "delete-post",
  "Delete a post in Flarum",
  {
    postId: z.string().describe("ID of the post"),
  },
  async ({ postId }) => {
    await deletePost(postId);
    return {
      content: [
        {
          type: "text",
          text: `Post ${postId} deleted successfully`,
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Flarum MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
