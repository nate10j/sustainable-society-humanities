<script lang="ts" context="module">
    import { characters } from "./characters";

    let visible: boolean = false;
    let textElement: HTMLParagraphElement;
    let characterText: string;

    export function sayDialogue(character: characters, dialogue: string) {
        visible = true;

        characterText = character;

        let wordIndex = 0;
        const words = dialogue.split(" ");

        function showNextWord() {
            if (wordIndex < words.length) {
                textElement.textContent += words[wordIndex] + " ";
                wordIndex++;
            } else {
                // Dialogue is complete
            }
        }

        // Call showNextWord() repeatedly with a delay to simulate word-by-word display
        const wordDelay = 200; // Adjust delay between words (in milliseconds)
        const wordInterval = setInterval(showNextWord, wordDelay);
    }
</script>

{#if visible}
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
