#!/usr/bin/env node

let inputarr = process.argv.slice(2); //to fetch input from cli arguments

//Packages required
let fs = require("fs");
let path = require("path");
//Custom User Packages
let helpobj = require("./commands/help");
let treeobj = require("./commands/tree");
let organizeobj = require("./commands/organize");
let command = inputarr[0];
let types = {
    media: ['mp4', 'mkv','png','svg','jpeg','jpg'],
    archives: ['zip', 'rar', 'tar', 'gz', 'iso', 'xz', '7z'],
    documents: ['docx', 'doc', 'pdf', 'xls', 'xlsx', 'csv', 'ods', 'odp', 'txt', 'ps'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    code: ['cpp', 'js', 'py']
}

//Reading the user input
switch (command) {
    case "tree":
        treeobj.treekey(inputarr[1]);
        break;
    case "organize":
        organizeobj.organizekey(inputarr[1]);
        break;
    case "help":
        helpobj.helpkey();
        break;
    default:
        console.log("Please enter valid command 😒");
        break;
}
