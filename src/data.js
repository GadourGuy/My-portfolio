import maze from './assets/maze.webp';
import shell from './assets/shell.webp';
import airbnb from './assets/airbnb.webp';

export const profile = {
  name: 'Othman Ali',
  role: 'Software Engineer',
  origin: 'Sudan',
  base: 'Johor Bahru, Malaysia',
  email: 'hassan.othman@graduate.utm.my',
  altEmail: 'ogadours1@gmail.com',
  phone: '+601128893631',
  socials: [
    { label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com/GadourGuy' },
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/othman-ali-a68a18289/' },
    { label: 'X', icon: 'fa-brands fa-x-twitter', href: 'https://x.com/OthmanGadour1' },
  ],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: 3.99, decimals: 2, label: 'CGPA at UTM' },
  { value: 36, suffix: '', label: 'Public GitHub repos' },
  { value: 360, suffix: '+', label: 'Commits on RazakEvent' },
  { value: 3, suffix: '+', label: 'Years writing code' },
];

export const education = [
  { period: '2024 to present', title: 'Bachelor of Computer Science', place: 'Universiti Teknologi Malaysia', note: 'CGPA 3.99 · Data structures, algorithms, OOP, web, databases, networks' },
  { period: '2023 to 2025', title: 'Full Stack Software Engineering', place: 'ALX Africa', note: 'One year intensive bootcamp: C, Python, JavaScript, DevOps' },
  { period: '2019 to 2023', title: 'Electrical Engineering', place: 'University of Khartoum', note: 'Faculty of Electrical Engineering' },
];

export const experience = [
  {
    company: 'ABW Technologies Sdn Bhd',
    role: 'R&D Software Engineering Intern',
    period: '07/2026 to 10/2026',
    tags: ['Python', 'PySide6', 'OpenCV', 'C++', 'OpenMP', 'Modbus TCP', 'GitLab'],
    points: [
      'Developed the ABW Vision Platform with a team of four: a Windows automated optical inspection (AOI) system for production lines with multiple stations.',
      'Integrated Hikrobot industrial cameras via the MVS SDK and PLCs over Modbus TCP to report PASS/FAIL results for each station.',
      'Built fast C++ image processing DLLs: template matching, blob analysis, circle search, contour matching and colour extraction.',
      'Accelerated template matching with an OpenMP parallel angle sweep and a coarse to fine image pyramid search without losing accuracy.',
      'Shipped a visual Recipe Manager, login with Operator and Engineer roles and a live manager dashboard; fixed UI freezes and thread leaks.',
    ],
  },
  {
    company: 'Udemy',
    role: 'Full Stack Software Engineering Student',
    period: '03/2025 to 09/2025',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Tailwind'],
    points: [
      'Built responsive web apps for phones and desktops with HTML5, CSS3, Bootstrap and Tailwind.',
      'Built single page applications in React with hooks, props, state management and client side routing.',
      'Connected React front ends to RESTful APIs built with Node.js and Express.js.',
      'Managed persistent data with PostgreSQL and MongoDB.',
    ],
  },
  {
    company: 'ALX Africa',
    role: 'Full Stack Software Engineering Trainee',
    period: '08/2023 to 02/2025',
    tags: ['C', 'Python', 'JavaScript', 'Flask', 'Docker', 'Nginx', 'Shell'],
    points: [
      'Low level programming in C and high level development with Python and JavaScript.',
      'Developed dynamic web applications with Node.js and Flask.',
      'Managed SQL and MongoDB databases; practised DevOps with Docker, Nginx and shell scripting.',
      'Collaborated on a complete Airbnb clone using Git and GitHub.',
    ],
  },
];

export const projects = [
  {
    title: 'ABW Vision Platform',
    kicker: 'Industrial machine vision · 2026',
    art: 'vision',
    description:
      'A Windows desktop automated optical inspection system for production lines: live capture from industrial cameras, C++ image processing DLLs, a visual recipe editor and PASS/FAIL reporting to PLCs.',
    tags: ['Python', 'PySide6', 'OpenCV', 'C++', 'OpenMP', 'Modbus TCP'],
    links: [],
  },
  {
    title: 'RazakEvent',
    kicker: 'Full stack web app · 2026',
    art: 'event',
    description:
      'Event management platform for Kolej Tun Razak, UTM. Students, staff and admins create, manage and discover college events in one place. Next.js front end with a feature sliced architecture, Express 5 + TypeORM back end.',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Express 5', 'TypeORM', 'GitHub Actions'],
    links: [],
  },
  {
    title: 'The Maze',
    kicker: '3D game engine · C · 2024',
    image: maze,
    description:
      'A 3D maze game written in C with SDL2. A ray casting engine built from scratch renders a 2D map array into a navigable 3D world in real time.',
    tags: ['C', 'SDL2', 'Ray casting'],
    links: [{ label: 'Source', href: 'https://github.com/GadourGuy/The-Maze' }],
  },
  {
    title: 'Simple Shell',
    kicker: 'Systems programming · C · 2024',
    image: shell,
    description:
      'A Unix style command interpreter in C: command parsing, process creation, I/O redirection, built in commands like cd, pwd and echo, and thorough error handling on top of Unix system calls.',
    tags: ['C', 'Unix', 'System calls'],
    links: [{ label: 'Source', href: 'https://github.com/EimanEltayeb/simple_shell' }],
  },
  {
    title: 'AirBnB Clone',
    kicker: 'Full stack web app · ALX',
    image: airbnb,
    description:
      'A simplified Airbnb: a command interpreter and storage engine, a model layer backed by MySQL, a Flask web app and a RESTful API with a dynamic front end.',
    tags: ['Python', 'Flask', 'MySQL', 'JavaScript'],
    links: [
      { label: 'Source', href: 'https://github.com/GadourGuy/AirBnB_clone' },
      { label: 'Live', href: 'https://gadourguy.github.io/AirBnB_clone/' },
    ],
  },
];

export const repos = [
  { name: 'Students-Industrial-Training-Management-System', lang: 'PHP', desc: 'Web system for managing students’ industrial training placements.' },
  { name: 'PTII-Hotel-Management-System', lang: 'C++', desc: 'Object oriented hotel management system for Programming Technique II.' },
  { name: 'kems_app', lang: 'Dart', desc: 'Flutter mobile app built for the UTM mobile app development course.' },
  { name: 'kems-product-website', lang: 'HTML', desc: 'Product website for the KEMS mobile app assignment.', live: 'https://gadourguy.github.io/kems-product-website/' },
  { name: 'Digital-Mental-Health-Hub', lang: 'HTML', desc: 'A digital hub offering mental health resources for students.' },
  { name: 'The-Simon-Game', lang: 'JavaScript', desc: 'The classic Simon memory game in the browser.', live: 'https://gadourguy.github.io/The-Simon-Game/' },
  { name: 'ProjectEuler', lang: 'Python', desc: 'Solutions to Project Euler problems.' },
  { name: 'monty', lang: 'C', desc: 'Interpreter for Monty bytecode, built on stacks and queues.' },
  { name: 'printf', lang: 'C', desc: 'A custom implementation of the C printf function.' },
  { name: 'binary_trees', lang: 'C', desc: 'Binary trees, BSTs, AVL trees and heaps in C.' },
  { name: 'sorting_algorithms', lang: 'C', desc: 'Sorting algorithms and Big O analysis in C.' },
  { name: 'alx-backend-storage', lang: 'Python', desc: 'Back end storage work with MySQL, MongoDB and Redis.' },
];

export const langColors = {
  C: '#555555',
  'C++': '#f34b7d',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  HTML: '#e34c26',
};

export const skillRows = [
  ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'PHP', 'SQL'],
  ['React', 'Next.js', 'Node.js', 'Express', 'Flask', 'Spring MVC', 'PySide6 / Qt', 'OpenCV', 'OpenMP', 'TypeORM'],
  ['Git', 'GitHub Actions', 'GitLab', 'Docker', 'Nginx', 'PostgreSQL', 'MySQL', 'MongoDB', 'Modbus TCP', 'Linux & Shell', 'Weka'],
];

export const skillGroups = [
  { title: 'Systems', icon: 'fa-solid fa-microchip', text: 'C and C++ down to the metal: shells, interpreters, ray casters and OpenMP accelerated vision DLLs.' },
  { title: 'Back end', icon: 'fa-solid fa-server', text: 'RESTful APIs with Node.js, Express, Flask and Spring MVC, backed by SQL and NoSQL databases.' },
  { title: 'Front end', icon: 'fa-solid fa-layer-group', text: 'React and Next.js apps with TypeScript, responsive layouts and motion.' },
  { title: 'Machine learning', icon: 'fa-solid fa-brain', text: 'Classifier evaluation (J48, Random Forest, Random Tree) in Weka and perceptron training logic.' },
];

export const milestones = [
  { year: '2026', text: 'R&D Software Engineering Intern at ABW Technologies.' },
  { year: '2025', text: 'Graduated from ALX Africa’s one year Software Engineering programme.' },
  { year: '2025', text: 'Attended CelcomDigi UniConnect at UTM.' },
  { year: '2024', text: 'Globally ranked participant on Project Euler.' },
  { year: '2023', text: 'Internship at the Sudan Power Plant Development Institution.' },
  { year: '2022', text: 'Media team leader for the IndabaX event.' },
];
