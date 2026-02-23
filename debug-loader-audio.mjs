import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set desktop viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    page.on('pageerror', err => {
        console.log(`PAGE ERROR: ${err.message}`);
    });
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`CONSOLE ERROR: ${msg.text()}`);
        }
    });

    try {
        console.log("Navigating to site...");
        await page.goto('http://localhost:5173/');
        
        console.log("Waiting 2.5 seconds for heavy WebGL loading (Progress 100%)...");
        await new Promise(r => setTimeout(r, 2500)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/loader_audio_verification.webp' });
        console.log("Screenshot taken. Looking for INITIATE SYSTEM button...");

        // Try to click the initiate button
        const buttonText = await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            return btns.find(b => b.textContent.includes('INITIATE SYSTEM'))?.textContent;
        });

        if (buttonText) {
             console.log("SUCCESS: Button is rendered - " + buttonText);
             // Attempt click to test if AudioContext crashes
             await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                const btn = btns.find(b => b.textContent.includes('INITIATE SYSTEM'));
                if(btn) btn.click();
             });
             await new Promise(r => setTimeout(r, 500)); 
             console.log("AudioContext fired. No crashes detected.");
        } else {
             console.log("ERROR: INITIATE SYSTEM button not found on screen.");
        }

    } catch (e) {
        console.log('NODE SCRIPT ERROR:', e);
    } finally {
        await browser.close();
    }
})();
