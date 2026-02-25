import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // --- 1. Screenshot the Main Gallery with the new Web Dev projects ---
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
            
            // Force click the "Web Development" tab
            const tabs = document.querySelectorAll('button');
            for (let btn of tabs) {
                if (btn.textContent.includes('Web Development')) btn.click();
            }
        });
        await new Promise(r => setTimeout(r, 1500));
        
        // Hover over the first project tile (RS Enterprises) to trigger the opacity reveal
        await page.hover('.group.relative.h-72');
        await new Promise(r => setTimeout(r, 800)); // wait for easing
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/gallery_real_projects.webp' });

        // --- 2. Screenshot the Deep Archive Grid ---
        // Click the first project tile to launch the Deep Archive
        await page.evaluate(() => {
            const tiles = document.querySelectorAll('.group.relative.h-72');
            if (tiles.length > 0) {
                tiles[0].click();
            }
        });
        await new Promise(r => setTimeout(r, 1500)); 

        // Scroll down inside the Advanced Gallery to see the Bento grid
        await page.evaluate(() => {
            const overlay = document.querySelector('.bg-black.z-\\[10000\\]');
            if (overlay) overlay.scrollBy({ top: 400, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 800));
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/archive_real_projects.webp' });

        console.log("Real Asset Screenshots Taken!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
