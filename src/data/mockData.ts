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
    id: "1",
    name: "Introduction to Computer Science",
    code: "CS 101",
    description: "Learn the fundamentals of programming and computer science",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    color: "bg-blue-500",
    enrolled: 156,
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80"
  },
  {
    id: "math201",
    name: "Calculus II",
    code: "MATH 201",
    description: "Advanced calculus including integration techniques and series",
    instructor: "Prof. Michael Chen",
    progress: 45,
    color: "bg-green-500",
    enrolled: 92,
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80"
  },
  {
    id: "eng150",
    name: "Academic Writing",
    code: "ENG 150",
    description: "Develop your academic writing and research skills",
    instructor: "Dr. Emily Brown",
    progress: 80,
    color: "bg-purple-500",
    enrolled: 134,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
  },
  {
    id: "phys101",
    name: "Physics I",
    code: "PHYS 101",
    description: "Classical mechanics and thermodynamics",
    instructor: "Dr. James Wilson",
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
      title: "Week 1: Introduction to Programming",
      activities: [
        { id: "v1", type: "video", title: "Welcome to CS 101", completed: true },
        { id: "r1", type: "resource", title: "Course Syllabus", completed: true },
        { id: "a3", type: "assignment", title: "Hello World Assignment", dueDate: "2026-01-15", completed: true, grade: 95 }
      ]
    },
    {
      id: "mod2",
      title: "Week 2: Variables and Data Types",
      activities: [
        { id: "v2", type: "video", title: "Introduction to Variables", completed: true },
        { id: "q1", type: "quiz", title: "Data Types Quiz", dueDate: "2026-01-22", completed: true, grade: 88 },
        { id: "a6", type: "assignment", title: "Variables Practice", dueDate: "2026-01-25", completed: false }
      ]
    },
    {
      id: "mod3",
      title: "Week 3: Control Structures",
      activities: [
        { id: "v3", type: "video", title: "If Statements and Loops", completed: false },
        { id: "r2", type: "resource", title: "Control Flow Cheat Sheet", completed: false },
        { id: "q2", type: "quiz", title: "Control Structures Quiz", dueDate: "2026-02-05", completed: false },
        { id: "a9", type: "assignment", title: "Control Flow Assignment", dueDate: "2026-02-01", completed: false }
      ]
    }
  ],
  math201: [
    {
      id: "mod1",
      title: "Unit 1: Integration Techniques",
      activities: [
        { id: "mv1", type: "video", title: "Integration by Parts", completed: true },
        { id: "mr1", type: "resource", title: "Integration Formulas Reference", completed: true },
        { id: "ma1", type: "assignment", title: "Practice Problems Set 1", dueDate: "2026-01-20", completed: true, grade: 92 }
      ]
    },
    {
      id: "mod2",
      title: "Unit 2: Applications of Integration",
      activities: [
        { id: "mv2", type: "video", title: "Area Between Curves", completed: false },
        { id: "mq1", type: "quiz", title: "Integration Quiz", dueDate: "2026-01-28", completed: false }
      ]
    }
  ]
};

export const assignments: Assignment[] = [
  {
    id: "a3",
    courseId: "cs101",
    title: "Hello World Assignment",
    description: "Create your first program that prints 'Hello World' to the console. Submit your code as a .py file.",
    dueDate: "2026-01-15",
    maxPoints: 100,
    submitted: true,
    grade: 95,
    feedback: "Great work! Your code is clean and well-commented."
  },
  {
    id: "a6",
    courseId: "cs101",
    title: "Variables Practice",
    description: "Complete the following exercises:\n1. Create variables of different data types\n2. Perform type conversions\n3. Practice string manipulation\n\nSubmit your code with comments explaining each step.",
    dueDate: "2026-01-25",
    maxPoints: 100,
    submitted: false
  },
  {
    id: "a9",
    courseId: "cs101",
    title: "Control Flow Assignment",
    description: "Write a program that uses if statements, loops, and functions to solve the following problems...",
    dueDate: "2026-02-01",
    maxPoints: 150,
    submitted: false
  }
];

export const grades: Grade[] = [
  {
    courseId: "cs101",
    courseName: "Introduction to Computer Science",
    assignments: [
      { name: "Hello World Assignment", grade: 95, maxPoints: 100, weight: 10 },
      { name: "Data Types Quiz", grade: 88, maxPoints: 100, weight: 15 },
      { name: "Midterm Exam", grade: 85, maxPoints: 100, weight: 25 }
    ],
    finalGrade: 87.5
  },
  {
    courseId: "math201",
    courseName: "Calculus II",
    assignments: [
      { name: "Practice Problems Set 1", grade: 92, maxPoints: 100, weight: 20 },
      { name: "Integration Quiz", grade: 78, maxPoints: 100, weight: 15 }
    ],
    finalGrade: 86.2
  },
  {
    courseId: "eng150",
    courseName: "Academic Writing",
    assignments: [
      { name: "Essay 1: Argumentative Writing", grade: 88, maxPoints: 100, weight: 30 },
      { name: "Research Paper Draft", grade: 92, maxPoints: 100, weight: 20 },
      { name: "Peer Review Assignment", grade: 95, maxPoints: 100, weight: 10 }
    ],
    finalGrade: 90.5
  }
];

export const userProfile = {
  name: "Alex Student",
  email: "alex.student@university.edu",
  studentId: "S12345678",
  major: "Computer Science",
  year: "Sophomore",
  gpa: 3.65,
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
};

export const videos: VideoContent[] = [
  {
    id: "1",
    courseId: "cs101",
    title: "Welcome to CS 101",
    description: "An introduction to the course, covering what you will learn, how the course is structured, and tips for success in computer science.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    duration: "12:34",
    transcript: `Welcome to Introduction to Computer Science! I'm Dr. Sarah Johnson, and I'll be your instructor for this course.

Over the next 16 weeks, we'll explore the fundamentals of programming, algorithms, data structures, and computational thinking. By the end of this course, you'll have the skills to write your own programs and solve real-world problems using code.

Let's start by talking about what computer science actually is. Computer science is not just about computers — it's about problem-solving. We use computers as tools to solve complex problems efficiently.

This week, we'll cover:
- Setting up your development environment
- Writing your first Python program
- Understanding basic input and output

Remember, the key to learning programming is practice. Don't be afraid to make mistakes — every error is a learning opportunity!`
  },
  {
    id: "v2",
    courseId: "cs101",
    title: "Introduction to Variables",
    description: "Learn about variables, data types, and how to store and manipulate information in Python programs.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    duration: "18:45",
    transcript: `In this video, we'll dive into one of the most fundamental concepts in programming: variables.

A variable is a named container that holds a value. Think of it like a labeled box where you can store information and retrieve it later.

In Python, creating a variable is simple:
name = "Alice"
age = 25
height = 5.7
is_student = True

Python is dynamically typed, which means you don't need to declare the type of a variable — Python figures it out automatically based on the value you assign.

We have several basic data types:
- Strings (str): Text data, like "Hello World"
- Integers (int): Whole numbers, like 42
- Floats (float): Decimal numbers, like 3.14
- Booleans (bool): True or False values`
  },
  {
    id: "v3",
    courseId: "cs101",
    title: "If Statements and Loops",
    description: "Master control flow in Python — learn how to make decisions with if statements and repeat actions with loops.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    duration: "24:10"
  },
  {
    id: "mv1",
    courseId: "math201",
    title: "Integration by Parts",
    description: "A comprehensive walkthrough of the integration by parts technique, with worked examples and applications.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    duration: "31:22"
  },
  {
    id: "mv2",
    courseId: "math201",
    title: "Area Between Curves",
    description: "Learn how to calculate the area of regions bounded by two or more curves using definite integrals.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    duration: "27:05"
  }
];

export const resources: Resource[] = [
  {
    id: "1",
    courseId: "1",
    title: "Course Syllabus",
    description: "Complete course syllabus including schedule, grading policy, and academic integrity guidelines.",
    type: "pdf",
    url: "#",
    fileSize: "245 KB",
    author: "Dr. Sarah Johnson",
    uploadedAt: "2026-01-10",
    content: `# CS 101 - Introduction to Computer Science
## Course Syllabus

**Instructor:** Dr. Sarah Johnson
**Office Hours:** Mon/Wed 2-4 PM, Room 412
**Email:** s.johnson@university.edu

### Course Description
This course introduces the fundamental concepts of computer science and programming using Python. Students will learn problem-solving strategies, algorithm design, and basic software development practices.

### Learning Objectives
- Write Python programs to solve computational problems
- Understand fundamental data structures and algorithms
- Apply computational thinking to real-world problems
- Debug and test programs systematically

### Grading Policy
- Assignments: 40%
- Quizzes: 20%
- Midterm Exam: 20%
- Final Project: 20%

### Academic Integrity
All submitted work must be your own. Collaboration is encouraged for discussion but not for code submission.`
  },
  {
    id: "r2",
    courseId: "cs101",
    title: "Control Flow Cheat Sheet",
    description: "Quick reference guide for Python control flow structures: if/elif/else, for loops, while loops, and break/continue.",
    type: "pdf",
    url: "#",
    fileSize: "128 KB",
    author: "Dr. Sarah Johnson",
    uploadedAt: "2026-01-28",
    content: `# Python Control Flow — Quick Reference

## If Statements
\`\`\`python
if condition:
    # code
elif another_condition:
    # code
else:
    # code
\`\`\`

## For Loops
\`\`\`python
for item in collection:
    # code

for i in range(10):
    # code
\`\`\`

## While Loops
\`\`\`python
while condition:
    # code
    # remember to update condition!
\`\`\`

## Break & Continue
- **break**: Exits the loop immediately
- **continue**: Skips to the next iteration
- **pass**: Does nothing (placeholder)

## List Comprehensions
\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\``
  },
  {
    id: "mr1",
    courseId: "math201",
    title: "Integration Formulas Reference",
    description: "Comprehensive reference sheet for integration formulas, techniques, and identities.",
    type: "pdf",
    url: "#",
    fileSize: "312 KB",
    author: "Prof. Michael Chen",
    uploadedAt: "2026-01-12",
    content: `# Integration Formulas Reference Sheet

## Basic Integrals
- ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ -1
- ∫ 1/x dx = ln|x| + C
- ∫ eˣ dx = eˣ + C
- ∫ sin(x) dx = -cos(x) + C
- ∫ cos(x) dx = sin(x) + C

## Integration by Parts
∫ u dv = uv - ∫ v du

**LIATE Rule** (choose u in this order):
1. Logarithmic functions
2. Inverse trig functions
3. Algebraic functions
4. Trigonometric functions
5. Exponential functions

## Trigonometric Identities
- sin²(x) + cos²(x) = 1
- sin²(x) = (1 - cos(2x))/2
- cos²(x) = (1 + cos(2x))/2`
  }
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    courseId: "cs101",
    title: "Data Types Quiz",
    description: "Test your knowledge of Python data types, type conversion, and basic operations.",
    timeLimit: 20,
    maxAttempts: 3,
    questions: [
      {
        id: "q1_1",
        type: "single",
        question: "Which of the following is NOT a primitive data type in Python?",
        options: ["int", "str", "array", "float"],
        correctAnswer: "array",
        points: 10
      },
      {
        id: "q1_2",
        type: "multiple",
        question: "Which of the following are valid Python boolean values? (Select all that apply)",
        options: ["True", "False", "true", "false", "1", "0"],
        correctAnswer: ["True", "False"],
        points: 10
      },
      {
        id: "q1_3",
        type: "matching",
        question: "Match each data type with its example value:",
        pairs: [
          { left: "int", right: "42" },
          { left: "float", right: "3.14" },
          { left: "str", right: '"Hello"' },
          { left: "bool", right: "True" }
        ],
        points: 20
      },
      {
        id: "q1_4",
        type: "fill",
        question: "Complete the code to convert the string '42' to an integer:",
        blanks: [
          { sentence: "num = ___(\"42\")", answer: "int" }
        ],
        points: 10
      },
      {
        id: "q1_5",
        type: "text",
        question: "Explain the difference between mutable and immutable data types in Python, and give one example of each.",
        points: 20
      }
    ]
  },
  {
    id: "q2",
    courseId: "cs101",
    title: "Control Structures Quiz",
    description: "Test your understanding of Python control flow: conditionals, loops, and iteration.",
    timeLimit: 25,
    maxAttempts: 2,
    questions: [
      {
        id: "q2_1",
        type: "single",
        question: "What will `range(2, 10, 3)` produce?",
        options: ["[2, 5, 8]", "[2, 4, 6, 8, 10]", "[3, 6, 9]", "[2, 3, 4, 5, 6, 7, 8, 9]"],
        correctAnswer: "[2, 5, 8]",
        points: 10
      },
      {
        id: "q2_2",
        type: "multiple",
        question: "Which statements can be used to exit a loop early? (Select all that apply)",
        options: ["break", "continue", "pass", "return", "exit"],
        correctAnswer: ["break", "return"],
        points: 15
      },
      {
        id: "q2_3",
        type: "fill",
        question: "Complete the while loop condition to print numbers 1 through 10:",
        blanks: [
          { sentence: "i = 1\nwhile i ___ 10:\n    print(i)\n    i += 1", answer: "<=" }
        ],
        points: 10
      },
      {
        id: "q2_4",
        type: "text",
        question: "Write a Python for loop that calculates the sum of all even numbers from 1 to 100.",
        points: 25
      }
    ]
  },
  {
    id: "mq1",
    courseId: "math201",
    title: "Integration Quiz",
    description: "Assess your ability to apply integration techniques including substitution and integration by parts.",
    timeLimit: 30,
    maxAttempts: 2,
    questions: [
      {
        id: "mq1_1",
        type: "single",
        question: "What is ∫ 2x dx?",
        options: ["x² + C", "2 + C", "x + C", "2x² + C"],
        correctAnswer: "x² + C",
        points: 10
      },
      {
        id: "mq1_2",
        type: "matching",
        question: "Match each integral with its result:",
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
        question: "Complete the integration by parts formula:",
        blanks: [
          { sentence: "∫ u dv = uv - ∫ ___ ___", answer: "v du" }
        ],
        points: 15
      },
      {
        id: "mq1_4",
        type: "text",
        question: "Evaluate ∫ x·eˣ dx using integration by parts. Show all steps.",
        points: 30
      }
    ]
  }
];
