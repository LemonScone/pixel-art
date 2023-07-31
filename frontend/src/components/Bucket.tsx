import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { changeSelectedTool } from "../store";

const Bucket = () => {
  const dispatch = useAppDispatch();
  const { selectedTool } = useAppSelector((state) => state.projects.present);

  return (
    <a
      type="button"
      role="button"
      className={
        selectedTool === "bucket"
          ? "relative cursor-pointer rounded-lg bg-primary-color-600 p-1 text-gray-900 hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
          : "rounded-lg p-1 text-gray-400 hover:bg-primary-color-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
      }
      onClick={() => {
        dispatch(changeSelectedTool("bucket"));
      }}
    >
      <span className="sr-only">Bucket</span>
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
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
        <path d="m5 2 5 5" />
        <path d="M2 13h15" />
        <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
      </svg>
    </a>
  );
};

export default Bucket;
