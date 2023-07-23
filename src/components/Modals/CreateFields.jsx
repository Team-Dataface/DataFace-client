import Select from "../shared/Select";
import Button from "../shared/Button";

import CONSTANT from "../../constants/constant";

const { maxFieldNameLength } = CONSTANT;

function CreateFields({
  fields,
  updateFieldName,
  updateFieldType,
  handleClickDeleteField,
}) {
  return fields.map((element, index) => {
    return (
      <div
        key={element.id}
        className="mb-5 p-1 px-3 rounded-md ring-2 ring-grey"
      >
        <div className="flex flex-row justify-center items-center">
          <input
            className="flex h-7 w-full mr-3 rounded-md text-center"
            maxLength={maxFieldNameLength}
            value={element.name}
            onChange={event => updateFieldName(index, event)}
          />
          <Select onChange={event => updateFieldType(index, event)} />
          <Button
            className="flex justify-center items-center"
            onClick={() => handleClickDeleteField(index)}
          >
            <img className="w-10" src="/assets/bin_icon.svg" alt="bin icon" />
          </Button>
        </div>
      </div>
    );
  });
}

export default CreateFields;
