function TableHead({ fields }) {
  return (
    <thead className="border">
      <tr className="border">
        <th className="border p-2 w-4">Index</th>
        {fields.map(field => (
          <th key={field._id} className="border p-2">
            {field.fieldName}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
