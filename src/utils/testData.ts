// Test input data for different user scenarios
export const testData = {
  validUser: {
    username: 'vinayak',
    password: 'automation',
  },

  invalidUser: {
    username: 'wrongUser',
    password: 'wrongPass',
  },

  emptyUser: {
    username: '',
    password: '',
  },

  expectedMessages: {
    success: 'Login successful',
    failure: 'Login failed',
  },

  fileData: {
    testFileName: 'test-file.txt'
  },

  dropdownOptions: {
    static: 'jeep',
    searchable: 'Jaguar',
    custom: 'Ferrari',
  },
};