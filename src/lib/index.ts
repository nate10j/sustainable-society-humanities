export enum characters {
    Nathan,
    Joshua,
    ChunYin,
    Lucas
}

let totalAssets: number = 0;
let loadedAssets: number = 0;

export function initializeHTMLAsset(node: Node) {
    totalAssets++;
}

export function initializeModelAsset() {
    totalAssets++;
}

export function thisAssetLoaded() {
    loadedAssets++;
    assetLoadedFunc(loadedAssets, totalAssets);

    if (loadedAssets === totalAssets) {
        console.log("All assets loaded");
        run();
    }
}

let assetLoadedFunc: Function;

export function assetLoaded(func: Function) {
    assetLoadedFunc = func;
}

let run: Function;

export function initialize(func: Function) {
    run = func;
}


// how to make it so that it doesn't start game before all assets loaded?