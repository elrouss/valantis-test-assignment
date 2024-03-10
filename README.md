<h1 align="center">Тестовое задание на должность "Frontend-разработчик" в ювелирной мастерской <a href="https://valantis.store/">Valantis</a></h1>

<div align="center">
  <a href="#">
    <img width="575" alt="Главная страница приложения" src="https://github.com/elrouss/valantis-test-assignment/assets/108838349/b60e118c-c801-4928-8bf2-68977357b4bc" />
  </a>
</div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Краткое описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения</a></li>
      <li><a href="#peculiarProperties">Особенности работы приложения</a></li>
      <li><a href="#enhancement">Улучшение</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Краткое описание проекта</h2></a>
Проект представляет собой страницу со списком товаров в виде таблицы с пагинацией в обе стороны. Для каждого товара отображаются 4 поля: id, название, цена и бренд. Список возможно фильтровать по 3 последним полям, используя механизм стороннего API

<b>Ссылки на проект:</b>
<br>
Задание: https://github.com/ValantisJewelry/TestTaskValantis/blob/main/README.md
<br>
Деплой: https://elrouss.github.io/valantis-test-assignment/
<br>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка 'React'">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Иконка 'React Vite'">
  <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" alt="Иконка 'Axios'">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Иконка 'TypeScript'">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Иконка 'Sass (SCSS)'">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка 'HTML5'">
</span>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения</h2></a>

1. `git clone https://github.com/elrouss/valantis-test-assignment.git` - клонировать репозиторий (HTTPS)
2. `npm i` - установить зависимости
3. `npm run prepare` - установить <a href="https://typicode.github.io/husky/">husky</a>
4. Добавить в корне проекта файл `.env` и скопировать в него содержимое `.env.example`
5. `npm run dev` - запустить приложение и перейти по ссылке `http://localhost:5173/valantis-test-assignment/`

<div align="right">(<a href="#summary">к оглавлению</a>)</div>


<a name="peculiarProperties"><h2>4. Особенности работы приложения</h2></a>

- На странице выводится до 50 товаров с фильтрацией дублирующихся товаров по id, которые возвращаются с сервера. Максимальное количество товаров можно переопределить в переменной `MAX_ITEMS` внутри файла `src/utils/variables.ts`. При работе с фильтрацией по параметрам в случае отсутствия данных в таблице отобразится соответствующий текст
- В случае возникновения серверной ошибки срабатывает механизм повторных запросов в количестве 5 попыток; если все 5 попыток неудачные, то на экране появляется сообщение о серверной ошибке с предложением пользователю обновить страницу либо попробовать зайти на сайт позже (первоначальная идея о реализации 3-го запроа по второму урлу невозможна в связи с незащищенным протоколом http у API)
- Для получения серверных данных требуется передавать особое значение <b>X-Auth</b>, в которое входит сегодняшняя дата: она высчитывается на устройстве пользователя автоматически. Однако замечено, что после полуночи (по мск) в течение некоторого времени сервер отказывается принимать актуальную дату, для чего в файле `src/helpers/getCurrentTimestamp.ts` можно вручную перевести дату на день назад; как вариант - подменить метку в механизме повторных запросов в случае возвращения 401-й ошибки в файле `src/helpers/fetchData.ts`, однако, на данном этапе было принято решение не фиксить данную проблему. В случае ошибки авторизации на экране пользователя появится соответствующий текст
- В приложение не заложен отзывчиво-адаптивный интерфейс (будет плохо отображаться в портретной и некорректно - в пейзажной ориентации на планшетах и мобильных телефонах)

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="enhancement"><h2>5. Улучшение</h2></a>

- В случае с разрастанием приложения и его "подтормаживанием" можно попробовать изменить структуру компонент и/или оптимизировать ререндеры таблицы через мемоизацию

<div align="right">(<a href="#summary">к оглавлению</a>)</div>