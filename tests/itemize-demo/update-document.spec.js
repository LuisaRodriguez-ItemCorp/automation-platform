import { test, expect } from '@playwright/test';
import { login, ap, page} from "../../globalPageSetup.js"
import { initElements } from '../../globalPageSetup.js';
import { demoModule } from '../../globalPageSetup.js';

test('Upload Document via Demo Module', async ({ page }) => {
  await initElements(page);
  await demoModule.gotoLogin();
  await demoModule.login('demo@itemizecorp.com', 'Itemize123!');
  await demoModule.clickExperimentIcon();
  await demoModule.uploadFile('test-data/test-docs/jetbrains Y2017_06.pdf');
  await demoModule.expectFileUploaded('jetbrains Y2017_06.pdf');
  await page.waitForTimeout(20000);
  await demoModule.expectInvoiceForm();
  await demoModule.expectLineItemsForm();
  await page.goto('https://platform.itemize.dev/home/demo/upload');
});

test('[@smoke] Upload Document via AP module', async ({page})=>{
  await initElements(page); 
  await login.login();
  await ap.navigateToAP();
  await ap.uploadFile('test-data/test-docs/jetbrains Y2017_06.pdf');
  await ap.selectUploadedFile('jetbrains Y2017_06');
  await ap.expectUploadSuccess('jetbrains Y2017_06.pdf');
  await ap.expectProcessingTagVisible();
});