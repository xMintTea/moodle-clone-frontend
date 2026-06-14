export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  progress: number;
  color: string;
  enrolled: number;
  imageUrl: string;
}

export interface Module {
  id: string;
  title: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'assignment' | 'quiz' | 'resource' | 'forum' | 'video';
  title: string;
  dueDate?: string;
  completed: boolean;
  grade?: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  submitted: boolean;
  grade?: number;
  feedback?: string;
}

export interface Grade {
  courseId: string;
  courseName: string;
  assignments: {
    name: string;
    grade: number;
    maxPoints: number;
    weight: number;
  }[];
  finalGrade: number;
}

export interface VideoContent {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  transcript?: string;
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'pdf' | 'link' | 'document' | 'spreadsheet';
  url: string;
  fileSize?: string;
  author: string;
  uploadedAt: string;
  content?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'matching' | 'fill' | 'text';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  pairs?: { left: string; right: string }[];
  blanks?: { sentence: string; answer: string }[];
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimit: number; // minutes
  maxAttempts: number;
  questions: QuizQuestion[];
}

export const courses: Course[] = [
  {
    id: "cs101",
    name: "Основы программирования",
    code: "ИНФ 101",
    description: "Изучите основы программирования и компьютерных наук на языке Python.",
    instructor: "Анна Сергеевна Иванова",
    progress: 65,
    color: "bg-blue-500",
    enrolled: 156,
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
  },
  {
    id: "math201",
    name: "Математический анализ II",
    code: "МАТ 201",
    description: "Продвинутый курс анализа: интегралы, ряды, дифференциальные уравнения.",
    instructor: "Михаил Борисович Ченцов",
    progress: 45,
    color: "bg-green-500",
    enrolled: 92,
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80"
  },
  {
    id: "eng150",
    name: "Академическое письмо",
    code: "РУС 150",
    description: "Развитие навыков академического письма и научной коммуникации.",
    instructor: "Елена Викторовна Браун",
    progress: 80,
    color: "bg-purple-500",
    enrolled: 134,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
  },
  {
    id: "phys101",
    name: "Физика I",
    code: "ФИЗ 101",
    description: "Классическая механика и термодинамика.",
    instructor: "Дмитрий Алексеевич Вильсон",
    progress: 30,
    color: "bg-orange-500",
    enrolled: 78,
    imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80"
  }
];

export const courseModules: Record<string, Module[]> = {
  cs101: [
    {
      id: "mod1",
      title: "Неделя 1: Введение в программирование",
      activities: [
        { id: "v1", type: "video", title: "Добро пожаловать на курс", completed: true },
        { id: "r1", type: "resource", title: "Рабочая программа", completed: true },
        { id: "a3", type: "assignment", title: "Задание 'Hello, World!'", dueDate: "2026-01-15", completed: true, grade: 95 }
      ]
    },
    {
      id: "mod2",
      title: "Неделя 2: Переменные и типы данных",
      activities: [
        { id: "v2", type: "video", title: "Введение в переменные", completed: true },
        { id: "q1", type: "quiz", title: "Тест по типам данных", dueDate: "2026-01-22", completed: true, grade: 88 },
        { id: "a6", type: "assignment", title: "Практика с переменными", dueDate: "2026-01-25", completed: false }
      ]
    },
    {
      id: "mod3",
      title: "Неделя 3: Управляющие конструкции",
      activities: [
        { id: "v3", type: "video", title: "Условные операторы и циклы", completed: false },
        { id: "r2", type: "resource", title: "Шпаргалка по управляющим конструкциям", completed: false },
        { id: "q2", type: "quiz", title: "Тест по управляющим конструкциям", dueDate: "2026-02-05", completed: false },
        { id: "a9", type: "assignment", title: "Задание на управляющие конструкции", dueDate: "2026-02-01", completed: false }
      ]
    }
  ],
  math201: [
    {
      id: "mod1",
      title: "Раздел 1: Техники интегрирования",
      activities: [
        { id: "mv1", type: "video", title: "Интегрирование по частям", completed: true },
        { id: "mr1", type: "resource", title: "Таблица интегралов", completed: true },
        { id: "ma1", type: "assignment", title: "Задачи на интегрирование (набор 1)", dueDate: "2026-01-20", completed: true, grade: 92 }
      ]
    },
    {
      id: "mod2",
      title: "Раздел 2: Приложения интеграла",
      activities: [
        { id: "mv2", type: "video", title: "Площадь между кривыми", completed: false },
        { id: "mq1", type: "quiz", title: "Тест по интегрированию", dueDate: "2026-01-28", completed: false }
      ]
    }
  ]
};

export const assignments: Assignment[] = [
  {
    id: "a3",
    courseId: "cs101",
    title: "Задание 'Hello, World!'",
    description: "Напишите свою первую программу, которая выводит 'Hello, World!' на экран. Пришлите код в виде файла .py.",
    dueDate: "2026-01-15",
    maxPoints: 100,
    submitted: true,
    grade: 95,
    feedback: "Отличная работа! Код чистый и хорошо прокомментирован."
  },
  {
    id: "a6",
    courseId: "cs101",
    title: "Практика с переменными",
    description: "Выполните упражнения:\n1. Создайте переменные разных типов\n2. Выполните преобразование типов\n3. Практика работы со строками\n\nПришлите код с комментариями.",
    dueDate: "2026-01-25",
    maxPoints: 100,
    submitted: false
  },
  {
    id: "a9",
    courseId: "cs101",
    title: "Задание на управляющие конструкции",
    description: "Напишите программу, использующую условные операторы, циклы и функции для решения задач...",
    dueDate: "2026-02-01",
    maxPoints: 150,
    submitted: false
  }
];

export const grades: Grade[] = [
  {
    courseId: "cs101",
    courseName: "Основы программирования",
    assignments: [
      { name: "Задание 'Hello, World!'", grade: 95, maxPoints: 100, weight: 10 },
      { name: "Тест по типам данных", grade: 88, maxPoints: 100, weight: 15 },
      { name: "Экзамен (рубежный контроль)", grade: 85, maxPoints: 100, weight: 25 }
    ],
    finalGrade: 87.5
  },
  {
    courseId: "math201",
    courseName: "Математический анализ II",
    assignments: [
      { name: "Задачи на интегрирование (набор 1)", grade: 92, maxPoints: 100, weight: 20 },
      { name: "Тест по интегрированию", grade: 78, maxPoints: 100, weight: 15 }
    ],
    finalGrade: 86.2
  },
  {
    courseId: "eng150",
    courseName: "Академическое письмо",
    assignments: [
      { name: "Эссе 1: Аргументация", grade: 88, maxPoints: 100, weight: 30 },
      { name: "Черновик научной статьи", grade: 92, maxPoints: 100, weight: 20 },
      { name: "Рецензирование работы одногруппника", grade: 95, maxPoints: 100, weight: 10 }
    ],
    finalGrade: 90.5
  }
];

export const userProfile = {
  name: "Алексей Студентов",
  email: "alexey.studentov@student.ru",
  studentId: "С12345678",
  major: "Программная инженерия",
  year: "2 курс",
  gpa: 3.65,
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
};

export const videos: VideoContent[] = [
  {
    id: "v1",
    courseId: "cs101",
    title: "Добро пожаловать на курс",
    description: "Введение в курс: что вы изучите, структура курса, советы для успешного освоения программирования.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    duration: "12:34",
    transcript: `Добро пожаловать на курс "Основы программирования"! Меня зовут Анна Сергеевна Иванова, я буду вашим преподавателем.

За ближайшие 16 недель мы изучим основы программирования, алгоритмы, структуры данных и вычислительное мышление. К концу курса вы сможете писать собственные программы и решать реальные задачи с помощью кода.

На этой неделе мы:
- Настроим среду разработки
- Напишем первую программу на Python
- Познакомимся с вводом и выводом

Помните: ключ к изучению программирования – практика. Не бойтесь ошибаться – каждая ошибка даёт новый опыт!`
  },
  {
    id: "v2",
    courseId: "cs101",
    title: "Введение в переменные",
    description: "Переменные, типы данных, сохранение и обработка информации в Python.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    duration: "18:45",
    transcript: `В этом видео мы разберём одну из основ программирования – переменные.

Переменная – это именованный контейнер для значения. Представьте её как коробку с этикеткой, где можно хранить информацию.

В Python переменная создаётся просто:
name = "Анна"
age = 19
height = 1.68
is_student = True

Основные типы данных:
- строки (str): текст, например "Привет"
- целые числа (int): 42
- вещественные числа (float): 3.14
- булевы значения (bool): True/False`
  },
  {
    id: "v3",
    courseId: "cs101",
    title: "Условные операторы и циклы",
    description: "Управляющие конструкции в Python: ветвления и повторения действий.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    duration: "24:10"
  },
  {
    id: "mv1",
    courseId: "math201",
    title: "Интегрирование по частям",
    description: "Подробный разбор метода интегрирования по частям с примерами.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    duration: "31:22"
  },
  {
    id: "mv2",
    courseId: "math201",
    title: "Площадь между кривыми",
    description: "Вычисление площади фигур, ограниченных двумя и более кривыми, с помощью определённого интеграла.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    duration: "27:05"
  }
];

export const resources: Resource[] = [
  {
    id: "r1",
    courseId: "cs101",
    title: "Рабочая программа курса",
    description: "Полная рабочая программа: календарный план, система оценивания, требования к академической честности.",
    type: "pdf",
    url: "#",
    fileSize: "245 KB",
    author: "Анна Сергеевна Иванова",
    uploadedAt: "2026-01-10",
    content: `# ИНФ 101 – Основы программирования
## Рабочая программа

**Преподаватель:** Анна Сергеевна Иванова
**Часы приёма:** пн/ср 14:00–16:00, ауд. 412
**Email:** a.ivanova@uni-russia.ru

### Описание курса
Курс знакомит с основами программирования на Python. Студенты освоят методы решения вычислительных задач, алгоритмы и базовые практики разработки ПО.

### Цели обучения
- Писать программы на Python для решения вычислительных задач
- Понимать структуры данных и алгоритмы
- Применять вычислительное мышление к реальным задачам
- Систематически отлаживать и тестировать программы

### Система оценивания
- Домашние задания: 40%
- Тесты: 20%
- Рубежный контроль: 20%
- Итоговый проект: 20%

### Академическая честность
Все сдаваемые работы должны быть авторскими. Обсуждение задач разрешено, но код должен быть написан самостоятельно.`
  },
  {
    id: "r2",
    courseId: "cs101",
    title: "Шпаргалка по управляющим конструкциям",
    description: "Краткий справочник по конструкциям управления потоком в Python: if/elif/else, for, while, break/continue.",
    type: "pdf",
    url: "#",
    fileSize: "128 KB",
    author: "Анна Сергеевна Иванова",
    uploadedAt: "2026-01-28",
    content: `# Управляющие конструкции Python – шпаргалка

## Условные операторы
\`\`\`python
if условие:
    # код
elif другое_условие:
    # код
else:
    # код
\`\`\`

## Цикл for
\`\`\`python
for элемент in коллекция:
    # код

for i in range(10):
    # код
\`\`\`

## Цикл while
\`\`\`python
while условие:
    # код
    # не забыть изменить условие!
\`\`\`

## break, continue, pass
- **break**: немедленный выход из цикла
- **continue**: переход к следующей итерации
- **pass**: ничего не делает (заглушка)

## Генераторы списков
\`\`\`python
квадраты = [x**2 for x in range(10)]
чётные = [x for x in range(20) if x % 2 == 0]
\`\`\``
  },
  {
    id: "mr1",
    courseId: "math201",
    title: "Таблица интегралов",
    description: "Справочный лист с основными интегралами, техниками интегрирования и тождествами.",
    type: "pdf",
    url: "#",
    fileSize: "312 KB",
    author: "Михаил Борисович Ченцов",
    uploadedAt: "2026-01-12",
    content: `# Таблица интегралов – справочный материал

## Основные интегралы
- ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ -1
- ∫ 1/x dx = ln|x| + C
- ∫ eˣ dx = eˣ + C
- ∫ sin(x) dx = -cos(x) + C
- ∫ cos(x) dx = sin(x) + C

## Интегрирование по частям
∫ u dv = uv - ∫ v du

**Правило LIATE** (выбор u):
1. Логарифмические функции
2. Обратные тригонометрические
3. Алгебраические
4. Тригонометрические
5. Экспоненциальные

## Тригонометрические тождества
- sin²(x) + cos²(x) = 1
- sin²(x) = (1 - cos(2x))/2
- cos²(x) = (1 + cos(2x))/2`
  }
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    courseId: "cs101",
    title: "Тест по типам данных",
    description: "Проверьте знание типов данных Python, преобразования типов и базовых операций.",
    timeLimit: 20,
    maxAttempts: 3,
    questions: [
      {
        id: "q1_1",
        type: "single",
        question: "Что из перечисленного НЕ является встроенным типом данных Python?",
        options: ["int", "str", "array", "float"],
        correctAnswer: "array",
        points: 10
      },
      {
        id: "q1_2",
        type: "multiple",
        question: "Какие из следующих значений являются допустимыми булевыми значениями в Python? (Выберите все)",
        options: ["True", "False", "true", "false", "1", "0"],
        correctAnswer: ["True", "False"],
        points: 10
      },
      {
        id: "q1_3",
        type: "matching",
        question: "Сопоставьте тип данных с примером значения:",
        pairs: [
          { left: "int", right: "42" },
          { left: "float", right: "3.14" },
          { left: "str", right: '"Привет"' },
          { left: "bool", right: "True" }
        ],
        points: 20
      },
      {
        id: "q1_4",
        type: "fill",
        question: "Завершите код для преобразования строки '42' в целое число:",
        blanks: [
          { sentence: "num = ___(\"42\")", answer: "int" }
        ],
        points: 10
      },
      {
        id: "q1_5",
        type: "text",
        question: "Объясните разницу между изменяемыми и неизменяемыми типами данных в Python, приведите по одному примеру каждого.",
        points: 20
      }
    ]
  },
  {
    id: "q2",
    courseId: "cs101",
    title: "Тест по управляющим конструкциям",
    description: "Проверьте понимание условных операторов, циклов и итераций в Python.",
    timeLimit: 25,
    maxAttempts: 2,
    questions: [
      {
        id: "q2_1",
        type: "single",
        question: "Что вернёт `range(2, 10, 3)`?",
        options: ["[2, 5, 8]", "[2, 4, 6, 8, 10]", "[3, 6, 9]", "[2, 3, 4, 5, 6, 7, 8, 9]"],
        correctAnswer: "[2, 5, 8]",
        points: 10
      },
      {
        id: "q2_2",
        type: "multiple",
        question: "Какие операторы можно использовать для досрочного выхода из цикла? (Выберите все)",
        options: ["break", "continue", "pass", "return", "exit"],
        correctAnswer: ["break", "return"],
        points: 15
      },
      {
        id: "q2_3",
        type: "fill",
        question: "Допишите условие цикла while, чтобы вывести числа от 1 до 10:",
        blanks: [
          { sentence: "i = 1\nwhile i ___ 10:\n    print(i)\n    i += 1", answer: "<=" }
        ],
        points: 10
      },
      {
        id: "q2_4",
        type: "text",
        question: "Напишите цикл for на Python, который вычисляет сумму всех чётных чисел от 1 до 100.",
        points: 25
      }
    ]
  },
  {
    id: "mq1",
    courseId: "math201",
    title: "Тест по интегрированию",
    description: "Проверка навыков применения методов интегрирования: замена переменной, интегрирование по частям.",
    timeLimit: 30,
    maxAttempts: 2,
    questions: [
      {
        id: "mq1_1",
        type: "single",
        question: "Чему равен ∫ 2x dx?",
        options: ["x² + C", "2 + C", "x + C", "2x² + C"],
        correctAnswer: "x² + C",
        points: 10
      },
      {
        id: "mq1_2",
        type: "matching",
        question: "Сопоставьте интеграл с его результатом:",
        pairs: [
          { left: "∫ cos(x) dx", right: "sin(x) + C" },
          { left: "∫ sin(x) dx", right: "-cos(x) + C" },
          { left: "∫ eˣ dx", right: "eˣ + C" },
          { left: "∫ 1/x dx", right: "ln|x| + C" }
        ],
        points: 20
      },
      {
        id: "mq1_3",
        type: "fill",
        question: "Завершите формулу интегрирования по частям:",
        blanks: [
          { sentence: "∫ u dv = uv - ∫ ___ ___", answer: "v du" }
        ],
        points: 15
      },
      {
        id: "mq1_4",
        type: "text",
        question: "Вычислите ∫ x·eˣ dx методом интегрирования по частям. Покажите все шаги.",
        points: 30
      }
    ]
  }
];

// ─── Teacher / student data ───────────────────────────────────────────────────

export interface StudentGradeEntry {
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  type: 'assignment' | 'quiz';
  maxPoints: number;
  grade: number | null;
  submitted: boolean;
  submittedAt?: string;
  feedback?: string;
}

export interface StudentActivity {
  activityId: string;
  title: string;
  type: 'assignment' | 'quiz' | 'video' | 'resource' | 'forum';
  courseId: string;
  completed: boolean;
  completedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  group: string;
  year: string;
  major: string;
  enrolledCourses: string[];
  gpa: number;
  grades: StudentGradeEntry[];
  activities: StudentActivity[];
}

export const studentGroups = ['КС-А', 'КС-Б', 'МАТ-А', 'АНГ-А'];

export const students: Student[] = [
  {
    id: "s001",
    name: "Алексей Студентов",
    email: "alexey.studentov@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    group: "КС-А",
    year: "2 курс",
    major: "Программная инженерия",
    enrolledCourses: ["cs101", "math201"],
    gpa: 3.65,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 95, submitted: true, submittedAt: "2026-01-14", feedback: "Отлично, чисто и с комментариями." },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 61, submitted: true, submittedAt: "2026-01-22" },
      { assignmentId: "a6", assignmentTitle: "Практика с переменными", courseId: "cs101", type: "assignment", maxPoints: 100, grade: null, submitted: false },
      { assignmentId: "ma1", assignmentTitle: "Задачи на интегрирование (набор 1)", courseId: "math201", type: "assignment", maxPoints: 100, grade: 92, submitted: true, submittedAt: "2026-01-19", feedback: "Хорошо, метод интегрирования по частям освоен." },
      { assignmentId: "mq1", assignmentTitle: "Тест по интегрированию", courseId: "math201", type: "quiz", maxPoints: 75, grade: null, submitted: false },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "r1", title: "Рабочая программа", type: "resource", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-18" },
      { activityId: "v3", title: "Условные операторы и циклы", type: "video", courseId: "cs101", completed: false },
      { activityId: "mv1", title: "Интегрирование по частям", type: "video", courseId: "math201", completed: true, completedAt: "2026-01-15" },
      { activityId: "mv2", title: "Площадь между кривыми", type: "video", courseId: "math201", completed: false },
    ]
  },
  {
    id: "s002",
    name: "Мария Чен",
    email: "maria.chen@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    group: "КС-А",
    year: "2 курс",
    major: "Программная инженерия",
    enrolledCourses: ["cs101", "eng150"],
    gpa: 3.90,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 100, submitted: true, submittedAt: "2026-01-13", feedback: "Безупречно! Отличное комментирование." },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 68, submitted: true, submittedAt: "2026-01-21" },
      { assignmentId: "a6", assignmentTitle: "Практика с переменными", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 97, submitted: true, submittedAt: "2026-01-24", feedback: "Превосходно." },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "r1", title: "Рабочая программа", type: "resource", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-17" },
      { activityId: "v3", title: "Условные операторы и циклы", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-28" },
      { activityId: "r2", title: "Шпаргалка по управляющим конструкциям", type: "resource", courseId: "cs101", completed: true, completedAt: "2026-01-28" },
    ]
  },
  {
    id: "s003",
    name: "Давид Парк",
    email: "david.park@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    group: "КС-Б",
    year: "1 курс",
    major: "Программная инженерия",
    enrolledCourses: ["cs101"],
    gpa: 2.85,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 72, submitted: true, submittedAt: "2026-01-16", feedback: "Сдано позже срока. Логика верна, но нужно больше комментариев." },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 45, submitted: true, submittedAt: "2026-01-23" },
      { assignmentId: "a6", assignmentTitle: "Практика с переменными", courseId: "cs101", type: "assignment", maxPoints: 100, grade: null, submitted: false },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-11" },
      { activityId: "r1", title: "Рабочая программа", type: "resource", courseId: "cs101", completed: false },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-20" },
      { activityId: "v3", title: "Условные операторы и циклы", type: "video", courseId: "cs101", completed: false },
    ]
  },
  {
    id: "s004",
    name: "Сара Вильямс",
    email: "sara.williams@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    group: "КС-Б",
    year: "2 курс",
    major: "Программная инженерия",
    enrolledCourses: ["cs101", "math201"],
    gpa: 3.45,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 88, submitted: true, submittedAt: "2026-01-15" },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 58, submitted: true, submittedAt: "2026-01-22" },
      { assignmentId: "a6", assignmentTitle: "Практика с переменными", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 82, submitted: true, submittedAt: "2026-01-25" },
      { assignmentId: "ma1", assignmentTitle: "Задачи на интегрирование (набор 1)", courseId: "math201", type: "assignment", maxPoints: 100, grade: 85, submitted: true, submittedAt: "2026-01-20" },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "r1", title: "Рабочая программа", type: "resource", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-18" },
      { activityId: "v3", title: "Условные операторы и циклы", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-29" },
      { activityId: "mv1", title: "Интегрирование по частям", type: "video", courseId: "math201", completed: true, completedAt: "2026-01-16" },
    ]
  },
  {
    id: "s005",
    name: "Джеймс Томпсон",
    email: "james.thompson@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    group: "МАТ-А",
    year: "3 курс",
    major: "Прикладная математика",
    enrolledCourses: ["math201"],
    gpa: 3.75,
    grades: [
      { assignmentId: "ma1", assignmentTitle: "Задачи на интегрирование (набор 1)", courseId: "math201", type: "assignment", maxPoints: 100, grade: 96, submitted: true, submittedAt: "2026-01-18", feedback: "Отличное понимание техник интегрирования." },
      { assignmentId: "mq1", assignmentTitle: "Тест по интегрированию", courseId: "math201", type: "quiz", maxPoints: 75, grade: 70, submitted: true, submittedAt: "2026-01-27" },
    ],
    activities: [
      { activityId: "mv1", title: "Интегрирование по частям", type: "video", courseId: "math201", completed: true, completedAt: "2026-01-14" },
      { activityId: "mr1", title: "Таблица интегралов", type: "resource", courseId: "math201", completed: true, completedAt: "2026-01-14" },
      { activityId: "mv2", title: "Площадь между кривыми", type: "video", courseId: "math201", completed: true, completedAt: "2026-01-25" },
    ]
  },
  {
    id: "s006",
    name: "Прия Патель",
    email: "priya.patel@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    group: "АНГ-А",
    year: "2 курс",
    major: "Филология",
    enrolledCourses: ["eng150", "cs101"],
    gpa: 3.95,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 91, submitted: true, submittedAt: "2026-01-15" },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 63, submitted: true, submittedAt: "2026-01-22" },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "r1", title: "Рабочая программа", type: "resource", courseId: "cs101", completed: true, completedAt: "2026-01-11" },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-19" },
    ]
  },
  {
    id: "s007",
    name: "Лиам О’Брайен",
    email: "liam.obrien@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
    group: "КС-А",
    year: "1 курс",
    major: "Программная инженерия",
    enrolledCourses: ["cs101"],
    gpa: 3.10,
    grades: [
      { assignmentId: "a3", assignmentTitle: "Задание 'Hello, World!'", courseId: "cs101", type: "assignment", maxPoints: 100, grade: 80, submitted: true, submittedAt: "2026-01-15" },
      { assignmentId: "q1", assignmentTitle: "Тест по типам данных", courseId: "cs101", type: "quiz", maxPoints: 70, grade: 52, submitted: true, submittedAt: "2026-01-22" },
      { assignmentId: "a6", assignmentTitle: "Практика с переменными", courseId: "cs101", type: "assignment", maxPoints: 100, grade: null, submitted: true, submittedAt: "2026-01-26" },
    ],
    activities: [
      { activityId: "v1", title: "Добро пожаловать на курс", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-10" },
      { activityId: "v2", title: "Введение в переменные", type: "video", courseId: "cs101", completed: true, completedAt: "2026-01-19" },
      { activityId: "v3", title: "Условные операторы и циклы", type: "video", courseId: "cs101", completed: false },
    ]
  },
  {
    id: "s008",
    name: "Айша Накамура",
    email: "aisha.nakamura@student.ru",
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    group: "МАТ-А",
    year: "3 курс",
    major: "Прикладная математика",
    enrolledCourses: ["math201", "phys101"],
    gpa: 3.55,
    grades: [
      { assignmentId: "ma1", assignmentTitle: "Задачи на интегрирование (набор 1)", courseId: "math201", type: "assignment", maxPoints: 100, grade: 88, submitted: true, submittedAt: "2026-01-20" },
      { assignmentId: "mq1", assignmentTitle: "Тест по интегрированию", courseId: "math201", type: "quiz", maxPoints: 75, grade: 62, submitted: true, submittedAt: "2026-01-28" },
    ],
    activities: [
      { activityId: "mv1", title: "Интегрирование по частям", type: "video", courseId: "math201", completed: true, completedAt: "2026-01-15" },
      { activityId: "mr1", title: "Таблица интегралов", type: "resource", courseId: "math201", completed: true, completedAt: "2026-01-16" },
      { activityId: "mv2", title: "Площадь между кривыми", type: "video", courseId: "math201", completed: false },
    ]
  }
];

// ─── Course Catalog (courses available to enroll in) ─────────────────────────

export interface CatalogCourse {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  color: string;
  imageUrl: string;
  credits: number;
  category: string;
  enrolled: number;
  capacity: number;
  schedule: string;
  prerequisites: string[];
  rating: number;
  tags: string[];
  alreadyEnrolled?: boolean;
}

export const catalogCourses: CatalogCourse[] = [
  {
    id: "cs101", name: "Основы программирования", code: "ИНФ 101",
    description: "Изучите основы программирования и компьютерных наук на Python.",
    instructor: "Анна Сергеевна Иванова", color: "bg-blue-500",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    credits: 3, category: "Информатика", enrolled: 156, capacity: 200,
    schedule: "пн/ср 10:00–11:40", prerequisites: [], rating: 4.8,
    tags: ["программирование", "python", "начальный"], alreadyEnrolled: true
  },
  {
    id: "math201", name: "Математический анализ II", code: "МАТ 201",
    description: "Продвинутый анализ: интегралы, ряды, приложения.",
    instructor: "Михаил Борисович Ченцов", color: "bg-green-500",
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    credits: 4, category: "Математика", enrolled: 92, capacity: 120,
    schedule: "вт/чт 12:20–13:50", prerequisites: ["МАТ 101"], rating: 4.5,
    tags: ["математический анализ", "интегралы"], alreadyEnrolled: true
  },
  {
    id: "eng150", name: "Академическое письмо", code: "РУС 150",
    description: "Развитие навыков академического письма и научной коммуникации.",
    instructor: "Елена Викторовна Браун", color: "bg-purple-500",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    credits: 3, category: "Русский язык", enrolled: 134, capacity: 150,
    schedule: "пн/пт 14:00–15:30", prerequisites: [], rating: 4.6,
    tags: ["письмо", "исследования"], alreadyEnrolled: true
  },
  {
    id: "phys101", name: "Физика I", code: "ФИЗ 101",
    description: "Классическая механика и термодинамика.",
    instructor: "Дмитрий Алексеевич Вильсон", color: "bg-orange-500",
    imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80",
    credits: 4, category: "Физика", enrolled: 78, capacity: 100,
    schedule: "пн/ср/пт 8:30–10:00", prerequisites: ["МАТ 101"], rating: 4.3,
    tags: ["физика", "механика", "лаборатория"]
  },
  {
    id: "cs201", name: "Структуры данных и алгоритмы", code: "ИНФ 201",
    description: "Массивы, списки, деревья, графы, сложность алгоритмов.",
    instructor: "Проф. Алан Тьюринг (мл.)", color: "bg-blue-600",
    imageUrl: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80",
    credits: 4, category: "Информатика", enrolled: 112, capacity: 150,
    schedule: "вт/чт 10:00–11:40", prerequisites: ["ИНФ 101"], rating: 4.7,
    tags: ["алгоритмы", "структуры данных"]
  },
  {
    id: "cs301", name: "Веб-разработка", code: "ИНФ 301",
    description: "Полнофункциональная веб-разработка: HTML, CSS, JavaScript, React.",
    instructor: "Лиза Парк", color: "bg-cyan-500",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    credits: 3, category: "Информатика", enrolled: 180, capacity: 180,
    schedule: "ср/пт 15:40–17:10", prerequisites: ["ИНФ 101"], rating: 4.9,
    tags: ["веб", "javascript", "react"]
  },
  {
    id: "bio101", name: "Биология I", code: "БИО 101",
    description: "Клеточная биология, генетика, эволюция, экология.",
    instructor: "Нина Ковальская", color: "bg-emerald-500",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80",
    credits: 4, category: "Биология", enrolled: 200, capacity: 250,
    schedule: "пн/ср 12:20–13:50", prerequisites: [], rating: 4.4,
    tags: ["биология", "генетика", "лаборатория"]
  },
  {
    id: "hist101", name: "Всемирная история I", code: "ИСТ 101",
    description: "Цивилизации древности до раннего Нового времени.",
    instructor: "Проф. Шарль Дюбуа", color: "bg-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&q=80",
    credits: 3, category: "История", enrolled: 145, capacity: 200,
    schedule: "вт/чт 8:30–10:00", prerequisites: [], rating: 4.2,
    tags: ["история", "цивилизации"]
  },
  {
    id: "chem101", name: "Общая химия I", code: "ХИМ 101",
    description: "Строение атома, хим. связь, стехиометрия, термохимия.",
    instructor: "Вэй Чжан", color: "bg-teal-500",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    credits: 4, category: "Химия", enrolled: 88, capacity: 120,
    schedule: "пн/ср/пт 10:00–11:40", prerequisites: [], rating: 4.1,
    tags: ["химия", "лаборатория"]
  },
  {
    id: "psyc101", name: "Введение в психологию", code: "ПСИ 101",
    description: "Основные психологические теории, методы исследования, приложения.",
    instructor: "Рахиль Грин", color: "bg-pink-500",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    credits: 3, category: "Психология", enrolled: 220, capacity: 300,
    schedule: "вт/чт 14:00–15:30", prerequisites: [], rating: 4.7,
    tags: ["психология", "социальные науки"]
  },
  {
    id: "math101", name: "Математический анализ I", code: "МАТ 101",
    description: "Пределы, производные, введение в интегрирование.",
    instructor: "Михаил Борисович Ченцов", color: "bg-lime-600",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    credits: 4, category: "Математика", enrolled: 175, capacity: 200,
    schedule: "пн/ср/пт 14:00–15:30", prerequisites: [], rating: 4.4,
    tags: ["математический анализ", "производные"]
  },
  {
    id: "cs401", name: "Машинное обучение", code: "ИНФ 401",
    description: "Обучение с учителем/без учителя, нейронные сети, проекты ML.",
    instructor: "Юки Танака", color: "bg-violet-600",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    credits: 4, category: "Информатика", enrolled: 95, capacity: 100,
    schedule: "вт/чт 15:40–17:10", prerequisites: ["ИНФ 201", "МАТ 201"], rating: 4.9,
    tags: ["ИИ", "машинное обучение"]
  }
];

export const courseCategories = [...new Set(catalogCourses.map(c => c.category))];

// ─── Chat messages ────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  authorRole: 'student' | 'teacher';
  authorAvatar: string;
  content: string;
  timestamp: string;
  edited?: boolean;
}

export const chatMessages: ChatMessage[] = [
  {
    id: "msg1", courseId: "cs101", authorId: "teacher1",
    authorName: "Анна Сергеевна Иванова", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    content: "Добро пожаловать на курс 'Основы программирования'! Здесь можно задавать вопросы по лекциям, заданиям и всему, что связано с курсом. Я проверяю чат ежедневно.",
    timestamp: "2026-01-10T09:00:00"
  },
  {
    id: "msg2", courseId: "cs101", authorId: "s001",
    authorName: "Алексей Студентов", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    content: "Здравствуйте, Анна Сергеевна! Вопрос по заданию 'Hello, World!' – нужно ли добавлять docstring в начало файла?",
    timestamp: "2026-01-10T14:23:00"
  },
  {
    id: "msg3", courseId: "cs101", authorId: "teacher1",
    authorName: "Анна Сергеевна Иванова", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    content: "Хороший вопрос, Алексей! Да, пожалуйста, добавьте docstring с вашими именем, номером студенческого и кратким описанием программы – это хорошая практика.",
    timestamp: "2026-01-10T15:00:00"
  },
  {
    id: "msg4", courseId: "cs101", authorId: "s002",
    authorName: "Мария Чен", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    content: "Спасибо за уточнение! А можно использовать f-строки для вывода, или лучше придерживаться обычного print() с конкатенацией?",
    timestamp: "2026-01-11T10:15:00"
  },
  {
    id: "msg5", courseId: "cs101", authorId: "teacher1",
    authorName: "Анна Сергеевна Иванова", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    content: "f-строки вполне допустимы! На 2 неделе мы их формально разберём, но если вы уже умеете – пользуйтесь.",
    timestamp: "2026-01-11T11:30:00"
  },
  {
    id: "msg6", courseId: "cs101", authorId: "s007",
    authorName: "Лиам О’Брайен", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
    content: "У меня на 3 строке SyntaxError, не могу понять причину. У кого-то были проблемы с форматом сдачи?",
    timestamp: "2026-01-13T18:45:00"
  },
  {
    id: "msg7", courseId: "cs101", authorId: "s002",
    authorName: "Мария Чен", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    content: "Лиам, возможно, пропущено двоеточие после определения функции? Например, `def main()` без двоеточия – частая ошибка.",
    timestamp: "2026-01-13T19:02:00"
  },
  {
    id: "msg8", courseId: "cs101", authorId: "s007",
    authorName: "Лиам О’Брайен", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
    content: "Точно! Спасибо, Мария 🙏",
    timestamp: "2026-01-13T19:10:00"
  },
  {
    id: "msg9", courseId: "cs101", authorId: "teacher1",
    authorName: "Анна Сергеевна Иванова", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    content: "📢 Напоминание: конспекты второй недели загружены в раздел 'Ресурсы'. Просмотрите их до вторника. Будем детально разбирать переменные и типы данных.",
    timestamp: "2026-01-17T08:00:00"
  },
  {
    id: "msg10", courseId: "cs101", authorId: "s006",
    authorName: "Прия Патель", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    content: "Анна Сергеевна, я заметила, что задание 'Практика с переменными' имеет другой формат, чем первое. Нужно сдавать один .py файл или zip с несколькими файлами?",
    timestamp: "2026-01-18T16:30:00"
  },
  {
    id: "msg11", courseId: "cs101", authorId: "teacher1",
    authorName: "Анна Сергеевна Иванова", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    content: "Один .py файл! Поместите все решения в один файл, чётко разделив их комментариями. Например:\n\n# Упражнение 1: Объявление переменных\n...\n\n# Упражнение 2: Преобразование типов\n...",
    timestamp: "2026-01-18T17:15:00"
  },
  {
    id: "msg12", courseId: "cs101", authorId: "s001",
    authorName: "Алексей Студентов", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    content: "Всем привет! В университетской библиотеке по четвергам в 17:00 (ауд. 204) собирается группа по Python. Может быть полезно для тех, кто разбирает задания!",
    timestamp: "2026-01-20T12:00:00"
  },
  {
    id: "msg13", courseId: "math201", authorId: "teacher2",
    authorName: "Михаил Борисович Ченцов", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    content: "Здравствуйте, студенты! Добро пожаловать на матанализ II. Здесь можно задавать вопросы по курсу, получать подсказки. Часы приёма: пн/ср 14:00-16:00, матем. корпус ауд. 312.",
    timestamp: "2026-01-10T08:30:00"
  },
  {
    id: "msg14", courseId: "math201", authorId: "s005",
    authorName: "Джеймс Томпсон", authorRole: "student",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    content: "Михаил Борисович, при выборе u и dv для интегрирования по частям – правило LIATE всегда оптимально или есть исключения?",
    timestamp: "2026-01-15T20:11:00"
  },
  {
    id: "msg15", courseId: "math201", authorId: "teacher2",
    authorName: "Михаил Борисович Ченцов", authorRole: "teacher",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    content: "Отличный вопрос, Джеймс! LIATE – это рекомендация, а не строгое правило. Иногда 'неправильный' по LIATE выбор даёт более простой интеграл. Старайтесь выбирать u так, чтобы du было проще, а dv легко интегрировалось. Практика решает!",
    timestamp: "2026-01-15T21:00:00"
  }
];

// ─── My Files ─────────────────────────────────────────────────────────────────

export interface UserFile {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'document' | 'image' | 'archive';
  size: string;
  courseId?: string;
  uploadedAt: string;
  url: string;
}

export const userFiles: UserFile[] = [
  { id: "f1", name: "hello_world.py", type: "code", size: "1.2 КБ", courseId: "cs101", uploadedAt: "2026-01-14", url: "#" },
  { id: "f2", name: "variables_practice.py", type: "code", size: "3.8 КБ", courseId: "cs101", uploadedAt: "2026-01-26", url: "#" },
  { id: "f3", name: "ИНФ101_конспект_неделя1.pdf", type: "pdf", size: "512 КБ", courseId: "cs101", uploadedAt: "2026-01-12", url: "#" },
  { id: "f4", name: "ИНФ101_конспект_неделя2.pdf", type: "pdf", size: "748 КБ", courseId: "cs101", uploadedAt: "2026-01-19", url: "#" },
  { id: "f5", name: "интегрирование_практика.pdf", type: "pdf", size: "1.1 МБ", courseId: "math201", uploadedAt: "2026-01-17", url: "#" },
  { id: "f6", name: "МАТ201_задачи.docx", type: "document", size: "234 КБ", courseId: "math201", uploadedAt: "2026-01-19", url: "#" },
  { id: "f7", name: "студенческий_скан.pdf", type: "pdf", size: "320 КБ", uploadedAt: "2026-01-08", url: "#" },
  { id: "f8", name: "расписание_весна2026.pdf", type: "pdf", size: "180 КБ", uploadedAt: "2026-01-09", url: "#" },
  { id: "f9", name: "ссылки_исследования.docx", type: "document", size: "88 КБ", uploadedAt: "2026-01-22", url: "#" },
];

// ─── Announcements (новости с российскими реалиями) ────────────────────────────

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: 'academic' | 'event' | 'admin' | 'alert' | 'sports';
  imageUrl?: string;
  publishedAt: string;
  pinned?: boolean;
  tags: string[];
}

export const announcements: Announcement[] = [
  {
    id: "ann1",
    title: "Регистрация на весенний семестр 2026 года",
    summary: "Приоритетная регистрация для старшекурсников с 20 января. Для всех студентов — с 24 января.",
    content: `Открыта регистрация на весенний семестр 2026 года.

**Важные даты:**
- 20 января: приоритетная регистрация (студенты 3–4 курсов)
- 24 января: общая регистрация
- 10 февраля: последний день добавления/отмены курсов без штрафа
- 1 марта: последний день отчисления с оценкой "W"

Для регистрации войдите в личный кабинет и выберите раздел "Регистрация на курсы". При вопросах обращайтесь в деканат.`,
    author: "Учебный отдел",
    authorRole: "Администрация",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    category: "academic",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    publishedAt: "2026-01-15T09:00:00",
    pinned: true,
    tags: ["регистрация", "учебный процесс"]
  },
  {
    id: "ann2",
    title: "Библиотека работает круглосуточно в сессию",
    summary: "С 28 января по 5 февраля главная библиотека открыта 24/7 для подготовки к экзаменам.",
    content: `В период экзаменов библиотека университета переходит на круглосуточный режим работы.

**График:**
- 28 января – 5 февраля: 24 часа в сутки, без выходных
- Компьютерные классы также доступны круглосуточно
- Зоны тишины и групповые комнаты работают в обычном режиме
- Дежурные библиотекари до полуночи

Дополнительные услуги:
- Выдача ноутбуков (по предварительной записи)
- Увеличенный срок возврата книг — без штрафов в сессию
- Виртуальная справочная служба в чате после полуночи

Не забывайте студенческий билет для входа в ночное время.`,
    author: "Научная библиотека",
    authorRole: "Студенческие сервисы",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    category: "academic",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    publishedAt: "2026-01-18T10:00:00",
    pinned: true,
    tags: ["библиотека", "сессия", "подготовка"]
  },
  {
    id: "ann3",
    title: "Всероссийский конкурс студенческих проектов «Будущее России – 2026» — приём заявок до 20 февраля",
    summary: "Конкурс проходит в Улан-Удэ. Победители получат гранты до 500 000 ₽ и путёвки на стажировку в ведущие компании.",
    content: `Бурятский государственный университет совместно с Министерством науки и высшего образования РФ проводит Всероссийский конкурс студенческих проектов «Будущее России – 2026». Финал состоится в Улан-Удэ (Республика Бурятия).

**Номинации:**
- IT и цифровые технологии
- Экология и устойчивое развитие
- Социальное предпринимательство
- Инженерные решения
- Медицина будущего

**Призы:**
- Гранты на развитие проекта: до 500 000 ₽
- Путёвки на стажировку в компании-партнёры (Росатом, Яндекс, Сбер)
- Публикация в сборнике РИНЦ
- Спецприз от Главы Бурятии

**Как подать заявку:**
До 20 февраля заполните анкету на портале студенческих проектов (раздел «Конкурсы»). Требуется краткое описание идеи (до 1500 знаков) и видеопрезентация (до 3 минут).

Финал – 15–17 марта 2026 года в Улан-Удэ. Организаторы оплачивают проезд и проживание финалистам.`,
    author: "Департамент науки и инноваций",
    authorRole: "Оргкомитет",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    category: "event",
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80",
    publishedAt: "2026-01-19T11:30:00",
    tags: ["конкурс", "Улан-Удэ", "грант", "проекты"]
  },
  {
    id: "ann4",
    title: "Повышение академической стипендии с 1 февраля",
    summary: "Стипендии отличникам и хорошистам вырастут на 15%, размер господдержки составит до 4 500 ₽ в месяц.",
    content: `В соответствии с приказом Минобрнауки, с 1 февраля 2026 года базовые размеры государственных академических стипендий увеличиваются на 15%.

**Новые размеры:**
- Студенты, сдавшие сессию без троек: 3 200 ₽/мес.
- Студенты-отличники (только «отлично»): 4 500 ₽/мес.
- Студенты из льготных категорий (сироты, инвалиды): 6 000 ₽/мес.
- Повышенная стипендия за особые достижения (научные публикации, победы в олимпиадах): до 10 000 ₽/мес.

Выплата за январь будет произведена по старым нормативам, с февраля – по новым. Перерасчёт происходит автоматически. При возникновении вопросов обращайтесь в стипендиальную комиссию (каб. 230, главный корпус).

«Мы стремимся поддержать талантливых студентов и создать условия для их научного роста», – прокомментировал проректор по учебной работе.`,
    author: "Управление социального развития",
    authorRole: "Социальная поддержка",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    category: "admin",
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80",
    publishedAt: "2026-01-21T14:00:00",
    pinned: true,
    tags: ["стипендия", "финансы", "поддержка"]
  },
  {
    id: "ann5",
    title: "Карьерная ярмарка «Весна-2026» — более 50 российских компаний",
    summary: "12 февраля в спортивном комплексе. Вакансии стажировок и выпускников от Сбера, Яндекса, Росатома, Газпрома и других.",
    content: `Центр карьеры приглашает на Весеннюю карьерную ярмарку 12 февраля 2026 года с 10:00 до 16:00 в спорткомплексе.

**Компании-участники:**
- IT и телеком: Яндекс, СберТех, VK, Ростелеком
- Финансы: Сбер, ВТБ, Альфа-Банк
- Промышленность: Росатом, Ростех, Газпром нефть
- Консалтинг: Яндекс.Практикум, Skillbox
- И ещё 40+ компаний из разных отраслей!

**Советы для участников:**
- Загрузите резюме в «Карьерный портал» до 10 февраля
- Изучите список компаний и выберите 5 приоритетных
- Подготовьте 30-секундный рассказ о себе
- Дресс-код: деловой или бизнес-кэжуал
- Возьмите 15–20 копий резюме

Бесплатные консультации по резюме – с 27 января по 9 февраля в Центре карьеры (ауд. 205, Студенческий центр).`,
    author: "Центр карьеры",
    authorRole: "Студенческие сервисы",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    category: "event",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    publishedAt: "2026-01-22T09:00:00",
    tags: ["карьера", "вакансии", "работа"]
  },
  {
    id: "ann6",
    title: "⚠️ Фишинговая атака: мошенники рассылают письма о «дополнительной стипендии»",
    summary: "Не открывайте ссылки и не сообщайте личные данные. Университет никогда не запрашивает пароль по e-mail.",
    content: `Служба информационной безопасности фиксирует массовую рассылку мошеннических писем студентам. Тема письма: «Вам начислена дополнительная стипендия в 10 000 ₽».

**Что делать:**
- НЕ переходите по ссылкам в письме
- НЕ вводите логин, пароль или финансовые данные
- НЕ отвечайте отправителю

Подлинные письма от университета не содержат подозрительных вложений и всегда подписаны в домене @uni-russia.ru.

Если вы получили такое письмо – сообщите на security@uni-russia.ru и удалите его. Если вы перешли по ссылке или ввели данные – немедленно смените пароль и обратитесь в техподдержку (тел. 5000).`,
    author: "Отдел информационной безопасности",
    authorRole: "Администрация",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    category: "alert",
    publishedAt: "2026-01-23T14:00:00",
    pinned: true,
    tags: ["безопасность", "фишинг", "мошенничество"]
  },
  {
    id: "ann7",
    title: "Баскетбольная команда «Университет» вышла в финал Центральной лиги!",
    summary: "Мужская команда обыграла СФУ со счётом 78:65 и сыграет в финале 2 февраля.",
    content: `В напряжённом матче команда нашего университета одержала победу над студентами СФУ – 78:65 и вышла в финал Центральной студенческой баскетбольной лиги!

Это лучший результат команды за последние 10 лет.

**Финал:**
- Дата: 2 февраля 2026
- Время: 19:00
- Место: Универсальный спортивный зал (главный корпус)

**Просмотр на кампусе:**
В холле студенческого центра организуется фан-зона с большим экраном. Начало в 18:30. Будет бесплатный попкорн и лимонад!

Болельщикам – вход свободный. Поддержим наших!`,
    author: "Спортивный клуб",
    authorRole: "Студенческие активности",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    publishedAt: "2026-01-24T08:00:00",
    tags: ["спорт", "баскетбол", "финал"]
  },
  {
    id: "ann8",
    title: "Новые ресурсы психологической поддержки – расширен график Центра психологии",
    summary: "Центр психологической помощи теперь работает до 20:00 по будням. Возможны онлайн-консультации.",
    content: `Центр психологической поддержки расширяет часы работы и вводит дополнительные форматы для студентов.

**Новые возможности:**
- Приём до 20:00 по понедельникам, средам и четвергам
- Групповые тренинги по управлению стрессом и подготовке к сессии
- Онлайн-консультации через портал студента

**Где записаться:**
- Студенческий портал → раздел «Психологическая помощь»
- Телефон: 62-00
- Лично: корпус студенческого здоровья, каб. 110 (пн–пт 9:00–17:00)

**Круглосуточная кризисная линия:**
Горячая линия доверия: 8-800-555-35-35
Университетская кризисная поддержка: 69-11

Ваше ментальное здоровье важно – не стесняйтесь обращаться за помощью.`,
    author: "Центр психологической поддержки",
    authorRole: "Здоровье студентов",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    category: "admin",
    publishedAt: "2026-01-25T10:00:00",
    tags: ["психология", "здоровье", "поддержка"]
  }
];

// ─── Schedule ─────────────────────────────────────────────────────────────────

export const lessonSlots = [
  { slot: 1, start: "8:30", end: "10:00" },
  { slot: 2, start: "10:00", end: "11:40" },
  { slot: 3, start: "12:20", end: "13:50" },
  { slot: 4, start: "14:00", end: "15:30" },
  { slot: 5, start: "15:40", end: "17:10" },
  { slot: 6, start: "17:20", end: "18:50" },
  { slot: 7, start: "19:00", end: "20:30" },
  { slot: 8, start: "20:40", end: "22:10" },
];

export const weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

export interface ScheduleEntry {
  id: string;
  group: string;
  dayOfWeek: number; // 1=Пн … 6=Сб
  slot: number; // 1–8
  courseCode: string;
  courseName: string;
  teacherName: string;
  auditory: string;
  type: 'lecture' | 'seminar' | 'lab' | 'practice';
}

export const scheduleEntries: ScheduleEntry[] = [
  // КС-А
  { id: "sch1",  group: "КС-А", dayOfWeek: 1, slot: 2, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "А-204", type: "lecture" },
  { id: "sch2",  group: "КС-А", dayOfWeek: 1, slot: 4, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-112", type: "lecture" },
  { id: "sch3",  group: "КС-А", dayOfWeek: 2, slot: 1, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-305", type: "seminar" },
  { id: "sch4",  group: "КС-А", dayOfWeek: 2, slot: 3, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "ЛАБ-2", type: "lab" },
  { id: "sch5",  group: "КС-А", dayOfWeek: 3, slot: 2, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-112", type: "practice" },
  { id: "sch6",  group: "КС-А", dayOfWeek: 3, slot: 5, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-301", type: "lecture" },
  { id: "sch7",  group: "КС-А", dayOfWeek: 4, slot: 1, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "А-204", type: "lecture" },
  { id: "sch8",  group: "КС-А", dayOfWeek: 4, slot: 4, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "Д-101", type: "lecture" },
  { id: "sch9",  group: "КС-А", dayOfWeek: 5, slot: 3, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-210", type: "seminar" },
  { id: "sch10", group: "КС-А", dayOfWeek: 5, slot: 5, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "ЛАБ-1", type: "lab" },
  // КС-Б
  { id: "sch11", group: "КС-Б", dayOfWeek: 1, slot: 1, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "А-205", type: "lecture" },
  { id: "sch12", group: "КС-Б", dayOfWeek: 1, slot: 3, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-113", type: "lecture" },
  { id: "sch13", group: "КС-Б", dayOfWeek: 2, slot: 2, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "ЛАБ-3", type: "lab" },
  { id: "sch14", group: "КС-Б", dayOfWeek: 2, slot: 4, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-302", type: "seminar" },
  { id: "sch15", group: "КС-Б", dayOfWeek: 3, slot: 1, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-113", type: "practice" },
  { id: "sch16", group: "КС-Б", dayOfWeek: 4, slot: 2, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "А-205", type: "lecture" },
  { id: "sch17", group: "КС-Б", dayOfWeek: 4, slot: 5, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "Д-102", type: "lecture" },
  { id: "sch18", group: "КС-Б", dayOfWeek: 5, slot: 2, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-210", type: "seminar" },
  { id: "sch19", group: "КС-Б", dayOfWeek: 5, slot: 4, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "ЛАБ-1", type: "lab" },
  { id: "sch20", group: "КС-Б", dayOfWeek: 6, slot: 2, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-305", type: "lecture" },
  // МАТ-А
  { id: "sch21", group: "МАТ-А", dayOfWeek: 1, slot: 2, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-201", type: "lecture" },
  { id: "sch22", group: "МАТ-А", dayOfWeek: 1, slot: 4, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "Д-103", type: "lecture" },
  { id: "sch23", group: "МАТ-А", dayOfWeek: 2, slot: 3, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-201", type: "practice" },
  { id: "sch24", group: "МАТ-А", dayOfWeek: 3, slot: 1, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "ЛАБ-4", type: "lab" },
  { id: "sch25", group: "МАТ-А", dayOfWeek: 3, slot: 3, courseCode: "МАТ 201",    courseName: "Математический анализ II",    teacherName: "Михаил Борисович Ченцов",  auditory: "Б-202", type: "seminar" },
  { id: "sch26", group: "МАТ-А", dayOfWeek: 4, slot: 4, courseCode: "ХИМ 101",    courseName: "Общая химия I",               teacherName: "Вэй Чжан",                   auditory: "ХИМ-1", type: "lecture" },
  { id: "sch27", group: "МАТ-А", dayOfWeek: 5, slot: 2, courseCode: "ХИМ 101",    courseName: "Общая химия I",               teacherName: "Вэй Чжан",                   auditory: "ХИМ-ЛАБ", type: "lab" },
  { id: "sch28", group: "МАТ-А", dayOfWeek: 5, slot: 5, courseCode: "ФИЗ 101",    courseName: "Физика I",                    teacherName: "Дмитрий Алексеевич Вильсон", auditory: "Д-103", type: "practice" },
  // АНГ-А
  { id: "sch31", group: "АНГ-А", dayOfWeek: 1, slot: 3, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-401", type: "lecture" },
  { id: "sch32", group: "АНГ-А", dayOfWeek: 2, slot: 1, courseCode: "ИСТ 101",    courseName: "Всемирная история I",         teacherName: "Проф. Шарль Дюбуа",          auditory: "Е-201", type: "lecture" },
  { id: "sch33", group: "АНГ-А", dayOfWeek: 2, slot: 4, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "ЛАБ-5", type: "lab" },
  { id: "sch34", group: "АНГ-А", dayOfWeek: 3, slot: 2, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-401", type: "seminar" },
  { id: "sch35", group: "АНГ-А", dayOfWeek: 3, slot: 5, courseCode: "ИСТ 101",    courseName: "Всемирная история I",         teacherName: "Проф. Шарль Дюбуа",          auditory: "Е-202", type: "seminar" },
  { id: "sch36", group: "АНГ-А", dayOfWeek: 4, slot: 1, courseCode: "ИНФ 101",   courseName: "Основы программирования",     teacherName: "Анна Сергеевна Иванова",   auditory: "А-204", type: "lecture" },
  { id: "sch37", group: "АНГ-А", dayOfWeek: 5, slot: 3, courseCode: "РУС 150",    courseName: "Академическое письмо",        teacherName: "Елена Викторовна Браун",    auditory: "В-402", type: "practice" },
  { id: "sch38", group: "АНГ-А", dayOfWeek: 5, slot: 5, courseCode: "ИСТ 101",    courseName: "Всемирная история I",         teacherName: "Проф. Шарль Дюбуа",          auditory: "Е-201", type: "lecture" },
];

export const teacherNames = [
  "Анна Сергеевна Иванова",
  "Михаил Борисович Ченцов",
  "Елена Викторовна Браун",
  "Дмитрий Алексеевич Вильсон",
  "Вэй Чжан",
  "Проф. Шарль Дюбуа",
];