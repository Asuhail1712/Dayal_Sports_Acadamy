import "dotenv/config";
import app from "./app.js";

// Use Render's PORT or fallback to 3001 for local
const port = Number(process.env.PORT) || 3001;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});