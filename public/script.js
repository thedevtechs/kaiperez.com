document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleMenu = document.querySelector('.toggle-menu');

    toggleMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        toggleMenu.classList.toggle('active');
    });

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#3494E6', '#EC6EAD', '#FF9A8B', '#FFD89B'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 0.8 }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            }
        },
        retina_detect: true
    });
});
