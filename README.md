# Сервис идей по благоустройству "Удобный город"

## Описание

Наш сервис идей по благоустройству "Удобный город" поможет собрать неравнодушных к окружающему миру людей. В нашем приложении вы сможете предлагать свои идеи (петиции) по улучшению вашего города, оценивать и обсуждать идеи ваших соседей.

## Функционал приложения

- Регистрация
- Авторизация
- Обновление личного кабинета
- Вывод списка всех петиций
- Вывод подробной информации о петиции
- Добавление пользователем петиции
- Добавление подписи пользователя к петиции
- Вывод количества подписей к петиции
- Вывод информации о том, что определенный пользователь подписал определенную петицию
- Получение всех комментариев к петиции
- Добавление комментария к петиции
- Удаление комментария к петиции
- Получение имени и фамилии автора комментария

## Сервер с REST API

http://comfortable-city.std-709.ist.mospolytech.ru/api/

### Описание API
#### GET:
http://comfortable-city.std-709.ist.mospolytech.ru/api/photo/:filename - получение полного пути файла

http://comfortable-city.std-709.ist.mospolytech.ru/api/petitions - получение всех петиций

http://comfortable-city.std-709.ist.mospolytech.ru/api/petitions/:id - получение информации петиции по id

http://comfortable-city.std-709.ist.mospolytech.ru/api/getPetitionComment/:id_petition - получение всех комментариев к петиции по id петиции

http://comfortable-city.std-709.ist.mospolytech.ru/api/getAuthorCommentName/:id_comment - получение имени и фамилии автора комментария по id

http://comfortable-city.std-709.ist.mospolytech.ru/api/getSignatures/:id_petition - получение количества подписей к петиции

http://comfortable-city.std-709.ist.mospolytech.ru/api/getUserSignature/:id_petition/:id_user - получение информации о том, что пользователь подписал петицию

#### POST:

http://comfortable-city.std-709.ist.mospolytech.ru/upload-photo/ - получение файла и загрузка его в папку uploads

http://comfortable-city.std-709.ist.mospolytech.ru/api/login - авторизация пользователя

http://comfortable-city.std-709.ist.mospolytech.ru/api/registration - регистрация пользователя

http://comfortable-city.std-709.ist.mospolytech.ru/api/add-petition - добавление петиции

http://comfortable-city.std-709.ist.mospolytech.ru/api/addComment - добавление комментария к петиции

http://comfortable-city.std-709.ist.mospolytech.ru/api/addSignature - добавление подписи к петиции

#### PUT:
http://comfortable-city.std-709.ist.mospolytech.ru/api/updateUser - изменение информации о пользователе

#### DELETE:
http://comfortable-city.std-709.ist.mospolytech.ru/api/deleteComment/:id_comment - удаление комментария

## Мобильное приложение

добавить ссылку на apk файл

## Стек технологий

Для разработки серверной части использовались технологии:

- Node.js;
- Express.js;
- MySQL;

Для разработки клиентской части использовались Angular, Bootstrap.

Для разработки мобильного приложения использовались технологии:

- Retrofit2

## ERD-диаграмма базы данных

![ERD](https://sun9-27.userapi.com/impg/aM1bAzXoe5SDNs5dKyEZCjj1JBci3HVT7r-XPw/rtw1_wfh14M.jpg?size=738x561&quality=96&proxy=1&sign=2f61e3f4ccfa9a9cd941b6a325e56780&type=album)

## Макеты интерфейсов мобильного приложения

https://www.figma.com/file/egOOCyhTFN0PTGZDkEOGpg/%D0%A3%D0%B4%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4?node-id=55%3A2

## Планирование задач
https://github.com/users/FedGus/projects/1

## Документация к API в Postman

https://documenter.getpostman.com/view/10730375/TVzVhFMJ

## Запуск проекта локально

### Запуск клиентской части

npm run start

### Запуск серверной чатси

nodemon server/server

### Работа с БД локально

База данных развернута на https://fit.mospolytech.ru, для корректной работы на локалхосте необходимо настроить VPN согласно инструкции https://fit.mospolytech.ru/systems/vpn

## Разработчки

| Учебная группа | GitHub-имя      |        ФИО         |
| :------------: | :-------------- | :----------------: |
|    181-321     | @FedGus         |    Гусев Федор     |
|    181-321     | @ksenikmalin    | Малиновская Ксения |
|    181-321     | @Bychkova-Elena |   Бычкова Елена    |
|    181-321     | @OlgaKrasnova   |   Краснова Ольга   |
