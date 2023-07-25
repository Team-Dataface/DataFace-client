import PropTypes from "prop-types";

import ModalLabel from "./ModalLabel";
import ModalInputArea from "./ModalInputArea";

function AddDocumentListSection({ fields, updateFieldValue }) {
  return fields.map((element, index) => {
    return (
      <div key={element.field_id} className="flex">
        <div className="w-[130px]">
          <ModalLabel value={element.name} />
        </div>
        <div className="flex justify-center items-center px-3">
          <ModalInputArea>
            <div className="flex flex-row justify-center items-center">
              <textarea
                className="flex h-7 w-[300px] rounded-md text-center"
                onChange={event => updateFieldValue(index, event)}
              />
            </div>
          </ModalInputArea>
        </div>
      </div>
    );
  });
}

AddDocumentListSection.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateFieldValue: PropTypes.func,
};

export default AddDocumentListSection;
