function TableBody({
  documents,
  currentDocIndex,
  changedDoc,
  setChangedDoc,
  setIsOnSave,
  setIsEditMode,
  isEditMode,
}) {
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

    setChangedDoc(newChangedDoc);
    console.log(changedDoc);

    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  return (
    <tbody>
      {documents.map((document, index) => (
        <tr
          key={document._id}
          className={`h-full border ${
            currentDocIndex === index ? "bg-yellow" : ""
          }`}
        >
          <td className="h-full border px-2 text-center">{index + 1}</td>
          {document.fields.map(field => (
            <td
              key={field._id}
              id={field.field}
              onClick={() => {
                setIsOnSave(true);
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
                  id={field._id}
                  defaultValue={field.fieldValue}
                  disabled={!isEditMode}
                  onChange={event => handleOnChange(event, document._id)}
                ></textarea>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
