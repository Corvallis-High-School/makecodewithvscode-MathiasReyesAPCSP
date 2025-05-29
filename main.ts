namespace SpriteKind {
    export const marioKind = SpriteKind.create()
    export const coinKind = SpriteKind.create()
    export const enemyKind = SpriteKind.create()
}
function createGame () {
    // #1, #2, #3, #4, #10, and #13
    tiles.setCurrentTilemap(tilemap`level1`)
    initializeVaribles()
    createCOINS()
    createMARIO()
    createEnemy()
}
// #8. and #9
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // #6
    marioSprite.ay = gravity
    if (marioSprite.vy == 0) {
        // #7
        marioSprite.vy = jumpSpeed
    }
})
function createMARIO () {
    marioSprite = sprites.create(img`
        . . . 2 2 2 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 2 . . . . . 
        . . 6 6 6 6 4 4 b 4 4 . . . . . 
        . . 6 4 4 6 6 4 4 6 6 6 . . . . 
        . . . 4 4 6 6 4 4 6 4 4 . . . . 
        . . . . 4 4 4 4 4 4 . . . . . . 
        . . 6 6 2 2 2 2 2 2 2 6 6 . . . 
        . . 6 6 2 2 2 2 2 2 2 6 6 . . . 
        . . 4 4 2 2 2 2 2 2 2 4 4 . . . 
        . 4 4 4 2 2 2 2 2 2 2 4 4 4 . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 . . . . 
        . . 2 2 2 2 . . . 2 2 2 2 . . . 
        . . 2 2 2 . . . . . 2 2 2 . . . 
        . 4 4 4 4 . . . . . 4 4 4 4 . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.marioKind)
    controller.moveSprite(marioSprite, playerSpeed, 0)
    scene.cameraFollowSprite(marioSprite)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        // #5
        tiles.placeOnTile(marioSprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
// #17
function initializeVaribles () {
    gravity = 500
    jumpSpeed = -238
    playerSpeed = 100
    enemySpeed = 100
    _value = 25
    info.setScore(0)
    info.setLife(3)
}
// #16
sprites.onOverlap(SpriteKind.marioKind, SpriteKind.enemyKind, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(coinSprite, effects.fire, 200)
    marioSprite.setPosition(randint(20, 80), randint(20, 100))
})
function createCOINS () {
    // #11
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        coinSprite = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.coinKind)
        animation.runImageAnimation(
        coinSprite,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 3 d 5 b . 
            b 5 3 5 1 5 b . 
            c 5 3 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 3 1 5 b . 
            . c 5 3 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 3 5 b . 
            . c d 1 3 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        50,
        true
        )
        tiles.placeOnTile(coinSprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function createEnemy () {
    // #14, and #15
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        enemySprte = sprites.create(img`
            . f f f . . . . . . . . f f f . 
            f f c . . . . . . . f c b b c . 
            f c c . . . . . . f c b b c . . 
            c f . . . . . . . f b c c c . . 
            c f f . . . . . f f b b c c . . 
            f f f c c . c c f b c b b c . . 
            f f f c c c c c f b c c b c . . 
            . f c 3 c c 3 b c b c c c . . . 
            . c b 3 b c 3 b b c c c c . . . 
            c c b b b b b b b b c c . . . . 
            c b 1 b b b 1 b b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            f b c b b b c b b b b f . . . . 
            . f 1 f f f 1 b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.enemyKind)
        enemySprte.setVelocity(enemySpeed, 0)
        enemySprte.setBounceOnWall(true)
        animation.runImageAnimation(
        enemySprte,
        [img`
            . . f f f . . . . . . . . f f f 
            . f f c c . . . . . . f c b b c 
            f f c c . . . . . . f c b b c . 
            f c f c . . . . . . f b c c c . 
            f f f c c . c c . f c b b c c . 
            f f c 3 c c 3 c c f b c b b c . 
            f f b 3 b c 3 b c f b c c b c . 
            . c 1 b b b 1 b c b b c c c . . 
            . c 1 b b b 1 b b c c c c . . . 
            c b b b b b b b b b c c . . . . 
            c b 1 f f 1 c b b b b f . . . . 
            f f 1 f f 1 f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `,img`
            . . f f f . . . . . . . . . . . 
            f f f c c . . . . . . . . f f f 
            f f c c c . c c . . . f c b b c 
            f f c 3 c c 3 c c f f b b b c . 
            f f c 3 b c 3 b c f b b c c c . 
            f c b b b b b b c f b c b c c . 
            c c 1 b b b 1 b c b b c b b c . 
            c b b b b b b b b b c c c b c . 
            c b 1 f f 1 c b b c c c c c . . 
            c f 1 f f 1 f b b b b f c . . . 
            f f f f f f f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 2 b b b c f . . . . 
            . . f 2 2 2 b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . c c . c c . . . . . . . . 
            . . f 3 c c 3 c c c . . . . . . 
            . f c 3 b c 3 b c c c . . . . . 
            f c b b b b b b b b f f . . . . 
            c c 1 b b b 1 b b b f f . . . . 
            c b b b b b b b b c f f f . . . 
            c b 1 f f 1 c b b f f f f . . . 
            f f 1 f f 1 f b c c b b b . . . 
            f f f f f f f b f c c c c . . . 
            f f 2 2 2 2 f b f b b c c c . . 
            . f 2 2 2 2 2 b c c b b c . . . 
            . . f 2 2 2 b f f c c b b c . . 
            . . . f f f f f f f c c c c c . 
            . . . . . . . . . . . . c c c c 
            `,img`
            . f f f . . . . . . . . f f f . 
            f f c . . . . . . . f c b b c . 
            f c c . . . . . . f c b b c . . 
            c f . . . . . . . f b c c c . . 
            c f f . . . . . f f b b c c . . 
            f f f c c . c c f b c b b c . . 
            f f f c c c c c f b c c b c . . 
            . f c 3 c c 3 b c b c c c . . . 
            . c b 3 b c 3 b b c c c c . . . 
            c c b b b b b b b b c c . . . . 
            c 1 1 b b b 1 1 b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            f b c b b b c b b b b f . . . . 
            . f 1 f f f 1 b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `],
        50,
        true
        )
        tiles.placeOnTile(enemySprte, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.marioKind, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.gameOver(false)
})
// #12
sprites.onOverlap(SpriteKind.marioKind, SpriteKind.coinKind, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 0.1)
    info.changeScoreBy(_value)
})
scene.onOverlapTile(SpriteKind.marioKind, assets.tile`myTile1`, function (sprite, location) {
    game.gameOver(true)
})
let enemySprte: Sprite = null
let coinSprite: Sprite = null
let _value = 0
let enemySpeed = 0
let playerSpeed = 0
let jumpSpeed = 0
let gravity = 0
let marioSprite: Sprite = null
createGame()
