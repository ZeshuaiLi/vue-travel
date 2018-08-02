export const fixed = number => {
  number = Number(number);
  if (typeof number === 'number') {
    if (number !== number) {
      return ''
    }
    return (
      (
        Math.round(
          number * 100
        )
      ) / 100
    ).toFixed(2)
  } else {
    return ''
  }
}
