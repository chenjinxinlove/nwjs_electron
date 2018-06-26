'use strict';
const fs = require('fs');
const osenv = require('osenv');
const async = require('async');
const path = require('path');

function getUsersHomeFolder() {
    return osenv.home()
}

function getFilesInFolder(folderPath, cb) {
    fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
    let result = {
        file: path.basename(filePath),
        path: filePath, type: ''
    };
    fs.stat(filePath, (err, stat) => {
        if (err) {
            cb(err);
        } else {
            if (stat.isFile()) {
                result.type = 'file';
            } else if(stat.isDirectory()) {
                result.type = 'directory';
            } else {
                result.type = 'file';
            }
            cb(err, result);
        }
    })
}

function inspectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb)
}

function displayFile(file) {
    const mainArea = document.getElementById('main-area');
    const template = document.querySelector('#item-template');
    let clone = document.importNode(template.content, true);
    clone.querySelector('img').src=`images/${file.type}.svg`;
    clone.querySelector('.filename').innerText = file.file;
    mainArea.appendChild(clone);
}

function displayFiles(err, files) {
    if (err) {
        return alert('不能展示你的文件')
    }
    files.forEach(displayFile)
}



function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert('没有导入home')
        }
        inspectAndDescribeFiles(folderPath,files, displayFiles)
    })
}

main()