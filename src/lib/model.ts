import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { initializeModelAsset, thisAssetLoaded } from ".";

const loader = new OBJLoader();

function model(modelPath: string) {
    initializeModelAsset();
    loader.load(
        // resource URL
        modelPath,
        // called when resource is loaded
        function (object: any) {
            thisAssetLoaded();
            return object;
        },
        // called when loading is in progresses
        function (xhr: any) {

        },
        // called when loading has errors
        function (error: any) {

            console.log('An error happened');

        }
    );
}

export {model};