<script lang="ts" context="module">
    import { characters } from ".";

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
        dialogueCharacterHeading.textContent = character;
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
        <h1 bind:this={dialogueCharacterHeading}></h1>
        <p class="text" bind:this={dialogueContentElement}></p>
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
</style>
