export function slugify (string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function iterator (arr, field, comp, aggregator = 0) {
  arr.forEach(p => {
    if (p[field] === comp) {
    aggregator++
    comp = comp + '-' + aggregator
    iterator(arr, field, comp, aggregator)
    }
  })
  return aggregator
}

export function pad(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
