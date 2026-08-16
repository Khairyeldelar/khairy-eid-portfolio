import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { getContentBySlug } from "../db";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

const escapeHtml = (value: string) => value.replace(/[&<>\"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] || character));

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.get("/share/:slug", async (req, res) => {
    const item = await getContentBySlug(req.params.slug);
    if (!item || !item.published || (item.kind !== "article" && item.kind !== "tutorial")) {
      res.status(404).send("Not found");
      return;
    }
    const title = item.titleEn || item.titleAr;
    const description = (item.excerptEn || item.excerptAr || "").slice(0, 180);
    const image = item.thumbnailUrl || item.imageUrl || "";
    const absoluteImage = image.startsWith("http") ? image : `${req.protocol}://${req.get("host")}${image}`;
    const redirectPath = `/#article-${encodeURIComponent(item.slug)}`;
    res.type("html").send(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${escapeHtml(absoluteImage)}"><meta name="twitter:card" content="summary_large_image"><meta property="twitter:title" content="${escapeHtml(title)}"><meta property="twitter:image" content="${escapeHtml(absoluteImage)}"><meta http-equiv="refresh" content="0;url=${redirectPath}"></head><body><p><a href="${redirectPath}">Open article</a></p><script>window.location.replace(${JSON.stringify(redirectPath)})</script></body></html>`);
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
