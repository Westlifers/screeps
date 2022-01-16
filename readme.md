# Welcome to My Screeps file 

## Introduction  
By accident I came to know about this unique programming game. By saying unique I mean that this game is a real 'programming' game, instead of other games of its kind who feature their logic design or simple code piece to push the game forward. Players manipulate the whole--or even several--room through JavaScript. I don't major in SC, and the only program language I was familiar with was Python.  
But that doesn't mean I know nothing about it. Instead, for a stretch of time I had been trying to develop my personal blog website. My purpose was to learn Django, but not after long I came to realize the importance of the system h5+css+js. So I studied css and js for a while, which was followed by my experience in Vue. So to some extent I'm not new to JS. And the fact is, Screeps it really friendly to novinces.  

****
## File Structure
1. Those start with 'role.' are files of one specific role, which includes its running function. What should be paid attention to is that this kind of file doesn't necessarily contains everything about this role. For example, all the spawning functions are included in 'control.autospawn'. I tried to split spawning functions to corresponding role file. Nevertheless that ultimately resulted a circular reference error.
2. The file 'funcs' includes some useful functions. But due to the circular reference error mentioned above, it's mostly used in main.js to make the tick process clear.
3. Those start with 'control.' are files of certain actions such as auto-spawning or attack (which will be added later).
4. Those start with 'structure.' are files of structures that contain their basic and advanced logic

****
## Usage
### Start
To start a game with these files, you'll need functions included in the 'init.js', which, for now, means a single 'init()'. It requirs two paraments--roomName and sourceIds. The former is a string of the name of your room (yeah, my script supports one room only, but just for now. I'll add corresponding codes later) and the latter is an array consisting of the ids of resources in your room.  
use the following code to initialize your room:
```javascript
require("control.init").initGame(roomName, sourceIds)
```
### Paint
There's an important global varible in memory. That is 'painting'. It's a switch to decide the behaviour of your wallrepairers and towers. By setting it true, your wallrepaires and towers will keep repairing walls (if their logic allows them to do so) and vise verse.

### Attack
In order to attack a target room, you don't need to run any code in console. Put a flag named 'attackhere', your base will automatically spawn an attacker, who will move to the flag. Moreover, if the flag covers a building, your attacker will try to destroy this building.  
There's some advanced usage of this simple attack mode: 
1. Sometimes you can't put the flag directly on your target for some reasons like, avoiding to cost too much CPU or bypassing a room of a high level. In this case, I suggest that you put the flag halfway to shorten the path or to decide the path manually.
2. This simple attack mode can't attack creeps. To destroy a room, just take down a wall, go into the room, and destroy its spawn. In the wake of that, the room will decay by time. You can speed up this process by destroying the controller.