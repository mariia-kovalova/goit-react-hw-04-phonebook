import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Wrap } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  const filterId = nanoid();

  return (
    <Wrap>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        type="text"
        id={filterId}
        onChange={onChange}
        value={value}
      ></input>
    </Wrap>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
