import { useEffect, useState } from "react";

import { GRID_SIZE_MAX_VALUE, GRID_SIZE_MIN_VALUE } from "../constants";

import ToolConatiner from "../components/ToolContainer";
import PixelContainer from "../components/PixelContainer";
import NewProject from "../components/NewProject";
import LoadProject from "../components/LoadProject";
import SaveProject from "../components/SaveProject";
import ResetProject from "../components/ResetProject";
import NumberPicker from "../components/NumberPicker";
import PixelSize from "../components/PixelSize";
import Title from "../components/Title";
import ColorPallete from "../components/ColorPallete";
import PublishToggleSwitch from "../components/PublishToggleSwitch";
import Loading from "../components/common/Loading";

import { decreseColumn, decreseRow, increseColumn, increseRow } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useFetchProjectQuery } from "../store";

import useAuth from "../hooks/useAuth";
import FrameList from "../components/FrameList";
import PreviewContainer from "../components/PreviewContainer";

const Editor = () => {
  const dispatch = useAppDispatch();
  const { data: project } = useAppSelector((state) => state.projects.present);

  const { user } = useAuth();

  const { refetch, isFetching } = useFetchProjectQuery();

  const [pixelSize, setPixelSize] = useState(1);
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  if (isFetching) {
    return <Loading />;
  }

  const columns = project.gridColumns;
  const rows = project.gridRows;

  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-between md:flex-row">
      <div className="order-2 flex grow flex-col justify-between md:order-1">
        <div className="flex flex-col items-center md:flex-row">
          <ToolConatiner />
          <div className="flex flex-grow flex-col items-center p-4">
            <div className="z-10 h-fit w-72 touch-none select-none sm:w-80 md:w-96 lg:w-[30rem] xl:w-[32rem] 2xl:w-[50rem]">
              <PixelContainer />
            </div>
          </div>
        </div>
        <div className="-mt-20 grid grid-cols-6">
          <PreviewContainer />
          <div className="col-span-5 flex flex-col justify-center bg-neutral-900">
            <div className="flex max-w-[48rem] flex-nowrap overflow-x-auto ">
              <FrameList />
            </div>
          </div>
        </div>
      </div>
      <div className="order-1 flex flex-col gap-1 divide-y divide-gray-700 rounded-b bg-neutral-900 md:order-2">
        <div className="flex flex-col gap-2 p-4">
          <NewProject />
          <div className="flex grow justify-center gap-2">
            <LoadProject />
            <SaveProject project={project} />
          </div>
          <ResetProject />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center">
            <NumberPicker
              name={"Width"}
              value={columns}
              minValue={GRID_SIZE_MIN_VALUE}
              maxValue={GRID_SIZE_MAX_VALUE}
              onIncrease={() => dispatch(increseColumn())}
              onDecrease={() => dispatch(decreseColumn())}
            />
          </div>
          <div className="flex items-center">
            <NumberPicker
              name={"Height"}
              value={rows}
              minValue={GRID_SIZE_MIN_VALUE}
              maxValue={GRID_SIZE_MAX_VALUE}
              onIncrease={() => dispatch(increseRow())}
              onDecrease={() => dispatch(decreseRow())}
            />
          </div>
          <div className="flex items-center">
            <PixelSize value={pixelSize} onChangePixelSize={setPixelSize} />
          </div>
          <div className="flex items-center">
            <Title />
          </div>
        </div>
        <div className="flex justify-center p-4">
          <ColorPallete />
        </div>
        <div className="p-4">
          <PublishToggleSwitch
            checked={publish}
            onToggleSwitch={() => setPublish((prevPublish) => !prevPublish)}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
