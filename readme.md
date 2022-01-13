# Welcome to My Screeps file 

## Introduction  
By accident I came to know about this unique programming game. By saying unique I mean that this game is a real 'programming' game, instead of other games of its kind who feature their logic design or simple code piece to push the game forward. Players manipulate the whole--or even several--room through JavaScript. I don't major in SC, and the only program language I was familiar with was Python.  
But that doesn't mean I know nothing about it. Instead, for a stretch of time I had been trying to develop my personal blog website. My purpose was to learn Django, but not after long I came to realize the importance of the system h5+css+js. So I studied css and js for a while, which was followed by my experience in Vue. So to some extent I'm not new to JS. And the fact is, Screeps it really friendly to novinces.  

## File Structure
1. Those start with 'role.' are files of one specific role, which includes its running function. What should be paid attention to is that this kind of file doesn't necessarily contains everything about this role. For example, all the spawning functions are included in 'control.autospawn'. I tried to split spawning functions to corresponding role file. Nevertheless that ultimately resulted a circular reference error.
2. The file 'funcs' includes some useful functions. But due to the circular reference error mentioned above, it's mostly used in main.js to make the tick process clear.
3. Those start with 'control.' are files of certain actions such as auto-spawning or attack (which will be added later).
4. Those start with 'structure.' are files of structures that contain their basic and advanced logic