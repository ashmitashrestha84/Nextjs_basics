import { FiEdit2, FiTrash2 } from "react-icons/fi";
interface ActionProps<T> {
  data: T;
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
}
const Action = <T,>({ data, onEdit, onDelete }: ActionProps<T>) => {
  return (
    <div className="flex flex-col gap-4">
      <button 
      type="button"
      onClick={() => onEdit(data)}>
        <FiEdit2 />
      </button>
      <button 
      type="button"
      onClick={() => onDelete(data)}>
        <FiTrash2 />
      </button>
    </div>
  );
};

export default Action;
