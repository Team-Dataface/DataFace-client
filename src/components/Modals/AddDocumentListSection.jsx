import PropTypes from "prop-types";

function AddDocumentListSection({ fields, updateFieldValue }) {
  return fields.map((element, index) => {
    return (
      <div key={element.fields_id} className="flex">
        <div className="w-[150px]">
          <div className="flex justify-end items-center mb-5 p-1 px-3">
            <span className="h-7"></span>
            {element.name}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mb-5 p-1 px-3 rounded-md ring-2 ring-grey">
            <div className="flex flex-row justify-center items-center">
              <input
                className="flex h-7 w-[200px] rounded-md text-center"
                onChange={event => updateFieldValue(index, event)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  });
}

AddDocumentListSection.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fields_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateFieldValue: PropTypes.func,
};

export default AddDocumentListSection;
