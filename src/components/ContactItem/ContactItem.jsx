import { Button } from 'components/Button';
import PropTypes from 'prop-types';
import { Item } from './ContactItem.styled';

export const ContactItem = ({ name, number, onDelete }) => {
  return (
    <Item>
      <p>
        {name}: {number}
      </p>
      <Button type="button" onClick={onDelete}>
        Delete
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
