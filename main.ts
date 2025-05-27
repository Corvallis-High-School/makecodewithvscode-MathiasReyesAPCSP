/*
 * Constant variables
 */

/*
 * Global variables
 */
let list: Image[] = []

/*
 * Classes
 */

/*
 * Functions
 */
function showSprite (mySprite: Sprite) {
    mySprite.setPosition(randint(0, scene.screenWidth() - 8), randint(0, scene.screenHeight() - 8))
}

/*
 * Event handlers
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    showSprite(sprites.create(list._pickRandom(), SpriteKind.Player))
})

/*
 *Main program
 */

 //this is a list of my sprite's images
list = [
assets.image`myCat`,
assets.image`mySnake`,
assets.image`myShroom`,
assets.image`myDonut`
]
