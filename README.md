# RoboWar

[![Stars](https://img.shields.io/github/stars/AzraelSec/RoboWar.svg?style=popout-square)](https://github.com/AzraelSec/RoboWar)
[![Forks](https://img.shields.io/github/forks/AzraelSec/RoboWar.svg?style=popout-square)](https://github.com/AzraelSec/RoboWar)
[![Issues](https://img.shields.io/github/issues/AzraelSec/RoboWar.svg?style=popout-square)](https://github.com/AzraelSec/alexa_ctRoboWarf_time_skill)
[![License](https://img.shields.io/github/license/AzraelSec/RoboWar.svg?style=popout-square)](https://github.com/AzraelSec/RoboWar)
[![Dependencies](https://david-dm.org/AzraelSec/RoboWar.svg)](https://github.com/AzraelSec/RoboWar)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/azraelsec)


<div align="center">
    <img alt="RoboWar Menu Screenshot" src="http://www.azraelsec.it/img/projects/robowar.png">
</div>

## About
RoboWar is a simple and minimalistic browser game written in **TypeScript** in which the main player, who's obviously a robot, needs to hit a star (or at least one star, if there are multiple) to get to the next level. The game's main purpose is to pass each level in the shortest possible time to beat all the opponents and be the best.

## Levels Editor
In addition to the simple play scene, is it possible to create your own levels which will be pushed at the end of the levels' queue.

<div align="center">
    <img alt="RoboWar Level Editor GIF" src="https://github.com/AzraelSec/RoboWar/blob/master/Editor.gif">
</div>

You just need to pick the element you want to add and move them to their final position. At the moment theese are the available elements: each of one has a specific motion and and properties.

### Available Elements:

- **Game Logic**
  - Robot (*the main player*)
  - Star (*the level goal*)
- **Floor-like Element**
  - Short Block (*used like fixed floor*)
  - Long Block
  - Box Block
- **Obstacles**
  - Missile
  - Mine
  - Bomb

# Notes
This project was made as final work for the Uman-Machine Interaction university course, and could be of course improved.