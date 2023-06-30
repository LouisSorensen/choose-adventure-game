let hasPickedUpPotion = false
let hasPickedupKey = false


class Room {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
        this._character = null;
        this._item = null;
    }

    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }

    get character() {
        return this._character;
    }

    get item() {
        return this._item;
    }

    set description(description) {
        this._description = description;
    }

    set item(itemNew) {
        if (itemNew === null) this._item = itemNew;
        else this._item = itemNew.name;
    }

    set character(character) {
        this._character = character;
    }

    describe() {
        return `You are in the ${this._name} you can see ${this._description}.` ;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
        let text = `The ${room.name} is to the ${direction}`;
        details.push(text);   
        }
        return details;
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You cant go that way");
            return this;
        }
    }

    linkRooms(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }
}


class Character {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._conversation = "";
    }

    set name(name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    set conversation(conversation) {
        this._conversation = conversation;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return `You have met ${this._name}, ${this._description}`;
    }

    converse() {
        return `${this._name} says ${this._description}`;
    }
}

class Item {
    constructor(name) {
        this._name = name;
        this._description = "";
    }

    set name (name) {
        this._name = name;
    }

    set description(description) {
        this._description = description;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    describe() {
        return `The ${this._name} is ${this._description}`;
    }

    linkRooms(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }
}

const DungeonEntrance = new Room("DungeonEntrance");
DungeonEntrance.description = 
  "The entrance to the dungeon";
const Staircase = new Room("Staircase");
Staircase.description = 
   "A dark and spooky staircase";
const DungeonCell = new Room("DungeonCell");
DungeonCell.description = 
    "A prison cell with an important item";
const Hall = new Room("Hall");
Hall.description = 
    "The main hall of the dungeon";
const Kitchen = new Room("Kitchen");
Kitchen.description = 
    "A small kitchen inside the dungeon";
const GuardPost = new Room("GuardPost");
GuardPost.description = 
    "A Guard Post with a single guard";
const TreasureRoom = new Room("TreasureRoom");
TreasureRoom.description = 
    "A Room with a glowing treasure chest";

const Potion = new Item("Potion")
Potion.description = "A sleeping potion that can be given to the guard";

const key = new Item("Key")
key.description = "A Key to open a treasure chest";
DungeonCell.item = key;


DungeonEntrance.linkRooms("south", Staircase);
Staircase.linkRooms("north", DungeonEntrance);
Staircase.linkRooms("east", DungeonCell);
DungeonCell.linkRooms("west", Staircase);
Staircase.linkRooms("south", Hall);
Hall.linkRooms("north", Staircase);
Hall.linkRooms("east", Kitchen);
Hall.linkRooms("south", GuardPost);
GuardPost.linkRooms("north", Hall);
GuardPost.linkRooms("west", TreasureRoom);
TreasureRoom.linkRooms("east", GuardPost);

const Guard = new Character("Guard");
Guard.description = "A scary figure guarding the Treasure Room";
Guard.conversation = "zzzz"

GuardPost.character = Guard;


function displayRoomInfo(room) {
    let occupantMsg = "";
    let itemDesc = "";
    console.log(room)
    if (room.character) {
        occupantMsg = `${room.character.describe()} ${room.character.converse()}`;
    } else if (room.item) {
     occupantMsg = `The room contains ${room.item}`;
    } else {
        occupantMsg = "The room is empty";
    }

    if(room._character_name === "Guard" && hasPickedUpPotion) {
        alert ("You put the Guard to sleep");
    } else {
        "You cannot get past the Guard, go back";
    }

    if (room._item) {
        itemDesc = "There is an important item in this room, do you want to pick it up?";
        const btn = document.createElement("button");
        btn.innerHTML = "pick up item";
        btn.addEventListener("click", () => {
            document.getElementById("itemDesc").innerHTML = "You have picked up the key item";
            room.item = null;
            displayRoomInfo(room);
            btn.remove();
        });
        document.body.appendChild(btn);
    }

    textContent = "<p>" + room.describe() + "</p>"; + "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = room.describe() + "<p>" + occupantMsg + "</p>" + room.getDetails() + "</p>";
    document.getElementById("itemDesc").innerHTML = itemDesc;
    document.getElementById("usertext").focus()
}

function startGame() {
    let currentRoom = DungeonEntrance
    displayRoomInfo(currentRoom)

    const directions = ["north", "south", "east", "west"];

    document.addEventListener("keydown", function(event) {
        console.log(event);

        if (event.key === "Enter") {
            const command = document.getElementById("usertext").value;
            if(directions.includes(command.toLowerCase())) {
              currentRoom = currentRoom.move(command.toLowerCase())
              document.getElementById("usertext").value = "";
              displayRoomInfo(currentRoom)
            } else {
                document.getElementById("usertext").value = "";
                alert("That is not a valid direction. Please try again");
            }
        }
    });
}

startGame();
