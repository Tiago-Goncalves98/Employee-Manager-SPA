import {
  __async
} from "./chunk-HSNDBVJ3.js";

// node_modules/easy-file-picker/index.js
function getFile(options) {
  return __async(this, null, function* () {
    const fileInput = createFileInput(false, options);
    const file = new Promise((resolve) => {
      fileInput.onchange = (event) => {
        const files = convertFileListToFileArray(event.target?.files);
        resolve(files[0]);
      };
      fileInput.click();
    });
    return file.finally(() => fileInput.remove());
  });
}
function getFiles(options) {
  return __async(this, null, function* () {
    const fileInput = createFileInput(true, options);
    const files = new Promise((resolve) => {
      fileInput.onchange = (event) => {
        const files2 = convertFileListToFileArray(event.target?.files);
        resolve(files2);
      };
      fileInput.click();
    });
    return files.finally(() => fileInput.remove());
  });
}
function getFileAsString(options) {
  return __async(this, null, function* () {
    const fileInput = createFileInput(false, options);
    const file = new Promise((resolve, reject) => {
      fileInput.onchange = (event) => {
        const files = convertFileListToFileArray(event.target?.files);
        convertFileArrayToFileStringArray(files).then((str) => resolve(str[0])).catch((err) => reject(err));
      };
      fileInput.click();
    });
    return file.finally(() => fileInput.remove());
  });
}
function getFilesAsString(options) {
  return __async(this, null, function* () {
    const fileInput = createFileInput(false, options);
    const files = new Promise((resolve, reject) => {
      fileInput.onchange = (event) => {
        const files2 = convertFileListToFileArray(event.target?.files);
        convertFileArrayToFileStringArray(files2).then((str) => resolve(str)).catch((err) => reject(err));
      };
      fileInput.click();
    });
    return files.finally(() => fileInput.remove());
  });
}
function uploadFilesTo(url, files) {
  return __async(this, null, function* () {
    const filesArray = Array.isArray(files) ? files : [files];
    const formData = new FormData();
    let i = 0;
    for (const file of filesArray) {
      formData.append(`File${i++}`, file, file.name);
    }
    return fetch(url, {
      method: "POST",
      body: formData
    });
  });
}
function createFileInput(multpleFiles, options) {
  const fileInput = document.createElement("input");
  fileInput.hidden = true;
  fileInput.type = "file";
  fileInput.multiple = multpleFiles;
  fileInput.accept = options?.acceptedExtensions?.join(",") ?? "";
  return fileInput;
}
function convertFileListToFileArray(files) {
  if (files == null) {
    return [];
  }
  const fileArray = [];
  for (let i = 0; i < files.length; i++) {
    fileArray.push(files[i]);
  }
  return fileArray;
}
function convertFileArrayToFileStringArray(files) {
  return __async(this, null, function* () {
    const reader = new FileReader();
    const filePromises = [];
    for (const file of files) {
      const filePromise = new Promise((resolve) => {
        reader.onload = (event) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            webkitRelativePath: file.webkitRelativePath,
            content: event.target?.result
          });
        };
        reader.readAsText(file, "utf-8");
      });
      filePromises.push(filePromise);
    }
    return Promise.all(filePromises);
  });
}
export {
  getFile,
  getFileAsString,
  getFiles,
  getFilesAsString,
  uploadFilesTo
};
//# sourceMappingURL=easy-file-picker.js.map
