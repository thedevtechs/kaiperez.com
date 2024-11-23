// data/data.ts

export interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    overview: string;
    technologies: string[];
    features: string[];
    results: string;
    immersiveContent?: string[];
    image?: string;
    screenshots?: string[]; // Add this field for the gallery
  }

  interface ShowcaseProject {
    img: string;
    title: string;
    category: string;
  }
  
  export const caseStudies: CaseStudy[] = [
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
        screenshots: [ // Add screenshots for the gallery
            'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
            'https://gavi-nextjs.vercel.app/assets/imgs/works/project/2.png',
            'https://gavi-nextjs.vercel.app/assets/imgs/works/project/3.png',
        ],
    },
    // Add more case studies here
];

export const showcaseProjects: ShowcaseProject[] = [
    {
      img: 'https://gavi-nextjs.vercel.app/assets/imgs/works/1.jpg',
      title: 'GeekFolio Portfolio',
      category: 'Branding',
    },
    {
      img: 'https://gavi-nextjs.vercel.app/assets/imgs/works/1.jpg',
      title: 'Luxury Modern Website',
      category: 'Web Design',
    },
    {
      img: 'https://gavi-nextjs.vercel.app/assets/imgs/works/1.jpg',
      title: 'Partner BPO',
      category: 'Consulting',
    },
  ];