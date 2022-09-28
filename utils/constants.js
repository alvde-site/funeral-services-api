const options = { // Опции для cors
  origin: [
    'http://localhost:3000',
    'http://alvde-mesto.nomoredomains.sbs',
    'https://alvde-mesto.nomoredomains.sbs',
    'https://alvde-site.github.io',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

const SecretKey = 'some-secret-key';

// Сообщения ошибок
const IncorrectEmailPassword = 'Вы ввели неправильный логин или пароль';
const EnterEmail = 'Введите почту';
const IncorrectLinkFormat = 'Неправильный формат ссылки';
const CanNotFind = 'Извините, я не могу это найти!';
const ServerError = 'На сервере произошла ошибка';
const AuthError = 'Нужно авторизоваться';
const IncorrectLoginPassword = 'Вы ввели неправильный логин или пароль';
const NotFoundClient = 'Клиент по указанному_id в БД не найден';
const NotFoundMovie = 'Фильма по указанному_id в БД не найдено';
const EditClientError = 'При обновлении клиента произошла ошибка';
const IncorrectClientData = 'Переданы некорректные данные при создании клиента';
const IncorrectMoviesData = 'Переданы некорректные данные при создании фильма';
const UsedEmail = 'email уже занят';
const DeletedToken = 'Токен удален';
const SomethingWrong = 'Что-то пошло не так';
const ForbiddenDeleteMovie = 'Нельзя удалить фильм';
const MovieIsRemoved = 'Фильм удален';

module.exports = {
  options,
  SecretKey,
  IncorrectEmailPassword,
  EnterEmail,
  IncorrectLinkFormat,
  CanNotFind,
  ServerError,
  AuthError,
  IncorrectLoginPassword,
  NotFoundClient,
  NotFoundMovie,
  EditClientError,
  IncorrectClientData,
  IncorrectMoviesData,
  UsedEmail,
  DeletedToken,
  SomethingWrong,
  ForbiddenDeleteMovie,
  MovieIsRemoved,
};
