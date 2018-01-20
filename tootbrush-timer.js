//
// 5 year old programming adventures
// 
// Toothbrush Timer
// https://makecode.microbit.org/
//
//

input.onButtonPressed(Button.AB, () => {
    for (let kolonnas = 0; kolonnas <= 4; kolonnas++) {
        for (let rinda = 0; rinda <= 4; rinda++) {
            for (let gaisma = 0; gaisma <= 255; gaisma++) {
                led.plotBrightness(rinda, kolonnas, gaisma)
                
                // Approx 120000 / 5 / 5 / 255
                basic.pause(19)
            }
        }
    }
    basic.showIcon(IconNames.Heart)
    music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
})
