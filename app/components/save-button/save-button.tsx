import type { ReactNode } from 'react';

import './save-button.scss';

type SaveButtonProps = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

export const SaveButton = ({ children, disabled = false, onClick }: SaveButtonProps) => (
  <div className="form-group pt-1 save-button">
    <button className="btn btn-success btn-block" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </div>
);
