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

const getCurrentProjectFromStorage = () => {
  try {
    const data = getDataFromStorage();
    if (data) {
      const { stored, currentProjectId } = data;
      if (stored.length) {
        const find = (stored as Project[]).find(
          ({ id }) => id === currentProjectId
        );
        return find;
      } else {
        return null;
      }
    }
  } catch (e) {
    return null;
  }
};

const updateCurrentProjectIdFromStorage = (currentProjectId: number) => {
  try {
    const dataStored = getDataFromStorage();
    if (dataStored) {
      dataStored.currentProjectId = currentProjectId;
      saveDataToStorage(dataStored);
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
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
const saveProjectToStorage = <T extends { id?: Project["id"] }>(data: T) => {
  try {
    let dataStored = getDataFromStorage();
    if (dataStored) {
      dataStored.stored.push(data);
      dataStored.currentProjectId = data.id;
    } else {
      dataStored = {
        stored: [data],
        currentProjectId: data.id,
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStored));
    return true;
  } catch (e) {
    return false;
  }
};

const saveDataToStorage = <T>(data: T) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false; // There was an error
  }
};

const removeProjectFromStorage = (removeId: string) => {
  const dataStored = getDataFromStorage();
  if (dataStored) {
    const stored = dataStored.stored as Project[];
    const idx = stored.findIndex(({ id }) => id.toString() === removeId);
    const rest = stored.filter(({ id }) => id.toString() !== removeId);

    const newDataStored = {
      stored: rest,
      currentProjectId: "",
    };

    let newCurrent = "";
    if (newDataStored.stored.length === 0) {
      newCurrent = "";
    } else if (idx > 0) {
      newCurrent = stored[idx - 1].id.toString();
    } else {
      newCurrent = newDataStored.stored[0].id.toString();
    }

    newDataStored.currentProjectId = newCurrent.toString();

    return saveDataToStorage(newDataStored);
  }
  return false;
};

export {
  getDataFromStorage,
  saveProjectToStorage,
  updateProjectFromStorage,
  updateCurrentProjectIdFromStorage,
  removeProjectFromStorage,
  getCurrentProjectFromStorage,
};
