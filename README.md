ecosystem-p5js
==============

This is a port of https://github.com/randylubin/Ecosystem (originally built for Processing) to p5.js

Demo: http://randylubin.github.io/ecosystem-p5js/

###About

This is a simple ecosystem simulator built in Processing. There are three levels of the food chain:

Green algae that continually grows/divides
Blue herbivores that eat the algae
Red carnivores that eat the blue creatures
The non-algae creatures have a calories value which increases after eating and decreases over time. If calories reaches double the starting value, the creature divides into two. If calories reach zero, a creature dies.

Creatures are constantly scanning the environment within their view radius. First they check for potential predators. If they see one, they enter 'hunted' mode an flee. If there are no predators, they check for prey. The creature will choose the closet prey and hunt it down.

Users can click on the screen to place additional herbivores.
