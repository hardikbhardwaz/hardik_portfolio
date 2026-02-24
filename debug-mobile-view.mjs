import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        // iPhone 14 Pro Mobile Viewport
        await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_hero.webp' });
        
        // Open Chatbot
        await page.evaluate(() => {
            const botBtn = document.querySelector('button.fixed');
            if (botBtn) botBtn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_chatbot_open.webp' });

        // Scroll down
        await page.evaluate(() => {
            window.scrollTo({ top: 1500, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_scroll_mid.webp' });

        console.log("Mobile View screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
