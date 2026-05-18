import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, uploadPath);
    },

    filename: (_req, file, callback) => {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        callback(
            null,
            uniqueSuffix + path.extname(file.originalname)
        );
    },
});

const fileFilter: multer.Options["fileFilter"] = (
    _req,
    file,
    callback
) => {
    const allowedExtension =
        path.extname(file.originalname) === ".csv";

    if (!allowedExtension) {
        return callback(new Error("Only CSV files are allowed"));
    }

    callback(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
});