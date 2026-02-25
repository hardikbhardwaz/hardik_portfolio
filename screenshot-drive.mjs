import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // --- Screenshot 1: Graphic Design Deep Archive ---
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
            
            // Force click the "Graphic Design" tab
            const tabs = document.querySelectorAll('button');
            for (let btn of tabs) {
                if (btn.textContent.includes('Graphic Design')) btn.click();
            }
        });
        await new Promise(r => setTimeout(r, 1500));
        
        // Click the first project tile
        await page.evaluate(() => {
            const tiles = document.querySelectorAll('.group.relative.h-72');
            if (tiles.length > 0) tiles[0].click();
        });
        await new Promise(r => setTimeout(r, 1500));
        
        // Scroll down inside Advanced Gallery
        await page.evaluate(() => {
            const overlay = document.querySelector('.bg-black.z-\\[10000\\]');
            if (overlay) overlay.scrollBy({ top: 300, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 800));
        
        // Hover the first tile in the Deep Archive to reveal the "ACCESS SECURE DRIVE" button
        await page.hover('.group.relative.rounded-2xl');
        await new Promise(r => setTimeout(r, 800));
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/graphics_drive_btn.webp' });

        console.log("Drive Screenshots Taken!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
