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
    let dataStored = getDataFromStorage();
    if (dataStored) {
      dataStored.stored.push(data);
      dataStored.currentProjectId = dataStored.stored.length - 1;
    } else {
      dataStored = {
        stored: [data],
        currentProjectId: 0,
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStored));
    return true;
  } catch (e) {
    return false;
  }
};

export { getDataFromStorage, saveDataToStorage };
