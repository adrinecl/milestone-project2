### Test cases (user story based with screenshots)

**1. As a First Time Visitor, I want to immediately understand the main purpose of the site and if I belong to the audience it targets.**

**2. I want to be able to quickly understand the game controls and mechanics in order to enjoy playing the game.**

**3. I want to find more information about the game and to be able to consult the game instructions.**

**4. I want to be able to see my score as I play the game.**

**5. I want to be able to be challenged with harder levels as I progress.**

**6. I would like to play a simple game, with a fairly short play time, but high entertaining value.**

**7. I want to see my final score and how that compares to other people.**

**8. I want to have fun and feel inclined to play it again or at a later time.**


### Fixed Bugs
**1. "Game Over" screen issues**
- When the "Game Over" message was presented, some issues appeared, depending on where the worm character died. If the worm died in the area where the "Game Over" text showed up, it could get partially covered by it. See image below as an example.
![Game Over screen - test 1](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over1.png)

- Another bug that happened when the "Game Over" message was presented, included the position of the last candy that was not succesfully eaten at the time of the death of the worm character. The candy could also end up covering part of the text. See image below as an example.
![Game Over screen - test 2](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over2.png)

**Solution provided**
The z-index of the "Game Over" message was changed so that it shows on top of the other elements. The text of the message had some opacity added to it and the message was also styled and centered on the game area.
![Game Over screen - solution](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_game-over3.png)

**2. Responsiveness and mobile controls**
![Mobile responsiveness - test 1](https://github.com/adrinecl/milestone-project2/blob/master/docs/images/gummy-worms_testing_mobile1.png)