import React from 'react';
import cx from 'classnames';

export const ManagementButton = ({ icon, onClick }) => (
  <button type="button" className="btn btn-secondary" onClick={onClick}>
    <i className={cx('fa', icon)} />
  </button>
);
