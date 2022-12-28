import {categoriesId} from './categoriesId';
import {JAVASCRIPT, PYTHON, HTML, JAVA, CSHARP, CPLUSPLUS, MANAGEMENT} from './categories';

const jsPlan = {
    id: categoriesId[JAVASCRIPT],
    nameEN: 'Javascript step-by-step plan',
    nameUA: 'Javascript покроковий план',
    items: [
        {
            titleEN: 'Learn the basics',
            titleUA: 'Ознайомтеся з основами',
            bodyEN: 'The hardest step of all.\n' +
                '####\n' +
                'There will be many problems, such as:\n' +
                '####\n' +
                '- **Where do I start?**\n' +
                '- **I don’t understand the resources.**\n' +
                '- **Where do I write code?**\n' +
                '####\n' +
                'First, you need to set up your machine. Whether it’s Windows, Linux or Mac, get a programming IDE, or in newbie-speak, a “programmer’s text editor”, like Webstorm or Atom. Then try writing Hello World in the selected IDE/editor.\n' +
                '####\n' +
                'Before I recommend any resources, let me give you a quick overview of the knowledge and skills that you need to learn first:\n' +
                '####\n' +
                '- **How to write Hello World in JavaScript**\n' +
                '- **What is a variable**\n' +
                '- **Types of variable and how to create each of them**\n' +
                '- **What is a loop and how to iterate over arrays**\n' +
                '- **Document Object Model tree (DOM tree)**\n' +
                '- **How to write HTML. Learn about tags, especially: head, body, a, div and p.**\n' +
                '- **Selecting DOM nodes. Learn key words like querySelect, querySelectAll and get used to them.**\n' +
                '- **Play with CSS. Create a first class and assign the HTML tags. Bonus if you learn how to do this through JavaScript.**\n' +
                '####\n' +
                'You can learn all that online or through a private on-site course. Which one to choose? I leave that decision to you.\n' +
                '\n',
            bodyUA: 'Найважчий крок з усіх.\n' +
                '####\n' +
                'Буде багато запитань, таких як:\n' +
                '####\n' +
                '- **З чого почати?**\n' +
                '- **Я не розумію, які ресурси є.**\n' +
                '- **Де писати код?**\n' +
                '####\n' +
                'По-перше, вам потрібно налаштувати свою робочу машину. Незалежно від того, чи це Windows, Linux або Mac, встановіть середовище програмування, або, якщо говорити мовою новачків, "текстовий редактор для програмістів", наприклад, Webstorm або Atom. Потім спробуйте написати Hello World у вибраному IDE/редакторі.\n' +
                '####\n' +
                'Перш ніж рекомендувати будь-які ресурси, дозвольте мені дати вам короткий огляд знань та навичок, які вам потрібно засвоїти в першу чергу:\n' +
                '####\n' +
                '- **Як написати Hello World на JavaScript**\n' +
                '- **Що таке змінна**\n' +
                '- **Типи змінних та способи створення кожної з них**\n' +
                '- **Що таке цикл та як виконувати ітерації над масивами**\n' +
                '- **Дерево об\'єктної моделі документа (DOM-дерево)**\n' +
                '- **Як писати HTML. Знайомство з тегами, зокрема: head, body, a, div та p.**.\n' +
                '- **Виділення вузлів DOM. Вивчаємо ключові слова, такі як querySelect, querySelectAll і звикаємо до них.**.\n' +
                '- **Пограємо з CSS. Створимо перший клас і присвоїмо йому HTML-теги. Бонус, якщо навчитеся робити це через JavaScript.**.\n' +
                '####\n' +
                'Усьому цьому можна навчитися онлайн або на приватному виїзному курсі. Який з них вибрати? Я залишаю це рішення за вами.\n',
        },
        {
            titleEN: 'Work on your first homemade project',
            titleUA: 'Працюйте над своїм першим проектом',
            bodyEN: 'This is a crucial step. You need to get an idea of how to connect the bits. **Every JavaScript programmer that came before you had to take this step.**\n' +
                '####\n' +
                'You can create a very simple static website, such as:\n' +
                '####\n' +
                '- **Calculator**\n' +
                '- **Currency converter**\n' +
                '- **Traffic lights simulator (with automatic switching)**\n' +
                '####\n' +
                'Keep it to yourself. Try to make it look professional. Don’t hesitate to use Google.\n' +
                '####\n' +
                'At this point, stay away from frameworks like Angular, Vue or React. You need to learn a few more things before you jump into that world.\n' +
                '\n',
            bodyUA: 'Це дуже важливий крок. Ви повинні отримати уявлення про те, як з\'єднати вже набуті знання. **Кожен JavaScript-програміст, який прийшов до вас, повинен був зробити цей крок.**\n' +
                '####\n' +
                'Ви можете створити дуже простий статичний веб-сайт, такий як:\n' +
                '####\n' +
                '- **Калькулятор**\n' +
                '- **Конвертер валют**.\n' +
                '- **Симулятор світлофора (з автоматичним перемиканням)**.\n' +
                '####\n' +
                'Зробіть це для себе. Намагайтеся, щоб це виглядало професійно. Не соромтеся використовувати Google.\n' +
                '####\n' +
                'Поки що тримайтеся подалі від таких фреймворків, як Angular, Vue або React. Вам потрібно вивчити ще кілька речей, перш ніж ви стрибнете в цей світ.\n',
        },
        {
            titleEN: 'Explore best practice',
            titleUA: 'Вивчайте найкращі практики',
            bodyEN: 'By this point, you should be fairly confident in creating simple websites. You should easily be able to create HTML, CSSand JS files, and seamlessly connect them.\n' +
                '####\n' +
                'When it comes to JavaScript, you should now **brush up your knowledge**. You most likely feel quite confident with loops and accessing the DOM. You have probably learned how to:\n' +
                '####\n' +
                '- **concatenate strings (The concat() method is used to join two or more strings)**\n' +
                '- **how to convert strings to integers**\n' +
                '- **how to inject information into the DOM tree (using document.createElement and then appendChild)**\n' +
                '####\n' +
                'You have also created quite a few functions. You can explain what a function parameter is and when the function is being invoked. You know that code is being executed sequentially.\n' +
                '####\n' +
                '**This is a huge milestone**. Congrats. Now let’s get down to business because ou are on the last few steps before interviews.\n' +
                '####\n' +
                'Focus on how your code looks. Format it just like you learned on the courses.\n' +
                '####\n' +
                'Split your code into small parts. Don’t hesitate to create local variables and functions to make it clear what is going on in the code.\n' +
                '####\n' +
                'Make sure you know how to distinguish odd/even elements in a loop, or how to color the 3rd node on a list.\n' +
                '####\n' +
                'Explore Math.random() and other handy built-in functions prefixed with Array or Object.\n',
            bodyUA: 'На цьому етапі ви повинні бути досить впевненими у створенні простих веб-сайтів. Ви повинні легко вміти створювати HTML, CSS та JS файли, а також без проблем з\'єднувати їх між собою.\n' +
                '####\n' +
                'Що стосується JavaScript, то тепер вам слід **підтягнути свої знання**. Ви, швидше за все, відчуваєте себе досить впевнено з циклами та доступом до DOM. Ви, напевно, навчилися, як:\n' +
                '####\n' +
                '- **конкатенувати рядки (метод concat() використовується для об\'єднання двох або більше рядків)**\n' +
                '- **перетворювати рядки в цілі числа**\n' +
                '- **як вставляти інформацію в DOM-дерево (за допомогою document.createElement і потім appendChild)**.\n' +
                '####\n' +
                'Ви також створили досить багато функцій. Ви можете пояснити, що таке параметр функції та коли викликається функція. Ви знаєте, що код виконується послідовно.\n' +
                '####\n' +
                '**Це величезний крок вперед**. Вітаю вас. Тепер давайте перейдемо до справи, адже ви знаходитесь на останніх кроках перед співбесідою.\n' +
                '####\n' +
                'Зосередьтеся на тому, як виглядає ваш код.\n' +
                'Розділіть свій код на невеликі частини. Не соромтеся створювати локальні змінні та функції, щоб було зрозуміло, що відбувається в коді.\n' +
                '####\n' +
                'Переконайтеся, що ви знаєте, як відрізнити парні/непарні елементи в циклі, або як розфарбувати 3-й елемент у списку.\n' +
                '####\n' +
                'Вивчіть Math.random() та інші зручні вбудовані функції з префіксом Array або Object.\n',
        },
        {
            titleEN: 'Learn ECMAScript 6',
            titleUA: 'Вивчайте ECMAScript 6',
            bodyEN: '**ECMAScript** is a standard and JavaScript implements it.\n' +
                '####\n' +
                'ECMAScript introduces new concepts that you definitely need to learn:\n' +
                '####\n' +
                '- **Arrow functions**\n' +
                '- **Promises and async/await enhancement**\n' +
                '- **Collections (maps, sets)**\n' +
                '####\n' +
                'This is also a great time to focus on functions like:\n' +
                '####\n' +
                '- **Map**\n' +
                '- **Reduce**\n' +
                '- **Filter**\n' +
                '####\n' +
                'And to better understand the keyword, this, which is a common troublemaker in the JS world.\n' +
                '####\n' +
                'Bonus points if you learn advanced topics, such as:\n' +
                '####\n' +
                '- **Iterators**\n' +
                '- **Generators**\n',
            bodyUA: '**ECMAScript** це стандарт, а JavaScript його реалізує.\n' +
                '####\n' +
                'ECMAScript вводить нові поняття, які вам обов\'язково потрібно вивчити:\n' +
                '####\n' +
                '- **Стрілочні функції**\n' +
                '- **Promises і async/await**\n' +
                '- **Колекції (maps, sets)**\n' +
                '####\n' +
                'Це також чудовий час, щоб зосередитися на таких функціях, як:\n' +
                '####\n' +
                '- **Map**\n' +
                '- **Reduce**\n' +
                '- **Filter**\n' +
                '####\n' +
                'І краще ознайомтеся з ключовим словом, **this**, яке є частим порушником спокою у світі JS.\n' +
                '####\n' +
                'Бонусні бали, якщо ви вивчите просунуті теми, такі як:\n' +
                '####\n' +
                '- **Iterators**\n' +
                '- **Generators**\n',
        },
        {
            titleEN: 'Learn your first framework',
            titleUA: 'Вивчайте свій перший фреймворк',
            bodyEN: 'Now is the time to learn something that powers most newly-created websites.\n' +
                '####\n' +
                'The frameworks you might consider are:\n' +
                '####\n' +
                '1. **Angular**. Actively developed by Google developers. A great framework with all of the functionalities that a simple project needs. Very friendly to learn, with great documentation.\n' +
                '\n' +
                '2. **React**. Technically not a framework, React is a library for handling views. Along with Redux, it’s on the rise. This is my personal choice and I recommend it to you if you are eager to learn more advanced topics and explore the future of web and native development. Used on facebook.com and actively developed by Facebook developers. Comes with great documentation as well.\n' +
                '\n' +
                '3. **Vue**. A solution just in-between React and Angular. Commonly described as very easy to learn and with the easiest learning curve. Adopts the best patterns from Angular and React. In my opinion, it falls short of React but you should try it for sure. It is being actively developed by the Alibaba group.\n' +
                '####\n' +
                'Remember, this is a long step. Take your time. Learn **npm** and **yarn** during the process and a couple of new libraries for your next project.\n' +
                '\n',
            bodyUA: 'Зараз саме час навчитися тому, що лежить в основі більшості новостворених вебсайтів.\n' +
                '####\n' +
                'Фреймворки, які ви можете розглянути:\n' +
                '####\n' +
                '1. **Angular**. Активно розвивається розробниками Google. Відмінний фреймворк з усім функціоналом, який потрібен для простого проекту. Дуже зручний у вивченні, з чудовою документацією.\n' +
                '\n' +
                '2. **React**. Технічно не є фреймворком, React - це бібліотека для роботи з представленнями. Поряд з Redux вона знаходиться на підйомі. Це мій особистий вибір, і я рекомендую його вам, якщо ви прагнете вивчити більш просунуті теми та дослідити майбутнє веб- та нативної розробки. Використовується на facebook.com і активно розробляється розробниками Facebook.\n' +
                '\n' +
                '3. **Vue**. Рішення між React та Angular. Зазвичай описується як дуже простий у вивченні та з найпростішою кривою навчання. Переймає найкращі патерни з Angular та React. На мою думку, він не дотягує до React, але спробувати варто обов\'язково. Активно розвивається групою Alibaba.\n' +
                '####   \n' +
                'Пам\'ятайте, це довгий шлях. Не поспішайте. Вивчіть **npm** та **yarn** в процесі і пару нових бібліотек для наступного проекту.\n',
        },
        {
            titleEN: 'Brush up your styling skills in CSS and learn HTML5',
            titleUA: 'Покращуйте свої навички стилізації в CSS та вивчайте HTML5',
            bodyEN: 'Congratulations on getting this far! You should write your resume and try sending it to few companies/agencies to get some feedback.\n' +
                '####\n' +
                'During this process, you’ll have discovered that besides JavaScript, you will be expected to understand CSS and know its basic principles. Namely:\n' +
                '####\n' +
                '- **Selectors, including special characters like > and +**\n' +
                '- **Precedence of tags, classes and ids**\n' +
                '- **Flexbox and its rules**\n' +
                '####\n' +
                'Bonus points if you learn:\n' +
                '####\n' +
                '- One of the CSS preprocessors, like **SASS** or **LESS**\n' +
                '- Some CSS patterns like **BEM** or **SMACSS**\n' +
                '####\n' +
                'Naturally, along with **CSS** you should become very comfortable with HTML and its extension **HTML5**:\n' +
                '####\n' +
                '- New tags: section, article, header, footer, nav\n' +
                '- Canvas\n' +
                '- Dataset and classList\n' +
                '####\n' +
                'Then you should gain at least a basic understanding of the following topics:\n' +
                '####\n' +
                '- Web sockets\n' +
                '- Storage, cache\n' +
                '- SVG\n' +
                '####\n' +
                'As you can see, the list is quite long. The good news is, most of it you can learn within a week.\n',
            bodyUA: 'Вітаємо, ви дійшли так далеко! Вам варто написати своє резюме та спробувати розіслати його в декілька компаній/організацій, щоб отримати відгуки.\n' +
                '####\n' +
                'Під час цього процесу ви виявите, що окрім JavaScript, від вас очікується розуміння CSS та знання його основних принципів. А саме\n' +
                '####\n' +
                '- **Селектори, включаючи спеціальні символи, такі як > та +**\n' +
                '- **Прецедентність тегів, класів та ідентифікаторів**\n' +
                '- **Flexbox та його правила**.\n' +
                '####\n' +
                'Бонусні бали, якщо ви знатимете:\n' +
                '####\n' +
                '- Один з препроцесорів CSS, наприклад **SASS** або **LESS**\n' +
                '- Деякі CSS паттерни, такі як **BEM** або **SMACSS**\n' +
                '####\n' +
                'Природно, разом з **CSS** ви повинні добре освоїти HTML і його розширення **HTML5**:\n' +
                '####\n' +
                '- Нові теги: section, article, header, footer, nav\n' +
                '- Canvas\n' +
                '- Dataset і classList\n' +
                '####\n' +
                'Після цього слід отримати хоча б базове розуміння наступних тем:\n' +
                '####\n' +
                '- Веб-сокети\n' +
                '- Сховище, кеш\n' +
                '- SVG\n' +
                '####\n' +
                'Як бачите, список досить довгий. Хороша новина в тому, що більшу частину з нього можна вивчити протягом тижня.',
        },
        {
            titleEN: 'Prepare for interviews',
            titleUA: 'Підготовка до співбесіди',
            bodyEN: 'Get ready for showtime. Review your notes and keywords from the world of JavaScript developers. To do this, there is one great course that I highly recommend: JavaScript: Understanding the Weird Parts.\n' +
                '####\n' +
                'The key concepts you need to practice are:\n' +
                '####\n' +
                '- **Execution contexts**\n' +
                '- **“this” keyword**\n' +
                '- **Closures and callbacks**\n' +
                '- **IIFE**\n' +
                '- **Array functions: map, filter, reduce**\n' +
                '- **Creating new objects through the constructor function**\n',
            bodyUA: 'Приготуйтеся до шоу. Перегляньте свої конспекти та ключові слова зі світу JavaScript розробників. Для цього є один чудовий курс, який я дуже рекомендую: JavaScript: Understanding the Weird Parts.\n' +
                '####\n' +
                'Ключові поняття, які вам потрібно відпрацювати:\n' +
                '####\n' +
                '- **Контекст виконання**\n' +
                '- **Ключове слово “this”**\n' +
                '- **Замикання і зворотні виклики(колбеки)**\n' +
                '- **IIFE**\n' +
                '- **Функції роботи з масивами: map, filter, reduce**\n' +
                '- **Створення нових об\'єктів з допомогою функції-конструктора**\n',
        },
        {
            titleEN: 'Tools and design patterns',
            titleUA: 'Інструменти та шаблони проектування',
            bodyEN: 'If you got a job, great! If not, reiterate, practice and focus on the key points from the feedback.\n' +
                '####\n' +
                'From now on, I assume you’re already performing small tasks as a junior developer. That probably means you got to know **npm** fairly well. You should also have found your favorite editor/IDE. The ones I usually see are **Atom** or **Intellij/Webstorm** and I highly recommend you pick one of the two. Another good alternative is **Visual Studio Code**.\n' +
                '####\n' +
                'Now is the time to get equipped with Chrome and Firefox **plugins**. Check the documentation of the framework you use. Whether it is Angular, React, Vue or some other, it probably comes with a great plugin for your **Chrome Dev Tools**. To add to that, consider **Lighthouse** and **Dimensions**.\n' +
                '####\n' +
                'Then focus on productivity. Ctrl+c and Ctrl+v are not the only shortcuts you should know. In fact, I doubt you will need those two very often. However, there are quite a few others which will make your work a lot easier:\n' +
                '####\n' +
                '- Selection shortcuts, f.in. select whole line, cut whole line, select full length of closest word, etc.\n' +
                '- Open autocomplete box.\n' +
                '- Switch between the most recent files (similar to alt+tab on the system level).\n' +
                '- Navigate between the IDE windows, especially switching between editor and terminal.\n' +
                '####\n' +
                'After all that, you are ready to focus on the **quality and reusability of your code**. The fact that you have developed a solution to the problem does not mean it is done. Most likely the solution needs to be flexible and reusable too. It should adapt to different environments and support many edge cases.\n' +
                '####\n' +
                'Start exploring **Design Patterns**. Most of them are the same across multiple languages, and if you dare, you can read resources from **C++** or **Java** too. The most common (and valuable) book I recommend is, **Design Patterns: Elements of Reusable Object-Oriented Software** by Gang of Four. At Boldare, we also like **Clean Code** by Robert C. Martin.\n' +
                '####\n' +
                'The most notable patterns you should explore first are:\n' +
                '####\n' +
                '- Factory\n' +
                '- Singleton and Dependency Injection\n' +
                '- MV* patterns\n' +
                '- Prototype\n' +
                '- Iterator\n',
            bodyUA: 'Якщо ви отримали роботу - чудово! Якщо ні - повторюйте, практикуйтеся і зосередьтеся на ключових моментах з фідбеку.\n' +
                '####\n' +
                'З цього моменту, я припускаю, що ви вже виконуєте невеликі завдання в якості junior розробника. Це, ймовірно, означає, що ви досить добре познайомилися з **npm**. Ви також повинні були знайти свій улюблений редактор/IDE. Зазвичай я використовую **Atom** або **Intellij/Webstorm**, і я настійно рекомендую вам вибрати один з них. Ще однією гарною альтернативою є **Visual Studio Code**.\n' +
                '####\n' +
                'Зараз саме час озброїтися **плагінами** для браузерів Chrome та Firefox. Перевірте документацію фреймворку, який ви використовуєте. Незалежно від того, чи це Angular, React, Vue або якийсь інший, він, ймовірно, поставляється з чудовим плагіном для ваших **Chrome Dev Tools**. На додаток до цього, розгляньте **Lighthouse** та **Dimensions**.\n' +
                '####\n' +
                'Потім зосередьтеся на продуктивності. Ctrl+c і Ctrl+v - не єдині комбінації, які ви повинні знати. Насправді, я сумніваюся, що вони вам знадобляться дуже часто. Проте є чимало інших, які значно полегшать вашу роботу:\n' +
                '####\n' +
                '- Комбінації клавіш виділення, наприклад, виділити весь рядок, вирізати весь рядок, виділити повну довжину найближчого слова і т.д.\n' +
                '- Відкрити вікно автозаповнення.\n' +
                '- Перемикання між останніми файлами (аналогічно alt+tab на системному рівні).\n' +
                '- Переміщення між вікнами IDE, особливо перемикання між редактором і терміналом.\n' +
                '####\n' +
                'Після всього цього ви готові зосередитися на **якості та повторному використанні вашого коду**. Те, що ви розробили рішення проблеми, ще не означає, що вона вирішена. Швидше за все, рішення повинно бути гнучким і придатним для повторного використання. Воно повинно адаптуватися до різних середовищ і підтримувати багато крайніх випадків.\n' +
                '####\n' +
                'Почніть вивчати **Паттерни проектування**. Більшість з них однакові для різних мов, і якщо ви наважитесь, ви можете прочитати ресурси з **C++** або **Java** також. Найбільш поширеною (і цінною) книгою, яку я рекомендую, є **Design Patterns: Elements of Reusable Object-Oriented Software** by Gang of Four. At Boldare, нам також подобається  **Clean Code** by Robert C. Martin.\n' +
                '####\n' +
                'Найвідоміші патерни, з якими варто ознайомитися в першу чергу:\n' +
                '####\n' +
                '- Factory\n' +
                '- Singleton and Dependency Injection\n' +
                '- MV* patterns\n' +
                '- Prototype\n' +
                '- Iterator\n',
        },
        {
            titleEN: 'Learn algorithms and how to increase the performance of your solutions',
            titleUA: 'Вивчайте алгоритми та способи підвищення продуктивності ваших рішень',
            bodyEN: 'The last milestone to accomplish. By now, you know how to develop reusable code, but it also needs to be robust.\n' +
                '####\n' +
                'A **5% increase in the speed** of your application would **mean million-dollar savings** at Google.\n' +
                '####\n' +
                'Prepare yourself for such big projects so that when the opportunity comes you won’t miss it.\n' +
                '####\n' +
                'You should probably start with sorting algorithms like Quick Sort and Merge Sort and then move on to the graph algorithms, **breadth-first** search and **depth-first** search. Once you get to know these, get yourself a book on algorithms to proceed further.\n' +
                '\n',
            bodyUA: 'Останній етап, який потрібно пройти. Тепер ви знаєте, як розробляти багаторазовий код, але він також повинен бути надійним.\n' +
                '####\n' +
                'Збільшення швидкості роботи вашого додатку на 5% означає мільйонну економію для Google.\n' +
                '####\n' +
                'Підготуйте себе до таких великих проектів, щоб, коли з\'явиться можливість, не упустити її.\n' +
                '####\n' +
                'Ймовірно, вам слід почати з алгоритмів сортування, таких як Quick Sort і Merge Sort, а потім перейти до алгоритмів графів, **breadth-first** пошук і **depth-first** пошук. Після того, як ви познайомитеся з ними, візьміть собі книгу про алгоритми, щоб рухатися далі.\n' +
                '\n ',
        },
    ],
};

const pythonPlan = {
    id: categoriesId[PYTHON],
    nameEN: 'Python step-by-step plan',
    nameUA: 'Python покроковий план',
    items: [
        {
            titleEN: 'Decide the Path You Want to Choose',
            titleUA: 'Визначтеся з тим, який шлях ви хочете обрати',
            bodyEN: 'When you start learning a programming language or anything new in life, you need to have a clear goal in your mind. Ask yourself why do you want to learn Python.\n' +
                '####\n' +
                'As I have mentioned before, Python has a lot of use cases. To make things easy, I have listed below a few general use cases for Python developers. You can choose the path that you like and begin your programming journey.\n' +
                '####\n' +
                '***Python for Web Development*** \n' +
                '####\n' +
                'Python can be used as a back-end language to build web applications. For web development, Python provides two frameworks: [Flask](https://pythonistaplanet.com/flask/) and [Django](https://pythonistaplanet.com/hello-world-django/).\n' +
                '####\n' +
                'If you are interested in web development, learn the [basics of Python](https://pythonistaplanet.com/python-basics/). Then, you can choose either Flask or Django to build the [back-end](https://pythonistaplanet.com/how-to-become-a-python-backend-developer/) of web applications. You can learn the basics of HTML, CSS, and Javascript to build the [front-end](https://pythonistaplanet.com/how-to-become-a-front-end-web-developer/) of web apps.\n' +
                '####\n' +
                'If you learn to build complete web applications (front-end and back-end), you become a [full-stack](https://pythonistaplanet.com/how-to-become-a-python-full-stack-web-developer/) web developer. \n' +
                '####\n' +
                '***Python for Data Science***\n' +
                '####\n' +
                'Data science is a rapidly growing field, and Python is the most used programming language in this field. Data science includes areas such as artificial intelligence, machine learning, deep learning, data analysis, data visualization, etc.\n' +
                '####\n' +
                'If you want to become a Python developer in the data science space, you need to [learn Python and its data science libraries](https://pythonistaplanet.com/how-to-learn-data-science/) like [numpy](https://pythonistaplanet.com/numpy/), [pandas](https://pythonistaplanet.com/pandas/), [matplotlib](https://pythonistaplanet.com/matplotlib/), keras, tensorflow, etc. You also need to be good at mathematics.\n' +
                '####\n' +
                '***Python for Task automation***\n' +
                '####\n' +
                'Python can be used to [automate various tasks](https://pythonistaplanet.com/python-automation-project-ideas/). You need to be good at Python programming and problem-solving to automate tasks.\n' +
                '####\n' +
                'If you are able to find problems or tasks that can be automated, then Python is a great tool to implement the logic. You can use your knowledge of various Python libraries in automating tasks.\n' +
                '####\n' +
                '***Python for Web Scraping***\n' +
                '####\n' +
                'Python is widely used for scraping data from websites. To do [web scraping](https://pythonistaplanet.com/web-scraping-using-python/), you can learn Python fundamentals and the Beautiful Soup library.\n' +
                '####\n' +
                '***Python for Desktop App Development***\n' +
                '####\n' +
                'If you want to build simple [GUI (graphical user interface) applications](https://pythonistaplanet.com/how-to-create-a-desktop-application-using-python/), you can learn Python libraries like [Tkinter](https://pythonistaplanet.com/tkinter/), EasyGUI, etc. These libraries will help you have a user interface for your Python code, and you can run these apps on your desktops or laptops.\n' +
                '####\n' +
                'These are some of the major use cases of Python. Apart from these, Python is used for a lot of other cases, like blockchain, embedded systems, mobile application development, game development, etc.\n' +
                '####\n' +
                'Pick one role you want to become and plan your learning based on that role. You can also pick a combination of skills as a role (For example, you can be a machine learning developer with web development skills, which will help you deploy your machine learning models on web apps).\n' +
                '\n' +
                '\n',
            bodyUA: 'Коли ви починаєте вивчати мову програмування або будь-що нове в житті, потрібно мати в голові чітку мету. Запитайте себе, чому ви хочете вивчати Python.\n' +
                '####\n' +
                'Як я вже згадував раніше, Python має багато варіантів використання. Щоб спростити завдання, я перерахував нижче кілька загальних варіантів використання для розробників Python. Ви можете вибрати шлях, який вам подобається, і почати свій шлях програмування.\n' +
                '####\n' +
                '***Python для веб-розробки***\n' +
                '####\n' +
                'Python можна використовувати як внутрішню мову для створення веб-додатків. Для веб-розробки Python надає два фреймворки: [Flask](https://pythonistaplanet.com/flask/) та [Django](https://pythonistaplanet.com/hello-world-django/).\n' +
                '####\n' +
                'Якщо вас цікавить веб-розробка, вивчіть [основи Python](https://pythonistaplanet.com/python-basics/). Потім ви можете обрати Flask або Django для створення [back-end](https://pythonistaplanet.com/how-to-become-a-python-backend-developer/) веб-додатків. Ви можете вивчити основи HTML, CSS та Javascript для створення [front-end](https://pythonistaplanet.com/how-to-become-a-front-end-web-developer/) веб-додатків.\n' +
                '####\n' +
                'Якщо ви навчитеся створювати повноцінні веб-додатки (front-end і back-end), ви станете [full-stack](https://pythonistaplanet.com/how-to-become-a-python-full-stack-web-developer/) веб-розробником.\n' +
                '####\n' +
                '***Python для Data Science***\n' +
                '####\n' +
                'Наука про дані - це сфера, що швидко розвивається, а Python є найбільш використовуваною мовою програмування в цій галузі. Наука про дані включає в себе такі напрямки, як штучний інтелект, машинне навчання, глибоке навчання, аналіз даних, візуалізація даних тощо.\n' +
                '####\n' +
                'Якщо ви хочете стати Python-розробником у сфері data science, вам потрібно [вивчити Python та його data science бібліотеки](https://pythonistaplanet.com/how-to-learn-data-science/), такі як [numpy](https://pythonistaplanet.com/numpy/), [pandas](https://pythonistaplanet.com/pandas/), [matplotlib](https://pythonistaplanet.com/matplotlib/), keras, tensorflow тощо. Також потрібно добре знати математику.\n' +
                '####\n' +
                '***Python для автоматизації задач***\n' +
                '####\n' +
                'Python можна використовувати для [автоматизації різних завдань](https://pythonistaplanet.com/python-automation-project-ideas/). Щоб автоматизувати завдання, потрібно добре володіти програмуванням на Python і вміти вирішувати проблеми.\n' +
                '####\n' +
                'Якщо ви вмієте знаходити проблеми або завдання, які можна автоматизувати, то Python є чудовим інструментом для реалізації логіки. Ви можете використовувати свої знання різних бібліотек Python в автоматизації завдань.\n' +
                '####\n' +
                '***Python для Web Scraping***\n' +
                '####\n' +
                'Python широко використовується для вилучення даних з веб-сайтів. Для того, щоб займатися [веб-скрепінгом](https://pythonistaplanet.com/web-scraping-using-python/), можна вивчити основи Python та бібліотеку Beautiful Soup.\n' +
                '####\n' +
                '***Python для розробки десктопних додатків***\n' +
                '####\n' +
                'Якщо ви хочете створювати прості [GUI (графічний інтерфейс користувача) додатки](https://pythonistaplanet.com/how-to-create-a-desktop-application-using-python/), ви можете вивчити бібліотеки Python, такі як [Tkinter](https://pythonistaplanet.com/tkinter/), EasyGUI тощо. Ці бібліотеки допоможуть вам отримати користувацький інтерфейс для вашого коду на Python, і ви зможете запускати ці програми на своїх настільних комп\'ютерах або ноутбуках.\n' +
                '####\n' +
                'Це деякі з основних випадків використання Python. Крім цього, Python використовується для багатьох інших випадків, таких як блокчейн, вбудовані системи, розробка мобільних додатків, розробка ігор тощо.\n' +
                '####\n' +
                'Виберіть одну роль, якою ви хочете стати, і сплануйте своє навчання на основі цієї ролі. Ви також можете обрати комбінацію навичок в якості ролі (наприклад, ви можете бути розробником машинного навчання з навичками веб-розробки, що допоможе вам розгортати ваші моделі машинного навчання у веб-додатках).\n' +
                '\n' +
                '\n',
        },
        {
            titleEN: 'Enhance Your Python Programming Skills',
            titleUA: 'Вдосконалюйте навички програмування на Python',
            bodyEN: 'Once you have a basic idea of what you want to become, it’s time to master Python programming language. Pick a course or a tutorial online and learn the fundamentals of Python.\n' +
                '####\n' +
                'Learn the basic programming concepts like conditional statements, loops, functions, data types, lists, dictionaries, and [object-oriented programming](https://pythonistaplanet.com/python-oops-concepts/). Make sure you understand the syntax of Python and how the programming logic is built.\n' +
                '####\n' +
                'Explore different problems that can be solved using Python. Develop software solutions to simple problems.\n' +
                '####\n' +
                'Try to understand code just by reading it. Try to generate code output in your mind. Derive an understanding of how the code works before you run it. These practices will help you in problem-solving and critical thinking.\n' +
                '\n',
            bodyUA: 'Після того, як ви маєте базове уявлення про те, ким хочете стати, саме час освоїти мову програмування Python. Обирайте курс або підручник онлайн та вивчайте основи Python.\n' +
                '####\n' +
                'Вивчіть основні поняття програмування, такі як умовні оператори, цикли, функції, типи даних, списки, словники та [об\'єктно-орієнтоване програмування](https://pythonistaplanet.com/python-oops-concepts/). Переконайтеся, що ви розумієте синтаксис мови Python і те, як будується логіка програмування.\n' +
                '####\n' +
                'Дослідити різні проблеми, які можна вирішити за допомогою Python. Розробляйте програмні рішення для простих задач.\n' +
                '####\n' +
                'Спробуйте зрозуміти код, просто читаючи його. Спробуйте згенерувати вивід коду в голові. Отримуйте розуміння того, як працює код, перш ніж запускати його на виконання. Ці практики допоможуть вам у вирішенні проблем та критичному мисленні.',
        },
        {
            titleEN: 'Acquire Knowledge of Python Libraries',
            titleUA: 'Ознайомитися з бібліотеками Python',
            bodyEN: 'Python has a lot of built-in libraries and methods to do things easily. Learning built-in library methods can be incredibly useful in development as it increases efficiency and reduces time to code.\n' +
                '####\n' +
                'You can get familiar with the important libraries and in-built methods in Python. You will learn more about these as you go in your programming journey.\n' +
                '####\n' +
                'Based on the role you have selected, you can master the libraries and frameworks necessary for that role. Learning a framework or library requires practice and patience. So give it some time, write code regularly, and eventually, you will master it.',
            bodyUA: 'Python має багато вбудованих бібліотек і методів, які дозволяють легко виконувати різні завдання. Вивчення методів вбудованих бібліотек може бути неймовірно корисним при розробці, оскільки це підвищує ефективність і скорочує час на написання коду.\n' +
                '####\n' +
                'Ви можете ознайомитися з важливими бібліотеками та вбудованими методами в Python. Ви дізнаєтесь більше про них по мірі того, як будете просуватися у своєму програмуванні.\n' +
                '####\n' +
                'Залежно від обраної ролі, ви можете освоїти бібліотеки та фреймворки, необхідні для цієї ролі. Вивчення фреймворку або бібліотеки вимагає практики і терпіння. Тому приділіть цьому трохи часу, регулярно пишіть код, і врешті-решт ви опануєте їх.',
        },
        {
            titleEN: 'Start Working on Projects',
            titleUA: 'Починаємо роботу над проектами',
            bodyEN: 'After you grasp the concepts of how to write a solution for a problem, you can extend this approach to real-life projects. Start working on projects that suit your level of expertise.\n' +
                '####\n' +
                'In the beginning, you can build projects following tutorials step-by-step. Once you become good at it, you can start giving life to your own creative ideas. If you don’t have any ideas for projects, you can choose an existing application and create a clone.\n' +
                '####\n' +
                'You can list the projects that you have done on your resume. These things will help recruiters understand your experience in Python.\n' +
                '\n',
            bodyUA: 'Після того, як ви засвоїте концепції написання рішення проблеми, ви можете поширити цей підхід на реальні проекти. Почніть працювати над проектами, які відповідають вашому рівню експертизи.\n' +
                '####\n' +
                'На початку ви можете створювати проекти, дотримуючись підручників крок за кроком. Як тільки у вас це добре вийде, ви можете почати втілювати в життя власні творчі ідеї. Якщо у вас немає ідей для проектів, ви можете вибрати вже існуючий додаток і створити його клон.\n' +
                '####\n' +
                'Ви можете перерахувати проекти, які ви робили, у своєму резюме. Ці речі допоможуть рекрутерам зрозуміти ваш досвід в Python.',
        },
        {
            titleEN: 'Create a Portfolio Containing All the Projects',
            titleUA: 'Створіть портфоліо з усіма проектами',
            bodyEN: 'Code a bunch of projects that are related to your area of interest. Create a portfolio for yourself, for example, a website or a PowerPoint presentation, or something that you can show to recruiters.\n' +
                '####\n' +
                'List all your projects and explain the details about the projects. They must understand your approach and the knowledge you have gained regarding the projects.\n',
            bodyUA: 'Зробіть кілька проектів, які пов\'язані з вашою сферою інтересів. Створіть для себе портфоліо, наприклад, сайт або презентацію в PowerPoint, або щось, що ви можете показати рекрутерам.\n' +
                '####\n' +
                'Перерахуйте всі свої проекти та поясніть деталі про них. Вони повинні зрозуміти ваш підхід і знання, які ви отримали щодо проектів.',
        },
        {
            titleEN: 'Learn to Use Git and GitHub',
            titleUA: 'Навчіться користуватися Git та GitHub',
            bodyEN: 'Upload your project code files onto open source repositories like GitHub and GitLab. You can use your GitHub or GitLab account as a place to showcase your programming skills to recruiters.\n' +
                '####\n' +
                'You can keep your code private or public. If you keep it public, other programmers who face similar issues or need to work on similar projects can view your code. This way, you can help other programmers also with the code you wrote.\n' +
                '####\n' +
                'Apart from uploading the code to these platforms, try learning version control using git. Having the knowledge of version control will be a great advantage for you. Find a tutorial or a course and add this skill to your arsenal.',
            bodyUA: 'Завантажуйте файли коду проекту в репозиторії з відкритим вихідним кодом, такі як GitHub та GitLab. Ви можете використовувати свій обліковий запис GitHub або GitLab як місце, щоб продемонструвати свої навички програмування рекрутерам.\n' +
                '####\n' +
                'Ви можете зробити свій код приватним або публічним. Якщо ви зробите його загальнодоступним, інші програмісти, які стикаються з подібними проблемами або потребують роботи над подібними проектами, зможуть переглянути ваш код. Таким чином, ви можете допомогти іншим програмістам також з кодом, який ви написали.\n' +
                '####\n' +
                'Окрім завантаження коду на ці платформи, спробуйте вивчити контроль версій за допомогою git. Знання контролю версій буде для вас великою перевагою. Знайдіть підручник або курс і додайте цю навичку до свого арсеналу.',
        },
        {
            titleEN: 'Read Other Programmers’ Code',
            titleUA: 'Читайте код інших програмістів',
            bodyEN: 'Now that you have some experience in Python coding, you might wonder what level of expertise you’re at currently. To know that, you could try to read other programmers’ code available in open source forums and understand their coding styles.\n' +
                '####\n' +
                'This way, you can understand the areas you lack knowledge of and improve your code. The more you expose to other people’s code, the more you will understand how to make your code more readable, memory efficient, and faster.',
            bodyUA: 'Тепер, коли ви маєте певний досвід у програмуванні на Python, вам може бути цікаво, на якому рівні ви зараз перебуваєте. Щоб дізнатися це, ви можете спробувати почитати код інших програмістів, доступний на форумах з відкритим вихідним кодом, і зрозуміти їх стилі кодування.\n' +
                '####\n' +
                'Таким чином, ви зможете зрозуміти області, в яких вам не вистачає знань, і покращити свій код. Чим більше ви будете знайомитися з чужим кодом, тим більше ви зрозумієте, як зробити свій код більш читабельним, ефективним для пам\'яті та швидшим.',
        },
        {
            titleEN: 'Try to Take Up Freelance Projects',
            titleUA: 'Намагайтеся братися за фріланс-проекти',
            bodyEN: 'All the above steps have prepared you to write Python code and solve problems. How would you put that knowledge to test in the real world? Take up freelance projects and start working for clients.\n' +
                '####\n' +
                'You must understand the client’s requirements, write code to solve their problems, alter code according to the client’s changes, and deployment and maintenance of the application. Freelancing will help hone these skills and gets you ready to apply for a full-time job in Python development.\n' +
                '####\n' +
                'Some recommended websites that you can apply for freelancing are Fiverr, Upwork, etc.\n' +
                '\n',
            bodyUA: 'Всі вищезазначені кроки підготували вас до написання коду на Python та розв\'язання задач. Як би ви перевірили ці знання в реальному світі? Візьміться за фріланс-проекти та почніть працювати для клієнтів.\n' +
                '####\n' +
                'Ви повинні розуміти вимоги клієнта, писати код для вирішення його проблем, змінювати код відповідно до змін клієнта, а також розгортати та підтримувати додаток. Фріланс допоможе відточити ці навички і підготує вас до подачі заявки на постійну роботу в сфері розробки на Python.\n' +
                '####\n' +
                'Серед рекомендованих сайтів, на яких можна подати заявку на фріланс - Fiverr, Upwork тощо.',
        },
        {
            titleEN: 'Follow a Daily Schedule for Coding Practice',
            titleUA: 'Дотримуйтесь щоденного розкладу для практики кодингу',
            bodyEN: 'Keep writing code consistently and improve your skills. This applies even after you land a job in Python development.\n' +
                '####\n' +
                'You can use various resources like competitive coding platforms (LeetCode, HackerRank, etc.) or create fun projects or games. Regular practice of Python will improve coding fluency and critical thinking.\n' +
                '####\n' +
                'You can check out [this article](https://pythonistaplanet.com/python-programming-exercises-and-solutions/) to find some basic exercises to increase your Python proficiency. \n',
            bodyUA: 'Продовжуйте послідовно писати код та вдосконалювати свої навички. Це стосується і після того, як ви отримаєте роботу в сфері розробки Python.\n' +
                '####\n' +
                'Ви можете використовувати різні ресурси, такі як конкурентні платформи для кодування (LeetCode, HackerRank тощо) або створювати цікаві проекти чи ігри. Регулярна практика Python покращить навички кодування та критичне мислення.\n' +
                '####\n' +
                'Ви можете ознайомитися з [цією статтею](https://pythonistaplanet.com/python-programming-exercises-and-solutions/), щоб знайти деякі базові вправи для підвищення рівня володіння мовою Python.',
        },
        {
            titleEN: 'Keep Your Resume and Profile Updated on Job Portals',
            titleUA: 'Підтримуйте актуальність резюме та профілю на порталах з працевлаштування',
            bodyEN: 'After your reach a new milestone in your Python journey, update the same in your resume. I recommend you upload your resume to various job portals and keep your profile updated with all of your relevant projects.\n' +
                '####\n' +
                'Also, make sure you have a great LinkedIn profile with all relevant information.\n' +
                '####\n' +
                'Keep applying for jobs. You don’t know what you don’t know. So don’t be ignorant. Do some research, and I’m sure you will find plenty of job opportunities if you are a skilled developer.\n' +
                '\n',
            bodyUA: 'Після того, як ви досягли нової віхи у вашій Python подорожі, оновлюйте інформацію у своєму резюме. Я рекомендую вам завантажити своє резюме на різні портали з працевлаштування та підтримувати свій профіль в актуальному стані з усіма вашими відповідними проектами.\n' +
                '####\n' +
                'Також переконайтеся, що у вас є чудовий профіль у LinkedIn з усією необхідною інформацією.\n' +
                '####\n' +
                'Продовжуйте подавати заявки на роботу. Ви не знаєте того, чого не знаєте. Тож не будьте невігласами. Проведіть деякі дослідження, і я впевнений, що ви знайдете багато можливостей для працевлаштування, якщо ви кваліфікований розробник.',
        },
    ],
};

const cPlusPlusPlan = {
    id: categoriesId[CPLUSPLUS],
    nameEN: 'C++ step-by-step plan',
    nameUA: 'C++ покроковий план',
    items: [
        {
            titleEN: 'Introduction to C++ Programming',
            titleUA: 'Вступ до програмування на С++',
            bodyEN: 'Needless to say, you’re required to start learning C++ programming language with the introduction and fundamentals of the language. You need to understand the features of the C++ language, and what are its applications. Furthermore, you’re required to know how to set up an environment to compile & run your C++ program. You can create your first C++ program as well for more clarification of the fundamentals. Meanwhile, you can explore several other related topics such as the difference b/w C & C++, C++ vs JAVA, etc.\n' +
                '####\n' +
                '- [Introduction to C++ Programming Language](https://www.geeksforgeeks.org/introduction-to-c-programming-language/)\n' +
                '- [Setting up C++ Development Environment](https://www.geeksforgeeks.org/setting-c-development-environment/)\n' +
                '- [C vs C++](https://www.geeksforgeeks.org/c-plus-plus/#C%20vs%20C++)\n' +
                '- [C++ vs JAVA](https://www.geeksforgeeks.org/c-plus-plus/#C++vsJava)\n' +
                '- [First C++ Program: Hello World](https://www.geeksforgeeks.org/writing-first-c-program-hello-world-example/)\n',
            bodyUA: 'Зрозуміло, що починати вивчення мови програмування С++ потрібно зі знайомства з нею та її основами. Ви повинні розуміти особливості мови С++ та сфери її застосування. Крім того, ви повинні знати, як налаштувати середовище для компіляції та запуску програми на С++. Ви також можете створити свою першу програму на C++ для кращого розуміння основ. Крім того, ви можете вивчити кілька інших суміжних тем, таких як різниця між C та C++, C++ та JAVA тощо.\n' +
                '####\n' +
                '- [Вступ до мови програмування C++](https://www.geeksforgeeks.org/introduction-to-c-programming-language/)\n' +
                '- [Налаштування середовища розробки на C++](https://www.geeksforgeeks.org/setting-c-development-environment/)\n' +
                '- [C vs C++](https://www.geeksforgeeks.org/c-plus-plus/#C%20vs%20C++)\n' +
                '- [C++ vs JAVA](https://www.geeksforgeeks.org/c-plus-plus/#C++vsJava)\n' +
                '- [Перша програма на С++: Hello World](https://www.geeksforgeeks.org/writing-first-c-program-hello-world-example/)',
        },
        {
            titleEN: 'Learn DataTypes, Variables & Operators',
            titleUA: 'Вивчення типів даних, змінних та операторів',
            bodyEN: 'Now you need to know about the building blocks of C++ programming – **DataTypes, Variables & Operators**. You need to get a thorough understanding of data types and how they are used, what are variables, how they are declared and initialized, the use of operators in C++, etc. It will help you to get familiar with the basic structure and syntax of C++ programming. There are several other topics also to be considered here such as *Reference Variables, Operator Overloading, Optional Parameters*, and others.\n' +
                '####\n' +
                '- [Data Types](https://www.geeksforgeeks.org/c-data-types/) | [Variables in C++](https://www.geeksforgeeks.org/variables-in-c/)\n' +
                '- [Operators in C++](https://www.geeksforgeeks.org/operators-c-c/)\n' +
                '- [Reference Variable in C++](https://www.geeksforgeeks.org/references-in-c/)\n' +
                '- [Operator Overloading in C++](https://www.geeksforgeeks.org/operator-overloading-c/)\n' +
                '- [Default Arguments in C++](https://www.geeksforgeeks.org/default-arguments-c/)\n' +
                '\n',
            bodyUA: 'Тепер Вам необхідно знати про структурні елементи програмування мовою С++ - **Типи даних, змінні та оператори**. Ви повинні отримати ґрунтовне уявлення про типи даних та способи їх використання, що таке змінні, як вони оголошуються та ініціалізуються, використання операторів у мові С++ тощо. Це допоможе Вам ознайомитися з базовою структурою та синтаксисом програмування мовою С++. Тут також розглядається ряд інших тем, таких як *змінні-посилання, перевантаження операторів, необов\'язкові параметри* та інші.\n' +
                '####\n' +
                '- [Типи даних](https://www.geeksforgeeks.org/c-data-types/) | [Змінні в C++](https://www.geeksforgeeks.org/variables-in-c/)\n' +
                '- [Оператори в C++](https://www.geeksforgeeks.org/operators-c-c/)\n' +
                '- [Змінна-посилання в C++](https://www.geeksforgeeks.org/references-in-c/)\n' +
                '- [Перевантаження операторів в C++](https://www.geeksforgeeks.org/operator-overloading-c/)\n' +
                '- [Аргументи за замовчуванням в C++](https://www.geeksforgeeks.org/default-arguments-c/)',
        },
        {
            titleEN: 'Learn Conditional & Control Statements',
            titleUA: 'Вивчення умовних операторів та операторів керування',
            bodyEN: 'Okay, now move to the control flow statements of the C++ programming language. Precisely, control flow statements concerned with the concepts like repeated execution of a block of statements – **Loops**, execution of code based on decision – **Decision-Making Statements**, etc. You need to cover these concepts thoroughly such as all types of loops like *For Loop, While Loop, Do While loop*, etc. and similarly all decision-making statements like if, if..else, nested if, etc. There are several other topics as well that concern with the control flow statements in C++ programming such as *Jump Statements, Switch Statements*, etc.\n' +
                '####\n' +
                '- [Loops in C++](https://www.geeksforgeeks.org/loops-in-c-and-cpp/)\n' +
                '- [Decision Making in C++](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/)\n' +
                '- [Switch Statements in C++](https://www.geeksforgeeks.org/switch-statement-cc/)\n' +
                '- [Continue Statement](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/#cont) | [Break Statement](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/#brk)\n' +
                '- [Execute both if and else statements in C++](https://www.geeksforgeeks.org/execute-else-statements-cc-simultaneously/)\n' +
                '\n',
            bodyUA: 'Гаразд, тепер перейдемо до операторів потоку управління мовою програмування С++. Саме з операторами потоку управління пов\'язані такі поняття, як повторне виконання блоку операторів - **Loops**, виконання коду на основі рішення - **Decision-Making Statements** тощо. Ви повинні ретельно вивчити ці поняття, такі як всі типи циклів, такі як *For Loop, While Loop, Do While loop* і т.д., а також всі оператори прийняття рішень, такі як if, if...else, вкладені if і т.д. Існує також ряд інших тем, які стосуються операторів потоку управління в програмуванні на C++, таких як *оператори переходу, оператори перемикання* і т.д.\n' +
                '####\n' +
                '- [Цикли в C++](https://www.geeksforgeeks.org/loops-in-c-and-cpp/)\n' +
                '- [Прийняття рішень в C++](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/)\n' +
                '- [Оператори переходу в C++](https://www.geeksforgeeks.org/switch-statement-cc/)\n' +
                '- [Оператор продовження](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/#cont) | [Оператор переривання](https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/#brk)\n' +
                '- [Виконання операторів if та else в C++](https://www.geeksforgeeks.org/execute-else-statements-cc-simultaneously/)',
        },
        {
            titleEN: 'Understand Arrays, Strings & Pointers in C++',
            titleUA: 'Розуміння масивів, рядків та вказівників у C++',
            bodyEN: 'Once you’ll get done with the datatypes, variables, and other topics, now you’re required to **understand the Arrays & Strings concepts** in C++. An Array in C++ is used to store similar types of elements and Strings are used to store text or sequence of characters. Moreover, you need to learn about Pointers as well that is used for storing the address of another variable. Also, there are several other crucial topics such as *Namespaces, Wild Pointers* in C++, etc. that can be considered.\n' +
                '####\n' +
                '- [Arrays](https://www.geeksforgeeks.org/arrays-in-c-cpp/) | [Strings in C++](https://www.geeksforgeeks.org/strings-in-c-and-how-to-create-them/)\n' +
                '- [Pointers in C++](https://www.geeksforgeeks.org/pointers-c-examples/)\n' +
                '- [Pointers vs References in C++](https://www.geeksforgeeks.org/pointers-vs-references-cpp/)\n' +
                '- [Namespaces in C++](https://www.geeksforgeeks.org/namespace-in-c/)\n' +
                '- [Wild Pointers in C++](https://www.geeksforgeeks.org/what-are-wild-pointers-how-can-we-avoid/?ref=lbp)\n' +
                '\n',
            bodyUA: 'Після того, як ви закінчите з типами даних, змінними та іншими темами, тепер вам потрібно **зрозуміти концепції масивів та рядків** в C++. Масиви в C++ використовуються для зберігання однотипних елементів, а рядки - для зберігання тексту або послідовності символів. Крім того, необхідно ознайомитись з вказівниками, які використовуються для зберігання адреси іншої змінної. Крім того, можна розглянути ще декілька важливих тем, таких як *Простори імен, Дикі вказівники* в мові C++ тощо.\n' +
                '####\n' +
                '- [Масиви](https://www.geeksforgeeks.org/arrays-in-c-cpp/) | [Рядки в C++](https://www.geeksforgeeks.org/strings-in-c-and-how-to-create-them/)\n' +
                '- [Покажчики в C++](https://www.geeksforgeeks.org/pointers-c-examples/)\n' +
                '- [Покажчики vs посилання в C++](https://www.geeksforgeeks.org/pointers-vs-references-cpp/)\n' +
                '- [Простори імен в C++](https://www.geeksforgeeks.org/namespace-in-c/)\n' +
                '- [Дикі покажчики в C++](https://www.geeksforgeeks.org/what-are-wild-pointers-how-can-we-avoid/?ref=lbp)',
        },
        {
            titleEN: 'Go Through Functions & OOPs Concepts',
            titleUA: 'Перейдіть до функцій та концепцій ООП',
            bodyEN: 'Now, it comes the most crucial part of the C++ programming journey: **Functions & OOPS Concepts** in C++. You need to know about the Functions in C++ which is a set of statements that is created to perform specific tasks. You have to learn about *function declaration, function overloading*, and other topics that concern with functions in C++. Meanwhile, you’re required to understand the Object-Oriented programming nature of C++ in-depth with various concepts such as *Class, Objects, Inheritance, Polymorphism, Abstraction*, and *Encapsulation*, etc.\n' +
                '####\n' +
                '- [Functions in C++](https://www.geeksforgeeks.org/functions-in-c/)\n' +
                '- [Function Overloading in C++](https://www.geeksforgeeks.org/function-overloading-c/)\n' +
                '- [C++ Classes and Objects](https://www.geeksforgeeks.org/c-classes-and-objects/)\n' +
                '- [Object-Oriented Programming in C++](https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/)\n' +
                '- [Constructors in C++](https://www.geeksforgeeks.org/constructors-c/)\n',
            bodyUA: 'Тепер настає найвідповідальніша частина подорожі програмування на C++: **Функції та OOPS** в C++. Ви повинні знати про функції в C++, які являють собою набір операторів, створених для виконання певних завдань. Ви дізнаєтесь про *оголошення функцій, перевантаження функцій* та інші теми, які стосуються функцій в C++. Крім того, ви повинні глибоко зрозуміти об\'єктно-орієнтовану природу програмування в C++ з різними поняттями, такими як *класи, об\'єкти, успадкування, поліморфізм, абстракція* та *інкапсуляція* тощо.\n' +
                '####\n' +
                '- [Функції в мові C++](https://www.geeksforgeeks.org/functions-in-c/)\n' +
                '- [Перевантаження функцій в C++](https://www.geeksforgeeks.org/function-overloading-c/)\n' +
                '- [Класи та об\'єкти C++](https://www.geeksforgeeks.org/c-classes-and-objects/)\n' +
                '- [Об\'єктно-орієнтоване програмування в C++](https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/)\n' +
                '- [Конструктори в C++](https://www.geeksforgeeks.org/constructors-c/)',
        },
        {
            titleEN: 'Learn I/O Streams, Dynamic Memory, & STL',
            titleUA: 'Вивчення потоків вводу/виводу, динамічної пам\'яті та STL',
            bodyEN: 'Okay, let’s dive deeper into the world of C programming. Now, you’re required to understand several underlying concepts such as **I/O Streams & File Handling in C++, Dynamic memory allocation in C/C++**, etc. You’re also required to look upon **Standard Template Library (STL)** in C++ which a renowned feature of the language. In general, STL in C++ is a set of C++ template classes that provide general programming data structures and functions like *stacks, arrays*, etc. Moreover, you must have the knowledge of template classes to work on STL in C++.\n' +
                '####\n' +
                '- [Files and Streams in C++](https://www.geeksforgeeks.org/file-handling-c-classes/)\n' +
                '- [Dynamic Memory Allocation in C++](https://www.geeksforgeeks.org/new-and-delete-operators-in-cpp-for-dynamic-memory/)\n' +
                '- [malloc() vs new in C++](https://www.geeksforgeeks.org/malloc-vs-new/)\n' +
                '- [Templates in C++](https://www.geeksforgeeks.org/templates-cpp/)\n' +
                '- [C++ Standard Template Library (STL)](https://www.geeksforgeeks.org/the-c-standard-template-library-stl/)\n',
            bodyUA: 'Гаразд, давайте зануримося глибше у світ програмування на мові С. Тепер вам потрібно зрозуміти декілька основних понять, таких як **Потоки вводу/виводу та робота з файлами в C++, Динамічне виділення пам\'яті в C/C++**, і т.д. Ви також повинні розглянути **Стандартну бібліотеку шаблонів (STL)** в C++, яка є відомою особливістю мови. Загалом, STL в C++ - це набір шаблонних класів C++, які забезпечують загальні структури даних та функції програмування, такі як *стеки, масиви* тощо. При цьому для роботи над STL в C++ необхідно мати знання шаблонних класів.\n' +
                '####\n' +
                '- [Файли та потоки в C++](https://www.geeksforgeeks.org/file-handling-c-classes/)\n' +
                '- [Динамічне виділення пам\'яті в C++](https://www.geeksforgeeks.org/new-and-delete-operators-in-cpp-for-dynamic-memory/)\n' +
                '- [malloc() vs new в C++](https://www.geeksforgeeks.org/malloc-vs-new/)\n' +
                '- [Шаблони в C++](https://www.geeksforgeeks.org/templates-cpp/)\n' +
                '- [Стандартна бібліотека шаблонів C++ (STL)](https://www.geeksforgeeks.org/the-c-standard-template-library-stl/)',
        },
        {
            titleEN: 'Understand Exception Handling, Signal Handling & Multithreading',
            titleUA: 'Розуміння обробки виключень, обробки сигналів та багатопотоковості',
            bodyEN: 'Furthermore, you’re required to fetch up the things with some more advanced topics like **Exception Handling, Signal Handling, Multithreading in C++**, etc. In short, Exception Handlings tends to deal with the code that can throw an exception or error and Signal Handling concerns with the Signals which force an OS to stop its in-progress task and address the task for which the interrupt has been sent. Moreover, you’re required to use **POSIX Threads** for multithreading in C++.\n' +
                '####\n' +
                '- [Exception Handling in C++](https://www.geeksforgeeks.org/exception-handling-c/)\n' +
                '- [Signal Handling in C++](https://www.geeksforgeeks.org/c-signal-handling/)\n' +
                '- [Stack Unwinding](https://www.geeksforgeeks.org/stack-unwinding-in-c/)\n' +
                '- [Multithreading in C++](https://www.geeksforgeeks.org/multithreading-in-cpp/)\n' +
                '- [POSIX Threads](https://www.geeksforgeeks.org/multithreading-c-2/)\n',
            bodyUA: 'Крім того, від вас вимагається ознайомитися з більш складними темами, такими як **Обробка винятків, Обробка сигналів, Багатопоточність в C++** тощо. Коротше кажучи, обробка виключень, як правило, має справу з кодом, який може згенерувати виняток або помилку, а обробка сигналів стосується сигналів, які змушують ОС зупинити виконувану задачу та звернутися до задачі, для якої було надіслано переривання. Крім того, ви повинні використовувати **POSIX Threads** для багатопотоковості в C++.\n' +
                '####\n' +
                '- [Обробка виключень в C++](https://www.geeksforgeeks.org/exception-handling-c/)\n' +
                '- [Обробка сигналів у C++](https://www.geeksforgeeks.org/c-signal-handling/)\n' +
                '- [Розмотування стеку](https://www.geeksforgeeks.org/stack-unwinding-in-c/)\n' +
                '- [Багатопоточність в C++](https://www.geeksforgeeks.org/multithreading-in-cpp/)\n' +
                '- [Потоки POSIX](https://www.geeksforgeeks.org/multithreading-c-2/)',
        },
    ],
};

const javaPlan = {
    id: categoriesId[JAVA],
    nameEN: 'Java step-by-step plan',
    nameUA: 'Java покроковий план',
    items: [
        {
            titleEN: 'Learn Core Java (Java SE)',
            titleUA: 'Вивчення Core Java (Java SE)',
            bodyEN: 'Learning how to become a Java developer begins with learning how to code with Java SE. Knowing Java SE is an absolute requirement, but you can start by familiarising yourself with its basic terminology and features. Understand primary SE concepts like arrays, operators, loops and object-oriented program systems. Have basic knowledge of Java SE\'s general-purpose APIs, like java.lang, java.math and java.io.\n' +
                '####\n' +
                'A good way to learn Core Java is to explore Java\'s free variant and consider free online tutorials that explain basic Java coding concepts. These tutorials often cover topics like how to create a graphical user interface and deploy applications using Java Web Start and Java Plug-in. After learning Core Java, consider exploring Java EE or Advanced Java, which has added features you can employ for online and mobile applications. These applications include Java Server Faces, Servlet and WebSocket for web specifications.\n' +
                '\n',
            bodyUA: 'Навчання тому, як стати Java розробником, починається з навчання програмуванню на Java SE. Знання Java SE є абсолютною вимогою, але ви можете почати з ознайомлення з її базовою термінологією та можливостями. Розуміти основні концепції SE, такі як масиви, оператори, цикли та об\'єктно-орієнтовані програмні системи. Мати базові знання про API загального призначення Java SE, такі як java.lang, java.math та java.io.\n' +
                '####\n' +
                'Хороший спосіб вивчити основну мову Java - це дослідити безкоштовний варіант Java та розглянути безкоштовні онлайн-уроки, які пояснюють основні концепції кодування Java. Ці підручники часто охоплюють такі теми, як створення графічного інтерфейсу користувача та розгортання додатків за допомогою Java Web Start та Java Plug-in. Після вивчення Core Java, розгляньте можливість вивчення Java EE або Advanced Java, які мають додаткові функції, які ви можете використовувати для онлайн та мобільних додатків. Ці додатки включають Java Server Faces, Servlet та WebSocket для веб-специфікацій.',
        },
        {
            titleEN: 'Enrol in a back-end development programme',
            titleUA: 'Записатися на курс розробки backend',
            bodyEN: 'Learning Java programming without help may not be effective for you. There are many terms and features to explore, which can get overwhelming. Online courses and coding boot camps are excellent options to consider. They can provide significant guidance in studying key concepts and knowledge that may help you to become a Java developer. Coding boot camps are less expensive and much faster than a traditional four-year university degree. Many boot camps are free or offer deferred tuition options that can run for several days or months.\n' +
                '####\n' +
                'Online courses are also a great option. Most of them teach you all the basics, including how to write code using Java and the importance of every basic concept. Some courses are free and only require payment when issuing and shipping a physical certificate. Other courses may require payment to enrol and offer more personal tutorial sessions with the instructor. You can find these courses on any online learning platform.\n' +
                '\n',
            bodyUA: 'Вивчення програмування на Java без сторонньої допомоги може виявитися для вас неефективним. Існує багато термінів і функцій, які потрібно вивчити, що може стати непосильною задачею. Онлайн-курси та навчальні табори з кодування - відмінні варіанти для розгляду. Вони можуть надати значну допомогу у вивченні ключових концепцій та знань, які можуть допомогти Вам стати Java розробником. Курси кодування коштують дешевше і набагато швидше, ніж традиційне чотирирічне навчання в університеті. Багато таборів є безкоштовними або пропонують варіанти відкладеного навчання, які можуть тривати кілька днів або місяців.\n' +
                '####\n' +
                'Онлайн-курси також є чудовим варіантом. Більшість з них навчають всім основам, включаючи написання коду за допомогою Java і важливість кожної базової концепції. Деякі курси є безкоштовними і вимагають оплати лише при видачі та доставці фізичного сертифікату. Інші курси можуть вимагати оплати за реєстрацію та пропонувати більше персональних занять з інструктором. Ви можете знайти ці курси на будь-якій платформі онлайн-навчання.',
        },
        {
            titleEN: 'Build your portfolio with your own Java projects',
            titleUA: 'Створюйте своє портфоліо з власними Java-проектами',
            bodyEN: 'Becoming a Java developer requires a lot of practice. After learning the fundamentals of Java, constantly practise your newly developed skills and turn your knowledge into practical experience. Practising your skills helps you build a portfolio that can help you secure a position as a Java developer. Your portfolio introduces your potential employer to your background, skills and experience as a Java developer, showing them a collection of one to three projects you\'ve created.\n' +
                '####\n' +
                'Experiment by building mobile, desktop or web applications. Find some real-world projects that allow you to implement every topic you learn. A few examples of projects you can try developing include a currency converter, an ATM interface, a web server management system, a data visualisation software or a smart city project. These projects may not necessarily be sophisticated or perfect, as they\'re simply a way to show that you can develop various applications and projects with Java.',
            bodyUA: 'Становлення Java розробника вимагає багато практики. Після вивчення основ Java, постійно практикуйте набуті навички і перетворюйте знання на практичний досвід. Практика допомагає Вам створити портфоліо, яке може допомогти Вам отримати посаду Java розробника. Портфоліо знайомить потенційного роботодавця з Вашими знаннями, навичками і досвідом роботи на посаді Java розробника, демонструючи йому колекцію з одного-трьох створених Вами проектів.\n' +
                '####\n' +
                'Експериментуйте, створюючи мобільні, настільні або веб-додатки. Знайдіть кілька реальних проектів, які дозволять вам реалізувати кожну тему, яку ви вивчаєте. Кілька прикладів проектів, які ви можете спробувати розробити, включають конвертер валют, інтерфейс банкомату, систему управління веб-сервером, програмне забезпечення для візуалізації даних або проект "розумного міста". Ці проекти не обов\'язково повинні бути складними або досконалими, оскільки вони просто показують, що ви можете розробляти різні програми та проекти за допомогою Java.',
        },
        {
            titleEN: 'Join a Java community',
            titleUA: 'Приєднуйтесь до спільноти розробників Java',
            bodyEN: 'In-person and online Java forums offer learning opportunities and help you network and solve different problems. Online communities include blogs and open-source platforms, which have become a meeting place for developers to share and improve codes. In-person events, like conferences and meetups, can ease career development, help you learn with your peers and allow you to build close career networks. These communities help coding professionals in learning new skills regardless of their knowledge or experience by joining educative conversations.\n' +
                '####\n' +
                'As a Java developer, you can become a part of these communities by signing up on these forums, sharing your broad ideas and knowledge and teaching others the skills you\'ve learnt. The best way to make the most of these platforms is by contributing often and building a reputation among community members. Developers in small groups can schedule regular meetups with clear agendas. Attend these meetings and physical conferences. They allow you to build personal relationships with other coding professionals.\n',
            bodyUA: 'Очні та онлайн-форуми з Java пропонують можливості для навчання, допомагають налагоджувати зв\'язки та вирішувати різні проблеми. Онлайн-спільноти включають блоги і платформи з відкритим вихідним кодом, які стали місцем зустрічі розробників для обміну і поліпшення кодів. Особисті заходи, такі як конференції та мітапи, можуть полегшити розвиток кар\'єри, допомогти вам вчитися зі своїми колегами і дозволити вам побудувати тісні кар\'єрні мережі. Ці спільноти допомагають фахівцям з кодування освоювати нові навички незалежно від їх знань і досвіду, приєднуючись до освітніх бесід.\n' +
                '####\n' +
                'Як розробник Java, ви можете стати частиною цих спільнот, зареєструвавшись на цих форумах, ділитися своїми ідеями та знаннями, а також навчати інших навичкам, яких ви набули. Найкращий спосіб отримати максимальну користь від цих платформ - це часто робити внесок та будувати репутацію серед членів спільноти. Розробники в малих групах можуть планувати регулярні зустрічі з чітким порядком денним. Відвідуйте ці зустрічі та фізичні конференції. Вони дозволяють побудувати особисті відносини з іншими професіоналами в області кодування.',
        },
        {
            titleEN: 'Learn Hibernate and Spring Frameworks',
            titleUA: 'Вчіть фреймворки Hibernate та Spring',
            bodyEN: 'After completing both Java SE and Java EE, the basics in Java, you make your level of expertise outstanding by learning Java Frameworks like the Hibernate Framework and Spring Framework. Most Java development organisations use Spring Frameworks like Spring MVC, Spring Boot and Spring Cloud for developing web applications. Developers also use the Hibernate Query Language and Hibernate Framework for mapping domain object-oriented models to a relational database.\n' +
                '####\n' +
                'Knowing these frameworks requires investing more resources in advanced Java courses available on various online learning platforms or a university degree. These courses teach you the core concepts of Hibernate. When you know how to create projects on these platforms, you may have more opportunities for a company to select you as its Java developer.\n' +
                '\n',
            bodyUA: 'Після завершення вивчення Java SE та Java EE, основ Java, ви підвищуєте свій рівень знань, вивчаючи фреймворки Java, такі як Hibernate Framework та Spring Framework. Більшість організацій, що займаються розробкою Java, використовують Spring Frameworks, такі як Spring MVC, Spring Boot та Spring Cloud для розробки веб-додатків. Розробники також використовують Hibernate Query Language та Hibernate Framework для відображення об\'єктно-орієнтованих моделей домену в реляційну базу даних.\n' +
                '####\n' +
                'Знання цих фреймворків вимагає інвестування більших ресурсів у просунуті курси Java, доступні на різних платформах онлайн-навчання, або отримання університетського ступеня. Ці курси навчають вас основним концепціям Hibernate. Коли ви знаєте, як створювати проекти на цих платформах, у вас може бути більше можливостей для того, щоб компанія вибрала вас в якості свого Java-розробника.',
        },
        {
            titleEN: 'Intern as a Java developer',
            titleUA: 'Стажер в якості Java розробника',
            bodyEN: 'An internship is an easy way to gain valuable experience as a Java developer while you\'re advancing your training to become one. It introduces you to various practical aspects of being a full-time professional Java developer. It also helps you set personal career goals and provide relevant details to boost your CV. Internships can help you establish a valuable mentorship relationship with professionals who can help guide your career as a Java developer.\n' +
                '####\n' +
                'To benefit from your internship programme, try to introduce yourself to everyone in your department and build rapport with your supervisors and other employees. Know what your supervisor expects from you and make plans to meet these expectations. Request feedback from your supervisor and discuss your interest with them to see if they can provide opportunities for your ideas. Also, be willing to volunteer and eager to learn, proving your passion and dedication to your career.\n' +
                '\n',
            bodyUA: 'Стажування - це простий спосіб отримати цінний досвід роботи Java розробником під час навчання. Вона ознайомлює Вас з різними практичними аспектами роботи професійного Java розробника, що працює повний робочий день. Це також допоможе Вам поставити особисті кар\'єрні цілі та надати відповідні деталі для покращення Вашого резюме. Стажування допоможе Вам встановити цінні наставницькі стосунки з професіоналами, які можуть допомогти Вам у розвитку Вашої кар\'єри Java розробника.\n' +
                '####\n' +
                'Для того, щоб отримати максимальну користь від програми стажування, постарайтеся представитися кожному у своєму відділі та побудувати взаєморозуміння зі своїми керівниками та іншими співробітниками. Дізнайтеся, чого очікує від вас ваш керівник, та сплануйте, як виправдати його очікування. Запитуйте зворотній зв\'язок від свого керівника та обговорюйте з ним свої інтереси, щоб дізнатися, чи може він надати можливості для реалізації Ваших ідей. Крім того, будьте готові до волонтерської діяльності та прагніть вчитися, доводячи свою пристрасть та відданість своїй кар\'єрі.',
        },
        {
            titleEN: 'Build your CV and apply to become a Java developer\n',
            titleUA: 'Склади резюме та подай заявку на посаду Java розробника',
            bodyEN: 'After mastering Java and building a portfolio as a developer, you can create a CV and start applying for jobs. Include your Java development skills in your CV. These skills include knowledge in object-oriented programming (OOP), SQL, JVM internals, web technology, Java testing tools, web frameworks, system design and OOP concepts. You can also mention soft skills like teamwork, communication, problem-solving, adaptability, creativity, organisation and time management.\n' +
                '####\n' +
                'Ensure to include work experience if you have any. Support your accomplishments with facts and numbers and create a compelling professional summary. Include keywords mentioned in the job description of the position you\'re applying for. Also, research the company to help customise your CV to suit its needs and expectations. Some common Java developer-related keywords include JavaScript, database, user interface design, JQuery and web development.\n' +
                '\n',
            bodyUA: 'Після освоєння Java і створення портфоліо як розробника, ви можете створити резюме і почати подавати заявки на роботу. Включіть в резюме свої навички розробки на Java. Ці навички включають знання об\'єктно-орієнтованого програмування (ООП), SQL, внутрішньої структури JVM, веб-технологій, інструментів тестування Java, веб-фреймворків, системного проектування та концепцій ООП. Ви також можете згадати такі м\'які навички, як робота в команді, комунікація, вирішення проблем, адаптивність, креативність, організованість та управління часом.\n' +
                '####\n' +
                'Обов\'язково вкажіть досвід роботи, якщо він у вас є. Підкріпіть свої досягнення фактами і цифрами та створіть переконливе професійне резюме. Включіть ключові слова, згадані в описі посади, на яку ви претендуєте. Крім того, вивчіть компанію, щоб допомогти налаштувати своє резюме відповідно до її потреб та очікувань. Деякі поширені ключові слова, пов\'язані з розробкою Java, включають JavaScript, базу даних, дизайн інтерфейсу користувача, JQuery та веб-розробку.',
        },
    ],
};

const cSharpPlan = {
    id: categoriesId[CSHARP],
    nameEN: 'C# step-by-step plan',
    nameUA: 'C# покроковий план',
    items: [
        {
            titleEN: 'How Long Does it Take to Learn C#?',
            titleUA: 'Скільки часу потрібно для вивчення C#?',
            bodyEN: 'It will take you about two to three months to learn the basics of C#, assuming you devote an hour or so a day to learning. You may learn C# quicker if you study part-time or full-time.\n' +
                '####\n' +
                'But, don’t let this figure mislead you. If you want to become a professional developer who codes in C#, you’ll need to spend a lot more time with the language. It typically takes at least a year to develop a firm understanding of C# that will get you far in a professional setting.\n' +
                '####\n' +
                'Your learning journey will never be over. There will always be something new for you to learn. But, after a few months, you should have the knowledge you need to build some powerful applications by yourself.\n' +
                '####\n' +
                '***The Best Way to Learn C#***\n' +
                '####\n' +
                'So, you’re thinking to yourself: “Learning C# sounds like a good idea.” That’s great. But now you will likely be asking: “How do you actually learn to code in C#?”\n' +
                '####\n' +
                'To help you answer this question, we’re going to break it down into two parts. First, we’ll discuss the high-level skills that you need to master. Then, we will talk about learning methods.\n' +
                '####\n' +
                '***How to Learn C# Free***\n' +
                '####\n' +
                'C# is a powerful language and there’s no doubt it has a lot of uses. But before you go on to building complex video games or websites, you’ll need to master the basics of coding in C#.\n' +
                '####\n' +
                'Once you’ve learned the basics, you’ll have a solid foundation of knowledge you can later use to explore more advanced topics. When you know the basic syntax for C#, you’ll never need to learn it again.\n' +
                '####\n' +
                'Let’s explore the main topics that you need to learn about to master C#.\n' +
                '####\n' +
                '***Syntax and Variables***\n' +
                '####\n' +
                'Syntax is the basic set of rules and procedures that guide how you code. Before you go on further, you’ll need to master the syntax for C#.\n' +
                '####\n' +
                'The next step in your journey will be to learn about variables. These are used to store data in a program. Here are the main topics related to syntax and variables that you’ll need to learn:\n' +
                '####\n' +
                '- How to create a C# program\n' +
                '- How to receive user input\n' +
                '- How to write comments\n' +
                '- How to declare a variable\n' +
                '- What data types can be used with variables\n' +
                '- How to convert the data type used by a variable\n' +
                '####\n' +
                '***Loops and Conditionals***\n' +
                '####\n' +
                'Loops allow you to automate repetitive tasks in a program. They are useful because they allow you to reuse similar code multiple times instead of repeating code manually in your program.\n' +
                '####\n' +
                'Conditionals allow you to control the flow of your program. They run certain code when a set of conditions is met in your program. This gives you greater control over when certain parts of a program are run.\n' +
                '####\n' +
                'The main topics you should explore related to loops and conditionals are:\n' +
                '####\n' +
                '- If and else statements\n' +
                '- Comparison operators\n' +
                '- Boolean data type\n' +
                '- Logical operators\n' +
                '- Truth tables\n' +
                '- For loops and the for each statement\n' +
                '####\n' +
                '***Methods and Arrays***\n' +
                '####\n' +
                'A method is a type of function that groups together a block of code and performs a specific action in a program. For instance, a method could add two numbers together or go through a list and print each item to the console. Methods are the building blocks of code in C#.\n' +
                '####\n' +
                'An array is a method of storing lists of data in C#. For instance, an array could store data on a list of fruits sold at a fruit stand.\n' +
                '####\n' +
                'Here are the main topics related to methods and arrays that you should master:\n' +
                '####\n' +
                '- How to define a method\n' +
                '- How to call a method\n' +
                '- Method parameters\n' +
                '- Parameters vs. arguments\n' +
                '- Method overloading\n' +
                '- What is an array\n' +
                '- How to access items in an array\n' +
                '- How to change items in an array\n' +
                '####\n' +
                '***Classes and Objects***\n' +
                '####\n' +
                'C# is an object-oriented programming language and it relies on classes and objects to determine the structure of data in a program.\n' +
                '####\n' +
                'Classes are like blueprints that define how a set of data should be structured. For instance, a class may define all the data that a user’s account can store in a banking application. Objects, on the other hand, are individual instances of a class. So an object may contain the account information for a specific customer based on the bank account class blueprint.\n' +
                '####\n' +
                'The main topics you should know about related to classes and objects are:\n' +
                '####\n' +
                '- What is a class\n' +
                '- What is an object\n' +
                '- Fields and properties\n' +
                '- Public vs. private access modifiers\n' +
                '- Constructors\n' +
                '- this keyword\n' +
                '- Overloading constructors\n' +
                '- The dot notation\n' +
                '####\n' +
                '***Inheritance and Interfaces***\n' +
                '####\n' +
                'Inheritance is a feature of object-oriented programming that allows you to create a class based on existing ones. Interfaces allow you to enforce certain properties on a class.\n' +
                '####\n' +
                'Both these features can help you reduce repetition in your code and write more efficient and readable programs. The main topics you should master are:\n' +
                '####\n' +
                '- What is an interface\n' +
                '- How to build an interface\n' +
                '- How to test an interface\n' +
                '- Parent and child classes\n' +
                '- How to create a parent class\n' +
                '- The inherited keyword\n' +
                '- Accessing inherited members using base\n' +
                '- Overriding inherited members of a class\n' +
                '####\n' +
                'Once you’ve mastered these basic topics, you’ll be ready to take the next step in your journey: building projects. Ideally, you’ll want to start building projects as soon as you can, even as you are learning these concepts. This will help you reinforce your knowledge and practice the theory that you have learned in class.\n' +
                '####\n' +
                'In addition, once you’ve learned the basics, you can go on to learn frameworks like .Net or explore the Unity game engine.\n' +
                '####\n' +
                '\n',
            bodyUA: 'Вам знадобиться приблизно два-три місяці, щоб вивчити основи C#, за умови, що ви будете приділяти навчанню близько години на день. Ви можете вивчити C# швидше, якщо навчатиметеся за денною або заочною формою навчання.\n' +
                '####\n' +
                'Але нехай ця цифра не вводить вас в оману. Якщо ви хочете стати професійним розробником, який кодує на C#, вам потрібно буде витратити набагато більше часу на вивчення мови. Зазвичай потрібно щонайменше рік, щоб розвинути тверде розуміння C#, яке допоможе вам далеко піти в професійному середовищі.\n' +
                '####\n' +
                'Ваша навчальна подорож ніколи не закінчиться. Ви завжди будете дізнаватися щось нове. Але вже через кілька місяців ви будете володіти знаннями, необхідними для того, щоб самостійно створювати потужні додатки.\n' +
                '####\n' +
                '***Найкращий спосіб вивчити C#***\n' +
                '####\n' +
                'Отже, ви думаєте про себе: "Вивчення C# звучить як гарна ідея". Це чудово. Але тепер ви, швидше за все, запитаєте: "Як же насправді навчитися програмувати на C#?"\n' +
                '####\n' +
                'Щоб допомогти вам відповісти на це питання, ми розділимо його на дві частини. Спочатку ми обговоримо навички високого рівня, які вам необхідно опанувати. Потім поговоримо про методи навчання.\n' +
                '####\n' +
                '***Як вивчити C# безкоштовно***\n' +
                '####\n' +
                'C# - це потужна мова, і немає сумнівів, що вона має безліч застосувань. Але перш ніж перейти до створення складних відеоігор або веб-сайтів, вам потрібно освоїти основи кодування на C#.\n' +
                '####\n' +
                'Вивчивши основи, ви отримаєте міцний фундамент знань, який згодом зможете використовувати для вивчення більш складних тем. Знаючи базовий синтаксис C#, вам більше ніколи не доведеться його вчити.\n' +
                '####\n' +
                'Розглянемо основні теми, які необхідно вивчити для освоєння мови C#.\n' +
                '####\n' +
                '***Синтаксис та змінні***\n' +
                '####\n' +
                'Синтаксис - це основний набір правил і процедур, які визначають, як ви пишете код. Перш ніж йти далі, вам потрібно освоїти синтаксис мови C#.\n' +
                '####\n' +
                'Наступним кроком у вашій подорожі буде вивчення змінних. Вони використовуються для зберігання даних у програмі. Ось основні теми, пов\'язані з синтаксисом і змінними, які вам потрібно буде вивчити:\n' +
                '####\n' +
                '- Як створити програму на C#\n' +
                '- Як отримувати вхідні дані від користувача\n' +
                '- Як писати коментарі\n' +
                '- Як оголосити змінну\n' +
                '- Які типи даних можуть використовуватись зі змінними\n' +
                '- Як перетворити тип даних, що використовується змінною\n' +
                '####\n' +
                '***Цикли та умови***\n' +
                '####\n' +
                'Цикли дозволяють автоматизувати повторювані задачі в програмі. Вони корисні тим, що дозволяють багаторазово використовувати подібний код замість того, щоб повторювати код вручну у своїй програмі.\n' +
                '####\n' +
                'Умовні переходи дозволяють контролювати потік вашої програми. Вони запускають певний код, коли у вашій програмі виконується набір умов. Це дає вам більший контроль над тим, коли виконуються певні частини програми.\n' +
                '####\n' +
                'Основні теми, які слід вивчити, пов\'язані з циклами та умовами\n' +
                '####\n' +
                '- Оператори if та else\n' +
                '- Оператори порівняння\n' +
                '- Логічний тип даних\n' +
                '- Логічні оператори\n' +
                '- Таблиці істинності\n' +
                '- Цикли For та оператор for each\n' +
                '####\n' +
                '***Методи та масиви***\n' +
                '####\n' +
                'Метод - це тип функції, яка об\'єднує блок коду і виконує певну дію в програмі. Наприклад, метод може додавати два числа або перебирати список і виводити кожен елемент на консоль. Методи є будівельними блоками коду в C#.\n' +
                '####\n' +
                'Масив - це спосіб зберігання списків даних у мові C#. Наприклад, масив може зберігати дані про список фруктів, що продаються у фруктовому кіоску.\n' +
                '####\n' +
                'Ось основні теми, пов\'язані з методами та масивами, які варто засвоїти:\n' +
                '####\n' +
                '- Як описати метод\n' +
                '- Як викликати метод\n' +
                '- Параметри методу\n' +
                '- Порівняння параметрів з аргументами\n' +
                '- Перевантаження методів\n' +
                '- Що таке масив\n' +
                '- Як отримати доступ до елементів масиву\n' +
                '- Як змінювати елементи масиву\n' +
                '####\n' +
                '***Класи та об\'єкти***\n' +
                '####\n' +
                'C# є об\'єктно-орієнтованою мовою програмування і для визначення структури даних у програмі покладається на класи та об\'єкти.\n' +
                '####\n' +
                'Класи - це як креслення, які визначають, як повинен бути структурований набір даних. Наприклад, клас може визначати всі дані, які може зберігати обліковий запис користувача в банківському додатку. Об\'єкти, з іншого боку, є окремими екземплярами класу. Так, об\'єкт може містити інформацію про рахунок конкретного клієнта на основі шаблону класу банківського рахунку.\n' +
                '####\n' +
                'Основні теми, про які варто знати, пов\'язані з класами та об\'єктами:\n' +
                '####\n' +
                '- Що таке клас\n' +
                '- Що таке об\'єкт\n' +
                '- Поля та властивості\n' +
                '- Модифікатори доступу public vs. private\n' +
                '- Конструктори\n' +
                '- ключове слово this\n' +
                '- Перевантаження конструкторів\n' +
                '- Крапкова нотація\n' +
                '####\n' +
                '***Успадкування та інтерфейси***\n' +
                '####\n' +
                'Спадковість - це властивість об\'єктно-орієнтованого програмування, яка дозволяє створювати клас на основі вже існуючих. Інтерфейси дозволяють накладати на клас певні властивості.\n' +
                '####\n' +
                'Обидві ці можливості можуть допомогти вам зменшити кількість повторень у вашому коді та писати більш ефективні та читабельні програми. Основними темами, які ви повинні засвоїти, є:\n' +
                '####\n' +
                '- Що таке інтерфейс\n' +
                '- Як створити інтерфейс\n' +
                '- Як тестувати інтерфейс\n' +
                '- Батьківський та дочірні класи\n' +
                '- Як створити батьківський клас\n' +
                '- Ключове слово inherited\n' +
                '- Доступ до успадкованих членів з допомогою base\n' +
                '- Перевизначення успадкованих членів класу\n' +
                '####\n' +
                'Опанувавши ці базові теми, ви будете готові зробити наступний крок у вашій подорожі: створювати проекти. В ідеалі, ви захочете почати створювати проекти якомога швидше, навіть якщо ви вивчаєте ці концепції. Це допоможе вам закріпити свої знання та застосувати на практиці теорію, яку ви вивчили в класі.\n' +
                '####\n' +
                'Крім того, вивчивши основи, ви можете перейти до вивчення фреймворків, таких як .Net, або дослідити ігровий рушій Unity.\n' +
                '####',
        },
        {
            titleEN: 'Online C# Courses',
            titleUA: 'Курси C# онлайн',
            bodyEN: '[Introduction to C# Programming and Unity](https://www.coursera.org/learn/introduction-programming-unity)\n' +
                '####\n' +
                '- Price: Free\n' +
                '- Audience: Beginners\n' +
                '####\n' +
                'This course is for people who want to build video games using C# and Unity on either Windows or Mac. Unity is one of the most popular game engines and is a valuable industry skill.\n' +
                '####\n' +
                'In this course, you’ll learn the basics of C# and object-oriented programming. You’ll work toward building a game that reinforces the skills you have learned in the course.\n' +
                '####\n' +
                '[Learn C# by Codecademy](https://www.codecademy.com/learn/learn-c-sharp)\n' +
                '####\n' +
                '- Price: Free\n' +
                '- Audience: Beginners\n' +
                '####\n' +
                'This course covers the fundamental programming features in the C# language. Expect to learn everything from how to declare a variable all the way to using references and writing LINQ queries.\n' +
                '####\n' +
                '[C# Fundamentals](https://www.pluralsight.com/courses/csharp-fundamentals-dev)\n' +
                '- Price: Free\n' +
                '- Audience: Beginners\n' +
                '####\n' +
                'C# Fundamentals introduces learners to the basic syntax of C#. You’ll learn how to write a program in C# and you’ll venture on to discuss .NET. Toward the end of the course, you’ll learn about object-oriented programming and how it applies to C#.\n',
            bodyUA: '[Вступ до програмування на C# та Unity](https://www.coursera.org/learn/introduction-programming-unity)\n' +
                '####\n' +
                '- Ціна: Безкоштовно\n' +
                '- Аудиторія: Початківці\n' +
                '####\n' +
                'Цей курс для тих, хто хоче створювати відеоігри за допомогою C# та Unity на Windows або Mac. Unity є одним з найпопулярніших ігрових рушіїв і є цінною індустріальною навичкою.\n' +
                '####\n' +
                'На цьому курсі ви вивчите основи C# та об\'єктно-орієнтованого програмування. Ви будете працювати над створенням гри, яка закріпить навички, отримані на курсі.\n' +
                '####\n' +
                '[Вивчайте C# від Codecademy](https://www.codecademy.com/learn/learn-c-sharp)\n' +
                '####\n' +
                '- Вартість: Безкоштовно\n' +
                '- Аудиторія: Початківці\n' +
                '####\n' +
                'Цей курс охоплює фундаментальні можливості програмування на мові C#. Очікується, що ви дізнаєтесь все: від оголошення змінної до використання посилань та написання LINQ-запитів.\n' +
                '####\n' +
                '[C# Fundamentals](https://www.pluralsight.com/courses/csharp-fundamentals-dev)\n' +
                '- Вартість: Безкоштовно\n' +
                '- Аудиторія: Початківці\n' +
                '####\n' +
                'Курс "Основи C#" знайомить слухачів з базовим синтаксисом мови C#. Ви навчитеся писати програми на C# і наважитеся обговорити .NET. Наприкінці курсу ви дізнаєтесь про об\'єктно-орієнтоване програмування та його застосування в C#.',
        },
        {
            titleEN: 'Online C# Books',
            titleUA: 'Онлайн книги по C#',
            bodyEN: '[C# Programming Yellow Book by Rob Miles](http://www.csharpcourse.com/)\n' +
                '####\n' +
                'This book is used by the University of Hull to teach the first year of their computer science course. In this book, you’ll cover all the basics of C#. You will learn about data processing, solving problems with C#, and the syntax behind C#.\n' +
                '####\n' +
                'This book includes some more advanced examples so that you can push your knowledge.\n' +
                '####\n' +
                '[Fundamentals of Computer Programming with C#](https://www.introprogramming.info/wp-content/uploads/2013/07/Books/CSharpEn/Fundamentals-of-Computer-Programming-with-CSharp-Nakov-eBook-v2013.pdf)\n' +
                '####\n' +
                'This book is an excellent introduction to the C# programming language. The book is over 1000 pages long so there’s plenty of material to learn.\n' +
                '####\n' +
                'You’ll start with a detailed introduction to programming and then you’ll slowly work your way through all of the fundamental aspects of C#.\n' +
                '####\n' +
                '[Learn C# in One Day](https://www.amazon.co.uk/Beginners-Hands-Project-Coding-Project-ebook/dp/B016Z18MLG)\n' +
                '####\n' +
                'Unlike other books which go into significant depth on various aspects of C#, this book takes another approach. It aims to teach you the basics of C# in as little time as possible.\n' +
                '####\n' +
                'This book only covers what you need to know to write a simple program in C#. It is great for people who have little to no experience with programming or C#.\n',
            bodyUA: '[C# Programming Yellow Book by Rob Miles](http://www.csharpcourse.com/)\n' +
                '####\n' +
                'Ця книга використовується в Університеті Халла для викладання першого курсу комп\'ютерних наук. У цій книзі ви охопите всі основи мови C#. Ви дізнаєтесь про обробку даних, розв\'язування задач за допомогою C# та синтаксис мови C#.\n' +
                '####\n' +
                'Ця книга містить більш складні приклади, щоб ви могли поглибити свої знання.\n' +
                '####\n' +
                '[Основи програмування мовою C#](https://www.introprogramming.info/wp-content/uploads/2013/07/Books/CSharpEn/Fundamentals-of-Computer-Programming-with-CSharp-Nakov-eBook-v2013.pdf)\n' +
                '####\n' +
                'Ця книга є чудовим вступом до мови програмування C#. Книга налічує понад 1000 сторінок, тому в ній є багато матеріалу для вивчення.\n' +
                '####\n' +
                'Ви почнете з детального вступу до програмування, а потім повільно пройдете через усі фундаментальні аспекти C#.\n' +
                '####\n' +
                '[Вивчити C# за один день](https://www.amazon.co.uk/Beginners-Hands-Project-Coding-Project-ebook/dp/B016Z18MLG)\n' +
                '####\n' +
                'На відміну від інших книг, які заглиблюються в різні аспекти C#, ця книга використовує інший підхід. Вона спрямована на те, щоб навчити вас основам мови C# за якомога менший час.\n' +
                '####\n' +
                'Ця книга охоплює лише те, що потрібно знати, щоб написати просту програму на C#. Вона чудово підходить для людей, які мають невеликий досвід програмування або взагалі не мають досвіду роботи з C#.',
        },
        {
            titleEN: 'Online C# Resources',
            titleUA: 'Онлайн ресурси по C#',
            bodyEN: '***Microsoft C# Tutorials***\n' +
                '####\n' +
                'C# was developed by Microsoft, so it makes sense the company has been active in writing documentation and learning resources for the language.\n' +
                '####\n' +
                'On the Microsoft website, you’ll find a stockpile of great tutorials that you can use to learn C#. For instance, Microsoft has a list of videos and articles to help you learn C# on their [.Net website](https://dotnet.microsoft.com/learn/csharp).\n' +
                '####\n' +
                '***Microsoft C# Documentation***\n' +
                '####\n' +
                'You can also learn from [Microsoft’s C# guide](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/) in the language’s documentation, which is a great starting point for beginners. The Microsoft C# guide covers all the basic principles of C# that you’ll need to know to code an application using the language.\n' +
                '####\n' +
                '***[LearnCS.org](http://learncs.org/)***\n' +
                '####\n' +
                'LearnCS.org is a basic introduction on how to code in C#. You’ll cover all the basics from arrays and dictionaries to variables and data types. This guide is under construction so you can expect to see more updates in the future.\n',
            bodyUA: '***Уроки Microsoft C#***.\n' +
                '####\n' +
                'Мова C# була розроблена компанією Microsoft, тому цілком логічно, що компанія активно займається написанням документації та навчальних ресурсів для цієї мови.\n' +
                '####\n' +
                'На сайті Microsoft ви знайдете безліч чудових навчальних матеріалів, які можна використовувати для вивчення мови C#. Наприклад, на сайті Microsoft є список відео та статей, які допоможуть вам вивчити C# на їхньому [.Net сайті](https://dotnet.microsoft.com/learn/csharp).\n' +
                '####\n' +
                '***Документація Microsoft C#***\n' +
                '####\n' +
                'Ви також можете вивчити [Microsoft\'s C# guide](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/) в документації до мови, що є чудовою відправною точкою для початківців. Посібник Microsoft C# охоплює всі основні принципи мови C#, які вам знадобляться для написання додатків з використанням цієї мови.\n' +
                '####\n' +
                '***[LearnCS.org](http://learncs.org/)***\n' +
                '####\n' +
                'LearnCS.org - це базовий вступ до програмування на C#. Ви охопите всі основи від масивів і словників до змінних і типів даних. Цей посібник знаходиться на стадії розробки, тому ви можете очікувати більше оновлень у майбутньому.',
        },
        {
            titleEN: 'Build a Project',
            titleUA: 'Створіть проєкт',
            bodyEN: 'Learning from tutorials can only take you so far; after you’ve mastered the basics, you should start working on your own projects.\n' +
                '####\n' +
                'Working on projects is a great way to learn because they allow you to apply the theories that you have learned. This can help with boosting retention. You’ll have to think about both the concepts you have learned and how they apply to the specific project that you’re building.\n' +
                '####\n' +
                'To start, you should focus on building a few basic projects. This will help you get used to working on independent work that you’ve chosen. Then, when you’re ready, you can move your attention toward bigger projects.\n' +
                '####\n' +
                'If you’re stuck for inspiration, ask yourself the question: “What problems do I frequently encounter?” This will help you get into the mindset of thinking about new ideas.\n' +
                '####\n' +
                'Here are a few examples of starter projects you could build using C#:\n' +
                '####\n' +
                '- A login page for a game\n' +
                '- An app that stores a list of trading cards that you collect\n' +
                '- A ticketing application for teams\n' +
                '- A program that helps you archive your files\n' +
                '- An app to share clips from your favorite podcasts\n' +
                '####\n' +
                'If you’re looking to build a game with C#, then you must first come up with concept ideas. All you need to do is rack your mind for answers to the question: “what is my dream game?” Do remember that you should start small.\n' +
                '####\n' +
                'Once you’ve finished your first project, keep going. Build another one and make it more technically complex than your last one, if you feel like you are ready. Or, you could add new features to an existing project. This will help you get into the mindset of “how can I improve my work”, which will allow you to learn C# faster.\n' +
                '\n',
            bodyUA: 'Навчання за підручниками може завести вас лише на певний час, після того, як ви опануєте основи, ви повинні почати працювати над власними проектами.\n' +
                '####\n' +
                'Робота над проектами - це чудовий спосіб навчання, оскільки вони дозволяють застосувати вивчені теорії на практиці. Це може допомогти підвищити рівень запам\'ятовування. Вам доведеться подумати як про концепції, які ви вивчили, так і про те, як вони застосовуються до конкретного проекту, який ви створюєте.\n' +
                '####\n' +
                'Для початку вам слід зосередитися на створенні кількох базових проектів. Це допоможе вам звикнути до самостійної роботи над обраною вами темою. Потім, коли ви будете готові, ви можете перенести свою увагу на більші проекти.\n' +
                '####\n' +
                'Якщо вам не вистачає натхнення, задайте собі питання: "З якими проблемами я найчастіше стикаюся?". Це допоможе вам налаштуватися на обдумування нових ідей.\n' +
                '####\n' +
                'Ось кілька прикладів стартових проектів, які можна створити за допомогою C#:\n' +
                '####\n' +
                '- Сторінка входу в гру\n' +
                '- Додаток, який зберігає список торгових карток, які ви збираєте\n' +
                '- Додаток для продажу квитків для команд\n' +
                '- Програма, яка допомагає архівувати файли\n' +
                '- Додаток, щоб ділитися фрагментами улюблених подкастів\n' +
                '####\n' +
                'Якщо ви хочете створити гру за допомогою C#, то спочатку ви повинні придумати концептуальну ідею. Все, що вам потрібно зробити, це поламати голову в пошуках відповідей на питання: "Яка гра моєї мрії?" Пам\'ятайте, що починати потрібно з малого.\n' +
                '####\n' +
                'Закінчивши свій перший проект, не зупиняйтеся на досягнутому. Створіть ще один і зробіть його більш технічно складним, ніж попередній, якщо відчуваєте, що готові до цього. Або ви можете додати нові функції до вже існуючого проекту. Це допоможе вам зануритися в мислення "як я можу покращити свою роботу", що дозволить вам швидше вивчити C#.',
        },
        {
            titleEN: 'Join a Developer Community',
            titleUA: 'Приєднуйтесь до спільноти розробників',
            bodyEN: 'Learning to code is not a journey you should take in solitude. On the contrary, you should try to expose yourself to as many other developers as possible.\n' +
                '####\n' +
                'Joining a developer community should be high on your list of priorities when learning how to code. Developer communities are hubs for developers to come together, help each other, and discuss technical and non-technical questions.\n' +
                '####\n' +
                'When you join a community, you’ll be able to ask questions to other developers. You’ll be able to your support when you can and, in the process, get a greater sense of the C# developer ecosystem.\n' +
                '####\n' +
                'Are you unsure which communities to join? Here is a list of a few communities that are great for C# beginners:\n' +
                '####\n' +
                '- [C# on Discord](https://aka.ms/csharp-discord) : The C# community on Discord is a group of developers who have come together to discuss C#. In the community, you can ask questions, seek feedback on your work, and help others whenever possible.\n' +
                '- [.Net Blog](https://devblogs.microsoft.com/dotnet/) : The .Net blog, while not exactly a community, is a great source of information for all .Net developers, and is worth a follow.\n' +
                '- [Stack Overflow](https://stackoverflow.com/questions/tagged/.net?sort=frequent) : Stack Overflow is a website used by developers around the world to ask and answer programming questions. There are many great questions on Stack Overflow related to C# already. If you have your own, you can always post it to the platform.\n' +
                '####\n' +
                'Your first priority when joining a developer community should be to find ways to contribute. Ask yourself: How can I make this community a better place? Do you have a question to ask? Great, post it in a community. Can you help another developer? If so, extend your support.\n' +
                '####\n' +
                'If you’re looking for more communities for C# developers, check out Microsoft’s [list of C# communities](https://dotnet.microsoft.com/platform/community).\n' +
                '\n',
            bodyUA: 'Навчання кодуванню - це не та подорож, яку слід здійснювати на самоті. Навпаки, ви повинні намагатися познайомитися з якомога більшою кількістю інших розробників.\n' +
                '####\n' +
                'Приєднання до спільноти розробників повинно бути одним з ваших пріоритетів при вивченні програмування. Спільноти розробників - це центри, де розробники збираються разом, допомагають один одному та обговорюють технічні та нетехнічні питання.\n' +
                '####\n' +
                'Приєднавшись до спільноти, ви зможете задавати питання іншим розробникам. Ви зможете отримати підтримку, коли зможете, і, в процесі, отримати більше розуміння екосистеми C# розробників.\n' +
                '####\n' +
                'Не знаєте, до якої спільноти приєднатися? Ось перелік декількох спільнот, які можуть бути корисними для початківців C# розробників:\n' +
                '####\n' +
                '- [C# on Discord](https://aka.ms/csharp-discord) : Спільнота C# на Discord - це група розробників, які зібралися разом для обговорення C#. У спільноті ви можете задавати питання, шукати відгуки про свою роботу та допомагати іншим, коли це можливо.\n' +
                '- [.Net Blog](https://devblogs.microsoft.com/dotnet/) : Блог .Net, хоча і не є спільнотою, є чудовим джерелом інформації для всіх .Net розробників, і за ним варто стежити.\n' +
                '- [Stack Overflow](https://stackoverflow.com/questions/tagged/.net?sort=frequent) : Stack Overflow - це веб-сайт, який використовується розробниками по всьому світу для того, щоб задавати і відповідати на питання програмування. На Stack Overflow вже є багато чудових запитань, пов\'язаних з C#. Якщо у вас є своє, ви завжди можете задати його на платформі.\n' +
                '####\n' +
                'Вашим першим пріоритетом при приєднанні до спільноти розробників має бути пошук способів зробити свій внесок. Запитайте себе: Як я можу зробити цю спільноту кращим місцем? У вас є питання, яке ви хочете задати? Чудово, задайте його у спільноті. Чи можете ви допомогти іншому розробнику? Якщо так, надайте свою підтримку.\n' +
                '####\n' +
                'Якщо вам потрібні інші спільноти для C# розробників, перегляньте [список C# спільнот від Microsoft](https://dotnet.microsoft.com/platform/community).',
        },
        {
            titleEN: 'Practice Your C# Skills',
            titleUA: 'Практикуйте свої навички роботи з C#',
            bodyEN: 'Practice, practice, practice. This principle is so important that it cannot be repeated enough.\n' +
                '####\n' +
                'Coding is a skill, and like any skill, the more you practice, the better you’ll get. Although you may feel somewhat unnerved by the complexity of C# at first, these feelings will dissipate. You’ll become more comfortable working with the language.\n' +
                '####\n' +
                'Practice is so important when it comes to coding because you’ll inevitably make mistakes. The only way that you’ll learn from them is to keep working hard and figuring out ways to improve your work. And, over time, you’ll develop a mental catalog of errors and mistakes you have seen, which will help you become a more effective programmer.\n' +
                '####\n' +
                'How often should you practice? That’s up to you, but when you’re getting started, it is best to try to fit in as much practice as you can. If possible try to code daily or at least a few times a week. This will reduce the likelihood that you forget about coding and stop working on projects.\n' +
                '\n',
            bodyUA: 'Практика, практика, практика. Цей принцип настільки важливий, що його не можна повторювати багато разів.\n' +
                '####\n' +
                'Кодування - це навичка, і як будь-яка навичка, чим більше ви практикуєтесь, тим краще ви стаєте. Хоча спочатку ви можете відчувати себе дещо знервованими через складність C#, ці почуття розвіються. Вам стане комфортніше працювати з мовою.\n' +
                '####\n' +
                'Практика дуже важлива, коли справа доходить до кодування, тому що ви неминуче будете робити помилки. Єдиний спосіб навчитися на них - це продовжувати наполегливо працювати і шукати способи поліпшити свою роботу. І, з часом, ви розробите ментальний каталог помилок і помилок, які ви бачили, що допоможе вам стати більш ефективним програмістом.\n' +
                '####\n' +
                'Як часто потрібно займатися? Це залежить від вас, але коли ви тільки починаєте, найкраще намагатися вкластися в якомога більшу кількість практики. По можливості намагайтеся кодувати щодня або хоча б кілька разів на тиждень. Це зменшить ймовірність того, що ви забудете про кодування і перестанете працювати над проектами.',
        },
        {
            titleEN: 'How to Learn C#: Practice Ideas',
            titleUA: 'Як вивчити C#: Практичні ідеї',
            bodyEN: 'If you’re looking for creative ways to practice, here are a few ideas:\n' +
                '####\n' +
                '- Create a project. Building a project is a great way to learn how to code in C#. Think about an idea, then try to build it with the skills you have acquired.\n' +
                '- Participate in a hackathon. Hackathons are contests where people come together to build a project in a short period of time. Participating in a hackathon is a great way to meet other developers who have varying levels of skills in the languages you know.\n' +
                '- Take on a coding challenge. On sites like Codewars and Coderbyte, you can find coding challenges that have been written to help people refine their knowledge of coding. These sites often have challenges specifically for C# developers, which you can use to level up your skills.\n' +
                '####\n' +
                'Keep practicing, and before you know it you’ll be a master at coding in C#.\n',
            bodyUA: 'Якщо ви шукаєте креативні способи для практики, ось кілька ідей:\n' +
                '####\n' +
                '- Створіть проект. Створення проекту - це чудовий спосіб навчитися програмувати на C#. Подумайте про ідею, а потім спробуйте побудувати її з набутими навичками.\n' +
                '- Візьміть участь у хакатоні. Хакатони - це змагання, де люди об\'єднуються, щоб створити проект за короткий проміжок часу. Участь у хакатоні - це чудовий спосіб познайомитися з іншими розробниками, які мають різний рівень навичок у відомих вам мовах.\n' +
                '- Прийміть виклик з кодування. На таких сайтах, як Codewars і Coderbyte, ви можете знайти завдання з кодування, які були написані, щоб допомогти людям вдосконалити свої знання з кодування. На цих сайтах часто є завдання спеціально для C# розробників, які ви можете використовувати для підвищення рівня своїх навичок.\n' +
                '####\n' +
                'Продовжуйте практикуватись, і не встигнете й оком моргнути, як станете майстром кодування на C#.',
        },
    ],
};

const html = {
    id: categoriesId[HTML],
    nameEN: 'HTML step-by-step plan',
    nameUA: 'HTML покроковий план',
    items: [
        {
            titleEN: 'Learn Basics of HTML and CSS (Beginner)',
            titleUA: 'Вивчення основ HTML та CSS (для початківців)',
            bodyEN: 'This material gives you enough exposure to the basics of HTML and CSS. For personal assessment, you can try quizzes. Enough examples are there to practice, and you can also experiment with the codes in its editor.\n' +
                '####\n' +
                '- http://www.w3schools.com/html/default.asp\n' +
                '- http://www.w3schools.com/css/\n',
            bodyUA: 'Цей матеріал дає вам достатнє уявлення про основи HTML та CSS. Для особистої оцінки можна спробувати тестові завдання. Прикладів достатньо для практики, а також можна поекспериментувати з кодами в його редакторі.\n' +
                '####\n' +
                '- http://www.w3schools.com/html/default.asp\n' +
                '- http://www.w3schools.com/css/',
        },
        {
            titleEN: 'Learn by Doing (Beginner)',
            titleUA: 'Навчайся на практиці (для початківців)',
            bodyEN: 'Want to experience learn by coding? then code academy is your choice\n' +
                '####\n' +
                '- https://www.codecademy.com/learn/web\n',
            bodyUA: 'Хочеш навчатися шляхом написання коду? Тоді code academy - твій вибір\n' +
                '####\n' +
                '- https://www.codecademy.com/learn/web',
        },
        {
            titleEN: 'Understand HTML Layouts (Advanced)',
            titleUA: 'Розуміння HTML верстки (просунутий рівень)',
            bodyEN: 'Building a home and building a well-planned home are two different things, now we have the good foundational strength we are now ready to become creators, designers what not !!!. This article helps you find the techniques to create beautiful layouts. Layout plays a very critical role for any website.\n' +
                '####\n' +
                '- https://www.codementor.io/css/tutorial/4-different-layout-techniques-create-single-page\n' +
                '- http://learnlayout.com/\n',
            bodyUA: 'Будівництво будинку і будівництво добре спланованого будинку - це дві різні речі, тепер у нас є хороша фундаментальна база, ми тепер готові стати творцями, дизайнерами чого б це не коштувало !!! Ця стаття допоможе вам знайти прийоми для створення красивих макетів. Макет грає дуже важливу роль для будь-якого сайту.\n' +
                '####\n' +
                '- https://www.codementor.io/css/tutorial/4-different-layout-techniques-create-single-page\n' +
                '- http://learnlayout.com/',
        },
        {
            titleEN: 'Understand HTML Forms (Advanced)',
            titleUA: 'Розуміння HTML-форм (просунутий рівень)',
            bodyEN: 'It’s very important that you don’t test the patience of user when asking input, so forms are very important for any web application. Sign Up, login, feedback, Comments.. all needs to be presented to the user with clear and concise style. Go and play with forms. Don’t forget !!! — Practice makes man perfect\n' +
                '####\n' +
                '- http://learn.shayhowe.com/html-css/building-forms/\n' +
                '- http://www.javascript-coder.com/html-form/html-form-tutorial-p1.phtml',
            bodyUA: 'Дуже важливо, щоб ви не випробовували терпіння користувача, просячи ввести дані, тому форми дуже важливі для будь-якого веб-додатку. Реєстрація, вхід, зворотній зв\'язок, коментарі... все повинно бути представлено користувачеві в зрозумілому і лаконічному стилі. Перейдіть і пограйтеся з формами. Не забувайте!!! - Практика робить людину досконалою\n' +
                '####\n' +
                '- http://learn.shayhowe.com/html-css/building-forms/\n' +
                '- http://www.javascript-coder.com/html-form/html-form-tutorial-p1.phtml',
        },
        {
            titleEN: 'Understand CSS Positioning (Advanced)',
            titleUA: 'Розуміння позиціонування CSS (просунутий рівень)',
            bodyEN: 'Clean home has things rightly placed — interior designing !!!, when building website elements positioning is very important and needs special attention. No ESCAPE from coding.. code it .. learn it..\n' +
                '####\n' +
                '- https://www.codecademy.com/courses/advanced-css-positioning/0/1\n' +
                '- http://learn.shayhowe.com/advanced-html-css/detailed-css-positioning/\n',
            bodyUA: 'В чистому домі все правильно розставлено - дизайн інтер\'єру!!!, при створенні сайту позиціонування елементів сайту є дуже важливим і потребує особливої уваги. Від кодингу не втечеш... програмуй... вчись...\n' +
                '####\n' +
                '- https://www.codecademy.com/courses/advanced-css-positioning/0/1\n' +
                '- http://learn.shayhowe.com/advanced-html-css/detailed-css-positioning/',
        },
        {
            titleEN: 'Build a project using HTML and CSS (Intermediate)',
            titleUA: 'Створіть проект з використанням HTML та CSS (середній рівень)',
            bodyEN: 'Practice more by building a project\n' +
                '####\n' +
                '- http://www.theodinproject.com/courses/web-development-101/lessons/html-css\n',
            bodyUA: 'Практикуйте більше, створюючи проект\n' +
                '####\n' +
                '- http://www.theodinproject.com/courses/web-development-101/lessons/html-css',
        },
        {
            titleEN: 'Learn about Responsive (Intermediate)',
            titleUA: 'Ознайомтеся з адаптивністю (середній рівень)',
            bodyEN: 'Mobile, Tablet, Desktop — devices with multiple screen sizes. Ahhhh.. my site works only on the desktop, Do I need to build separate sites for mobile and tablet. Wait Wait Wait !!! We have a responsive web design concepts.. go explore them and get your website flexible to work on any device\n' +
                '####\n' +
                '- http://www.w3schools.com/css/css_rwd_grid.asp\n',
            bodyUA: 'Мобільний, планшет, десктоп - пристрої з декількома розмірами екрану. Аааа... мій сайт працює тільки на десктопі, чи потрібно мені створювати окремі сайти для мобільного і планшета. Зачекайте, зачекайте, зачекайте !!! У нас є концепції адаптивного веб-дизайну... ознайомтеся з ними і зробіть свій сайт гнучким для роботи на будь-яких пристроях\n' +
                '####\n' +
                '- http://www.w3schools.com/css/css_rwd_grid.asp',
        },
        {
            titleEN: 'Best Practices (Advanced)',
            titleUA: 'Найкращі практики (просунутий рівень)',
            bodyEN: 'When you write codes you don’t want to make any mistakes. To write clean and error free codes it is required to follow some procedures that are accepted by the developers worldwide. Here are some resources to write proper codes without any errors.\n' +
                '####\n' +
                '- http://learn.shayhowe.com/html-css/writing-your-best-code/\n' +
                '- https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741\n',
            bodyUA: 'Коли ви пишете код, ви не хочете допустити жодної помилки. Щоб писати чистий і безпомилковий код, необхідно дотримуватися певних процедур, які прийняті серед розробників у всьому світі. Ось деякі ресурси для написання правильного коду без помилок.\n' +
                '####\n' +
                '- http://learn.shayhowe.com/html-css/writing-your-best-code/\n' +
                '- https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741',
        },
        {
            titleEN: 'Testing time — Assignments (Shortcut to Success)',
            titleUA: 'Час тестування - Завдання (Короткий шлях до успіху)',
            bodyEN: 'Learning doesn’t work when you have not tested what you learned. To make your HTML & CSS learning fruitful you should test yourself with some assignments. Here are some assignments for you to practice.\n' +
                '####\n' +
                '- http://www.landofcode.com/html-exercises/\n' +
                '- http://www.landofcode.com/css-examples/\n',
            bodyUA: 'Навчання не працює, якщо ви не перевірили те, що вивчили. Щоб зробити вивчення HTML і CSS ефективним, ви повинні перевірити себе за допомогою деяких завдань. Ось кілька завдань для практики.\n' +
                '####\n' +
                '- http://www.landofcode.com/html-exercises/\n' +
                '- http://www.landofcode.com/css-examples/',
        },
        {
            titleEN: 'Additional Resources',
            titleUA: 'Додаткові джерела',
            bodyEN: '***[HTML and CSS Resources — Stepping Stones Of Web Development](https://www.zeolearn.com/magazine/html-and-css-resources-stepping-into-web-development)***',
            bodyUA: '***[Ресурси HTML та CSS - кроки до веб-розробки](https://www.zeolearn.com/magazine/html-and-css-resources-stepping-into-web-development)***',
        },
    ],
};

const management = {
    id: categoriesId[MANAGEMENT],
    nameEN: 'Project Manager step-by-step plan',
    nameUA: 'Project Manager покроковий план',
    items: [
        {
            titleEN: 'Understand what project management skills you already have',
            titleUA: 'Зрозумійте, якими навичками управління проектами ви вже володієте',
            bodyEN: 'If you’ve ever planned, led, budgeted, scheduled, or documented the progress of a project, you’ve done some elements of project management. Did you organize an event in a previous job? Find new ways to make your workplace more efficient? Coordinate volunteers to clean up a beach? Though you might not have thought of it as project management at the time, your past experiences may have given you some exposure to the skills you’ll need as a project manager.\n' +
                '####\n' +
                'If you find you have quite a bit of experience already, you may be ready to apply for project manager positions, or approach your manager to state your interest in becoming one. If you have a combined three years of experience, you’ll also be eligible to apply to take the exam for the [Project Management Professional (PMP)](https://www.coursera.org/articles/the-pmp-certification-a-guide-to-getting-started) certification, which may create opportunities for you in the project management world.\n' +
                '\n',
            bodyUA: 'Якщо ви коли-небудь планували, керували, складали бюджет, графік або документували хід виконання проекту, ви мали справу з деякими елементами проектного менеджменту. Ви організовували захід на попередній роботі? Шукали нові способи зробити своє робоче місце більш ефективним? Координували волонтерів для прибирання пляжу? Хоча ви, можливо, і не думали про це як про управління проектами в той час, ваш минулий досвід, можливо, дав вам певні навички, які знадобляться вам як менеджеру проекту.\n' +
                '####\n' +
                'Якщо ви вважаєте, що у вас вже достатньо досвіду, ви можете подати заявку на посаду менеджера проекту або звернутися до свого керівника, щоб заявити про свою зацікавленість у тому, щоб стати таким менеджером. Якщо ви маєте сукупний трирічний досвід, ви також маєте право подати заявку на складання іспиту на сертифікацію [Project Management Professional (PMP)](https://www.coursera.org/articles/the-pmp-certification-a-guide-to-getting-started), що може створити для вас можливості у світі проєктного менеджменту.',
        },
        {
            titleEN: 'Build project management experience',
            titleUA: 'Отримання досвіду проектного менеджменту',
            bodyEN: 'Many project managers get their start in non-managerial positions on a team. For example, IT project managers may work for several years as an IT associate, or perhaps as a business analyst supporting the IT team. Their roles may gradually expand as they gain industry expertise, take on managerial tasks, develop organizational skills, and learn to work with the members on their team.\n' +
                '####\n' +
                'If you’re trying to build up project management skills, try **looking for opportunities in your current work**. Whether you work in a hospital or retail store, tech company or restaurant, chances are there are several items that need to be planned, executed, or improved. See if you can join in these efforts. If it makes sense to do so, approach your manager with ideas of how you can contribute, and let them know you’re interested in developing project management experience.\n' +
                '\n',
            bodyUA: 'Багато керівників проектів починають свою кар\'єру на некерівних посадах в команді. Наприклад, менеджери ІТ-проектів можуть працювати протягом декількох років як ІТ-спеціаліст або, можливо, як бізнес-аналітик, що підтримує ІТ-команду. Їх ролі можуть поступово розширюватися в міру того, як вони набувають галузевого досвіду, беруть на себе управлінські завдання, розвивають організаторські навички та вчаться працювати з членами своєї команди.\n' +
                '####\n' +
                'Якщо ви намагаєтеся розвинути навички управління проектами, спробуйте **пошукати можливості на своїй поточній роботі**. Незалежно від того, де ви працюєте - в лікарні чи роздрібній крамниці, технічній компанії чи ресторані, швидше за все, є кілька пунктів, які потрібно спланувати, виконати чи покращити. Подивіться, чи можете ви долучитися до цих зусиль. Якщо це має сенс, зверніться до свого керівника з ідеями про те, як ви можете зробити свій внесок, і дайте йому знати, що ви зацікавлені в розвитку досвіду управління проектами.',
        },
        {
            titleEN: 'Develop project management skills',
            titleUA: 'Розвивайте навички проєктного менеджменту',
            bodyEN: 'It’ll be a good idea to sharpen the technical and workplace skills involved in project management. Here are some skills commonly requested in project manager job descriptions:\n' +
                '####\n' +
                '- Risk management\n' +
                '- Budgeting\n' +
                '- Agile project management\n' +
                '- Waterfall project management\n' +
                '- Scrum\n' +
                '- Organization\n' +
                '- Communication\n' +
                '- Leadership\n' +
                '####\n' +
                'You can develop skills by taking courses specific to a subject, studying for a certification, or practicing them in the workplace. Develop core project management skills with the [Google Project Management: Professional Certificate](https://www.coursera.org/professional-certificates/google-project-management). You can learn what you need to be job-ready in six months or less.\n',
            bodyUA: 'Буде гарною ідеєю відточити технічні та робочі навички, пов\'язані з управлінням проектами. Ось деякі навички, які зазвичай вимагаються в описах посадових обов\'язків менеджерів проектів:\n' +
                '####\n' +
                '- Управління ризиками\n' +
                '- Бюджетування\n' +
                '- Гнучке управління проектами\n' +
                '- Управління "водоспадними" проектами\n' +
                '- Scrum\n' +
                '- Організація\n' +
                '- Комунікація\n' +
                '- Лідерство\n' +
                '####\n' +
                'Ви можете розвивати навички, проходячи курси з конкретного предмету, готуючись до сертифікації або практикуючи їх на робочому місці. Розвивайте основні навички управління проектами за допомогою [Google Project Management: Professional Certificate](https://www.coursera.org/professional-certificates/google-project-management). Ви можете навчитися тому, що вам потрібно, щоб бути готовим до роботи за шість місяців або менше.',
        },
        {
            titleEN: 'Enhance your project manager resume',
            titleUA: 'Покращуйте своє резюме менеджера проєктів',
            bodyEN: 'As you gain experience and skills in this field, take the time to [enhance your resume](https://www.coursera.org/articles/ways-to-enhance-your-resume). Review project manager job listings, from entry-level to advanced roles, to find out what companies are looking for.\n' +
                '####\n' +
                'Highlight your qualifications that match the job requirements and feature them prominently on your resume.\n' +
                '####\n' +
                'Use action verbs to describe tasks you performed in previous roles, and when possible, emphasize any quantifiable outcomes.\n' +
                '\n',
            bodyUA: 'Здобуваючи досвід і навички в цій сфері, знайдіть час, щоб [покращити своє резюме](https://www.coursera.org/articles/ways-to-enhance-your-resume). Перегляньте списки вакансій менеджерів проектів, від початкового рівня до просунутих ролей, щоб дізнатися, що шукають компанії.\n' +
                '####\n' +
                'Підкресліть свою кваліфікацію, яка відповідає вимогам вакансії, і зробіть її помітною у своєму резюме.\n' +
                '####\n' +
                'Використовуйте дієслова для опису завдань, які ви виконували на попередніх посадах, і, по можливості, підкреслюйте будь-які результати, які можна виміряти кількісно.',
        },
        {
            titleEN: 'Look for entry-level positions',
            titleUA: 'Шукайте вакансії початкового рівня',
            bodyEN: 'Gradually working your way up the ladder from within a team isn’t the only way to become a project manager. Many project managers get their start in entry-level organizational positions to build key skills. Keep an eye out for these titles in your search:\n' +
                '####\n' +
                '- Project coordinator\n' +
                '- Operations coordinator\n' +
                '- Associate project manager\n' +
                '- Junior project manager\n' +
                '- Operations associate\n' +
                '- Administrative associate\n' +
                '\n',
            bodyUA: 'Поступове просування по кар\'єрних сходах всередині команди не єдиний спосіб стати менеджером проекту. Багато менеджерів проєктів починають свою кар\'єру з організаційних посад початкового рівня, щоб розвинути ключові навички. Слідкуйте за цими назвами під час пошуку:\n' +
                '####\n' +
                '- Координатор проекту\n' +
                '- Операційний координатор\n' +
                '- Асистент менеджера проекту\n' +
                '- Молодший менеджер проекту\n' +
                '- Операційний асистент\n' +
                '- Адміністративний асистент',
        },
        {
            titleEN: 'Consider a project management credential',
            titleUA: 'Розгляньте можливість отримання сертифікату з проєктного менеджменту',
            bodyEN: 'A certification or certificate can help you get your foot in the door for project management jobs. Here are a few to consider:\n' +
                '####\n' +
                '- Certified Associate in Project Management (CAPM)\n' +
                '- Google Project Management: Professional Certification\n' +
                '- Project Management Professional (PMP)\n' +
                '- Certified Scrum Master\n' +
                '- Professional Scrum Master I (PSM I)\n' +
                '- ICAgile Certified Professional (ICP)\n',
            bodyUA: 'Сертифікація або сертифікат може допомогти вам отримати доступ до роботи з управління проектами. Ось кілька з них, які слід розглянути:\n' +
                '####\n' +
                '- Certified Associate in Project Management (CAPM)\n' +
                '- Google Project Management: Professional Certification\n' +
                '- Project Management Professional (PMP)\n' +
                '- Certified Scrum Master\n' +
                '- Professional Scrum Master I (PSM I)\n' +
                '- ICAgile Certified Professional (ICP)\n',
        },
    ],
};

export const plans = [
    jsPlan,
    pythonPlan,
    cPlusPlusPlan,
    javaPlan,
    cSharpPlan,
    html,
    management
];
