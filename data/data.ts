// projects/data.ts

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  technologies: string[];
  features: string[];
  results: string;
  immersiveContent: string[];
  image: string;
  screenshots: string[];
  category: string;
  isFeatured: boolean;
}

export const showcaseProjects: Project[] = [
  {
    slug: 'e-commerce-platform',
    title: 'E-commerce Platform Case Study',
    subtitle: 'A modern and scalable e-commerce solution',
    overview:
      'This project involved building a scalable e-commerce platform with user authentication, product management, and payment processing using Stripe. The application provides a seamless shopping experience with dynamic product listings, shopping cart functionality, and secure checkout.',
    technologies: ['React', 'Next.js', 'Node.js', 'Stripe API', 'MongoDB'],
    features: [
      'User Authentication and Authorization',
      'Product Management Dashboard',
      'Dynamic Shopping Cart',
      'Secure Payment Processing with Stripe',
      'Responsive Design for Mobile and Desktop',
    ],
    results:
      'The platform successfully handled over 10,000 transactions in the first month, with positive feedback from users regarding the seamless checkout experience and responsive design.',
    immersiveContent: [
      'Project Case Study: E-commerce Platform',
      'Description: A full-stack e-commerce solution built with Next.js and Stripe.',
    ],
    image: 'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    screenshots: [
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    ],
    category: 'Web Development',
    isFeatured: true,
  },
  {
    slug: 'ai-chat-application',
    title: 'AI Chat Application Case Study',
    subtitle: 'Real-time AI-powered chat application',
    overview:
      'Developed a real-time chat application integrated with AI capabilities using Socket.io. The application facilitates seamless communication between users with intelligent suggestions and automated responses.',
    technologies: ['React', 'Node.js', 'Socket.io', 'AI APIs'],
    features: [
      'Real-time Messaging',
      'AI-Powered Suggestions',
      'User Profiles and Authentication',
      'Group Chat Functionality',
      'Responsive UI Design',
    ],
    results:
      'Achieved a user base of 5,000 active users within the first three months, with high engagement rates and positive feedback on AI integrations enhancing user interactions.',
    immersiveContent: [
      'Project Case Study: AI Chat Application',
      'Description: A real-time chat app with AI integration using Socket.io.',
    ],
    image: 'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    screenshots: [
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/2.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/3.png',
    ],
    category: 'AI & Chatbots',
    isFeatured: false,
  },
  {
    slug: 'makemyresume',
    title: 'Make My Resume',
    subtitle: 'Real-time AI-powered chat application',
    overview:
      'Developed a real-time chat application integrated with AI capabilities using Socket.io. The application facilitates seamless communication between users with intelligent suggestions and automated responses.',
    technologies: ['Next.js', 'Node.js', 'AI APIs & Chatbots', 'Augmented Reality'],
    features: [
      'Real-time Messaging',
      'AI-Powered Suggestions',
      'User Profiles and Authentication',
      'Group Chat Functionality',
      'Responsive UI Design',
    ],
    results:
      'Achieved a user base of 5,000 active users within the first three months, with high engagement rates and positive feedback on AI integrations enhancing user interactions.',
    immersiveContent: [
      'Project Case Study: AI Chat Application',
      'Description: A real-time chat app with AI integration using Socket.io.',
    ],
    image: 'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    screenshots: [
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    ],
    category: 'Web Development',
    isFeatured: false,
  },
  // ... Add more projects similarly
];