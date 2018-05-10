const halp = require('./helpers.js');

const testAsks = [
  ['7820', '18.10772837', 20],
  ['7820.95', '1.27482', 1],
  ['7821', '1.008', 4],
  ['7822', '1.151', 2],
  ['7822.17', '0.01', 1],
  ['7822.79', '0.1', 1],
  ['7823', '0.001', 1],
  ['7824', '0.001', 1],
  ['7824.1', '0.0042', 3],
  ['7825', '0.001', 1],
  ['7825.58', '6.87', 1],
  ['7826', '0.08293575', 2],
  ['7826.46', '0.0025', 1],
  ['7826.84', '0.00128974', 1],
  ['7827', '0.001', 1],
  ['7828', '0.001', 1],
  ['7829', '0.001', 1],
  ['7829.01', '1', 1],
  ['7829.64', '0.1', 1],
  ['7829.78', '6.24', 1],
  ['7830', '45.46714888', 2],
  ['7830.3', '0.001', 1],
  ['7831', '0.001', 1],
  ['7832', '0.001', 1],
  ['7833', '0.001', 1]
];

const testBids = [
  ['7819.99', '2.64277987', 7],
  ['7819.98', '0.43', 1],
  ['7819.08', '0.0018813', 1],
  ['7818.99', '0.00368926', 1],
  ['7817.4', '1.27564', 1],
  ['7817.31', '0.24549', 1],
  ['7817', '0.001', 1],
  ['7816', '0.821217', 2],
  ['7815.94', '0.014662', 2],
  ['7815.67', '0.052', 3],
  ['7815.33', '0.001', 1],
  ['7815', '0.9609949', 5],
  ['7814.97', '0.001', 1],
  ['7814.95', '0.1', 1],
  ['7814.6', '0.00771821', 2],
  ['7814.25', '0.1', 1],
  ['7814.19', '0.013', 1],
  ['7814', '0.026', 2],
  ['7813.75', '1.04841089', 1],
  ['7813.63', '0.25815', 1],
  ['7813.47', '0.2687', 1],
  ['7813.41', '0.1', 1],
  ['7813.4', '0.00561196', 1],
  ['7813.03', '0.06', 2],
  ['7813', '0.001', 1]
];

describe('new bid received', () => {

  let newHighBid = ['7820.00', '1.65', 1];
  let resultOfNewHighBid = halp.addToBids(testBids, newHighBid);

  test('adds new bid to front of array', () => {
    let modifiedTestBids = JSON.parse(JSON.stringify(testBids));
    modifiedTestBids.unshift(newHighBid);
    modifiedTestBids.pop();
    expect(resultOfNewHighBid).toEqual(modifiedTestBids);
  });

  let newMidBid = ['7814.99', '0.05', 1];
  let resultOfNewMidBid = halp.addToBids(testBids, newMidBid);

  test('adds new bid to correct spot in array', () => {
    let modifiedTestBids = JSON.parse(JSON.stringify(testBids));
    modifiedTestBids.splice(12, 0, newMidBid);
    modifiedTestBids.pop();
    expect(resultOfNewMidBid).toEqual(modifiedTestBids);
  });

  let newLowBid = ['7813.01', '0.60554', 1];
  let resultOfNewLowBid = halp.addToBids(testBids, newLowBid);

  test('adds new bid to end of array', () => {
    let modifiedTestBids = JSON.parse(JSON.stringify(testBids));
    modifiedTestBids.pop();
    modifiedTestBids.push(newLowBid);
    expect(resultOfNewLowBid).toEqual(modifiedTestBids);
  });

  let matchingBid = ['7813.41', '0.1', 1];
  let resultOfMatchingBid = halp.addToBids(testBids, matchingBid);

  test('increments matching bid', () => {
    let modifiedTestBids = JSON.parse(JSON.stringify(testBids));
    modifiedTestBids[21] = ['7813.41', '0.2', 2];
    expect(resultOfMatchingBid).toEqual(modifiedTestBids);
  });

  test('length should not exceed 25', () => {
    expect(resultOfNewHighBid).toHaveLength(25);
    expect(resultOfNewLowBid).toHaveLength(25);
    expect(resultOfNewMidBid).toHaveLength(25);
    expect(resultOfMatchingBid).toHaveLength(25);
  });
});


describe('new ask received', () => {

  let newLowAsk = ['7819.99', '0.105', 1];
  let resultOfNewLowAsk = halp.addToAsks(testAsks, newLowAsk);

  test('adds new ask to front of array', () => {
    let modifiedTestAsks = JSON.parse(JSON.stringify(testAsks));
    modifiedTestAsks.unshift(newLowAsk);
    modifiedTestAsks.pop();
    expect(resultOfNewLowAsk).toEqual(modifiedTestAsks);
  });

  let newMidAsk = ['7825.10', '0.1112', 1];
  let resultOfNewMidAsk = halp.addToAsks(testAsks, newMidAsk);

  test('adds new ask to correct spot in array', () => {
    let modifiedTestAsks = JSON.parse(JSON.stringify(testAsks));
    modifiedTestAsks.splice(10, 0, newMidAsk);
    modifiedTestAsks.pop();
    expect(resultOfNewMidAsk).toEqual(modifiedTestAsks);
  });

  let newHighAsk = ['7832.50', '1', 1];
  let resultOfNewHighAsk = halp.addToAsks(testAsks, newHighAsk);

  test('adds new ask to end of array', () => {
    let modifiedTestAsks = JSON.parse(JSON.stringify(testAsks));
    modifiedTestAsks.pop();
    modifiedTestAsks.push(newHighAsk);
    expect(resultOfNewHighAsk).toEqual(modifiedTestAsks);
  });

  let matchingAsk = ['7820', '0.1', 1];
  let resultOfMatchingAsk = halp.addToAsks(testAsks, matchingAsk);

  test('increments matching ask', () => {
    let modifiedTestAsks = JSON.parse(JSON.stringify(testAsks));
    modifiedTestAsks[0] = ['7820', '18.20772837', 21];
    expect(resultOfMatchingAsk).toEqual(modifiedTestAsks);
  });

  test('length should not exceed 25', () => {
    expect(resultOfNewHighAsk).toHaveLength(25);
    expect(resultOfNewLowAsk).toHaveLength(25);
    expect(resultOfNewMidAsk).toHaveLength(25);
    expect(resultOfMatchingAsk).toHaveLength(25);
  });

});

describe('ask removed/reduced', () => {
  let matchingBid = ['7820', '5', 1];
  let resultOfMatchingBid = halp.removeFromAsks(testAsks, matchingBid);

  test('reduces size of ask when order partially filled', () => {
    let modifiedTestAsks = JSON.parse(JSON.stringify(testAsks));
    let modifiedAsk = ['7820', '13.10772837', 20]
    modifiedTestAsks.splice(0, 1, modifiedAsk);
    expect(resultOfMatchingBid).toEqual(modifiedTestAsks);
  });

//   // let newMidAsk = ['7825.10', '0.1112', 1];
//   // let resultOfNewMidAsk = halp.addToAsks(testAsks, newMidAsk);

//   // test('adds new ask to correct spot in array', () => {
//   //   let modifiedTestAsks = testAsks.slice();
//   //   modifiedTestAsks.splice(10, 0, newMidAsk);
//   //   modifiedTestAsks.pop();
//   //   expect(resultOfNewMidAsk).toEqual(modifiedTestAsks);
//   // });

//   // let newHighAsk = ['7832.50', '1', 1];
//   // let resultOfNewHighAsk = halp.addToAsks(testAsks, newHighAsk);

//   // test('adds new ask to end of array', () => {
//   //   let modifiedTestAsks = testAsks.slice();
//   //   modifiedTestAsks.pop();
//   //   modifiedTestAsks.push(newHighAsk);
//   //   expect(resultOfNewHighAsk).toEqual(modifiedTestAsks);
//   // });

//   // let matchingAsk = ['7820', '0.1', 1];
//   // let resultOfMatchingAsk = halp.addToAsks(testAsks, matchingAsk);

//   // test('increments matching ask', () => {
//   //   let modifiedTestAsks = testAsks.slice();
//   //   modifiedTestAsks[0] =  ['7820', '18.20772837', 21];
//   //   expect(resultOfMatchingAsk).toEqual(modifiedTestAsks);
//   // });

  test('length should be unchanged', () => {
    expect(resultOfMatchingBid).toHaveLength(25);
  });

//   test('length should be reduced', () => {
//     // expect(resultOfMatchingBid).toHaveLength(24);

//   });
});

