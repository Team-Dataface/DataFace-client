function PortalTable({ isEditMode, isDragging, foreignDocuments }) {
  return (
    <table>
      <tbody
        className={`border border-dark-grey
        ${
          isEditMode &&
          isDragging &&
          "rounded-md drop-shadow-md cursor-move select-none"
        }
        `}
      >
        <tr className="h-10">
          {foreignDocuments[0].fields.map(document => {
            return (
              <td
                key={document._id}
                className="w-[130px] h-10 border border-dark-grey text-center"
              >
                <span className="w-full h-full">{document.fieldName}</span>
              </td>
            );
          })}
        </tr>
        {foreignDocuments.map((element, index) => {
          return (
            <tr
              key={element._id}
              className="w-[130px] h-10 border border-dark-grey text-center"
            >
              {foreignDocuments[index].fields.map(field => {
                return (
                  <td
                    key={field._id}
                    className="w-10 h-10 border border-dark-grey"
                  >
                    <span className="w-full h-full">{field.fieldValue}</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PortalTable;
