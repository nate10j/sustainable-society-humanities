export enum characters {
    Nathan,
    Joshua,
    ChunYin,
    Lucas
}

export async function loadImages(imageUrlArray: any) {
    const promiseArray = []; // create an array for promises
    const imageArray: any = [];

    for (let imageUrl of imageUrlArray) {

        promiseArray.push(new Promise<void>(resolve => {

            const img = new Image();
            // if you don't need to do anything when the image loads,
            // then you can just write img.onload = resolve;

            img.onload = function() {
                // do stuff with the image if necessary

                // resolve the promise, indicating that the image has been loaded
                resolve();
            };

            img.src = imageUrl;
            imageArray.push(img);
        }));
    }

    await Promise.all(promiseArray); // wait for all the images to be loaded
    console.log("all images loaded");
    return imageArray;
}