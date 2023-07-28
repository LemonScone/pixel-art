import { STORAGE_KEY } from "../constants";
import { Project } from "../types/Project";

const getDataFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
};

const updateCurrentProjectIdFromStorage = (currentProjectId: number) => {
  try {
    const dataStored = getDataFromStorage();
    if (dataStored) {
      dataStored.currentProjectId = currentProjectId;
    }
  } catch (e) {
    return false;
  }
};

const updateProjectFromStorage = (data: Project) => {
  try {
    const dataStored = getDataFromStorage();
    if (dataStored) {
      const stored = dataStored.stored as Project[];
      const rest = stored.filter(({ id }) => id !== data.id);
      const updatedProject = { ...data };
      const newProjects = [...rest, updatedProject];

      dataStored.stored = newProjects;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStored));
      return updatedProject;
    }
  } catch (e) {
    return false;
  }
};
const saveDataToStorage = <T>(data: T) => {
  try {
    let dataStored = getDataFromStorage();
    if (dataStored) {
      dataStored.stored.push(data);
      dataStored.currentProjectId = dataStored.stored.length;
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

export {
  getDataFromStorage,
  saveDataToStorage,
  updateProjectFromStorage,
  updateCurrentProjectIdFromStorage,
};
