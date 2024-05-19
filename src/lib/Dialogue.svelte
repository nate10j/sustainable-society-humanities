<script lang="ts" context="module">
    import ChunYinImg from "../assets/CHUN YIN.webp";
    import NathanImg from "../assets/NATHAN.webp";
    import LucasImg from "../assets/LUCAS.webp";
    import JoshuaImg from "../assets/JOSHUA.webp";

    import { characters, initialize } from ".";
    import { thisAssetLoaded, initializeHTMLAsset } from ".";

    let lucasImgElement: HTMLImageElement;
    let nathanImgElement: HTMLImageElement;
    let joshuaImgElement: HTMLImageElement;
    let chunyinImgElement: HTMLImageElement;

    let dialogueCharacterHeading: HTMLHeadingElement;
    let dialogueContentElement: HTMLParagraphElement;
    let contentComplete: boolean = false;
    let dialogueContainerElement: HTMLDivElement;

    let wordInterval: any;
    let dialogueText: string;
    let dialogueIndex = 0;
    let dialogueList: dialogue[] = [];

    export type dialogue = {
        character: characters;
        content: string;
    };

    export function playDialogue(dialogue: dialogue[]) {
        showDialogueContainer();
        dialogueList = dialogue;
        showNextDialogue();
    }

    function showNextDialogue() {
        if (dialogueIndex < dialogueList.length) {
            const character = dialogueList[dialogueIndex].character;
            const content = dialogueList[dialogueIndex].content;
            sayContent(character, content);
        } else {
            hideDialogueContainer();
        }
    }

    function sayContent(character: characters, content: string) {
        switch (character) {
            case characters.Nathan:
                dialogueCharacterHeading.textContent = "Nathan";

                lucasImgElement.style.display = "none";
                joshuaImgElement.style.display = "none";
                chunyinImgElement.style.display = "none";
                nathanImgElement.style.display = "block";
                break;
            case characters.ChunYin:
                dialogueCharacterHeading.textContent = "Chun Yin";
                lucasImgElement.style.display = "none";
                joshuaImgElement.style.display = "none";
                chunyinImgElement.style.display = "block";
                nathanImgElement.style.display = "none";
                break;
            case characters.Lucas:
                dialogueCharacterHeading.textContent = "Lucas";
                lucasImgElement.style.display = "block";
                joshuaImgElement.style.display = "none";
                chunyinImgElement.style.display = "none";
                nathanImgElement.style.display = "none";
                break;
            case characters.Joshua:
                dialogueCharacterHeading.textContent = "Joshua";
                lucasImgElement.style.display = "none";
                joshuaImgElement.style.display = "block";
                chunyinImgElement.style.display = "none";
                nathanImgElement.style.display = "none";
                break;
        }
        dialogueText = content;
        contentComplete = false;

        dialogueContentElement.textContent = "";

        let wordIndex = 0;
        const words = content.split(" ");

        function showNextWord() {
            if (wordIndex < words.length) {
                dialogueContentElement.textContent += words[wordIndex] + " ";
                wordIndex++;
            } else {
                contentComplete = true;
            }
        }

        // Call showNextWord() repeatedly with a delay to simulate word-by-word display
        const wordDelay = 70; // Adjust delay between words (in milliseconds)
        wordInterval = setInterval(showNextWord, wordDelay);
    }

    document.addEventListener("keydown", (event) => {
        if (event.repeat) return;
        if (event.key === "Enter") {
            if (contentComplete) {
                clearInterval(wordInterval);
                dialogueIndex++;
                showNextDialogue();
            } else {
                clearInterval(wordInterval);
                dialogueContentElement.textContent = dialogueText;
                contentComplete = true;
            }
        }
    });

    function showDialogueContainer() {
        dialogueContainerElement.style.display = "block";
    }
    function hideDialogueContainer() {
        dialogueContainerElement.style.display = "none";
    }
</script>

<div class="container" bind:this={dialogueContainerElement}>
    <div class="dialoguebox">
        <img src={NathanImg} bind:this={nathanImgElement} alt="nathan" class="pfp" use:initializeHTMLAsset on:load={thisAssetLoaded} />
        <img src={LucasImg} bind:this={lucasImgElement} alt="lucas" class="pfp" use:initializeHTMLAsset on:load={thisAssetLoaded} />
        <img src={JoshuaImg} bind:this={joshuaImgElement} alt="joshua" class="pfp" use:initializeHTMLAsset on:load={thisAssetLoaded} />
        <img src={ChunYinImg} bind:this={chunyinImgElement} alt="chun yin" class="pfp" use:initializeHTMLAsset on:load={thisAssetLoaded} />

        <div class="textDialogue">
            <h1 bind:this={dialogueCharacterHeading}>John Doe</h1>
            <p class="text" bind:this={dialogueContentElement}></p>
        </div>
    </div>
</div>

<style>
    .container {
        background-color: white;
        position: fixed;
        bottom: 80px;
        width: 50%;
        max-height: 150px;
        padding: 16px;
    }

    .dialoguebox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .textDialogue {
        margin-left: 16px;
    }

    .pfp {
        width: auto;
        height: 100px;
    }
</style>
