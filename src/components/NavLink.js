import React from 'react';
import { Link } from 'react-router'

class NavLink extends React.Component {
  render() {
    let isActive = this.context.router.isActive(this.props.to, true);
    let className = isActive ? ' active' : '';

    return (
      <li className={'nav-item' + className}>
        <Link className="nav-link" {...this.props}/>
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object
};

export default NavLink;