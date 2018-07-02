import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Toolbar } from 'react-md';
import { List, ListItem } from 'react-md';

const navItems = [
  <ListItem primaryText="Songs" />,
  //<ListItem primaryText="Starred" />,
];

const isLeft = true;
class Menu extends Component {
  render() {
    const closeBtn = <Button icon onClick={() => console.log('close')} />;
    return (
      <div>
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={true}
          position={'left'}
          onVisibilityChange={this.handleVisibility}
          navItems={navItems}
          header={
            <Toolbar
              nav={isLeft ? null : closeBtn}
              actions={isLeft ? closeBtn : null}
              className="md-divider-border md-divider-border--bottom"
            />
          }
        />
      </div>
    );
  }
}

export default Menu;
