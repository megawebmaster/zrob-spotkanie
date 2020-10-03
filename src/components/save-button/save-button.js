import React from 'react';

import './save-button.scss';

export const SaveButton = ({ children, disabled = false, onClick }) => (
  <div className="form-group pt-1 save-button">
    <button className="btn btn-success btn-block" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </div>
);
