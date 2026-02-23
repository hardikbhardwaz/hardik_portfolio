import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // scroll down to contact
        await page.evaluate(() => {
            const contact = document.getElementById('contact');
            if (contact) {
                contact.scrollIntoView({ behavior: 'auto', block: 'center' });
            } else {
                window.scrollBy(0, 5000);
            }
        });
        
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_contact_terminal.webp' });
        
        console.log("Contact Terminal screenshot captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
