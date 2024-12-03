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
    slug: 'rayse',
    title: 'Rayse',
    subtitle: 'Revolutionizing the real estate industry',
    overview:
      `Kai played a pivotal role in revolutionizing the real estate industry. His work on Rayse resulted in a groundbreaking app that put the power of transparency directly into the hands of homebuyers. This project wasn't just about building an app – it was about fundamentally changing the way people interact with their real estate agents.
       Kai's ability to combine his technical expertise with a deep understanding of user needs was crucial to the project's success.<br><br>The result is an app that's both powerful and incredibly user-friendly. With Rayse, homebuyers can now easily track their agent's activity, identify potential red flags, and make more informed decisions throughout the homebuying process.
       This project demanded a unique blend of technical skill and an in-depth understanding of the real estate world. Kai's ability to learn the ins and outs of the industry was crucial to the project's success. He designed a system that not only tracked agent activity but also made that information easily understandable for homebuyers.`,
    technologies: ['React', 'Node.js', 'iOS / Android Development', 'AI APIs'],
    features: [
      'Increased Transparency: Clients gained unprecedented visibility into agent activities, leading to a better understanding and appreciation of the services provided.',
      'Enhanced Trust: The platform fostered trust between clients and agents by clearly demonstrating the value delivered throughout the transaction process.',
      'Operational Efficiency: Agents benefited from automated tracking and streamlined communication tools, allowing them to focus more on client engagement and less on administrative tasks.',
      'Scalability: The serverless architecture facilitated easy scaling to accommodate a growing user base without compromising performance.'
    ],
    results:
      `We achieved a user base of 5,000 active users within the first three months, with high engagement rates and positive feedback on AI integrations enhancing user interactions. Developing Rayse's integrated system was a rewarding endeavor that addressed a critical need in the real estate industry. By combining advanced geolocation tracking with intuitive interfaces and robust backend architecture, we created a platform that not only enhances transparency but also strengthens the agent-client relationship. This project underscored the importance of aligning technological solutions with user needs to drive meaningful impact.
      <br><br>Kai's work on Rayse is a testament to his skills as a full-stack developer and his commitment to creating innovative solutions. His contributions to this project have had a significant impact on the real estate industry and will continue to shape the way people buy homes for years to come.`,
    immersiveContent: [
      'Project Case Study: AI Chat Application',
      'Description: A real-time chat app with AI integration using Socket.io.',
    ],
    image: 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/rayse.com.jpg',
    screenshots: [
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/rayse.com-2.png',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/rayse.com-3.jpg',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/3.png',
    ],
    category: 'AI, Chatbots, & App Development',
    isFeatured: true,
  },
  {
    slug: 'makemyresume',
    title: 'Make My Resume',
    subtitle: 'The best way to make a resume  and land your dream job',
    overview:
      `Finding a job in today’s competitive market requires more than just a polished resume—it requires a tailored approach, actionable insights, and tools that empower candidates to shine. As the founder and lead developer, I designed and implemented MakeMyResume.io, a platform that leverages AI to craft tailored resumes, generate personalized cover letters, and prepare users with mock interviews. This project has helped countless users secure interviews faster and more effectively.
      <br><br>
      <h3>The Challenge</h3>
      Job seekers often face the following hurdles:
      <ul>
<li>Generic Resumes: Templates alone fail to highlight candidates' unique skills or align with specific job postings.</li>
<li>Time-Consuming Customization: Manually tailoring resumes and cover letters for each job is tedious.</li>
<li>Interview Anxiety: Without preparation, many candidates struggle to make a strong impression during interviews.</li>
</ul>
`,
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
    image: 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/makemyresume-5.png',
    screenshots: [
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/make-my-resume-4.png',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/makemyresume-3',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/Screenshot+2024-11-25+at+7.52.36%E2%80%AFAM.png',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/makemyresume-2',
    ],
    category: 'App Development',
    isFeatured: false,
  },
  {
    slug: 'social-media-manager',
    title: 'AI Social Media Manager',
    subtitle: 'Engaging and human-like content for Social Media, created in seconds',
    overview:
      `In the age of information, standing out requires engaging, relevant, and visually stunning content. To address this demand, I developed an AI Articles and Social Media Generator, an intelligent platform leveraging cutting-edge technologies like LangChain, CrewAI, and RAG (Retrieval-Augmented Generation). The tool simplifies content creation by generating unique, high-quality articles, photorealistic images, and social media drafts ready for user approval, revolutionizing how brands and individuals manage their online presence.
      <h3>The Challenge</h3>
Creating consistent, high-quality content for articles and social media presents several challenges:
<ul>
<li>Time-Intensive Research: Identifying trending, relevant topics consumes considerable time and effort.</li>
<li>Content Uniqueness: Avoiding duplicate content while maintaining originality and SEO compliance.</li>
<li>Visual Appeal: Generating unique, on-brand visuals for every post requires design expertise.</li>
<li>Workflow Efficiency: Managing drafts and approvals in a seamless workflow.</li>
</ul>
      `,
    technologies: ['LangChain: Powers the topic research and content generation pipeline, ensuring contextual and up-to-date results.',
      'LangGraph: Provides a graph-based approach to manage dependencies and relationships between content pieces, ensuring seamless integration of interconnected topics.',
      'RAG (Retrieval-Augmented Generation): Combines external data sources with AI to ensure factual, relevant, and engaging articles.',
      'AI Image Generators: Produces unique, high-quality visuals tailored to the tone and theme of each article or post.',
      'Cloud Storage and APIs: Streamlines data flow and enables easy integration with existing platforms.'],
    features: [
      'Automated Topic Discovery: Using LangChain and internet search, the system identifies trending and engaging topics tailored to the target audience.',
      'Unique Content Generation: Employing RAG to ensure articles are relevant, data-backed, and SEO-optimized while maintaining originality.',
      'AI-Driven Visuals: Creating photorealistic, brand-aligned images for articles and social posts using AI image-generation models.',
      'Streamlined Workflow: Providing drafts for user review and approval, ensuring a human-centric touch before posting.',
      'Seamless Integration: Automatically scheduling and posting approved content across social media platforms.'
    ],
    results:
      `<ul>
        <li>Improved Efficiency: Reduced content creation time by 50%, freeing up resources for strategic initiatives.</li>
        <li>Enhanced Engagement: Generated articles and social posts achieved 35% higher engagement rates compared to manually created content.</li>
        <li>Consistent Branding: AI-generated visuals ensured a cohesive and professional look across all posts.</li>
        <li>Scalability: Enabled users to scale their content strategy effortlessly, generating and posting hundreds of unique pieces monthly.</li>
      </ul>
      <br><br>
      This project exemplified the synergy between AI and human creativity. By combining state-of-the-art technologies with an intuitive user experience, the platform not only streamlined the content creation process but also empowered users to focus on their message and audience. It’s a thrill to see this tool in action, helping brands and individuals amplify their reach and impact.`,
    immersiveContent: [
      'Project Case Study: AI Chat Application',
      'Description: A real-time chat app with AI integration using Socket.io.',
    ],
    image: 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/ai-social-media.jpeg',
    screenshots: [
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/ai-flowise.png',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/social-media-generator-2.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    ],
    category: 'AI / App Development',
    isFeatured: false,
  },
  {
    slug: 'PoS',
    title: 'Point of Sales - iOS / Android',
    subtitle: 'A flexible and intuitive Point of Sales system with a client facing interface.',
    overview:
      `In the fast-paced restaurant industry, efficiency and user experience are paramount. I had the opportunity to design and develop a modern Point of Sale (PoS) system that has been in production for over two years at a high-traffic restaurant. The solution streamlined operations, reduced onboarding complexity, and significantly boosted efficiency compared to traditional systems.
      <br><br>
      <h3>The Challenge</h3>
      Traditional PoS systems often fall short when handling the unique challenges of high-volume restaurants. Key pain points included:

Inefficient workflows: Legacy systems slowed order processing and created bottlenecks during peak hours.
Complex employee onboarding: Training staff on cumbersome systems consumed valuable time.
Lack of customer engagement: There was no integration with loyalty programs or mobile ordering.`,
    technologies: ['Flutter: Delivered a fast, responsive, and visually engaging cross-platform application.',
                    'Python: Provided a robust and scalable backend for managing transactions, customer data, and real-time analytics.',
                    'Firebase: Ensured secure and reliable cloud-based data storage and synchronization.'],
    features: [
      `We developed a cutting-edge PoS system with a focus on simplicity, speed, and scalability, utilizing Flutter for the front end and Python for the backend. Our key features included:`,
`Streamlined Order Management: Orders seamlessly integrated with the kitchen's ticketing system, eliminating delays.`,
'Loyalty Program Integration: A feature inspired by the Starbucks app, allowing customers to earn and redeem rewards effortlessly.',
'Online Ordering: Integrated directly into the PoS, enabling customers to place orders via a mobile app, which synchronized with the kitchen in real time.',
'Effortless Onboarding: Intuitive UI/UX design made training new employees up to 40% faster, reducing the time spent onboarding by nearly half.'
    ],
    results:
      `This project highlighted the importance of crafting solutions tailored to the specific needs of end-users. By leveraging modern technologies and prioritizing intuitive design, the PoS system not only addressed immediate operational challenges but also created a foundation for long-term growth. It was a rewarding experience to see the tangible impact of our work on both employees and customers.
      <br><br>For a deeper dive into the technical implementation or collaboration opportunities, feel free to <a href="https://calendly.com/kaiperez/30min" target="_blank">connect with me.</a>`,
    immersiveContent: [
      'Project Case Study: E-commerce Platform',
      'Description: A full-stack e-commerce solution built with Next.js and Stripe.',
    ],
    image: 'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/pos-2.png',
    screenshots: [
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/pos-1.png',
      'https://tdt-admin-bucket.s3.us-west-1.amazonaws.com/pos.png',
      'https://gavi-nextjs.vercel.app/assets/imgs/works/project/1.png',
    ],
    category: 'App Development',
    isFeatured: false,
  },
];
