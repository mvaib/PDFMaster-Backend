const express = require("express")
const multer = require("multer")
const docxConverter = require("docx-pdf")
const path = require("path")
const fileUploadRouter = express.Router()



// setting up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })

fileUploadRouter.post("/convert", upload.single("file"), (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, msg: "File not found" });

        // Defineing the output file path
        const outputPath = path.join(__dirname, "files", `${req.file.originalname.split(".")[0]}.pdf`);

        docxConverter(req.file.path, outputPath, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "Error in converting to pdf", error: err });
            }
            res.download(outputPath, () => {
                console.log('File downloaded successfully');
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal server Error" });
    }
});


module.exports = {fileUploadRouter}
