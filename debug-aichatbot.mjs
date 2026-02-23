import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        // wait for loader
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Find the orb button to open the chat
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            // The last button in the DOM should be our orb
            const orb = buttons[buttons.length - 1];
            if (orb) orb.click();
        });
        
        await new Promise(r => setTimeout(r, 1000)); // wait for chat to animate open
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_aichatbot.webp' });
        
        const chatVisible = await page.evaluate(() => {
            const header = document.querySelector('.tracking-widest.font-bold');
            return header ? header.textContent : 'Not found';
        });
        console.log("Chat Header Visible:", chatVisible);
        
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
