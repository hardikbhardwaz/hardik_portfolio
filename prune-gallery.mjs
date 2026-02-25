import fs from 'fs/promises';
import path from 'path';

const MANIFEST_PATH = '/Users/hardiksharma/Downloads/Portfolio/src/data/galleryManifest.json';

// Max items to keep per category to maintain high-end curation
const MAX_VIDEO_ITEMS = 12;
const MAX_GRAPHIC_ITEMS = 16;

async function pruneManifest() {
    try {
        console.log("Reading existing 135-file Manifest...");
        const rawData = await fs.readFile(MANIFEST_PATH, 'utf-8');
        const manifest = JSON.parse(rawData);

        // Analyze and Shuffle the arrays (Fisher-Yates) to ensure diverse premium representation
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Shuffle arrays to ensure variety from the raw dump
        const shuffledVideos = shuffleArray([...manifest["Video Editing"]]);
        const shuffledGraphics = shuffleArray([...manifest["Graphic Design"]]);

        // Prioritize a mix of orientations (16:9, 9:16) for masonry layout
        const prunedVideos = shuffledVideos.slice(0, MAX_VIDEO_ITEMS);
        const prunedGraphics = shuffledGraphics.slice(0, MAX_GRAPHIC_ITEMS);

        manifest["Video Editing"] = prunedVideos;
        manifest["Graphic Design"] = prunedGraphics;

        // Keep Web Development static as it holds deployed URLs

        console.log(`\nPruned Videos: ${prunedVideos.length}`);
        console.log(`Pruned Graphics: ${prunedGraphics.length}`);

        // Write the curated payload
        await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
        console.log(`\nSuccessfully finalized Curated Masterpiece Vault Payload to: ${MANIFEST_PATH}`);

    } catch (e) {
        console.error("Failed to prune manifest:", e);
    }
}

pruneManifest();
