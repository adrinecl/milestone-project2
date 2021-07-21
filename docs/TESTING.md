### Test cases (user story based with screenshots)

**1. As a First Time Visitor, I want to immediately understand the main purpose of the site and if I belong to the audience it targets.**
![Game header](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-header.jpg)

**2. I want to be able to quickly understand the game controls and mechanics in order to enjoy playing the game.**
![Game Menu - sound off](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-menu-sound-off.jpg)

![Game Menu - sound on](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-menu-sound-on.jpg)

**3. I want to find more information about the game and to be able to consult the game instructions.**
![About the Game & How to Play](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_about-game.jpg)

**4. I want to be able to see my score as I play the game.**
![Game Menu - score and level](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-menu-sound-on.jpg)

**5. I want to be able to be challenged with harder levels as I progress.**

**6. I would like to play a simple game, with a fairly short play time, but high entertaining value.**

**7. I want to see my final score and how that compares to other people.**
![Leaderboard](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_leaderboard.jpg)

**8. I want to have fun and feel inclined to play it again or at a later time.**


### Fixed Bugs
**1. "Game Over" screen issues**
- When the "Game Over" message was presented, some issues appeared, depending on where the worm character died. If the worm died in the area where the "Game Over" text showed up, it could get partially covered by it. See image below as an example.
![Game Over screen - test 1](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over1.jpg)

- Another bug that happened when the "Game Over" message was presented, included the position of the last candy that was not succesfully eaten at the time of the death of the worm character. The candy could also end up covering part of the text. See image below as an example.
![Game Over screen - test 2](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over2.jpg)

**Solution 1 provided**
- The z-index of the "Game Over" message was changed so that it shows on top of the other elements. The text of the message had some opacity added to it and the message was also styled and centered on the game area.
![Game Over screen - solution](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over3.jpg)

- However, another problem appeared when clicking on the leaderboard or the help icons.
![Game Over screen - more testing after solution1](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over4.jpg)

**Solution 2 provided**
- This problem was solved by changing the z-index of the leaderboard and help icons to a z-index of 2, that is layered "on top" of the "Game Over" screen.

**2. Responsiveness and mobile controls**
- When opening the game on a mobile, there were some issues with the footer, the hover of the sound toggle stayed on, the leaderboard and help icons were not clickable and there was the need for special game controls adapted for mobile that worked with touchscreens instead of the keyboard arrows.
![Mobile responsiveness - test 1](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_mobile1.jpg)

**Solution provided**
- The footer was set to display as column, stacking the information and the color change when hovering was turned off when a mouse/trackpad is not present.
- The information in the help icon ("About the Game" and "How to Play") was moved below the game area in smaller screen sizes.
- The leaderboard
- On-screen game controls that work with touch screen were enabled when a mouse/trackpad is not present, since there is no CSS media query for keyboard. Therefore, unfortunately we cannot know for sure if a keyboard is present, but we estimate that if a mouse is not present, there is probably no keyboard available. It is not a sure-fire solution, but it is good enough for a MVP.