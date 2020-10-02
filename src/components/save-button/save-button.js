import React from 'react';

export const SaveButton = ({ children, disabled = false, onClick }) => (
  <div className="form-group pt-1">
    <button className="btn btn-success btn-block" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </div>
);
