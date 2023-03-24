let fs = require("fs");
let path = require("path");
//Tree Command begin ------------------------------------------------------------------------------------------------
function treehelper(dirpath, ident) {
    //check whether file or folder
    if (fs.lstatSync(dirpath).isFile()) {
        let bname = path.basename(dirpath);
        console.log(ident + "└---" + bname);
    } else {
        let dirname = path.basename(dirpath);
        console.log(ident + "|---" + dirname);
        let childrens = fs.readdirSync(dirpath);
        for (let i = 0; i < childrens.length; i++) {
            let childpath = path.join(dirpath, childrens[i]);
            treehelper(childpath, ident + "\t");
        }
    }
}

function treefs(dirpath) {
    if (dirpath == undefined || !fs.existsSync(dirpath)) {
        console.log("Invalid path enetered,Running the command on current directory");
        treefs(process.cwd(), "");
    } else {
        console.log("Running Tree Command");
        treehelper(dirpath, "");
    }
}

module.exports = {
    treekey: treefs
}
