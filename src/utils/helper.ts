export const payloadCreator = (asyncFunc: (arg: any, signal: AbortSignal) => Promise<any>) => async (arg: any, thunkAPI: any) => {
  try {
    const res = await asyncFunc(arg, thunkAPI.signal);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
