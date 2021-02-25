import { FileService } from "./services/file.service";

const filesService = new FileService();

const filename1 = 'my-file.txt';
const file1 = filesService.getFileContentLinesByFileName(filename1);
console.log(file1);


const data1 = ["asdadbashfbajhsfba","asd adadsadsasd"];
filesService.writeFileContentLinesByFileName(filename1, data1);
