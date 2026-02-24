import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        // iPhone 14 Pro Mobile Viewport
        await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // 1. Check Hero Padding
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_hero_final.webp' });
        
        // 2. Open Chatbot (Native Sheet Layout testing)
        await page.evaluate(() => {
            const botBtn = document.querySelector('button.fixed.bottom-0');
            if (botBtn) botBtn.click();
        });
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_chatbot_final.webp' });

        // Close Chatbot
        await page.evaluate(() => {
            const closeBtn = document.querySelector('button.fixed.bottom-0');
            if (closeBtn) closeBtn.click();
        });
        await new Promise(r => setTimeout(r, 500));

        // 3. Scroll to Gallery / Terminal 
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 600)); 
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_gallery_final.webp' });

        console.log("Final Mobile View screenshots captured.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
