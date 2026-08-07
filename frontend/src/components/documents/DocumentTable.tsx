interface Props {
  documents: any[];
}

export default function DocumentTable({
  documents,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Size
            </th>

            <th className="px-6 py-4 text-left">
              Uploaded
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {doc.name}
              </td>

              <td className="px-6 py-4">
                {doc.size}
              </td>

              <td className="px-6 py-4">
                {doc.created_at}
              </td>

              <td className="px-6 py-4 text-right">
                View
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}