import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Toolbar } from 'react-md';
import { List, ListItem } from 'react-md';

import styles from './Menu.css';

const navItems = [
  <List key="primaryText">
    <ListItem primaryText="Songs" />,
    {/* <ListItem primaryText="Starred" />, */}
  </List>,
];

const isLeft = true;
class Menu extends Component {
  render() {
    const closeBtn = <Button icon onClick={() => console.log('close')} />;
    return (
      <Drawer
        id="simple-drawer-example"
        type={Drawer.DrawerTypes.TEMPORARY}
        visible={true}
        position={'left'}
        onVisibilityChange={this.handleVisibility}
        navItems={navItems}
        className={styles.menu}
        onVisibilityChange={() => {}}
        clickableDesktopOverlay={false}
        header={
          <Toolbar
            nav={isLeft ? null : closeBtn}
            actions={isLeft ? closeBtn : null}
            className="md-divider-border md-divider-border--bottom"
          />
        }
      />
    );
  }
}

export default Menu;
