import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 1000));
        
        // Screenshot before click
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/gallery_tile_view.webp' });

        // Click the first project tile
        await page.evaluate(() => {
            const tiles = document.querySelectorAll('.group.relative.h-72'); // Our target class for the cards
            if (tiles.length > 0) {
                tiles[0].click();
            } else {
                console.log("Tiles not found");
            }
        });

        await new Promise(r => setTimeout(r, 1500)); 

        // Screenshot the Advanced Gallery Overlay
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/advanced_gallery_tile_overlay.webp' });

        console.log("Tile-Click Advanced Gallery test complete!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
