import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        // Wait for AILoader and the intro animations
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Scroll down to the Selected Works and open the Video Editing 3D gallery
        await page.evaluate(() => {
            window.scrollTo({ top: 1800, behavior: 'instant' });
            
            const tabs = document.querySelectorAll('button');
            for (let btn of tabs) {
                if (btn.textContent.includes('Video Editing')) btn.click();
            }
        });
        await new Promise(r => setTimeout(r, 1500));
        
        // Click the first project tile to trigger the AdvancedGallery3D
        await page.evaluate(() => {
            const tiles = document.querySelectorAll('.group.relative.h-72');
            if (tiles.length > 0) tiles[0].click();
        });
        // Give Three.js time to compile shaders and mount the massive cloud
        await new Promise(r => setTimeout(r, 4000));
        
        // Simulate dragging the scroll deeper into Z-space
        await page.mouse.move(700, 450);
        await page.mouse.down();
        await page.mouse.move(700, 100, { steps: 20 }); // Drag "up" to scroll "forward" in Z
        await page.mouse.up();
        await new Promise(r => setTimeout(r, 1000));
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/advanced_gallery_3d.webp' });

        console.log("3D WebGL Gallery Screenshot Taken!");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
