const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: function(req, file, cb){
        let ext = path.extname(file.originalname);
        if(ext !=='.jpeg' && ext !=='.jpg' && ext !=='.png'){
            cb(null, new Error(`unexpected file type`), false)
            return;
        }else{
            cb(null, true);
        }
    }
})