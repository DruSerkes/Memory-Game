My first project for Springboard - a memory card-matching game

Link to game: 
https://druserkes.github.io/Memory-Game/

This is the very first thing I built!

**

What This Project is About:
This project built my skills and comfort level with HTML, CSS, JavaScript, and DOM manipulation (event listeners, creating elements, adding classes, etc). 

**

What I did:
First I used Javascript to generate cards (divs) with randomly generated color classes based on user input. 
localStorage is checked to see if you already have a high score. If not, your high score is set to N/A

I then had the cards respond to click events by "flipping" to their color class. 
When two different cards are selected, a guess variable is incremented and the DOM is updated. 
The two cards stay "flipped" over if color classes match, otherwise they flip back over to grey after a 1 second timeout. 

The game is over when all the cards are matched / flipped over.

As a gotcha, I provided logic to prevent edge cases where the user may try to select more than 2 cards very quickly, or the same card twice to artificially get a match (can't do it folks! no cheating!)

When the game is over, the high score variable in localStorage is checked and updated if necessary. 
Then a gameover div appears, offering the user an option to play again and re-select the number of cards they want to play with.

**

What I learned: 
This was my first REAL work with DOM manipulation. CSS has been a weak point for me, so it took some time to get everything looking as intended; I'm becoming a fan of flexbox for sure. 

I also had to learn and get more familiar with localStorage in the browser. 

**

Looking forward: 
I've already revisited this project to clean up the script so global variables were declared properly and only when necessary. When I have some time, I'd like to go back and clean up the code some more so DOM manipulation is separate from the game logic. 
