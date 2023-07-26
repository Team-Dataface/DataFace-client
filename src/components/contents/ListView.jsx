import { useQuery } from "@tanstack/react-query";

import fetchData from "../../utils/axios";

function ListView({ user }) {
  async function getDocumentsList() {
    const response = await fetchData(
      "GET",
      `users/${user}/databases/64bffed070febc17880c87eb`,
    );

    return response;
  }

  const { data, isLoading } = useQuery(["dbDocumentList"], getDocumentsList, {
    enabled: !!user,
    onFailure: () => {
      console.log("sending user to errorpage");
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const { documents } = data.data.database;
  const { fields } = data.data.database;

  return (
    <div className="flex bg-grey w-full h-full">
      <div className="flex bg-white w-full m-2 p-5 drop-shadow-md">
        <table className="border-collapse w-full">
          <thead className="border">
            <tr className="border">
              <th className="border p-2 w-4">Index</th>
              {fields.map(field => (
                <th key={field._id} className="border p-2">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={document._id} className="border h-16">
                <td className="border p-2 text-center">{index + 1}</td>
                {document.elements.map(element => (
                  <td key={element._id} className="border p-4">
                    {element.value}
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

export default ListView;
