import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import fsSync from 'fs';

const PROJECT_DIR = '/Users/hardiksharma/Downloads/Portfolio/Projects';
const OUTPUT_DIR = '/Users/hardiksharma/Downloads/Portfolio/public/works/optimized';
const MANIFEST_PATH = '/Users/hardiksharma/Downloads/Portfolio/src/data/galleryManifest.json';

// Track structured payload
const manifest = {
    "Video Editing": [],
    "Graphic Design": []
};

let globalId = 1000;

async function processDirectory(dirPath, categoryOverride = null) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            // Determine category mapping based on folder names
            let currentCategory = categoryOverride;
            if (!currentCategory) {
                if (entry.name === 'Creative Video' || entry.name === 'AI based' || entry.name === 'Reels' || entry.name === 'Testimonials' || entry.name === 'Voiceovers') {
                    currentCategory = "Video Editing";
                } else if (entry.name === 'Graphics' || entry.name === 'IDPS Work') {
                    currentCategory = "Graphic Design";
                }
            }
            await processDirectory(fullPath, currentCategory);
        } else {
            // It's a file
            const ext = path.extname(entry.name).toLowerCase();

            // Only process if we assigned it a primary category (Graphics or Video)
            if (categoryOverride && (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.mp4')) {
                const uniqueName = `${path.parse(entry.name).name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
                const isVideo = ext === '.mp4';

                let outputPath = '';
                let publicPath = '';

                if (!isVideo) {
                    // Compress Images to Webp
                    outputPath = path.join(OUTPUT_DIR, `${uniqueName}.webp`);
                    publicPath = `/works/optimized/${uniqueName}.webp`;

                    try {
                        console.log(`Compressing Image: ${entry.name}`);
                        await sharp(fullPath)
                            .resize({ width: 800, withoutEnlargement: true }) // Downscale massive assets
                            .webp({ quality: 80 }) // Aggressive compression
                            .toFile(outputPath);

                        // Add to Manifest
                        manifest[categoryOverride].push({
                            id: globalId++,
                            title: path.parse(entry.name).name,
                            format: "16:9", // Generic aspect, can be masonry staggered later
                            type: "image",
                            image: publicPath
                        });

                    } catch (e) {
                        console.error(`Failed to compress ${entry.name}:`, e.message);
                    }
                } else {
                    // Pass videos straight through for now (FFMPEG is too slow/unstable globally)
                    // We will just copy the MP4
                    outputPath = path.join(OUTPUT_DIR, `${uniqueName}.mp4`);
                    publicPath = `/works/optimized/${uniqueName}.mp4`;

                    try {
                        console.log(`Copying Video: ${entry.name}`);
                        await fs.copyFile(fullPath, outputPath);

                        // Add to Manifest
                        manifest[categoryOverride].push({
                            id: globalId++,
                            title: path.parse(entry.name).name,
                            format: "16:9",
                            type: "video",
                            video: publicPath
                        });
                    } catch (e) {
                        console.error(`Failed to copy ${entry.name}:`, e.message);
                    }
                }
            }
        }
    }
}

async function start() {
    console.log("Starting WebP Compression & Portfolio Ingestion Pipeline...");

    // Ensure output directories exist
    if (!fsSync.existsSync(OUTPUT_DIR)) {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    }
    const dataDir = path.dirname(MANIFEST_PATH);
    if (!fsSync.existsSync(dataDir)) {
        await fs.mkdir(dataDir, { recursive: true });
    }

    // Clean existing optimized files to prevent massive bloat on re-runs
    const existingOpt = await fs.readdir(OUTPUT_DIR);
    for (const file of existingOpt) {
        await fs.unlink(path.join(OUTPUT_DIR, file));
    }

    console.log("Scanning /Projects directory...");
    await processDirectory(PROJECT_DIR);

    console.log(`\nSuccessfully mapped ${manifest["Video Editing"].length} Videos and ${manifest["Graphic Design"].length} Graphics.`);

    // Write the JSON Manifest that React will dynamically import
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Wrote native Gallery Payload to: ${MANIFEST_PATH}`);
}

start();
