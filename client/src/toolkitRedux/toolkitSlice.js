import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    age: '',
    email: '',
    gender: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    lifestyle: '',
    want: '',
    steps: '',
    allergy: '',
  },

  reducers: {
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setHeightUnit: (state, action) => {
      state.heightUnit = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setWeightUnit: (state, action) => {
      state.weightUnit = action.payload;
    },
    setLifestyle: (state, action) => {
      state.lifestyle = action.payload;
    },
    setWant: (state, action) => {
      state.want = action.payload;
    },
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setAllergy: (state, action) => {
      state.allergy = action.payload;
    },
  },
});

export const {
  setAge,
  setEmail,
  setGender,
  setHeight,
  setHeightUnit,
  setWeight,
  setWeightUnit,
  setLifestyle,
  setWant,
  setSteps,
  setAllergy,
} = toolkitSlice.actions;

export default toolkitSlice.reducer;
