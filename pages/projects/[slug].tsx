import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from './projectsSingle.module.css';
import { showcaseProjects, Project } from '../../data/data';
import Menu from '../../components/Menu/Menu';
import Loading from '../../components/Loading/Loading'; // Import the Loading component

const theme = 'dark';

// Dynamically import NonImmersiveView
const NonImmersiveView = dynamic(() => import('../../components/NonImmersiveView/NonImmersiveView'), {
  ssr: false,
});

const CaseStudyPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isImmersive, setIsImmersive] = useState(false);
  const [terminalContent, setTerminalContent] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate asynchronous data fetching
  useEffect(() => {
    if (slug) {
      const fetchProject = async () => {
        try {
          // Simulate data fetching delay (remove if actual async fetching is used)
          // await new Promise((resolve) => setTimeout(resolve, 1000));

          const foundProject = showcaseProjects.find((proj) => proj.slug === slug);
          if (foundProject) {
            setProject(foundProject);
          } else {
            router.push('/'); // Redirect if project not found
          }
        } catch (error) {
          console.error('Error fetching project:', error);
          router.push('/'); // Redirect on error
        } finally {
          setIsLoading(false);
        }
      };

      fetchProject();
    }
  }, [slug, router]);

  const toggleView = () => {
    setIsImmersive((prev) => !prev);
    if (!isImmersive) {
      initializeTerminalContent();
    }
  };

  const initializeTerminalContent = () => {
    if (!project) return;

    const bootSequence = [
      'Booting up...',
      'Initializing system...',
      'Loading modules...',
      'System ready.',
      '',
      'Welcome to the Project Terminal Interface',
      '',
      'Type "help" to see available commands.',
      '',
    ];

    let idx = 0;
    setTerminalContent([]);
    const interval = setInterval(() => {
      setTerminalContent((prev) => [...prev, bootSequence[idx]]);
      idx++;
      if (idx >= bootSequence.length) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleCommand = (command: string) => {
    if (!project) return;

    let output: string[] = [];
    switch (command.toLowerCase()) {
      case 'help':
        output = [
          'Available commands:',
          '- about     : Overview of the project',
          '- techstack : Technologies used',
          '- ascii     : Show project ASCII art',
          '- clear     : Clear the terminal',
        ];
        break;
      case 'about':
        output = project.immersiveContent || [];
        break;
      case 'techstack':
        output = ['Technologies Used:', ...project.technologies.map((tech) => `- ${tech}`)];
        break;
      case 'ascii':
        output = [
          '  ____  ____  ____  ____ ',
          ' / ___||  _ \\|  _ \\|  _ \\',
          ' \\___ \\| |_) | |_) | | | |',
          '  ___) |  __/|  __/| |_| |',
          ' |____/|_|   |_|   |____/ ',
          '',
          project.title,
        ];
        break;
      case 'clear':
        setTerminalContent([]);
        return;
      default:
        output = [`'${command}' is not recognized. Type 'help' for a list of commands.`];
        break;
    }
    setTerminalContent((prev) => [...prev, `> ${command}`, ...output, '']);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(userInput);
      setUserInput('');
    }
  };

  useEffect(() => {
    if (isImmersive) {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }
  }, [terminalContent, isImmersive]);

  const handleTerminalClick = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  if (isLoading) {
    // Display the animated Loading screen
    return <Loading />;
  }

  if (!project) {
    return null; // Fallback in case the redirect logic doesn't fire
  }

  return (
    <>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Explore the portfolio of Kai Perez, a Cloud Architect and Full-Stack Developer. View projects, skills, and connect for collaboration." />
      <meta name="author" content="Kai Perez" />
      <meta property="og:title" content="Kai Perez - Cloud Architect & Full-Stack Developer Portfolio" />
      <meta property="og:description" content="Discover innovative projects by Kai Perez, a Cloud Architect and Full-Stack Developer. Contact Kai to build modern tech solutions." />
      <meta property="og:image" content="https://cdn-icons-png.flaticon.com/512/733/733553.png" />
      <meta property="og:image:alt" content="GitHub logo linking to Kai Perez's GitHub profile showcasing full-stack development projects" />
      <meta property="og:url" content="https://kaiperez.com" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Kai Perez - Cloud Architect & Full-Stack Developer Portfolio" />
      <meta name="twitter:description" content="Explore Kai Perez's innovative projects in cloud architecture and full-stack development. Connect now for collaboration." />
      <meta name="twitter:image" content="https://cdn-icons-png.flaticon.com/512/733/733553.png" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
      <title>Projects | {project.title}</title>
      </Head>

      {/* Include the Menu Component */}
      <Menu theme={theme} />

      {/* Easter Egg */}
      <div className={styles.easterEgg} onClick={toggleView}>
        <div className={styles.easterEggCircle}>
          <div className={styles.easterEggLineArt}></div>
        </div>
      </div>

      {/* Immersive Terminal or Non-Immersive View */}
      {isImmersive ? (
        <div className={styles.terminal} ref={terminalRef} onClick={handleTerminalClick}>
          <pre className={styles.terminalText}>
            {terminalContent.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </pre>
          <div className={styles.inputLine}>
            <span className={styles.prompt}>&gt; </span>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
              autoFocus
              className={styles.inputField}
            />
          </div>
        </div>
      ) : (
        <NonImmersiveView />
      )}
    </>
  );
};

export default CaseStudyPage;
