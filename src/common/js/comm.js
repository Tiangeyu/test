(function(global) {
    function remChange() {
        var w = document.documentElement.clientWidth;
        if (w > 750) {
            w = 750;
        }
        if (w < 320) {
            w = 320;
        }
        document.documentElement.style.fontSize = w / 320 * 100 + 'px'
    }
    remChange();
    global.addEventListener('resize', remChange, false)
})(window);