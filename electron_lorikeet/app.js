
'use strict';

const fileSystem = require('./fileSystem');
const userInterface = require('./userInterface');

function main() {
    userInterface.bindDocument(window);
    const folderPath = fileSystem.getUsersHomeFolder();
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert('没有导入home')
        }
        fileSystem.inspectAndDescribeFiles(folderPath,files, displayFiles)
    })
}

main()