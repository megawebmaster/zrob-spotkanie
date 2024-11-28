import cx from 'clsx';

type ManagementButtonProps = {
  icon: string;
  onClick: () => void;
};

export const ManagementButton = ({ icon, onClick }: ManagementButtonProps) => (
  <button type="button" className="btn btn-secondary" onClick={onClick}>
    <i className={cx('fa fa-solid', icon)} />
  </button>
);
