const addToAsks = (ordersArray, data) => {
  // console.log('adding to asks');
  let newArray = JSON.parse(JSON.stringify(ordersArray));
  let insertionSpot;

  // if order outside range, return
  if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[newArray.length-1][0])) {
    return newArray;
  // else if order better than top, add to front
  } else if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[0][0])) {
    newArray.unshift(data);
    newArray.pop();
    return newArray;
  // else insert into ascending sorted array
  } else {
    insertionSpot = binarySearchAscendingArray(newArray, data[0]);
    if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[insertionSpot][0]).toFixed(2)) {
      // increment order size in place
      let newSize = Number.parseFloat(newArray[insertionSpot][1]) + Number.parseFloat(data[1]);
      newArray[insertionSpot] = [newArray[insertionSpot][0], newSize.toString(), ++newArray[insertionSpot][2]];
      return newArray;
    } else {
      newArray.splice(insertionSpot, 0, data);
      newArray.pop();
      return newArray;
    }
  }
};

const addToBids = (ordersArray, data) => {
  // console.log('adding to bids');
  let newArray = JSON.parse(JSON.stringify(ordersArray));
  let insertionSpot;

  // if order outside range, return
  if (Number.parseFloat(data[0]) < Number.parseFloat(newArray[newArray.length-1][0])) {
    return newArray;
  // else if order better than top, add to front
  } else if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[0][0])) {
    newArray.unshift(data);
    newArray.pop();
    return newArray;
  // else insert into descending sorted array
  } else {
    insertionSpot = binarySearchDescendingArray(newArray, data[0]);
    if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[insertionSpot][0]).toFixed(2)) {
      // increment order size in place
      let newSize = Number.parseFloat(newArray[insertionSpot][1]) + Number.parseFloat(data[1]);
      newArray[insertionSpot] = [newArray[insertionSpot][0], newSize.toString(), ++newArray[insertionSpot][2]];
      return newArray;
    } else {
      newArray.splice(insertionSpot, 0, data);
      newArray.pop();
      return newArray;
    }
  }
};


const removeFromAsks = (ordersArray, data) => {
  console.log('removing from asks');
  let newArray = JSON.parse(JSON.stringify(ordersArray));
  let deletionSpot;

  // if order outside range, return
  if (Number.parseFloat(data[0]) > Number.parseFloat(newArray[newArray.length-1][0])) {
    return newArray;
  // else find matching order in ascending sorted array
  } else {
    deletionSpot = binarySearchAscendingArray(newArray, data[0]);
    // check for error
    if (Number.parseFloat(data[0]).toFixed(2) !== Number.parseFloat(newArray[deletionSpot][0]).toFixed(2)) {
      console.log('Outside of orderbook ask range:', data);
      return newArray;
    // else check for inadequate balance
    } else if ((Number.parseFloat(newArray[deletionSpot][1]) - Number.parseFloat(data[1])) < 0) {
      console.log('Partially filled:', newArray[deletionSpot], 'removed, ', data, 'requested');
      newArray.splice(deletionSpot, 1);
      return newArray;
    // else check for remaining balance, decrement size
    } else if ((Number.parseFloat(newArray[deletionSpot][1]) - Number.parseFloat(data[1])) > 0) {
      let newSize = Number.parseFloat(newArray[deletionSpot][1]) - Number.parseFloat(data[1]);
      newArray[deletionSpot][1] = newSize.toString();
      return newArray;
    // else it's an exact match, delete
    } else {
      newArray.splice(deletionSpot, 1);
      return newArray;
    }
  }
};


// returns insertion or match index
const binarySearchAscendingArray = (array, targetPrice, high, low) => {
  high = high || array.length-1;
  low = low || 0;
  let middle = Math.floor((high + low) / 2);

  while (high > low) {
    // if price matches the order being evaluated
    if (Number.parseFloat(targetPrice).toFixed(2) === Number.parseFloat(array[middle][0]).toFixed(2)) {
      return middle;
    // if you've looked at all spots
    } else if (middle === low) {
      return high;
    // else keep searching
    } else if (Number.parseFloat(targetPrice) > Number.parseFloat(array[middle][0])) {
      low = middle;
      middle = Math.floor((high + low) / 2);
    } else if (Number.parseFloat(targetPrice) < Number.parseFloat(array[middle][0])) {
      high = middle;
      middle = Math.floor((high + low) / 2);
    }
  }
};

// returns insertion or match index
const binarySearchDescendingArray = (array, targetPrice, high, low) => {
  high = high || array.length-1;
  low = low || 0;
  let middle = Math.floor((high + low) / 2);

  while (high > low) {
    // if price matches the order being evaluated
    if (Number.parseFloat(targetPrice).toFixed(2) === Number.parseFloat(array[middle][0]).toFixed(2)) {
      return middle;
    // if you've looked at all spots
    } else if (middle === low) {
      return high;
    // else keep searching
    } else if (Number.parseFloat(targetPrice) < Number.parseFloat(array[middle][0])) {
      low = middle;
      middle = Math.floor((high + low) / 2);
    } else if (Number.parseFloat(targetPrice) > Number.parseFloat(array[middle][0])) {
      high = middle;
      middle = Math.floor((high + low) / 2);
    }
  }
};


module.exports.addToAsks = addToAsks;
module.exports.addToBids = addToBids;
module.exports.removeFromAsks = removeFromAsks;
