import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
    destination:(_req,_file,callback)=>{
        callback(null,"uploads/")
    },
    filename:(_req,file,callback)=>{
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9)
         callback(null,uniqueSuffix+path.extname(file.originalname))
    }
    
})

const fileFilter:multer.Options["fileFilter"]=(
    _req,
    file,
    callback,
)=>{
    const allowedExtension=path.extname(file.originalname)===".csv";
    if(!allowedExtension){
        return callback(new Error("only csv files are allowed"))
    }
    callback(null,true)
}

export const upload=multer({storage,fileFilter})