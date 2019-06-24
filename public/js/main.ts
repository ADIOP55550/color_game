
const COLORS = ["#fafafa", "#c8c8c8", "#969696", "#646464", "#000000"];
const STORAGE_URL = "http://localhost:3000/game";

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


   // saving
   $('#saveBtn').click((e) => {
      e.preventDefault();
      let saveData = boardToJSONstring(parent);

      console.log(saveData);

      // Send state
      $.ajax({
         contentType: "application/json"
      });
      $.post(STORAGE_URL, { state: saveData }, result => {
         console.log(result);
      });

   });


   // loading
   $('#loadBtn').click((e) => {
      e.preventDefault();

      $.ajax({
         contentType: "application/json"
      });

      interface Response {
         state: string
      }

      $.getJSON(STORAGE_URL, data => {
         let state = JSON.parse(data.state) as SaveItem[];
         console.log(state);
      })
   });

   // prevent form sending
   $('form').submit(e => e.preventDefault());
});



function CycleColor(item: HTMLDivElement) {
   // get color
   let prevColor = item.getAttribute('data-color') || "-1";
   let prevColorId = parseInt(prevColor);

   // loop in COLORS
   let newColorId = (prevColorId + 1) >= COLORS.length ? 0 : (prevColorId + 1);

   setColor(newColorId, item);
}

interface SaveItem {
   x: number,
   y: number,
   color: string
}

function setColor(newColorId: number, item: HTMLDivElement) {
   let currColor = COLORS[newColorId];
   // save color
   item.setAttribute('data-color', newColorId.toString());
   item.style.backgroundColor = currColor;
}

function boardToJSONstring(parent: JQuery<HTMLElement>): string {
   let saveObject: SaveItem[] = [];
   parent.children().each((index, child) => {
      let color = child.getAttribute('data-color') || "-1";
      let saveItem: SaveItem = {
         x: index % 10,
         y: Math.floor(index / 10),
         color: COLORS[parseInt(color)]
      }
      saveObject.push(saveItem);
   });

   return JSON.stringify(saveObject);
}

function loadBoardStateFromObj(saveState: SaveItem[], parent: JQuery<HTMLElement>): void {
   const children = parent.children();
   children.each((i, child) => {
      child.setAttribute('data-color')
   })
}

function convert2Dto1Dindex(x: number, y: number, arrayWidth = 10): number {
   return y * arrayWidth + x;
}