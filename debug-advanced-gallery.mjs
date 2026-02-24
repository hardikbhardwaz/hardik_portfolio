import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); // wait for initial canvas/loaders
        
        // Scroll to the Works Gallery Section
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
        });
        await new Promise(r => setTimeout(r, 1000));
        
        // Screenshot before click
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/gallery_trigger_view.webp' });

        // Click the EXPLORE DEEP ARCHIVE button
        await page.evaluate(() => {
            const btn = document.evaluate("//span[text()='EXPLORE DEEP ARCHIVE']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (btn) {
                btn.closest('button').click();
            } else {
                console.log("Button not found via text");
            }
        });

        await new Promise(r => setTimeout(r, 1500)); // Wait for Framer Motion animation

        // Screenshot the Advanced Gallery Overlay
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/advanced_gallery_overlay.webp' });

        // Scroll down inside the Advanced Gallery to see the masonry grid
        await page.evaluate(() => {
            const overlay = document.querySelector('.bg-black.z-\\[10000\\]');
            if (overlay) {
                overlay.scrollBy({ top: 400, behavior: 'instant' });
            }
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/advanced_gallery_grid.webp' });

        console.log("Advanced Gallery Screenshots Taken!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
