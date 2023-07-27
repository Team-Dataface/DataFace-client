import { useContext } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import UserContext from "../../context/UserContext";
import CurrentDBIdContext from "../../context/CurrentDBIdContext";

import fetchData from "../../utils/axios";

function ListView({ setDocumentsIds }) {
  const { userId } = useContext(UserContext);
  const currentDBId = useContext(CurrentDBIdContext);

  const [changedDoc, setChangedDoc] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();
  const docIndex = 2;

  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents;
  }

  const { data, isLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      enabled: !!userId,
      onSuccess: result => {
        const newArr = [];
        const documentIds = result.map(document => {
          newArr.push(document._id);
          return { documentId: document._id, elements: [] };
        });

        setChangedDoc(documentIds);
        setDocumentsIds(newArr);

        console.log(docs);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
    },
  );

  async function handleClickSave() {
    await fetchData(
      "PUT",
      `/users/${user}/databases/${currentDBId}/documents`,
      changedDoc,
    );
  }

  const { mutate: fetchDocumentUpdate } = useMutation(handleClickSave, {
    onSuccess: () => {
      queryClient.refetchQueries(["dbDocumentList"]);
    },
    onFailure: () => {
      console.log("sending user to errorpage");
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  function handleOnChange(event, documentId) {
    const { id, value } = event.target;
    const newChangedDoc = [...changedDoc];

    const documentIndex = changedDoc.findIndex(
      doc => doc.documentId === documentId,
    );

    const elementIndex = changedDoc[documentIndex].elements.findIndex(
      element => element.elementId === id,
    );

    if (elementIndex === -1) {
      newChangedDoc[documentIndex].elements.push({ elementId: id, value });
    } else {
      newChangedDoc[documentIndex].elements[elementIndex].value = value;
    }

    setChangedDoc(newChangedDoc);
    console.log(changedDoc);

    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  return (
    <div className="flex bg-grey w-full h-full">
      <div
        className={`relative flex bg-white w-full m-2 p-5 drop-shadow-md
      ${isEditMode ? "ring-4 ring-blue" : null}`}
      >
        <table className="border-collapse w-full max-h-20 overflow-y-auto">
          <thead className="border">
            <tr className="border">
              <th className="border p-2 w-4">Index</th>
              {documents[0].fields.map(field => (
                <th key={field._id} className="border p-2">
                  {field.fieldName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.database.documents.map((document, index) => (
              <tr
                key={document._id}
                className={`h-full border ${
                  docIndex === index ? "bg-yellow" : ""
                }`}
              >
                <td className="h-full border px-2 text-center">{index + 1}</td>
                {document.fields.map(element => (
                  <td
                    key={element._id}
                    id={element.field}
                    onDoubleClick={() => {
                      setIsEditMode(true);
                    }}
                    className="h-full border"
                  >
                    <div className="h-auto pt-2 px-3">
                      <textarea
                        className={`w-full h-full rounded-md disabled: bg-inherit resize-none
                        ${
                          isEditMode
                            ? "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                            : null
                        }`}
                        id={element._id}
                        defaultValue={element.fieldValue}
                        disabled={!isEditMode}
                        onChange={event => handleOnChange(event, document._id)}
                      ></textarea>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ListView.propTypes = {
  setDocumentsIds: PropTypes.func.isRequired,
};

export default ListView;
