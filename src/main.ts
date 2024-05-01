import express from "express";
import dotenv from "dotenv";
import { ForecastAPI } from "./forecast/api";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const Moscow = {
	lat: 55.7512,
	lon: 37.6184,
}

const forecast = new ForecastAPI()

app.get("/", async (req, res) => {
	const r = await forecast.compact(Moscow.lat, Moscow.lon)
	res.json(r)
});

app.listen(port, () => {
	console.log(`service started on port: ${port}`);
});
