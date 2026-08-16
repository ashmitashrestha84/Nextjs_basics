"use client";

import { flexRender, Table as ReactTable } from "@tanstack/react-table";

interface ReusableTableProps<TData> {
  table: ReactTable<TData>;
  isUpdateMode?: boolean;
  onSelectRow?: (row: TData) => void;
}

const Table = <TData,>({
  table,
  isUpdateMode = false,
  onSelectRow,
}: ReusableTableProps<TData>) => {
  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b bg-gray-50">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-5 py-4 text-left text-sm font-semibold"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => {
              if (isUpdateMode && onSelectRow) {
                onSelectRow(row.original);
              }
            }}
            className={`border-b hover:bg-gray-50 ${
              isUpdateMode ? "cursor-pointer" : ""
            }`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-5 py-4 text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
