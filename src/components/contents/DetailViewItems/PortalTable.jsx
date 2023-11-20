import { useAtomValue } from "jotai";

import { isEditModeAtom } from "../../../atoms/atoms";

function PortalTable({ draggingElement, relationship, foreignDocuments }) {
  const isEditMode = useAtomValue(isEditModeAtom);

  if (!foreignDocuments || foreignDocuments.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody
        className={`border border-dark-grey
        ${
          isEditMode &&
          draggingElement &&
          "rounded-md drop-shadow-md cursor-move select-none"
        }
        `}
      >
        <tr key="header" className="h-10">
          {foreignDocuments[0].fields.map(element => {
            return (
              <td
                key={element.fieldName}
                className="w-[130px] h-10 border border-dark-grey text-center bg-light-grey"
              >
                <span className="w-full h-full">{element.fieldName}</span>
              </td>
            );
          })}
        </tr>
        {!foreignDocuments.length ? (
          <tr key="no-result" className="flex items-center justify-center">
            {relationship.foreignFieldsToDisplay.map(element => {
              return (
                <td
                  key={element}
                  className="w-[130px] h-10 border border-dark-grey text-center"
                >
                  N/A
                </td>
              );
            })}
          </tr>
        ) : (
          foreignDocuments.map((element, index) => {
            return (
              <tr
                key={element.fields[index]._id}
                className="w-[130px] h-10 border border-dark-grey text-center"
              >
                {element.fields.map(field => {
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
          })
        )}
      </tbody>
    </table>
  );
}

export default PortalTable;
