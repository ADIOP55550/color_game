
const COLORS = ["#fafafa", "#c8c8c8", "#969696", "#646464", "#000000"];
const STORAGE_URL = "http://localhost:3000/game";


interface SaveItem {
   x: number,
   y: number,
   color: string
}

interface Response {
   state: string
}





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


   // saving state to server
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


   // loading saved state

   $('#loadBtn').click((e) => {
      e.preventDefault();

      $.ajax({
         contentType: "application/json"
      });
      $.getJSON(STORAGE_URL, (data: Response) => {
         let state = JSON.parse(data.state) as SaveItem[];
         console.log(state);
         // Display
         loadBoardStateFromObj(state, parent);
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

   setColor(item, newColorId);
}

function setColor(item: HTMLDivElement, newColorId: number) {
   let currColor = COLORS[newColorId];
   // save color
   item.setAttribute('data-color', newColorId.toString());
   item.style.backgroundColor = currColor;
}



// Board saving and loading 


function boardToJSONstring(parent: JQuery<HTMLElement>): string {
   let saveObject: SaveItem[] = [];
   parent.children().each((index, child) => {
      let color = child.getAttribute('data-color') || "-1";
      // prepare save object
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

   // assign colors to children
   children.each((i, child) => {
      setColor(child as HTMLDivElement, colorToColorID(saveState[i].color));
   });
}




// utils


function convert2Dto1Dindex(x: number, y: number, arrayWidth = 10): number {
   return y * arrayWidth + x;
}

function colorToColorID(color: string): number {
   return COLORS.indexOf(color);
}

