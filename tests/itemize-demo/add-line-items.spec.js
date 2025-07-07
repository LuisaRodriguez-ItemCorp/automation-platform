import { test } from '@playwright/test';
import { login, settings } from '../../globalPageSetup.js';
import { initElements } from '../../globalPageSetup.js';

const documentTypes = ['Folio', 'Invoice', 'Purchase Order', 'Receipt', 'Utility Bill', 'Statement'];

test.describe.parallel('Add new Line Items to each Document Type ', () => {
  documentTypes.forEach((documentType) => {
    test(`Adding new line item to document type: ${documentType}`, async ({ page }) => {
      await initElements(page);
      await login.login();
      await settings.navigateToSettings();
      await settings.openFieldManagement();
      await settings.openAccountsPayable();
      await settings.selectDocumentType(documentType);
      await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "View Layout" [level=2]`);
      await settings.clickEdit();
      await settings.clickAddLineItem();
      // Select field
      const firstOptionText = await settings.selectFirstFieldOption();
      // Optionally, you can assert the value if needed
      await settings.submit();
      await settings.expectSuccessMessage(documentType);
      await settings.selectDocumentType(documentType);
      await settings.expectLineItemField(firstOptionText);
    });
  });
}); 