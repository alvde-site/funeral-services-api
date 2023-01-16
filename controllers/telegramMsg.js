const http = require('request');
const configTg = require('../configTg.json');

module.exports.sendMsg = (req, res) => {
  // токен и id чата берутся из config.json

  const reqBody = req.body;
  // каждый элемент обьекта запихиваем в массив
  const fields = [
    `<b>Name</b>: ${reqBody.name}`,
    `<b>Email</b>: ${reqBody.email}`,
    reqBody.text,
  ];
  let msg = '';
  // проходимся по массиву и склеиваем все в одну строку
  fields.forEach((field) => {
    msg += `${field}\n`;
  });
  // кодируем результат в текст, понятный адресной строке
  msg = encodeURI(msg);
  // делаем запрос
  http.post(
    `https://api.telegram.org/bot${configTg.telegram.token}/sendMessage?chat_id=${configTg.telegram.chat}&parse_mode=html&text=${msg}`,
    (error, response, body) => {
      // не забываем обработать ответ
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);
      if (response.statusCode === 200) {
        res
          .status(200)
          .json({ status: 'ok', message: 'Успешно отправлено!', body });
      }
      if (response.statusCode !== 200) {
        res
          .status(400)
          .json({ status: 'error', message: 'Произошла ошибка!', error });
      }
    },
  );
};
