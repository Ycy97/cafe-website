const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:"msedge"}); const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1280,375,320]) {
 await page.setViewportSize({width,height:900});
 for(const name of ['index.html','about.html','contact.html']) {
 await page.goto(pathToFileURL(process.cwd()+'/'+name).href);
 for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); }
 await page.waitForTimeout(300);
 const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
 if(result.overflow||!result.images)throw Error(name+width+JSON.stringify(result));
 console.log(name,width,'images and layout OK');
 }
 }
 await page.goto(pathToFileURL(process.cwd()+'/index.html').href);
 await page.locator('[data-filter="pastries"]').click();
 if(await page.locator('.menu-item:not(.hidden)').count()!==3)throw Error('Filter');
 await page.locator('.nav-toggle').click();await page.keyboard.press('Escape');
 if(await page.locator('.nav-toggle').getAttribute('aria-expanded')!=='false')throw Error('Escape');
 await page.goto(pathToFileURL(process.cwd()+'/contact.html').href);
 await page.getByRole('button',{name:'Check Message'}).click();
 if(await page.locator('[aria-invalid="true"]').count()!==4)throw Error('Invalid fields');
 await page.locator('#name').fill('Test');await page.locator('#email').fill('test@example.com');await page.locator('#subject').selectOption('general');await page.locator('#message').fill('A test message for validation.');
 await page.getByRole('button',{name:'Check Message'}).click();
 if(!(await page.locator('.form-success').innerText()).includes('has not sent'))throw Error('Demo message');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});const np=await nojs.newPage();await np.goto(pathToFileURL(process.cwd()+'/index.html').href);
 if(!await np.locator('.gallery').isVisible()||!await np.getByRole('navigation').getByText('About').isVisible())throw Error('No JS');
 await page.setViewportSize({width:1280,height:900});await page.goto(pathToFileURL(process.cwd()+'/index.html').href);for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); } await page.screenshot({path:'audit-home.png',fullPage:true});
 if(errors.length)throw Error(errors.join('\n'));console.log('Filters, mobile Escape, validation, no-JS fallback and console checks passed');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});



