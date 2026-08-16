import { getAllUsers } from "@/api/user.api";
import Table from "@/components/common/table";
import { IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface UserTableProps {
  isUpdateMode: boolean;
  onSelectUser: (user: IUser) => void;
  selectedUser: IUser | null;
}

const UserTable = ({ isUpdateMode, onSelectUser }: UserTableProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["get-all-user"],
  });

  const user: IUser[] = data?.data ?? [];
  const columns: ColumnDef<IUser>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <img
            src={row.original.profile_image?.path}
            alt={row.original.full_name}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },
    {
        accessorKey:"full_name",
        header:"name",
    },
    {
        accessorKey:"email",
        header:"Email"
    },
  ];

  const table= useReactTable({
    data:user,
    columns,
    getCoreRowModel:getCoreRowModel(),
  })
    if (isLoading) {
    return <div className="p-6 text-center">Loading User...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load User.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-white">
      <Table
        table={table}
        isUpdateMode={isUpdateMode}
        onSelectRow={onSelectUser}
      />
    </div>
  );
};

export default UserTable;

