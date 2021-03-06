/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(attr) {
  this.createdAt = attr.createdAt;
  this.name = attr.name;
  this.dimensions = attr.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attr) {
  GameObject.call(this, attr);
  /*
    *********************** NOTES FOR SELF ******************************

    Output of the above would be something like: {
      this.createdAt = attr.createdAt;
      this.name = attr.name;
      this.dimensions = attr.dimensions;
    }
    
    ...with 'this' being set to the value of the CharacterStats object.
    
    Written out this way, you can see more clearly that the properties that 
    once belonged to GameObject now belong to the CharacterStats object, and 
    the property values passed to 'attr' now have a place to be extracted and 
    assigned to.

    *********************** NOTES FOR SELF ******************************
  */

  this.healthPoints = attr.healthPoints;
  /* 
     *********************** NOTES FOR SELF ******************************

     The property above is the only property at this time that explicitly 
     belongs to the CharacterStats object, although this property can
     inherited by another just as the GameObject properties were inherited

     *********************** NOTES FOR SELF ******************************
  */
}

/** Note: a prototype can have both methods AND properties declared on it **/

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage`;
}

/*
  *********************** NOTES FOR SELF ******************************

  The order of the ABOVE two lines of code matters:

  The value of CharacterStats.prototype has to first be set 
  a copy of the GameObject.prototype object using Object.create().

  If the order is switched, then the method declared on
  CharacterStats.prototype will be immediately overwritten
  by the GamObject.prototype object.

  With the order set up correctly, the value of CharacterStats.prototype
  is new equal to the GameObject.prototype and all _it's_ declared
  methods and properties.

  With this inheritance set in place, we can now safely declare additional 
  methods on CharacterStats.prototype without overriding any existing ones.

  *********************** NOTES FOR SELF ******************************
*/


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attr) {
  CharacterStats.call(this, attr);
  /*
      *********************** NOTES FOR SELF ******************************  

      this.createdAt = attr.createdAt;
      this.name = attr.name;
      this.dimensions = attr.dimensions;
      this.healthPoints = attr.healthPoints;

      *********************** NOTES FOR SELF ******************************
  */
  this.team = attr.team;
  this.weapons = attr.weapons;
  this.language = attr.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
}
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(archer);


console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain(attr) {
  Humanoid.call(this, attr);
}

function Hero(attr) {
  Humanoid.call(this, attr);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.clobber = function(foe) {
  
  let weaponNum = Math.round(Math.random()); 
  
  weaponNum === 0 ? foe.healthPoints -= 3 : foe.healthPoints -= 2;

  console.log(`${this.name} used ${this.weapons[weaponNum]} on ${foe.name}`);

  foe.takeDamage();

  if(foe.healthPoints <= 0) {
    console.log(foe.destroy());
  }
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.slay = function(foe) {
  
  let weaponNum = Math.round(Math.random()); 
  
  weaponNum === 0 ? foe.healthPoints -= 5 : foe.healthPoints -= 4;

  console.log(`${this.name} used ${this.weapons[weaponNum]} on ${foe.name}! `);

  foe.takeDamage();

  if(foe.healthPoints <= 0) {
    console.log(foe.destroy());
  }
}

const ogre = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 5,
    height: 10,
  },
  healthPoints: 50,
  name: 'Grok',
  team: 'Cave of Doom',
  weapons: [
    'Club',
    'Fist',
  ],
  language: 'Ogric',
});

const dave = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 3,
    height: 8,
  },
  healthPoints: 30,
  name: 'Dave',
  team: 'I don\'t know',
  weapons: [
    'Sword',
    'Darts',
  ],
  language: 'Math',
});


let battle = setInterval(() => {

  if(Math.round(Math.random()* 2) === 1) {
    ogre.clobber(dave);
    console.log(`${dave.name} has ${dave.healthPoints} HP left!`);
    console.log('\n');
  }
  else {
    dave.slay(ogre);
    console.log(`${ogre.name} has ${ogre.healthPoints} HP left!`);
    console.log('\n');
  }

  if(dave.healthPoints <= 0 || ogre.healthPoints <= 0) {
    clearInterval(battle);
  }

}, 2000);









