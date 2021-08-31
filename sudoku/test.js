function test(sum, num) {
  if (num < 10) {
    sum += num
    return test(sum, num + 1)
  } else {
    console.log(sum)
  }
}

test(0, 0)