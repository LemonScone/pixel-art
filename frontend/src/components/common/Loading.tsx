import SpinIcon from "./icon/SpinIcon";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SpinIcon className="h-10 w-10 text-primary-color" />
    </div>
  );
};

export default Loading;
