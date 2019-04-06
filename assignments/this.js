/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.

* 1. Window/Global Object Binding -
      
        Global Object Binding is the "default" binding of 'this' when 'this' is bound to no other object.

        When 'this' is globally bound, depending on the JS Runtime Environment the value of 'this' can be
        different things. 
        
        For example: console.log(this) executed purely in Node's runtime environment, will return the 'global' object..
        
        console.log(this) executed in Node within a node.js file however, will return the value of the 'modules.export' object

        In your browser console, 'this' bound to the global scope will have the value of the 'window'.

        The exact value of a globally bound 'this' keyword will depend on the runtime environment your JS code is running in.
        
        But generally speaking, the value will always be whatever "global" object is defined for that specific runtime environment.
      

* 2. New Binding - 

        The 'new' binding of the 'this' keyword occurs when an object in JS is instantiated (not defined) with the keyword 'new'.
        
        For example, take the following variable and JS constructor:

            const greeting = 'Hello, ';

            function Person(name, lastName) {
                this.name = name;
                this.lastName = lastName;
                this.sayName = function () {
                    console.log(`${greeting} my name is ${this.name} ${this.lastName}`);
                }
            }

        At the moment, 'this' has no value, even though it's written above. It only tells us what properties
        will belong to a Person object when an instance of the object is instantiated.

        The variable 'greeting' will _not_ be a property of the Person object as it defined in the global scope.

        Only at the time of object instantiation using the 'new' keyword will 'this' get an assigned a value of 
        a new instance of that object.

        Take the following Person object instantiation:

        const dave = new Person('Dave', 'Vazquez');

        With the 'dave' Person-object now created, 'this' (within the scope of the 'dave' object) has the value of the 'dave' object itself.

        So, if I were to call dave.sayName(), 'this.name' and 'this.lastName' inside the sayName() function have values to reference.

* 3. Implicit Binding -  

        Implicit binding of the 'this' keyword occurs when an object literal is created.

        For example, take the object literal 'dave' and the call to dave.sayName():

            const dave = {
                name: 'Dave',
                lastName: 'Vazquez',
                sayName: function () {
                    console.log(`Hello, my name is ${this.name}, ${this.lastName}.`);
                }
            }

            dave.sayName();
            // joe.sayName();

        Contrary to the example for 'new' binding above, we do not "explicitly" see the prefix "this." before the property names.
        
        This is because the 'this' keyword is implied. We know 'name' and 'lastName' belong to the object literal 'dave' because 
        it is the only instance of 'dave' that exists. 

        Only when we step inwards into the scope of the function expression of 'sayName' do we see the 'this' keyword appear, 
        because 'this' is no longer implied. We are in a different scope _within_ the object scope, so we must access name and 
        lastName from the 'this' keyword.

        If we don't, 'name' and 'lastName' alone may either produce a Reference Error of 'not defined' or it may
        take on the values of 'name' and 'lastName' declared elsewhere in the code as in:

            const name = 'globalName';
            const lastName = 'globalLastName';

            const dave = {...}

            dave.sayName(); // 'Hello, my name is globalName, globalLastName.'
        
        As a rule of thumb, if you want to know what value the 'this' keyword has, you need only look to the left of the . operator.

* 4. Explicit Binding

        Explicit Binding is when the value of 'this' in an pre-defined defined function or object is reassigned to the 
        value of 'this' of another scope.

        This reassignment can be acheived by using either the call(), apply() or bind() methods.

        For example take the 'dave' and 'joe' objects below:

            const dave = {
                name: 'Dave',
                speak: function (greeting) {
                    console.log(`${greeting}, my name is ${this.name}!`);
                }
            }

            const joe = {
                name: 'Joe',
                speak: function (greeting) {
                    console.log(`${greeting}, my name is ${this.name}!`);
                }
            }

            joe.speak.call(dave, 'Hey there');

        'call' is invoked on the 'joe.speak' function-object and accepts an object as the first parameter, and arguments 
        for each parameter of the 'joe.speak' function.
        
        The first parameter is the new object-value 'dave' which will be assigned to the keyword 'this'. Now when 'joe.speak'
        is invoked using the 'call' method, it will use the property 'this.name' of 'dave to ouput:

            'Hey there, my name is Dave!'

*
* write out a code example of each explanation above
*/

/*********************************************************************************
*                              PRINCIPLE 1                                       *
**********************************************************************************/ 
logHeader('Principle 1 - Global Binding', '-Run console.log(this) in the browser console and you will get the \'window\' object.\n' +
                                          '-Run console.log(this) in Node\'s Runtime Environment and you will get the \'global\' object.\n' +
                                          'console.log(this) will log whatever global object of the runtime environment you are executing in.');
/*
    Run the following in the browser console and you will get the 'window' object.
    Run the following in Node\'s Runtime Environment and you will get the 'global' object.
    console.log(this) will log whatever global object of the runtime environment you are executing in.
*/

console.log(this);

/*********************************************************************************
*                              PRINCIPLE 2                                       *
**********************************************************************************/ 
logHeader('Principle 2 - Implicit Binding', '// Code an example for Implicit Binding');

/*
    Code an example for Implicit Binding
*/

const dave = {
    name: 'Dave',
    lastName: 'Vazquez',
}

const joe = {
    name: 'Joe',
    lastName: 'Schmoe',
}

const sayAyoWaddupFunction = obj => {
    obj.sayAyo = function (otherGuy) {
        console.log(`${obj.name} says: Ayo Waddup ${otherGuy.name}!`);
    }
}

sayAyoWaddupFunction(dave);
sayAyoWaddupFunction(joe);

dave.sayAyo(joe); // to the left of the . operator is what 'this' is
joe.sayAyo(dave); // " "

/*********************************************************************************
*                              PRINCIPLE 3                                       *
**********************************************************************************/ 
logHeader('Principle 3 - New Binding', '// Code an example for New Binding');

/*
    code example for New Binding
*/

function Thing (size, adjective, whatItDo) {
    this.size = size;
    this.adjective = adjective;
    this.whatItDo = whatItDo;
    this.sayWhatItDo = function () {
        console.log(`The ${this.size}, ${adjective} thing ${this.whatItDo}.`);
    }
}

const thing = new Thing('large', 'scary', 'gives me nightmares');

console.log(thing);
console.log();

console.log('thing.sayWhatItDo();\n');
thing.sayWhatItDo()

/*********************************************************************************
*                              PRINCIPLE 3                                       *
**********************************************************************************/ 
logHeader('Principle 4 - Explicity Binding', '// Code example for Explicit Binding');

/*
    code example for Explicit Binding
*/

const dave2 = {
    name: 'Dave',
    speak: function (greeting) {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

const joe2 = {
    name: 'Joe',
    speak: function (greeting) {
        console.log(`${greeting}, I go by the name ${this.name}!`);
    }
}

const sing = function(rhyme) {
    console.log(`La-dee-dah, I go by ${this.name}. La-dee-day, I am quite ${rhyme}.`);
}

const song = sing.bind(dave, 'brave');

console.log('Explicit Binding with call():\n');
console.log(joe2.speak.call(dave2, 'Hey there'));

console.log('\nExplicit Binding with bind():\n');
console.log(song());

























/*****************************************************************************************************************************************************/




/*********************************************************************************
*                                   Log Header                                   *
**********************************************************************************/ 
function logHeader(messageHeader, message = '') {

    (function assembleMessageHeader() {
        let top    = '\n/*********************************************************************************\n';
        let middle = `*                                                                                *\n`;
        let bottom = `**********************************************************************************/\n`;

        let messageStart = (middle.length/2) - (messageHeader.length/2)
        let messageEnd = (middle.length/2) + (messageHeader.length/2);
      
        middle = middle.slice(0,messageStart) + messageHeader + middle.slice(messageEnd, middle.length);

        messageHeader = top + middle + bottom;
    })();
    
  
    console.log(messageHeader);
    console.log(message + '\n');
    console.log('Output:\n');
}
