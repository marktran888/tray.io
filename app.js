
$.get('/input.txt', (rawData) => { //wait for input.txt to be loaded

  // console.log(rawData); // check raw data

  const data = rawData.split('\n'); //split the string into an array
  const width = parseInt(data[0].split(' ')[0]); //grid width
  const height = parseInt(data[0].split(' ')[1]); //grid length
  const startX = parseInt(data[1].split(' ')[0]); //start start location
  const startY = parseInt(data[1].split(' ')[1]);
  const instructions = data[data.length-2]; //-2 because extra carriage return is in txt file
  const grid = Array( width * height ); //create an Array to represent the grid
  let location = startX + startY * width;
  let dirtFound = 0;

  //remove grid, starting position and instructions and empty line so only dirt location remains
  data.splice(0,2);
  data.splice(data.length-2,2);

  //populate grid with dirt
  data.forEach(element => {
    grid[parseInt(element.split(' ')[0]) + parseInt(element.split(' ')[1]) * width] = 'dirt';
  });

  // check populated correctly
  // for (let i = 0; i < grid.length; i++) {
  //   console.log(!grid[i] ? i : grid[i]);
  // }

  function runInstructions(instructions){
    instructions.split('').forEach(direction => {
      // for debugging
      // console.log('location',location);
      // console.log('direction',element);
      if(direction==='N'){
        location = location + width > grid.length ? location : location + width;
      } else if(direction==='W'){
        location = location % width === 0 ? location : location - 1 ;
      } else if(direction==='E'){
        location = (location + 1) % width === 0 ? location : location + 1;
      } else if(direction==='S'){
        location = location - width < 0 ? location : location - width;
      }
      if(grid[location] === 'dirt'){
        grid[location] = 0;
        dirtFound++;
      }
    });
  }

  runInstructions(instructions);

  // print results in required format
  console.log((location%width)+' '+(Math.floor(location/width)));
  console.log(dirtFound);

  // check grid
  // for (let i = 0; i < grid.length; i++) {
  //   console.log(!grid[i] ? i : grid[i]);
  // }

}, 'text');
