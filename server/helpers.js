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
      // if price = newArray[middle]
      if (Number.parseFloat(data[0]).toFixed(2) === Number.parseFloat(newArray[middle][0]).toFixed(2)) {
        // increment order in place
        let amt = Number.parseFloat(newArray[middle][1]) + Number.parseFloat(data[1]);
        newArray[middle] = [newArray[middle][0], amt.toString(), ++newArray[middle][2]];
        return newArray;
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

module.exports.addToAsks = addToAsks;
module.exports.addToBids = addToBids;


/*
{
  "sequence":5668915937,
  "bids":[
    ["7819.99","2.64277987",7],
    ["7819.98","0.43",1],
    ["7819.08","0.0018813",1],
    ["7818.99","0.00368926",1],
    ["7817.4","1.27564",1],
    ["7817.31","0.24549",1],
    ["7817","0.001",1],
    ["7816","0.821217",2],
    ["7815.94","0.014662",2],
    ["7815.67","0.052",3],
    ["7815.33","0.001",1],
    ["7815","0.9609949",5],
    ["7814.97","0.001",1],
    ["7814.95","0.1",1],
    ["7814.6","0.00771821",2],
    ["7814.25","0.1",1],
    ["7814.19","0.013",1],
    ["7814","0.026",2],
    ["7813.75","1.04841089",1],
    ["7813.63","0.25815",1],
    ["7813.47","0.2687",1],
    ["7813.41","0.1",1],
    ["7813.4","0.00561196",1],
    ["7813.03","0.06",2],
    ["7813","0.001",1],
    ["7812.64","0.045",2],
    ["7812.52","0.04",1],
    ["7812.3","0.00448554",1],
    ["7812.28","0.001",1],
    ["7812","0.001",1],
    ["7811.99","0.001",1],
    ["7811.95","0.26393",1],
    ["7811.52","0.00492416",1],
    ["7811.25","0.001",1],
    ["7811.13","0.0792",1],
    ["7811","0.862",6],
    ["7810.94","0.001",1],
    ["7810.7","0.00595553",2],
    ["7810.5","0.001",1],
    ["7810","0.82392217",11],
    ["7809.97","0.001",1],
    ["7809.78","0.0025",1],
    ["7809.46","1",1],
    ["7809.42","0.1887",1],
    ["7809","0.2859",2],
    ["7808.57","0.035",2],
    ["7808.56","0.02721705",2],
    ["7808.37","0.002",2],
    ["7808.36","1.212",1],
    ["7808.28","0.001",1]
  ],
  "asks":[
    ["7820","18.10772837",20],
    ["7820.95","1.27482",1],
    ["7821","1.008",4],
    ["7822","1.151",2],
    ["7822.17","0.01",1],
    ["7822.79","0.1",1],
    ["7823","0.001",1],
    ["7824","0.001",1],
    ["7824.1","0.0042",3],
    ["7825","0.001",1],
    ["7825.58","6.87",1],
    ["7826","0.08293575",2],
    ["7826.46","0.0025",1],
    ["7826.84","0.00128974",1],
    ["7827","0.001",1],
    ["7828","0.001",1],
    ["7829","0.001",1],
    ["7829.01","1",1],
    ["7829.64","0.1",1],
    ["7829.78","6.24",1],
    ["7830","45.46714888",2],
    ["7830.3","0.001",1],
    ["7831","0.001",1],
    ["7832","0.001",1],
    ["7833","0.001",1],
    ["7833.02","0.00498105",1],
    ["7834","0.001",1],
    ["7834.43","7.2",1],
    ["7834.49","0.002",1],
    ["7834.8","0.0025",1],
    ["7835","0.001",1],
    ["7835.12","0.001",1],
    ["7835.63","1.8",2],
    ["7836","0.001",1],
    ["7836.19","1.013",1],
    ["7836.57","0.5",1],
    ["7837","0.001",1],
    ["7837.84","0.001",1],
    ["7837.91","0.00498105",1],
    ["7837.97","0.9",1],
    ["7838","0.001",1],
    ["7838.42","0.0037643",2],
    ["7838.82","6.4",1],
    ["7839","0.001",1],
    ["7839.16","1.479",1],
    ["7839.53","0.9",1],
    ["7840","0.001",1],
    ["7841","0.001",1],
    ["7842","0.001",1],
    ["7842.26","6.60276292",2]
  ]
}

*/