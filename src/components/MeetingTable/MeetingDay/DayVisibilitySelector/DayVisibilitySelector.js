import React from 'react';
import './DayVisibilitySelector.scss';

class DayVisibilitySelector extends React.Component {
  static propTypes = {
    isFolded: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  render(){
    let { isFolded, onChange } = this.props;
    return (
      <div className="DayVisibilitySelector">
        {isFolded === false && <button className="btn btn-secondary" type="button" onClick={() => onChange(true)}
                                       title="Zwiń">
          <i className="fa fa-chevron-up"></i>
        </button>}
        {isFolded === true && <button className="btn btn-secondary" type="button" onClick={() => onChange(false)}
                                      title="Rozwiń">
          <i className="fa fa-chevron-down"></i>
        </button>}
      </div>
    );
  }
}
export default DayVisibilitySelector;
