const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Browser Context Playwright test',async ({browser})=>{
// playwright-code for test
    const context = await browser.newContext();
// Useful when we have to set cookies; otherwise, we can just use page directly. 
    const page = await context.newPage();
    await page.goto("https://www.udemy.com/");
});

test('Page Playwright test',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator('.btn1').click();
    await page.locator('#firstName').fill("Test");
    await page.locator('#lastName').fill("User");
    await page.locator('#userEmail').fill("emp1112.user7@example.com");
    await page.locator('#userMobile').fill("9876543210");
    await page.selectOption('[formcontrolname="occupation"]', { label: 'Engineer' });
    await page.locator('[value="Female"]').click();
    await page.locator('#userPassword').fill("Password321@");
    await page.locator('#confirmPassword').fill("Password321@");
    await page.locator('[formcontrolname="required"]').click();
    await page.locator('#login').click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('#userEmail').fill("emp1112.user7@example.com");
    await page.locator('#userPassword').fill("Password321@");
    await page.locator('#login').click();
    await page.waitForLoadState("networkidle");
    console.log(await page.locator('.card-body b').allTextContents()); 
});

test("Child window handling", async({page,context})=>{
    await page.goto("https://www.google.com/");
    await page.locator("#APjFqb").fill("orange");
    await page.locator("#jZ2SBf").click();
    const [new_Page] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[aria-label='Orange (fruit) - Wikipedia. Opens in new tab.']").click()]);
    console.log(await new_Page.locator("#firstHeading").textContent());

});

test.only("End to end order placement flow ", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("emp1112.user7@example.com");
    await page.locator('#userPassword').fill("Password321@");
    await page.locator('#login').click();
    await page.locator(".card-body b").first().waitFor();
   const count = await page.locator(".card").count();
   for(let i = 0; i < count; i++){
        if(await page.locator(".card").nth(i).locator("b").textContent()==="ZARA COAT 3"){
            await page.locator(".card").nth(i).locator("text= Add To Cart").click();
            break;
        }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator(".infoWrap").waitFor();
   expect(await page.locator("text=ZARA COAT 3").isVisible()).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});