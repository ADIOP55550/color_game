
const COLORS = ["#fafafa", "#c8c8c8", "#969696", "#646464", "#000000"];

$(() => {
   let parent = $("#board");
   // creating divs
   for (let i = 0; i < 100; i++) {
      let item = document.createElement('div');
      let $item = $(item);

      // random color
      const colorId = Math.floor(Math.random() * COLORS.length);
      const color = COLORS[colorId];
      item.style.backgroundColor = color;
      item.setAttribute('data-color', colorId.toString());

      // handle color changing
      $item.click((event) => {
         CycleColor(event.target);
      })

      item.classList.add("item");
      parent.append(item);
   }
})


function CycleColor(item: HTMLDivElement) {
   // get color
   let prevColor = item.getAttribute('data-color') || "-1";
   let prevColorId = parseInt(prevColor);

   // loop in COLORS
   let currColorId = (prevColorId + 1) >= COLORS.length ? 0 : (prevColorId + 1);
   let currColor = COLORS[currColorId];
   
   // save color
   item.setAttribute('data-color', currColorId.toString());
   item.style.backgroundColor = currColor;
}