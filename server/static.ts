import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files with fallthrough enabled (default) so non-existent files call next()
  app.use(
    express.static(distPath, {
      fallthrough: true, // Continue to next middleware if file not found
    }),
  );

  // Catch-all route for SPA routing - must be after static middleware
  // This handles all routes that don't match static files or API routes
  app.use((req, res, next) => {
    // Skip API routes - let them fall through to error handler
    if (req.path.startsWith("/api")) {
      return next();
    }

    // Skip if response was already sent (e.g., by static middleware serving a file)
    if (res.headersSent) {
      return next();
    }

    // Skip if this is a request for a static file (has extension)
    // This prevents serving index.html for actual file requests
    const hasExtension = /\.[^/]+$/.test(req.path);
    if (hasExtension) {
      return next();
    }

    // Serve index.html for all other routes to enable client-side routing
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      next();
    }
  });
}
