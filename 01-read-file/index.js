
// // асинхронное чтение
// require("fs").readFile("./01-read-file/text.txt", "utf8", 
//             function(error,data){
//                 console.log("Асинхронное чтение файла");
//                 if(error) throw error; // если возникла ошибка
//                 console.log(data);  // выводим считанные данные
// });

const fs = require('fs')

let stream = fs.createReadStream('./01-read-file/text.txt')

setTimeout(
  () =>
    stream.on('data', (data) =>
      console.log(data.toString())
    ),
  3000
) //выведет содержимое файла