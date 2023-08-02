import { ReactElement, ReactNode, useState } from "react";
import classNames from "../../utils/classNames";

const Frame = ({ children }: { children: ReactElement[] | ReactElement }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const childArr = Array.isArray(children) ? children : [children];

  const tabs = childArr.map((tabPane, index) => (
    <li
      key={index}
      onClick={() => setActiveIndex(index)}
      className={classNames(
        index === activeIndex
          ? "rounded-lg bg-primary-color text-neutral-900 shadow"
          : "",
        "flex cursor-pointer justify-center px-4 py-2"
      )}
    >
      {tabPane.props.display}
    </li>
  ));

  const contents = childArr.map((tabPane, index) => {
    if (activeIndex === index) {
      return <div key={index}>{tabPane.props.children}</div>;
    }
  });

  return (
    <>
      <ul className="inline-flex justify-center rounded-lg bg-neutral-900 p-1 text-center text-gray-500">
        {tabs}
      </ul>
      <section className="w-full"> {contents}</section>
    </>
  );
};

const TabPane = ({
  display,
  active = false,
  children,
}: {
  display: string;
  active?: boolean;
  children: ReactNode;
}) => {
  return active ? (
    <>
      <li>{display}</li>
      <div>{children}</div>
    </>
  ) : null;
};

export const Tab = { Frame, TabPane };
