'use strict';
const fs = require('fs');
const osenv = require('osenv');
const async = require('async');
const path = require('path');

function getUsersHomeFolder() {
    return osenv.home()
}

function getFilesInFolder(floderPath, cb) {
    fs.readdir(floderPath, cb);
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
            }
            if (stat.isDirectory()) {
                result.type = 'directory';
            }
            cb(err, result);
        }
    })
}

function inspectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(floderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb)
}

function displayFiles(err, files) {
    if (err) {
        return alert('不能展示你的文件')
    }
    files.forEach((file) => { console.log(file)  })
}



function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(floderPath, (err, files) => {
        if (err) {
            return alert('没有导入home')
        }
        inspectAndDescribeFiles(floderPath,files, displayFiles)
    })
}

main()