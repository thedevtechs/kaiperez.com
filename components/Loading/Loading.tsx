import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  const letters = 'LOADING'.split('');

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        {letters.map((letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
