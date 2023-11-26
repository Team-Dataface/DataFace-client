import { useAtomValue } from "jotai";

import { isEditModeAtom, draggingElementAtom } from "../../../atoms/atoms";
import useGetForeignDocuments from "../../../apis/useGetForeignDocument";

function PortalTable({ index, relationship }) {
  const isEditMode = useAtomValue(isEditModeAtom);
  const draggingElement = useAtomValue(draggingElementAtom);

  const { foreignDocument } = useGetForeignDocuments(index, relationship);

  if (!foreignDocument || foreignDocument.length === 0) {
    return (
      <div className="flex justify-center items-center w-[130px] h-full bg-light-grey">
        <span>no result</span>
      </div>
    );
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
          {foreignDocument[0].fields.map(element => {
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
        {foreignDocument.length &&
          foreignDocument.map((element, fieldIndex) => {
            return (
              <tr
                key={element.fields[fieldIndex]._id}
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
          })}
      </tbody>
    </table>
  );
}

export default PortalTable;
