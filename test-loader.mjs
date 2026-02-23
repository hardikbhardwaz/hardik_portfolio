import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set desktop viewport to capture the full loader
    await page.setViewport({ width: 1920, height: 1080 });
    
    try {
        // Go to site, but screenshot IMMEDIATELY to catch the preloader before it hits 100%
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 200)); // 200ms should easily catch the loader UI
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/ai_loader_verification.png', fullPage: true });
        console.log('Loader Screenshot Captured.');
    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
