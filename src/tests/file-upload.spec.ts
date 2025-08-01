import { test, expect } from '../fixtures';
import { getTestFilePath } from '../utils/fileUtils';
import { testData } from '../utils/testData';
import { TEXTS } from '../utils/constants';

const testFilePath = getTestFilePath(testData.fileData.testFileName);

test.describe('File Upload Tests', () => {
  test('@smoke TC-008 should upload file using standard input', async ({ fileUploadPage }) => {
    await fileUploadPage.uploadStandardFile(testFilePath);
    const result = await fileUploadPage.getStandardUploadResult();
    expect(result).toBe(TEXTS.file.fileSelected);
  });

  test('@functional TC-009 should upload file using drag and drop', async ({ fileUploadPage }) => {
    await fileUploadPage.uploadDragDropFile(testFilePath);
    const result = await fileUploadPage.getDragDropUploadResult();
    expect(result).toBe(TEXTS.file.fileSelected);
  });

  test('@regression TC-010 should upload file using custom file uploader', async ({ fileUploadPage }) => {
    await fileUploadPage.uploadCustomFile(testFilePath);
    const result = await fileUploadPage.getCustomUploadResult();
    expect(result).toBe(TEXTS.file.fileSelected);
  });
});
