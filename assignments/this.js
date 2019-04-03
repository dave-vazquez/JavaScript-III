/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.



****  I made a lot of inferences here. I'm not sure I'm 100% correct, but I think I'm at least mostly correct ****



* 1. Window/Global Object Binding -
*       
*       Global Object Binding is the "default" binding of 'this' when 'this' is bound to no other object.
        When 'this' is globally bound, depending on the JS Runtime Environment the value of 'this' can be
        different things. 
        
        For example: console.log(this) executed purely in Node's runtime environment, will return the 'global' object which 'this' is bound to.
        
        console.log(this) executed in Node within a node.js file however, will return the value of an empty object "{}". 
        This empty object actually refers to the 'module.exports' object. One utility of node.js is the ability to import and export variables,
        functions, objects, even entire libraries to and from different node.js files in the same code base.
        
        If I executed module.export.name = 'Dave', and executed console.log(this) right afterwards, the value returned by the console.log 
        would be {name: 'Dave'}, letting us now that the property 'name' now belongs to the 'modules.exports' objects, which can then be
        imported by another node.js file.

        In your browser console, 'this' bound to the global scope will have the value of the 'window'.

        In short, the exact value of a globally bound 'this' keyword will depend on the runtime environment your JS code is running in.
        Generally speaking, the value will always be whatever "global" object is defined for that specific runtime environment.
      

* 2. New Binding - 

        The 'new' binding of the 'this' keyword occurs when an object in JS is instantiated (not defined) with the keyword 'new'.
        
        For example, take the following variable and JS constructor:

        const greeting = "Hello, ";

        function Person(name, lastName) {
            this.name = name;
            this.lastName = lastName;
            this.sayName = function () {
                console.log(`${greeting} my name is ${this.name} ${this.lastName}`);
            }
        }

        At the moment, 'this' has no value, even though you can clearly see it written above. It only tells us what properties
        will belong to a Person object if they are preceded by "this."" 

        The variable 'greeting' will not be a property of the Person object as it defined in the global scope and is not preceded
        by "this."

        Only at the time of object instantiation using the 'new' keyword will 'this' get an assigned the value of the object or the object's scope.

        const dave = new Person('Dave', 'Vazquez');

        With the 'dave' Person object now instantiated, 'this' (within the scope of the 'dave' object) has the value of the 'dave' object itself.

        So, if I were to call dave.sayName(), the 'this' keyword now has a value whereby the values passed to 'this.name' and 'this.lastName' can be accessed from. 

        The 'new' binding of the 'this' keyword to the an instance of the Person object like 'dave' is also what's needed for the method
        dave.sayName() to return the value 'Hello, my name is Dave Vazquez'.

        Just as the 'new' binding of the 'this' keyword to the instance of "const joe = new Person('Joe', "Schmoe")" is what's needed for the
        method joe.sayName() of the 'joe' Person object to return the value "Hello, my name is Joe Schmoe".

* 3. Implicit Binding -  

        Implicit binding of the 'this' keyword occurs when an object literal is created.

        For example, take the following object literal:

        const dave = {
            name: 'Dave',
            lastName: 'Vazquez',
            sayName: function () {
                console.log(`Hello, my name is ${this.name}, ${this.lastName});
            }
        }

        dave.sayName();

        Contrary to the example for 'new' binding above, we do not "explicitly" see "this." preceeding the
        property names 'name' and 'lastName'. This is because the 'this' keyword is implied. We know 'name'
        and 'lastName' belong to the object literal 'dave' because it is the only instance of 'dave' that
        exists. 

        Only when we step inwards into the scope of the function expression of 'sayName' for example do we see 
        the 'this' keyword appear, because 'this' is no longer implied. We are in a different scope, surrounded
        by the object scope so we must access name and lastName from the 'this' keyword.

        Outside the object literal we have a call of sayName() on the 'dave' object. As a rule of thumb, if you
        want to know what value the 'this' keyword has, you need only look to the left of the . operator.

        Just as for a call of sayName() on a 'joe' object, joe.sayName(), to the left of the . operator is
        what value 'this' has. 

        It is because of implicit binding that the compiler knows when dave.sayName() is called, it's the 'this'
        inside the sayName() function of 'dave' is where it will find 'dave's corresponding thi.name and thi.lastName values.


* 4. Explicity Binding
*
* write out a code example of each explanation above
*/

/*********************************************************************************
*                              PRINCIPLE 1                                       *
**********************************************************************************/ 
logHeader('Principle 1', '-Run the following in node and you will get the empty modules.export object, \'{}\'\n' +
                         '-Run the following in the browser console and you will get the \'window\' object.\n' +
                         '-Execute the code in the terminal in Node\'s Runtime Environment and you will get the \'global\' object.\n\n' +
                         '~In all three instances you will get whatever global object of the runtime environment you are executing in~')
/*
    Run the following in node and you will get the empty modules.export object, {}
    Run the following in the browser console and you will get the window object
    execute the code in the terminal with Node's Runtime Environment and you will get the 'global' object
    in all three instances you will get whatever global object of the runtime environment you are executing in
*/

console.log(this);

/*********************************************************************************
*                              PRINCIPLE 2                                       *
**********************************************************************************/ 
logHeader('Principle 2', '// Code an example for Implicit Binding');

/*
    code example for Implicit Binding
*/

const dave = {
    name: 'Dave',
    lastName: 'Vazquez',
}

const joe = {
    name: 'Joe',
    lastName: 'Schmoe',
}

const sayAyoWhaddupFunc = obj => {
    obj.sayAyo = function (otherGuy) {
        console.log(`${obj.name} says: Ayo Whaddup ${otherGuy.name}!`);
    }
}

sayAyoWhaddupFunc(dave);
sayAyoWhaddupFunc(joe);

dave.sayAyo(joe);
joe.sayAyo(dave);


/*********************************************************************************
*                              PRINCIPLE 3                                       *
**********************************************************************************/ 
logHeader('Principle 3', '//Code an example for New Binding');

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

const thing = new Thing('large', 'scary', 'consume my soul');

console.log(thing);
console.log();

console.log('thing.sayWhatItDo();');
console.log();
thing.sayWhatItDo()

/*********************************************************************************
*                              PRINCIPLE 3                                       *
**********************************************************************************/ 
logHeader('Principle 4', 'Code example for Explicit Binding');

/*
    code example for Explicit Binding
*/

















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
