import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, ListItem, Button, Drawer, Toolbar } from 'react-md';

import { history } from '../../index';
import styles from './Menu.css';

import DialogWindow from '../dialog-window/DialogWindow';
import PlaylistForm from '../playlist-form/PlaylistForm';

const isLeft = true;

class Menu extends Component {
  state = {
    isFormVisible: false,
  };

  renderNavItems = () => {
    const { userPlaylists } = this.props;

    const navItems = [
      {
        label: 'Login',
        onClick: () => history.push('/login'),
      },
      {
        label: 'Songs',
        onClick: () => history.push('/songs'),
      },
      {
        label: 'Artists',
        onClick: () => history.push('/artists'),
      },
      {
        label: 'Playlists:',
      },
    ];
    userPlaylists.result.items.forEach(item => {
      navItems.push({
        label: item.name,
        onClick: () => history.push(`/playlists/${item.id}`),
      });
    });

    return [
      <List key="primaryText">
        {navItems.map(navItem => (
          <ListItem key={navItem.label} primaryText={navItem.label} onClick={navItem.onClick} />
        ))}
      </List>,

      <Button primary icon onClick={() => this.setState({ isFormVisible: true })}>
        add
      </Button>,
    ];
  };

  render() {
    const closeBtn = (
      <Button
        icon
        onClick={() => {
          console.log('closeBtn');
        }}
      />
    );

    return (
      <div>
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={true}
          position={'left'}
          navItems={this.renderNavItems()}
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
        <DialogWindow
          title="Create playlist"
          visible={this.state.isFormVisible}
          onHideCallback={() => this.setState({ isFormVisible: false })}
          width={500}
          height={400}
        >
          <PlaylistForm submitCallback={() => this.setState({ isFormVisible: false })} />
        </DialogWindow>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPlaylists: state.userPlaylists,
  };
};

export default connect(mapStateToProps)(Menu);
