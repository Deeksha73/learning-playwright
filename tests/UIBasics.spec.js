const {test} = require('@playwright/test');


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

test.only("Child window handling", async({page,context})=>{
    await page.goto("https://www.google.com/");
    await page.locator("#APjFqb").fill("orange");
    await page.locator("#jZ2SBf").click();
    const [new_Page] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[aria-label='Orange (fruit) - Wikipedia. Opens in new tab.']").click()]);
    console.log(await new_Page.locator("#firstHeading").textContent());

});