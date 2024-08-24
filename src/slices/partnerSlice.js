import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { partnerEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const { ADD_PARTNER_INFORMATION_API } = partnerEndpoints;

const initialState = {
  partnerFormData: {
    personalInformation: {},
    businessInformation: {},
    additionalInformation: {},
  },
  isLoading: false,
  currentStep: 0,
  error: null,
};

export const addPartnerInformation = createAsyncThunk(
  "partner/addPartnerInformation",
  async ({ formData }, thunkAPI) => {
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "photo") {
          form.append(key, formData[key]);
        } else if (
          typeof formData[key] === "object" &&
          formData[key] !== null
        ) {
          form.append(key, JSON.stringify(formData[key]));
        } else {
          form.append(key, formData[key]);
        }
      });

      const response = await apiConnector(
        "POST",
        ADD_PARTNER_INFORMATION_API,
        form,
        { "Content-Type": "multipart/form-data" }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    saveFormData: (state, action) => {
      const { step, data } = action.payload;
      state.partnerFormData[step] = data;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addPartnerInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPartnerInformation.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success("Partner information added successfully");
      })
      .addCase(addPartnerInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error adding partner information");
      });
  },
});

export const { nextStep, previousStep, saveFormData } = partnerSlice.actions;
export default partnerSlice.reducer;