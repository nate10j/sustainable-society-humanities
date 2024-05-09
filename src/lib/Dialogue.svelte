<script lang="ts" context="module">
    import { characters } from ".";
    import { dialogueVisible } from "./store";

    let textElement: HTMLParagraphElement;
    let characterText: string;
    let dialogueComplete: boolean = false;

    let wordInterval: any;
    let dialogueTextThingyIDONTKNOWSTRING: string;

    export function sayDialogue(character: characters, dialogue: string) {
        dialogueVisible.set(true);

        characterText = character;
        dialogueComplete = false;
        dialogueTextThingyIDONTKNOWSTRING = dialogue;

        let wordIndex = 0;
        const words = dialogue.split(" ");

        function showNextWord() {
            if (wordIndex < words.length) {
                textElement.textContent += words[wordIndex] + " ";
                wordIndex++;
            } else {
                dialogueComplete = true;
            }
        }

        // Call showNextWord() repeatedly with a delay to simulate word-by-word display
        const wordDelay = 70; // Adjust delay between words (in milliseconds)
        wordInterval = setInterval(showNextWord, wordDelay);
    }

    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (dialogueComplete) {
                dialogueVisible.set(false);
            } else {
                clearInterval(wordInterval); // Stop the word-by-word display
                textElement.textContent = dialogueTextThingyIDONTKNOWSTRING
                dialogueComplete = true;
            }
        }
    });
</script>

{#if $dialogueVisible}
    <div class="container">
        <h1>{characterText}</h1>
        <p class="text" bind:this={textElement}></p>
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
