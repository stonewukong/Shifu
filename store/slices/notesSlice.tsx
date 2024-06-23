import { Notes, AddNotePayload, updateContentPayload } from "@/types/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: Notes = {
  notes: [
    {
      id: "first",
      title: "First Note",
      content: `<h1>YOLO</h1>`,
    },
    {
      id: "second",
      title: "Meeting Notes",
      content: `<p>Discuss project milestones and deliverables.</p>`,
    },
    {
      id: "third",
      title: "Grocery List",
      content: `<ul><li>Milk</li><li>Bread</li><li>Eggs</li><li>Cheese</li></ul>`,
    },
    {
      id: "fourth",
      title: "To Do",
      content: `<ol><li>Finish the report</li><li>Call the client</li><li>Prepare presentation</li></ol>`,
    },
    {
      id: "fifth",
      title: "Workout Plan",
      content: `<p>1. Warm-up</p><p>2. Cardio</p><p>3. Strength training</p><p>4. Cool down</p>`,
    },
    {
      id: "sixth",
      title: "Holiday Plans",
      content: `<p>1. Book flights</p><p>2. Reserve hotel</p><p>3. Plan itinerary</p><p>4. Pack bags</p>`,
    },
    {
      id: "seventh",
      title: "Book Recommendations",
      content: `<p>1. 'The Great Gatsby' by F. Scott Fitzgerald</p><p>2. 'To Kill a Mockingbird' by Harper Lee</p><p>3. '1984' by George Orwell</p>`,
    },
    {
      id: "eighth",
      title: "Recipe Ideas",
      content: `<p>1. Spaghetti Carbonara</p><p>2. Chicken Curry</p><p>3. Vegan Tacos</p>`,
    },
    {
      id: "ninth",
      title: "Project Roadmap",
      content: `<p>Q1: Research and Planning</p><p>Q2: Development</p><p>Q3: Testing and QA</p><p>Q4: Launch</p>`,
    },
    {
      id: "tenth",
      title: "Learning Goals",
      content: `<p>1. Master React</p><p>2. Learn TypeScript</p><p>3. Explore GraphQL</p>`,
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNotePayload>) => {
      state.notes.push({
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
      });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNoteContent: (state, action: PayloadAction<updateContentPayload>) => {
      let updatedNote = state.notes.find(
        (note) => note.id === action.payload.id,
      );
      let prevContent = updatedNote?.content;
      prevContent = action.payload.content;
    },
  },
});

export const { addNote, removeNote, updateNoteContent } = notesSlice.actions;

export default notesSlice.reducer;
