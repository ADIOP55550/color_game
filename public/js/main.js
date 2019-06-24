"use strict";
var COLORS = ["#fafafa", "#c8c8c8", "#969696", "#646464", "#000000"];
$(function () {
    var parent = $("#board");
    // creating divs
    for (var i = 0; i < 100; i++) {
        var item = document.createElement('div');
        var $item = $(item);
        // random color
        var colorId = Math.floor(Math.random() * COLORS.length);
        var color = COLORS[colorId];
        item.style.backgroundColor = color;
        item.setAttribute('data-color', colorId.toString());
        // handle color changing
        $item.click(function (event) {
            CycleColor(event.target);
        });
        item.classList.add("item");
        parent.append(item);
    }
});
function CycleColor(item) {
    // get color
    var prevColor = item.getAttribute('data-color') || "-1";
    var prevColorId = parseInt(prevColor);
    // loop in COLORS
    var currColorId = (prevColorId + 1) >= COLORS.length ? 0 : (prevColorId + 1);
    var currColor = COLORS[currColorId];
    // save color
    item.setAttribute('data-color', currColorId.toString());
    item.style.backgroundColor = currColor;
}
