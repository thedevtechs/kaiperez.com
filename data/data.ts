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
    slug: 'PoS',
    title: 'Point of Sales - iOS / Android',
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
    category: 'App Development',
    isFeatured: false,
  },
  {
    slug: 'rayse',
    title: 'Rayse',
    subtitle: 'Real-time AI-powered chat application',
    overview:
      `Kai played a pivotal role in revolutionizing the real estate industry. His work on Rayse resulted in a groundbreaking app that put the power of transparency directly into the hands of homebuyers. This project wasn't just about building an app – it was about fundamentally changing the way people interact with their real estate agents.
       Kai's ability to combine his technical expertise with a deep understanding of user needs was crucial to the project's success.<br><br>The result is an app that's both powerful and incredibly user-friendly. With Rayse, homebuyers can now easily track their agent's activity, identify potential red flags, and make more informed decisions throughout the homebuying process.
       This project demanded a unique blend of technical skill and an in-depth understanding of the real estate world. Kai's ability to learn the ins and outs of the industry was crucial to the project's success. He designed a system that not only tracked agent activity but also made that information easily understandable for homebuyers.`,
    technologies: ['React', 'Node.js', 'Socket.io', 'AI APIs'],
    features: [
      'Real-time Messaging',
      'Spatial Tracking',
      'AI-Powered Suggestions',
      'User Profiles and Authentication',
      'Group Chat Functionality',
      'Responsive UI Design',
    ],
    results:
      `Achieved a user base of 5,000 active users within the first three months, with high engagement rates and positive feedback on AI integrations enhancing user interactions.<br><br>Kai's work on Rayse is a testament to his skills as a full-stack developer and his commitment to creating innovative solutions. His contributions to this project have had a significant impact on the real estate industry and will continue to shape the way people buy homes for years to come.`,
    immersiveContent: [
      'Project Case Study: AI Chat Application',
      'Description: A real-time chat app with AI integration using Socket.io.',
    ],
    image: 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/rayse.com.jpg',
    screenshots: [
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/2.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/3.png',
    ],
    category: 'AI, Chatbots, & App Development',
    isFeatured: true,
  },
  {
    slug: 'makemyresume',
    title: 'OptumCare',
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
    category: 'App Development',
    isFeatured: false,
  },
];
