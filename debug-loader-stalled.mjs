import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    
    page.on('pageerror', err => {
        console.log(`PAGE ERROR: ${err.message}`);
    });
    
    page.on('console', msg => {
        // Log all messages to see what's happening
        console.log(`CONSOLE [${msg.type()}]: ${msg.text()}`);
    });

    try {
        console.log("Navigating to local dev server...");
        await page.goto('http://localhost:5173/');
        
        console.log("Waiting 5 seconds to observe loading state...");
        await new Promise(r => setTimeout(r, 5000)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_stalled_loader.webp' });
        console.log("Screenshot written. Checking DOM for progress...");

        // Extract progress text
        const progressText = await page.evaluate(() => {
            const el = document.querySelector('.text-6xl.font-black');
            return el ? el.textContent : 'Not found';
        });
        console.log("Current Loader Progress Text:", progressText);

    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
