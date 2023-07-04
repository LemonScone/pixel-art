import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { changeSelectedTool } from "../store";

const Move = () => {
  const dispatch = useAppDispatch();
  const { selectedTool } = useAppSelector((state) => state.projects);

  return (
    <a
      type="button"
      role="button"
      className={
        selectedTool === "move"
          ? "relative cursor-pointer rounded-lg bg-primary-color-600 p-1 text-gray-900 hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
          : "rounded-lg p-1 text-gray-400 hover:bg-primary-color-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
      }
      onClick={() => {
        dispatch(changeSelectedTool("move"));
      }}
    >
      <span className="sr-only">Move</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="22" />
      </svg>
    </a>
  );
};

export default Move;
