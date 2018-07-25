import React from 'react';

import Search from '../components/search/Search';
import styles from './Header.css';

const Header = () => (
  <div className={styles.header}>
    <Search />
  </div>
);

export default Header;
