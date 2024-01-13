import express from "express";
import path from "path";
import mime from "mime";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 8082;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("src", {
  setHeaders: (res, path) => {
    const mimeType = mime.getType(path);
    if (mimeType) {
      res.setHeader("Content-Type", mimeType);
    } else if (path.endsWith('.tpl')) {
      res.setHeader('Content-Type', 'application/vnd.groove-tool-template');
    }
  },
}));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"))
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});