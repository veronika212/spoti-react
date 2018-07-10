import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Toolbar } from 'react-md';
import { List, ListItem, Subheader } from 'react-md';

import { history } from '../../index';
import { getPlaylistsList } from '../../sagas/playlistsListSaga';
import styles from './Menu.css';
import { connect } from 'react-redux';

const isLeft = true;
class Menu extends Component {
  componentDidMount() {
    this.props.getPlaylistsList();
  }

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
    ];
  };

  render() {
    const closeBtn = <Button icon onClick={() => console.log('close')} />;
    return (
      <Drawer
        id="simple-drawer-example"
        type={Drawer.DrawerTypes.TEMPORARY}
        visible={true}
        position={'left'}
        onVisibilityChange={this.handleVisibility}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    userPlaylists: state.userPlaylists,
  };
};

export default connect(
  mapStateToProps,
  { getPlaylistsList }
)(Menu);
