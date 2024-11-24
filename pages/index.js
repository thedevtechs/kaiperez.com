import Head from 'next/head'
import Link from 'next/link' // Import Next.js Link component
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  // State to manage sidebar and toggle menu active state
  const [sidebarActive, setSidebarActive] = useState(false)
  const [toggleActive, setToggleActive] = useState(false)

  // Function to handle the sidebar and toggle menu
  const toggleMenu = () => {
    setSidebarActive(!sidebarActive)
    setToggleActive(!toggleActive)
  }

  // Load particles.js dynamically in the useEffect hook
  useEffect(() => {
    // Dynamically add the particles.js script to the document
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.onload = () => {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ['#3494E6', '#EC6EAD', '#FF9A8B', '#FFD89B'] },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 0.4}
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
          }
        },
        retina_detect: true
      })
    }
    document.body.appendChild(script)

    // Clean up by removing the script when the component is unmounted
    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kai Perez - Cloud Architect & Full-Stack Developer Portfolio" />
        <meta name="twitter:description" content="Explore Kai Perez's innovative projects in cloud architecture and full-stack development. Connect now for collaboration." />
        <meta name="twitter:image" content="https://cdn-icons-png.flaticon.com/512/733/733553.png" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <title>Kai Perez - Cloud Architect & Full-Stack Developer Portfolio</title>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kai Perez",
            "jobTitle": "Cloud Architect & Full-Stack Developer",
            "url": "https://yourwebsite.com",
            "sameAs": [
              "https://linkedin.com/in/kaiperez",
              "https://github.com/thedevtechs"
            ],
            "email": "kai@example.com"
          }`}
        </script>
        <link rel="stylesheet" href="/styles.css" />

      </Head>

      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%' }} />
      <div className="content">
  <h1>Kai Perez</h1>
  <h2>Cloud Architect / Full-Stack Developer</h2>
  <div className="button-group">
    <button onClick={() => window.open('https://calendly.com/kaiperez/30min', '_blank')}>Contact Me</button>
    <Link href="/projects" passHref>
      <button>Projects</button>
    </Link>  </div>
</div>

<style jsx>{`
  .content {
    text-align: center;
    margin-top: 50px;
  }
  .button-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
}
.button-group button {
  padding: 10px 30px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.button-group button:first-child {
  background-color: #3494E6;
  color: #fff;
}
.button-group button:last-child {
  background-color: #3494E6; /* Prussian Blue for a palette-matching darker tone */
  color: #fff;
}
.button-group button:hover {
  background-color: #FFD89B;
  transform: scale(1.05);
}

`}</style>


      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <ul>
          <li><a href="https://linkedin.com/in/kaiperez" target="_blank" rel="noopener noreferrer">About Me</a></li>
          <li><a href="/projects" rel="noopener noreferrer">Projects</a></li>
          <li><a href="https://calendly.com/kaiperez/30min" target="_blank" rel="noopener noreferrer">Contact</a></li>
        </ul>
      </div>

      <div
        className={`toggle-menu ${toggleActive ? 'active' : ''}`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="social-icons">
        <a href="https://linkedin.com/in/kaiperez" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Image src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Kai Perez LinkedIn Profile Icon" width={30} height={30} />
        </a>
        <a href="https://github.com/thedevtechs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Image src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub Icon for Kai Perez" width={30} height={30} />
        </a>
      </div>

      <style jsx>{`
        .content {
          text-align: center;
        }
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 250px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 20;
        }
        .sidebar.active {
          transform: translateX(0);
        }
        .social-icons a {
          margin: 0 10px;
        }
        .toggle-menu {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 30;
          cursor: pointer;
          width: 35px;
          height: 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .toggle-menu div {
          width: 100%;
          height: 4px;
          background: white;
          border-radius: 2px;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .toggle-menu.active div:nth-child(1) {
          transform: rotate(45deg) translateY(10px);
        }
        .toggle-menu.active div:nth-child(2) {
          background: transparent;
        }
        .toggle-menu.active div:nth-child(3) {
          transform: rotate(-45deg) translateY(-10px);
        }
      `}</style>
    </>
  )
}
