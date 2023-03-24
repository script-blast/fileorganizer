let fs = require("fs");
let path = require("path");

let types = {
    media: ['mp4', 'mkv','png','svg','jpeg','jpg'],
    archives: ['zip', 'rar', 'tar', 'gz', 'iso', 'xz', '7z'],
    documents: ['docx', 'doc', 'pdf', 'xls', 'xlsx', 'csv', 'ods', 'odp', 'txt', 'ps'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    code: ['cpp', 'js', 'py']
}
//Organise Command Begin --------------------------------------------------------------------------------------------
function copyfiles(filepath, destpath, filecat) {
    let folderpath = path.join(destpath, filecat);
    //make the directory if it doesn't exist
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
    }
    //copy the file into that dirpath
    let filebasename = path.basename(filepath);
    destpath = path.join(folderpath, filebasename);
    fs.copyFileSync(filepath, destpath);
}

function getcategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let currtype = types[type];
        for (let i = 0; i < currtype.length; i++) {
            if (ext == currtype[i]) {
                return type;
            }
        }
    }
    return "others";
}

function organizeHelper(src, dest) {
    //Identify the type of files
    let filenames = fs.readdirSync(src);
    for (let i = 0; i < filenames.length; i++) {
        let child = filenames[i];
        let childpath = path.join(src, child);
        if (fs.lstatSync(childpath).isFile()) {
            let category = getcategory(childpath);
            //Cut/Copy files into respected folders
            copyfiles(childpath, dest, category);
        }
    }
}

function organizefs(dirpath) {
    if (dirpath == undefined) {
        console.log("Please enter valid path");
    } else {
        let doesexist = fs.existsSync(dirpath);
        if (doesexist && fs.lstatSync(dirpath).isDirectory()) {
            //1.create a folder named organized if it doesnt exist
            let destpath = path.join(dirpath, "organized_files");
            if (!fs.existsSync(destpath)) {
                fs.mkdirSync(destpath);
            }
            //call the remaining part of function
            organizeHelper(dirpath, destpath);
        } else {
            console.log("Please enter valid path");
        }
    }
}
module.exports = {
    organizekey: organizefs
}
