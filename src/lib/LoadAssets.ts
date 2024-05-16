let totalAssets: number = 0;
let loadedAssets: number = 0;

export function initializeAssets(node: Node) {
    // find every image, video, etc and add 1 to totalAssets
    // GO!

    totalAssets++;
}

export function assetLoaded() {
    loadedAssets++;
    console.log(`Loaded ${loadedAssets} of ${totalAssets} assets`);

    if (loadedAssets === totalAssets) {
        console.log("All assets loaded");
    }
}

// how to make it so that it doesn't start game before all assets loaded?