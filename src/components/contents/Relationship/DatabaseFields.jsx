function DatabaseFields({ fields, databaseName }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col border-2 rounded-lg items-center w-full mb-2 px-20">
        <h1 className="flex text-xl font-bold py-2">{databaseName}</h1>
      </div>
      <div className="flex flex-col border-2 rounded-lg items-center w-full max-h-60 overflow-y-auto mb-12">
        <ul className="text-center w-full h-auto">
          {fields.map((field, index) => (
            <li
              key={field._id}
              className={`border-b-2 border-grey w-full py-1 ${
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
