import { create } from "zustand";
import type { Campus } from "../types/Campus";

export interface AppStore {
  darkMode: boolean;
  toggleDarkMode: () => void;

  campuses: Campus[];
  addCampus: (campus: Omit<Campus, "id">) => void;
  updateCampus: (id: number, updatedCampus: Omit<Campus, "id">) => void;
  deleteCampus: (id: number) => void;
  getCampusById: (id: number) => Campus | undefined;
}

const defaultCampusImage =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200";

const useStore = create<AppStore>((set, get) => ({
  darkMode: localStorage.getItem("darkMode") === "true",
  toggleDarkMode: () =>
    set((state) => {
      const newValue = !state.darkMode;
      localStorage.setItem("darkMode", String(newValue));
      return { darkMode: newValue };
    }),

  campuses: [
    {
      id: 1,
      name: "Hunter College",
      address: "695 Park Ave, New York, NY",
      imageUrl: defaultCampusImage,
      description:
        "One of the senior colleges of the City University of New York. Hunter College offers many programs and serves students from across New York City.",
    },
  ],

  addCampus: (campus) =>
    set((state) => ({
      campuses: [
        ...state.campuses,
        {
          id: Date.now(),
          ...campus,
          imageUrl: campus.imageUrl || defaultCampusImage,
        },
      ],
    })),

  updateCampus: (id, updatedCampus) =>
    set((state) => ({
      campuses: state.campuses.map((campus) =>
        campus.id === id
          ? {
              id,
              ...updatedCampus,
              imageUrl: updatedCampus.imageUrl || defaultCampusImage,
            }
          : campus,
      ),
    })),

  deleteCampus: (id) =>
    set((state) => ({
      campuses: state.campuses.filter((campus) => campus.id !== id),
    })),

  getCampusById: (id) => get().campuses.find((campus) => campus.id === id),
}));

export default useStore;
