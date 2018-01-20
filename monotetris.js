//
// Monotetris Game
// https://makecode.microbit.org/
//

let score = 0
input.onButtonPressed(Button.A, () => {
    if (canMove(-1, 0)) {
        move(-1, 0)
    }
})
function resetGame() {
    px = 0
    py = 0
    ekrans = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    score = 0
    basic.showNumber(2)
    basic.showNumber(1)
    basic.showIcon(IconNames.Target)
    music.playTone(131, music.beat(BeatFraction.Whole))
    gamepause = 500
}
function checkLine() {
    if (ekrans[0][4] == 255 && ekrans[1][4] == 255 && ekrans[2][4] == 255 && ekrans[3][4] == 255 && ekrans[4][4] == 255) {
        // last line removal animation
        for (let x = 0; x <= 4; x++) {
            for (let b = 250; b >= 0; b += -50) {
                basic.pause(20)
                led.plotBrightness(x, 4, b)
            }
        }
        // shift all other pixels down
        for (let y = 0; y <= 5 - 1; y++) {
            for (let z = 4; z > -1; z--) {
                ekrans[y][z] = ekrans[y][z - 1]
            }
        }
        score += 1
    }
}
function endGame() {
    basic.clearScreen()
    basic.showString("END")
    basic.showNumber(score)
}
input.onButtonPressed(Button.B, () => {
    if (canMove(1, 0)) {
        move(1, 0)
    }
})
input.onGesture(Gesture.Shake, () => {
    resetGame()
})
let gamepause = 0
let px = 0
let py = 0
let ekrans: number[][] = []
resetGame()
function canMove(diffx: number, diffy: number): boolean {
    return (px + diffx > -1) && (px + diffx < 5) && (py + diffy < 5) && ekrans[px + diffx][py + diffy] == 0
}
function move(diffx: number, diffy: number) {
    if (canMove(diffx, diffy)) {

        ekrans[px][py] = 0
        px += diffx
        py += diffy
        ekrans[px][py] = 255

        for (let a = 0; a < 5; a++) {
            for (let d = 0; d < 5; d++) {
                led.plotBrightness(a, d, ekrans[a][d])
            }
        }
    } else {
        px = Math.random(5)
        py = 0

        if (ekrans[px][py + 1] == 255) {
            endGame()
            resetGame()
        }
    }


}

basic.forever(() => {
    basic.pause(150)
    basic.pause(gamepause += -5)
    move(0, 1)
    checkLine()
})
