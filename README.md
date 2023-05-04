# Tarkov Alert Bot

Это бот для Телеграма. Он позволяет в автоматическом режиме следить за ценами на барахолке игры Escape From Tarkov.

## Как запустить?

Скачать [Node.js](https://nodejs.org/) `v18.16.0`.

Клонировать этот репозиторий.

В директории проекта запустить следующие команды.

1. `npm i` - установит все зависимости проекта.
2. `npm run build` - соберет итоговый проект в директории `build`.
3. `npm start` - запустит бота.

Вы можете использовать [pm2](https://www.npmjs.com/package/pm2) для более удобного запуска продуктивной версии.

## Настройка оповещений

Для оповещений о ценах из вашего списка
Нужно добавить свой chat id в подписки при помощи запущенного бота или вручную.

### Способ 1 (вручную)

Добавьте chat id в JSON массив в файле [./local-db/settings.json](./local-db/settings.json), значение должно быть числовое и соответствовать вашим реальным chat id в Телеграме. Перед получением оповещений напишите команду `/start` боту, чтобы у него уже был открытый чат с вами.

```json
{
  "followers": [123456789, 987654321, 10203040]
}
```

### Способ 2 (при помощи бота)

1. Запустите своего бота.
1. Отправьте ему команду `/follow` чтобы подписать самого себя
1. Отправьте команду `/follow 'chat id'` где вместо `'chat id'` укажите chat id того, кого хотите подписать

### Проверка по расписанию

- Для пользователей linux подойдет использование `cron`
- Для пользоватлей Windows - Планировщик задач инструкция [на русском](https://pc.ru/docs/windows/task-scheduler) и [на английском](https://www.windowscentral.com/how-create-automated-task-using-task-scheduler-windows-10)

## Конфигурация

Для сборки и запуска используйте конфигурационные файлы в директории [./fconfig/](./config/).
Файл [./fconfig/default.json](./config/default.json) используется для разрабоки и первичного тестирования.
Файл [./fconfig/production.json](./config/production.json) для сборки и запуска продуктивной версии.

За конфигурацию отвечает библиотека [config](https://www.npmjs.com/package/config).

Пояснения по конфигурации

```json
{
  "appName": "Tarkov alert bot", // название приложения
  "mode": "PRODUCTION", // режим запуска приложения (сейчас не используется)
  "debugMessages": true, // отображение отладочных сообщений (сейчас не используется)
  "apiHost": "http://api.tarkov.dev", // хост API для проверки цен
  "apiReqLang": "ru", // язык для API
  "localItemsDb": "./local-db/items.json", // локальный список предметов (сейчас не используется)
  "watchItemsDb": "./local-db/watch.json", // список предметов для отслеживания
  "botSettingsDb": "./local-db/settings.json", // динамические настройки
  "tgConfig": {
    "botToken": "", // токен вашего бота Tg
    "baseKeyboard": [["/start", "/watchlist"]], // базовая клавиатура
    "adminChatId": "" // chat id администратора (сейчас не используется)
  },
  "searchResultMaxDisplay": 5, // максимальное количество предметов отображаемое в команде поиска
  "searchResultTextMaxLength": 30 // максимальная отображаемая длина названия предмета
}
```

## third party API

В проекте используются следующие API:

1. [Telegram bot](https://core.telegram.org/bots/api)
1. [tarkov.dev](https://tarkov.dev/api/)
