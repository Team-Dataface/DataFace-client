import PropTypes from "prop-types";

import Select from "../shared/Select";
import Button from "../shared/Button";
import ModalInputArea from "./ModalInputArea";

import CONSTANT from "../../constants/constant";

const { MAX_FIELD_NAME_LENGTH, FIELD_TYPES } = CONSTANT;

function CreateDBListSection({
  fields,
  updateFieldName,
  updateFieldType,
  handleClickDeleteField,
}) {
  return fields.map((element, index) => {
    return (
      <div key={element.id} className="mb-4">
        <ModalInputArea>
          <div className="flex flex-row justify-center items-center">
            <input
              className="flex h-7 w-full mr-3 rounded-md text-center"
              maxLength={MAX_FIELD_NAME_LENGTH}
              value={element.name}
              onChange={event => updateFieldName(index, event)}
            />
            <Select
              options={FIELD_TYPES}
              onChange={event => updateFieldType(index, event)}
            />
            <Button
              className="flex justify-center items-center"
              onClick={() => handleClickDeleteField(index)}
            >
              <img className="w-10" src="/assets/bin_icon.svg" alt="bin icon" />
            </Button>
          </div>
        </ModalInputArea>
      </div>
    );
  });
}

CreateDBListSection.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateFieldName: PropTypes.func,
  updateFieldType: PropTypes.func,
  handleClickDeleteField: PropTypes.func,
};

export default CreateDBListSection;
