import { STORAGE_KEY } from "../constants";

const getDataFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
};

const saveDataToStorage = <T>(data: T) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

export { getDataFromStorage, saveDataToStorage };
