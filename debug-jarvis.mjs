import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:5173/');
        // Wait for loader
        await new Promise(r => setTimeout(r, 6500)); 
        
        // Find the orb button to open the chat
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            // The last button in the DOM should be our orb
            const orb = buttons[buttons.length - 1];
            if (orb) orb.click();
        });
        
        // Wait for Jarvis animation
        await new Promise(r => setTimeout(r, 1000)); 
        
        // Type a complex question to test new heuristic Regex
        await page.type('input[type="text"]', 'What kind of tools do you use?');
        await page.click('button[type="submit"]');
        
        // Wait for AI to process and type response
        await new Promise(r => setTimeout(r, 4500)); 
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_jarvis_interaction.webp' });
        
        console.log("Jarvis screenshot captured.");
        
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
