const express = require("express");
const qr = require("qrcode");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.post("/generate", async (req, res) => {
	const { vehicle, phone } = req.body;
	const data = JSON.stringify({ phone: phone });
	const baseUrl =
		"https://your-deployed-website.vercel.app/verify" ||
		"http://localhost:3001/verify";
	const qrImage = await qr.toDataURL(
		`${baseUrl}/${Buffer.from(data).toString("base64")}`
	);
	res.json({ qrImage });
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
