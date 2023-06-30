class Room {
    constructor(name, items, hasEnemy) {
        this._name = name;
        this._items = items;
        this._hasEnemy = hasEnemy;
        this._linkedRooms = {};
    }

    linkRooms(direction, roomToLink): {
        this._linkedRooms[direction] = roomToLink;
    }

    checkIfEnemy(character) {

        if (Character.hasPotion) {
            console.log("You have a sleeping portion, you can put the guard to sleep")
        } else {
            console.log("You don't have a potion, you can't defeat the guard")
        }
        if (this._hasEnemy) {
            console.log("There is an enemy");
        }
}

const DungeonEntrance = new Room("DungeonEntrance", "torch", false);
const Staircase = new Room("Staircase", "bones", false);
const DungeonCell = new Room("DungeonCell", "treasure key", false);
const Hall = new Room("Hall", ["table", "chairs", "windows"], false);
const Kitchen = new Room("Kitchen", "Sleeping Potion", false);
const GuardPost = new Room("GuardPost", "weapons", true);
const TreasureRoom = new Room("TreasureRoom", "Treasure Chest", false);