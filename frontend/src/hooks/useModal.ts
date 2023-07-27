import { useSearchParams } from "react-router-dom";

export const useModal = () => {
  const [params, setParams] = useSearchParams();

  const openModal = () => {
    setParams({ ...params, modal: "true" });
  };

  const closeModal = () => {
    params.delete("modal");
    setParams(params);
  };

  const open = () => {
    return !!params.get("modal");
  };

  return { openModal, closeModal, open };
};
