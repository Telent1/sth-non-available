const sudoLength = 9
const sudoNumArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const areaArr = [
  ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'],
  ['0,3', '0,4', '0,5', '1,3', '1,4', '1,5', '2,3', '2,4', '2,5'],
  ['0,6', '0,7', '0,8', '1,6', '1,7', '1,8', '2,6', '2,7', '2,8'],
  ['3,0', '3,1', '3,2', '4,0', '4,1', '4,2', '5,0', '5,1', '5,2'],
  ['3,3', '3,4', '3,5', '4,3', '4,4', '4,5', '5,3', '5,4', '5,5'],
  ['3,6', '3,7', '3,8', '4,6', '4,7', '4,8', '5,6', '5,7', '5,8'],
  ['6,0', '6,1', '6,2', '7,0', '7,1', '7,2', '8,0', '8,1', '8,2'],
  ['6,3', '6,4', '6,5', '7,3', '7,4', '7,5', '8,3', '8,4', '8,5'],
  ['6,6', '6,7', '6,8', '7,6', '7,7', '7,8', '8,6', '8,7', '8,8'],
]

const sudo = [
  [2, 8, 0, 0, 7, 0, 0, 0, 5],
  [0, 4, 0, 5, 6, 0, 0, 1, 0],
  [0, 7, 0, 0, 2, 0, 8, 0, 9],
  [0, 3, 0, 0, 0, 5, 6, 0, 0],
  [4, 9, 0, 0, 3, 1, 0, 8, 2],
  [0, 0, 5, 8, 0, 0, 0, 4, 0],
  [7, 0, 9, 0, 5, 0, 0, 2, 0],
  [0, 2, 0, 0, 1, 7, 0, 5, 0],
  [3, 0, 0, 0, 8, 0, 0, 7, 6]
]

function getRowNum(arr, x) {
  const list = [];
  for (let i = 0; i < sudoLength; i += 1) {
    let val = arr[x][i]
    if (val) {
      list.push(val)
    }
  }
  return list
}

function getColNum(arr, y) {
  const list = []
  for (let i = 0; i < sudoLength; i += 1) {
    let val = arr[i][y]
    if (val) {
      list.push(val)
    }
  }
  return list
}

function getAreaNum(arr, x, y) {
  const list = []
  const position = `${x},${y}`
  let areaItem = []
  areaArr.map((item) => {
    if (item.indexOf(position) > -1) {
      areaItem = item
    }
  })
  areaItem.map(pos => {
    const [cx, cy] = pos.split(',')
    let val = arr[Number(cx)][Number(cy)]
    if (val) {
      list.push(val)
    }
  })
  return list
}

function getAvailableNum(arr, x, y) {
  const rowNum = getRowNum(arr, x)
  const colNum = getColNum(arr, y)
  const areaNum = getAreaNum(arr, x, y)
  const uniExistNum = Array.from(new Set([...rowNum, ...colNum, ...areaNum]))
  const list = sudoNumArr.filter(val => {
    return uniExistNum.indexOf(val) === -1
  })
  return list
}

function getNextEmptyPosition(arr) {
  for (let x = 0; x < sudoLength; x += 1) {
    for (let y = 0; y < sudoLength; y += 1) {
      if(!arr[x][y]) {
        return {x, y}
      }
    }
  }
  return false
}

function testNum(arr, x, y, num) {
  const tempArr = JSON.parse(JSON.stringify(arr))
  tempArr[x][y] = num
  console.log(tempArr)
  const pos = getNextEmptyPosition(tempArr)
  if (!pos) {
    return true
  }
  const {x: cx, y: cy} = pos
  const availableNum = getAvailableNum(tempArr, cx, cy)
  for (let i = 0; i < availableNum.length; i += 1) {
    return testNum(tempArr, cx, cy, availableNum[i])
  }
  return false;
}

function init() {
  const {x, y} = getNextEmptyPosition(sudo)
  const availableNum = getAvailableNum(sudo, x, y)
  for (let i = 0; i < availableNum.length; i += 1) {
    // testNum(sudo, x, y, availableNum[i])  
  }
}

window.onload = init