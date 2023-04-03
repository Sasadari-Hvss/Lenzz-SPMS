import { createContext, useReducer, useEffect } from "react";

export const ProjectContext = createContext();

export const projectReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        projects: [action.payload],
      };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, {
    projects: null,
  });
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("Projects"));

  }, []);
  console.log("project state:", state);
  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
