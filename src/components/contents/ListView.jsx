import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import fetchData from "../../utils/axios";

function ListView({ user, currentDBId, setDocumentsIds }) {
  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${user.userId}/databases/${currentDBId}`,
    );

    return response.data.database.documents;
  }

  const { data: documents, isLoading } = useQuery(
    ["dbDocumentList", currentDBId],
    getDocumentsList,
    {
      enabled: !!user,
      onSuccess: result => {
        const newArr = [];

        result.forEach(element => {
          newArr.push(element._id);
        });

        setDocumentsIds(newArr);
      },
      onFailure: () => {
        console.log("sending user to errorpage");
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex bg-grey w-full h-full">
      <div className="flex bg-white w-full m-2 p-5 drop-shadow-md">
        <table className="border-collapse w-full">
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
            {documents.map((document, index) => (
              <tr key={document._id} className="border h-16">
                <td className="border p-2 text-center">{index + 1}</td>
                {document.fields.map(element => (
                  <td key={element._id} className="border p-4">
                    {element.fieldValue}
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
  user: PropTypes.string.isRequired,
  currentDBId: PropTypes.string.isRequired,
};

export default ListView;
