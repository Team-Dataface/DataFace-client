function DatabaseFields({ fields, databaseName }) {
  const keyFieldMockUp = {
    _id: "64c6126162fa40107897593",
    fieldName: "test1",
  };

  return (
    <div className="flex flex-col justify-center items-center w-[160px] m-10">
      <div className="flex flex-col w-full mb-2 border-2 rounded-md items-center bg-blue bg-opacity-50">
        <span className="flex font-bold py-1">{databaseName}</span>
      </div>
      <div className="flex flex-col items-center w-full max-h-[190px] border-2 rounded-md overflow-y-scroll">
        <ul className="w-full h-auto text-center">
          <li
            className={`w-full py-1 border-b-2 bg-yellow border-grey
          ${!keyFieldMockUp && "hidden"}`}
          >
            {keyFieldMockUp.fieldName}
          </li>
          {fields.map((field, index) => (
            <li
              key={field._id}
              className={`w-full py-1 border-b-2 border-grey ${
                index === fields.length - 1 ? "border-b-0" : ""
              }`}
            >
              {field.fieldName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DatabaseFields;
