const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { generateWebsite } = require("./generateDynamic");
const multer = require("multer");
const app = express();
app.use(cors());
app.use("/", express.static(path.join(__dirname, "generated")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
const fs = require("fs");
const cors = require("cors");
const AdmZip = require("adm-zip");
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello there welcome to dynamic WEB GEN :-)");
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "uploads");
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, "LGF.xlsx");
    },
  }),
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".xlsx" && ext !== ".xls") {
      return cb(new Error("Only Excel files are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post("/postExcel", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type.");
  }
  const filePath = req.file.path;
  console.log(`File saved at: ${filePath}`);
  res.send("File saved successfully");
});

app.post("/generate", async (req, res) => {
  try {
    const result = await generateWebsite();

    console.log(result);
    const regexHTML = /(?<=```html)[\s\S]*?(?=```)/g;
    const regexJS = /(?<=```javascript)[\s\S]*?(?=```)/g;
    const regexJS1 = /(?<=```js)[\s\S]*?(?=```)/g;
    const regexCSS = /(?<=```css)[\s\S]*?(?=```)/g;
    const matchHTML = result.match(regexHTML);
    const matchCSS = result.match(regexCSS);
    let matchJS;
    if (result.match(regexJS)) {
      matchJS = result.match(regexJS);
    } else if (result.match(regexJS1)) {
      matchJS = result.match(regexJS1);
    } else {
      matchJS = [
        "Js cannot be extracted at the moment. Please try again later",
      ];
    }
    console.log(matchHTML);
    console.log(matchCSS);
    console.log(matchJS);

    //page view
    const dir = path.join(__dirname, "generated");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    if (matchHTML && matchHTML[0].trim) {
      fs.writeFileSync(path.join(dir, "index.html"), matchHTML[0]);
    }

    if (matchCSS && matchCSS[0].trim) {
      fs.writeFileSync(path.join(dir, "styles.css"), matchCSS[0]);
    }

    if (matchJS && matchJS[0].trim) {
      fs.writeFileSync(path.join(dir, "script.js"), matchJS[0]);
    }
    res.download(path.join(dir, "index.html"));

    res.json({
      message: "Website generated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating website");
  }
});

app.get("/view-generated", (req, res) => {
  res.sendFile(path.join(__dirname, "generated", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on 3000");
});
