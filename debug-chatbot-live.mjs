import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto('http://localhost:5173/');
        await new Promise(r => setTimeout(r, 6500)); 
        
        // 1. Open the ChatBot
        await page.evaluate(() => {
            const botBtn = document.querySelector('button.fixed.bottom-6.right-6');
            if (botBtn) botBtn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        
        // 2. Type a complex question that heuristics cannot answer
        await page.evaluate(() => {
            const input = document.querySelector('input[type="text"]');
            if (input) {
                input.value = "Analyze the philosophical implications of artificial intelligence in modern brutalist web design.";
                // Trigger React onChange
                const event = new Event('input', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
        await new Promise(r => setTimeout(r, 500));
        
        await page.evaluate(() => {
            const form = document.querySelector('form');
            if (form) {
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(submitEvent);
            }
        });
        
        // Wait for Gemini API response (up to 8 seconds)
        await new Promise(r => setTimeout(r, 8000));
        
        await page.screenshot({ path: '/Users/hardiksharma/.gemini/antigravity/brain/0cc064df-ddc1-4772-a3dc-cab85eccdd25/debug_chatbot_live_gemini.webp' });

        console.log("Live Gemini API test complete.");
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        await browser.close();
    }
})();
