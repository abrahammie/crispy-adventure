const addToAsks = (ordersArray, data) => {
  // console.log('adding to asks');
  let newArray = [...ordersArray];

  // use binary search to find insertion index
  let high = newArray.length-1;
  let low = 0;
  let middle = Math.floor((high + low) / 2);
  let insertionSpot;

  // if order outside range, return
  if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[high][0])) {
    return newArray;
  // else if order better than top, add to front
  } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[low][0])) {
    newArray.unshift(data);
    newArray.pop();
    return newArray;
  // else insert into ascending sorted array
  } else {
    while (high > low) {
      // if price matches the order being evaluated
      if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[middle][0]).toFixed(2)) {
        // increment order
        let amt = Number.parseFloat(newArray[middle][1]) + Number.parseFloat(data[1]);
        newArray[middle] = [newArray[middle][0], amt.toString(), ++newArray[middle][2]];
        return newArray;
      // if you've looked at all spots
      } else if (middle === low) {
        insertionSpot = high;
        break;
      } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[middle][0])) {
        low = middle;
        middle = Math.floor((high + low) / 2);
      } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[middle][0])) {
        high = middle;
        middle = Math.floor((high + low) / 2);
      }
    }

    newArray.splice(insertionSpot, 0, data);
    newArray.pop();
    return newArray;
  }
};

const addToBids = (ordersArray, data) => {
  // console.log('adding to bids');
  let newArray = [...ordersArray];

  // use binary search to find insertion index
  let high = newArray.length-1;
  let low = 0;
  let middle = Math.floor((high + low) / 2);
  let insertionSpot;

  // if order outside range, return
  if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[high][0])) {
    return newArray;
  // else if order better than top, add to front
  } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[low][0])) {
    newArray.unshift(data);
    newArray.pop();
    return newArray;
  // else insert into descending sorted array
  } else {
    while (high > low) {
      // if price = newArray[middle]
      if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[middle][0]).toFixed(2)) {
        // increment order in place
        let amt = Number.parseFloat(newArray[middle][1]) + Number.parseFloat(data[1]);
        newArray[middle] = [newArray[middle][0], amt.toString(), ++newArray[middle][2]];
        return newArray;
      } else if (middle === low) {
        insertionSpot = high;
        break;
      } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[middle][0])) {
        low = middle;
        middle = Math.floor((high + low) / 2);
      } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[middle][0])) {
        high = middle;
        middle = Math.floor((high + low) / 2);
      }
    }

    newArray.splice(insertionSpot, 0, data);
    newArray.pop();
    return newArray;
  }
};


const removeFromAsks = (ordersArray, data) => {
  console.log('removing from asks');
  let newArray = [...ordersArray];

  // use binary search to find insertion index
  let high = newArray.length-1;
  let low = 0;
  let middle = Math.floor((high + low) / 2);
  let matchIndex;

  // if order outside range, return
  if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[high][0])) {
    return newArray;

  // else find match in ascending sorted array
  } else {
    while (high > low) {
      // if price matches the order being evaluated
      if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[middle][0]).toFixed(2)) {
        // increment order
        let amt = Number.parseFloat(newArray[middle][1]) + Number.parseFloat(data[1]);
        newArray[middle] = [newArray[middle][0], amt.toString(), ++newArray[middle][2]];
        return newArray;
      // if you've looked at all spots
      } else if (middle === low) {
        matchIndex = high;
        break;
      } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[middle][0])) {
        low = middle;
        middle = Math.floor((high + low) / 2);
      } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[middle][0])) {
        high = middle;
        middle = Math.floor((high + low) / 2);
      }
    }

    // if size of matching ask > incoming data size

      // decrement size of ask

    // else if exact match

      // delete ask - length goes below 25

    // else - do we need to account for possibility of incoming data size exceeding availabile ask size?

    return newArray;
  }
};


// // returns insertion index or
// const binarySearch = (array, high, low, target) => {
//   let high = high || newArray.length-1;
//   let low = low || 0;
//   let middle = Math.floor((high + low) / 2);
//   let matchIndex;

//   while (high > low) {
//     // if price = newArray[middle]
//     if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[middle][0]).toFixed(2)) {
//       // increment order in place
//       let amt = Number.parseFloat(newArray[middle][1]) + Number.parseFloat(data[1]);
//       newArray[middle] = [newArray[middle][0], amt.toString(), ++newArray[middle][2]];
//       return newArray;
//     } else if (middle === low) {
//       insertionSpot = high;
//       break;
//     } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[middle][0])) {
//       low = middle;
//       middle = Math.floor((high + low) / 2);
//     } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[middle][0])) {
//       high = middle;
//       middle = Math.floor((high + low) / 2);
//     }
//   }
// };


module.exports.addToAsks = addToAsks;
module.exports.addToBids = addToBids;
