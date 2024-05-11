<script lang="ts" context="module">
    import { characters } from ".";
    import { dialogueVisible } from "./store";

    let dialogueCharacter: string = "";
    let dialogueContentElement: HTMLParagraphElement;
    let contentComplete: boolean = false;

    let wordInterval: any;
    let dialogueText: string;
    let dialogueIndex = 0;
    let dialogueList: dialogue[] = [];

    export type dialogue = {
        character: characters;
        content: string;
    };

    export function playDialogue(dialogue: dialogue[]) {
        dialogueVisible.set(true);
        dialogueList = dialogue;
        showNextDialogue();
    }

    function showNextDialogue() {
        if (dialogueIndex < dialogueList.length) {
            const character = dialogueList[dialogueIndex].character;
            const content = dialogueList[dialogueIndex].content;
            sayContent(character, content);
        } else {
            dialogueVisible.set(false);
        }
    }

    function sayContent(character: characters, content: string) {
        dialogueCharacter = character;
        contentComplete = false;
        dialogueText = content;

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

    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (contentComplete) {
                dialogueIndex++;
                showNextDialogue();
            } else {
                clearInterval(wordInterval); // Stop the word-by-word display
                dialogueContentElement.textContent = dialogueText;
                contentComplete = true;
            }
        }
    });
</script>

{#if $dialogueVisible}
    <div class="container">
        <h1>{dialogueCharacter}</h1>
        <p class="text" bind:this={dialogueContentElement}></p>
    </div>
{/if}

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
