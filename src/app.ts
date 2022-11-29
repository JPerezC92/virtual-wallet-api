import cors from "cors";
import express from "express";
import path from "path";
import { loadApiEndpoints } from "src/routes/loadApiEndpoints";

// Create Express server
const app = express();

app.use(cors());

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
