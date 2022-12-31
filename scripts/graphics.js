const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let hue = Math.random() * 360
let foreground = `hsl(${hue}, 60%, 55%, 0.9)`


const Graphics = {
    
    updateBackground: function() {
        hue = hue + 0.05
        if (hue > 360) hue = 0
        foreground = `hsl(${hue}, 60%, 55%, 0.9)`
    },

    initCanvas: function(){
        canvas.width = innerWidth
        canvas.height = innerHeight
    },

    createSquare: function(x, y, width, height, colour=foreground) {
        c.beginPath()
        c.fillStyle = colour
        c.fillRect(x, y, width, height)
    },

    showMessage: function(text, x = innerWidth / 2, y = innerHeight / 2, fontsize=48){
        c.fillStyle = 'rgba(255, 255, 255, 0.8)'
        c.font = `${fontsize}px Helvetica`
        textWidth = c.measureText(text).width
        c.fillText(text, x - (textWidth / 2), y)
    },

    createCircle: function(x, y, size, colour=foreground){
        c.beginPath()
        c.arc(x, y, size, 0, Math.PI * 2, true)
        c.fillStyle = colour
        c.fill()
    },

    clearCanvas: function() {
        c.clearRect(0, 0, innerWidth, innerHeight)
    }
}
