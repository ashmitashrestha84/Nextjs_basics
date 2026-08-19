interface DeleteModalProps {
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteModal = ({
  open,
  name,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">Delete Item</h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{name}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
