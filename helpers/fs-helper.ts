import * as fs from "fs";

export const readFolder = (name: string) => {
    return new Promise((resolve, reject) => {
        fs.readdir(name, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

export const readImage = (imageName: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imageName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const readText = (fileName: string) => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const readHtml = readText;

export const readJson = (fileName: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};
