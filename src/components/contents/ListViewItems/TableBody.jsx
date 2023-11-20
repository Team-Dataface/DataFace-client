import { useEffect } from "react";

function TableBody({
  documents,
  currentDocIndex,
  setCurrentDocIndex,
  changedDoc,
  setChangedDoc,
  setIsOnSave,
  setIsEditMode,
  isEditMode,
}) {
  function adjustTextareaHeight(event) {
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  useEffect(() => {
    const textareas = document.querySelectorAll(".auto-resize");

    textareas.forEach(textarea => {
      adjustTextareaHeight({ target: textarea });
    });
  }, [documents]);

  function updateDateModified(newChangedDoc, documentIndex) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todaysDate = `${year}-${month}-${day}`;

    const dateModifiedFieldIndex = documents[documentIndex].fields.findIndex(
      field => field.fieldType === "Date modified",
    );

    if (dateModifiedFieldIndex !== -1) {
      const dateModifiedFieldId =
        documents[documentIndex].fields[dateModifiedFieldIndex]._id;

      const dateModifiedIndexInsideChangedDoc = changedDoc[
        documentIndex
      ].fields.findIndex(field => field.fieldId === dateModifiedFieldId);

      if (dateModifiedIndexInsideChangedDoc === -1) {
        newChangedDoc[documentIndex].fields.push({
          fieldId: dateModifiedFieldId,
          fieldValue: todaysDate,
        });
      } else {
        newChangedDoc[documentIndex].fields[
          dateModifiedIndexInsideChangedDoc
        ].fieldValue = todaysDate;
      }
    }
  }

  function handleOnChange(event, documentId) {
    const { id, value } = event.target;
    const newChangedDoc = [...changedDoc];

    const documentIndex = changedDoc.findIndex(
      doc => doc.documentId === documentId,
    );

    const fieldIndex = changedDoc[documentIndex].fields.findIndex(
      field => field.fieldId === id,
    );

    if (fieldIndex === -1) {
      newChangedDoc[documentIndex].fields.push({
        fieldId: id,
        fieldValue: value,
      });
    } else {
      newChangedDoc[documentIndex].fields[fieldIndex].fieldValue = value;
    }

    updateDateModified(newChangedDoc, documentIndex);
    setChangedDoc(newChangedDoc);
    adjustTextareaHeight(event);
  }

  return (
    <tbody>
      {documents.map((document, index) => (
        <tr
          key={document._id}
          className={`h-full border ${
            currentDocIndex === index ? "bg-yellow" : ""
          }`}
          onClick={() => setCurrentDocIndex(index)}
        >
          <td className="h-full border px-2 text-center">{index + 1}</td>
          {document.fields.map(field => (
            <td
              key={field._id}
              id={field.field}
              onDoubleClick={() => {
                setIsOnSave(true);
                setIsEditMode(true);
              }}
              className="h-full border"
            >
              <div className="h-auto pt-2 px-3">
                {field.fieldType === "Text" ? (
                  <textarea
                    className={`w-full rounded-md disabled: bg-inherit resize-none auto-resize
                    ${
                      isEditMode &&
                      "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                    }`}
                    id={field._id}
                    rows="1"
                    defaultValue={field.fieldValue}
                    disabled={!isEditMode}
                    onChange={event => handleOnChange(event, document._id)}
                  />
                ) : (
                  <input
                    className={`w-full h-full rounded-md disabled: bg-inherit resize-none
                    ${
                      isEditMode &&
                      "hover:ring-2 hover:ring-blue hover:bg-blue hover:bg-opacity-20 focus:ring-2 focus:ring-blue focus:bg-blue focus:bg-opacity-20"
                    }`}
                    id={field._id}
                    type={field.fieldType}
                    defaultValue={field.fieldValue}
                    disabled={
                      field.fieldType === "Date modified" ||
                      field.fieldType === "Date created" ||
                      !isEditMode
                    }
                    onChange={event => handleOnChange(event, document._id)}
                  />
                )}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
