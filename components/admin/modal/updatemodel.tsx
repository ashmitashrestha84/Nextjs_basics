interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const UpdateModal = ({ open, title, children, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
};

export default UpdateModal;
