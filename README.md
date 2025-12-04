# Hangman

## Outline

This task will require you to create a web based game of [Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>) using JavaScript.

his will require understanding of:

- Arrays
- Iterators
- DOM maniuplation
- Event Listeners
- String maniuplation

There are images provided for each stage of the eleven guesses, but feel free to use your own if you like.
There is a word list provided, feel free to modify it as you see fit.

## MVP

- A game should start with a word being randomly selected.
- A representation of the word made up of underscore (\_) characters should display on the screen.
- Create a user interface made up of buttons representing all 26 letters of the alphabet.
- Clicking a button should register its letter as a 'guess'
- If the letter clicked is in the word each underscore corresponding to that letter should be replaced with the letter.
- If the letter is not in the word, an additional element to the hangman diagram should be added.
- The game should keep track of which letters have been 'guessed' already.
- The game should provide a win or loss message depending on the outcome
- There should be some functionality to play again.
- The design should be responsive for at least two screen sizes

## Bonus

- Allow keyboard input
- Keep track of words that have been used already and display them on the screen


## 
the game randomly picks a word from the list given.
displays the underscores
allows the user to guess the letters 
updates the display if the guess is right and draw the hangman if wrong
tells us if we win or lose after 10 guesses.
we can play n number of times as it resets.


*requesting code review via pull request*
