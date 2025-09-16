// UI messages and text used in validation and assertions
import { testData } from "./testData";
export const TEXTS = {
  login: {
    success: 'Congratulations, you logged in successfully',
    failure: 'Please enter valid username/password',
    empty: 'Username/Password field should not be blank',
  },

  file: {
    fileSelected: `File selected: ${testData.fileData.testFileName}`,
  }
};