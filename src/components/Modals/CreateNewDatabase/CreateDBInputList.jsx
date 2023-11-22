import { useAtom } from "jotai";

import PropTypes from "prop-types";

import { dbFieldsAtom } from "../../../atoms/atoms";

import Select from "../../shared/Select";
import Button from "../../shared/Button";
import InputWrapper from "../SharedItems/InputWrapper";

import CONSTANT from "../../../constants/constant";

const { MAX_FIELD_NAME_LENGTH, FIELD_TYPES } = CONSTANT;

function CreateDBInputList({ updateFieldName }) {
  const [fields, setFields] = useAtom(dbFieldsAtom);

  function updateFieldType(index, event) {
    const newFields = [...fields];
    newFields[index].fieldType = event.target.value;

    setFields(newFields);
  }

  function handleClickDeleteField(index) {
    if (fields.length === 1) {
      return;
    }

    const newFields = [...fields];
    newFields.splice(index, 1);

    setFields(newFields);
  }

  return fields.map((element, index) => {
    return (
      <div key={element.id}>
        <InputWrapper>
          <div className="flex flex-row justify-center items-center">
            <input
              className="flex w-full h-7 mr-3 rounded-md text-center"
              maxLength={MAX_FIELD_NAME_LENGTH}
              value={element.name}
              onChange={event => updateFieldName(index, event)}
            />
            <Select
              options={FIELD_TYPES}
              updateFieldType={updateFieldType}
              index={index}
            />
            <Button
              className="flex justify-center items-center"
              onClick={() => handleClickDeleteField(index)}
            >
              <img className="w-10" src="/assets/bin_icon.svg" alt="bin icon" />
            </Button>
          </div>
        </InputWrapper>
      </div>
    );
  });
}

CreateDBInputList.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired,
    }),
  ),
  updateFieldName: PropTypes.func,
  updateFieldType: PropTypes.func,
  handleClickDeleteField: PropTypes.func,
};

export default CreateDBInputList;
