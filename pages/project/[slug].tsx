// pages/project/[slug].tsx

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../../styles/caseStudy.module.css';
import { caseStudies, CaseStudy } from './data';
import Menu from '../../components/Menu'; // Import the Menu component

// Dynamically import NonImmersiveView
const NonImmersiveView = dynamic(() => import('../../components/NonImmersiveView'), {
  ssr: false, // Only load this on the client-side
});

const CaseStudyPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [caseStudy, setCaseStudy] = useState<CaseStudy | undefined>(undefined);
  const [isImmersive, setIsImmersive] = useState(false); // Start in non-immersive mode
  const [terminalContent, setTerminalContent] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (slug) {
      const foundCaseStudy = caseStudies.find((cs) => cs.slug === slug);
      if (foundCaseStudy) {
        setCaseStudy(foundCaseStudy);
      } else {
        // Handle case where the case study is not found
        router.push('/404');
      }
    }
  }, [slug]);

  const toggleView = () => {
    setIsImmersive((prev) => !prev);
    if (!isImmersive) {
      initializeTerminalContent();
    }
  };

  const initializeTerminalContent = () => {
    if (!caseStudy) return;

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
    if (!caseStudy) return;

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
        output = caseStudy.immersiveContent || [];
        break;
      case 'techstack':
        output = ['Technologies Used:', ...caseStudy.technologies.map((tech) => `- ${tech}`)];
        break;
      case 'ascii':
        output = [
          '  ____  ____  ____  ____ ',
          ' / ___||  _ \\|  _ \\|  _ \\',
          ' \\___ \\| |_) | |_) | | | |',
          '  ___) |  __/|  __/| |_| |',
          ' |____/|_|   |_|   |____/ ',
          '',
          caseStudy.title,
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

  // Toggle focus on input when clicking the terminal
  const handleTerminalClick = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  if (!caseStudy) {
    return (
      <div className={styles.notFound}>
        <h1>Case Study Not Found</h1>
        <p>The project you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{caseStudy.title}</title>
        <meta name="description" content={caseStudy.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Include the Menu Component */}
      <Menu />

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
