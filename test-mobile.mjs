import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Force iPhone viewport
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    await page.goto('http://localhost:5173/');
    
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_hero_verification.png', fullPage: false });
    
    // Scroll a bit to verify next sections
    await page.evaluate(`window.scrollBy(0, 1500)`);
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/mobile_about_verification.png', fullPage: false });
    
    await browser.close();
})();
