"use strict";
var COLORS = ["#fafafa", "#c8c8c8", "#969696", "#646464", "#000000"];
var STORAGE_URL = "http://localhost:3000/game";
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
    // saving state to server
    $('#saveBtn').click(function (e) {
        e.preventDefault();
        var saveData = boardToJSONstring(parent);
        console.log(saveData);
        // Send state
        $.ajax({
            contentType: "application/json"
        });
        $.post(STORAGE_URL, { state: saveData }, function (result) {
            console.log(result);
        });
    });
    // loading saved state
    $('#loadBtn').click(function (e) {
        e.preventDefault();
        $.ajax({
            contentType: "application/json"
        });
        $.getJSON(STORAGE_URL, function (data) {
            var state = JSON.parse(data.state);
            console.log(state);
            // Display
            loadBoardStateFromObj(state, parent);
        });
    });
    // prevent form sending
    $('form').submit(function (e) { return e.preventDefault(); });
});
function CycleColor(item) {
    // get color
    var prevColor = item.getAttribute('data-color') || "-1";
    var prevColorId = parseInt(prevColor);
    // loop in COLORS
    var newColorId = (prevColorId + 1) >= COLORS.length ? 0 : (prevColorId + 1);
    setColor(item, newColorId);
}
function setColor(item, newColorId) {
    var currColor = COLORS[newColorId];
    // save color
    item.setAttribute('data-color', newColorId.toString());
    item.style.backgroundColor = currColor;
}
// Board saving and loading 
function boardToJSONstring(parent) {
    var saveObject = [];
    parent.children().each(function (index, child) {
        var color = child.getAttribute('data-color') || "-1";
        // prepare save object
        var saveItem = {
            x: index % 10,
            y: Math.floor(index / 10),
            color: COLORS[parseInt(color)]
        };
        saveObject.push(saveItem);
    });
    return JSON.stringify(saveObject);
}
function loadBoardStateFromObj(saveState, parent) {
    var children = parent.children();
    // assign colors to children
    children.each(function (i, child) {
        setColor(child, colorToColorID(saveState[i].color));
    });
}
// utils
function convert2Dto1Dindex(x, y, arrayWidth) {
    if (arrayWidth === void 0) { arrayWidth = 10; }
    return y * arrayWidth + x;
}
function colorToColorID(color) {
    return COLORS.indexOf(color);
}
