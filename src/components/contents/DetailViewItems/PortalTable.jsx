import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import fetchData from "../../../utils/axios";

import {
  isEditModeAtom,
  draggingElementAtom,
  currentDocIndexAtom,
  docDataAtom,
  primaryFieldAtom,
  userAtom,
  currentDBIdAtom,
  relationshipsDataAtom,
} from "../../../atoms/atoms";

import Loading from "../../shared/Loading";

function PortalTable({ index, relationship }) {
  const { userId } = useAtomValue(userAtom);
  const currentDBId = useAtomValue(currentDBIdAtom);

  const isEditMode = useAtomValue(isEditModeAtom);
  const draggingElement = useAtomValue(draggingElementAtom);
  const currentDocIndex = useAtomValue(currentDocIndexAtom);
  const docData = useAtomValue(docDataAtom);
  const primaryField = useAtomValue(primaryFieldAtom);
  const relationshipsData = useAtomValue(relationshipsDataAtom);

  async function getForeignDocuments(relationshipsIndex) {
    let queryValue = "";

    docData[currentDocIndex]?.fields.forEach(element => {
      if (primaryField[relationshipsIndex] === element.fieldName) {
        queryValue = element.fieldValue.trim();
      }
    });

    if (relationship._id) {
      const response = await fetchData(
        "GET",
        `users/${userId}/databases/${currentDBId}/relationships/${relationship._id}?primaryFieldValue=${queryValue}`,
      );

      return response.data.displayedDocuments;
    }

    return [];
  }

  const { data: foreignDocuments, isLoading } = useQuery(
    ["foreignDocuments", currentDBId, currentDocIndex, relationship._id],
    () => getForeignDocuments(index),
    {
      enabled:
        !!userId &&
        !!currentDBId &&
        currentDocIndex !== undefined &&
        !!relationshipsData,
      refetchOnWindowFocus: false,
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!foreignDocuments || foreignDocuments.length === 0) {
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
        {foreignDocuments.length &&
          foreignDocuments.map((element, fieldIndex) => {
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
