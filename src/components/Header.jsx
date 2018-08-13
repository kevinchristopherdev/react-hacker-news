import React from 'react';
import PropTypes from 'prop-types';

const Header = () => 
  <div className="title-header">
    <h1>
      Hacker Knewz
    </h1>
  </div>

Header.propTypes = {
  className: PropTypes.string,
}
export default Header;