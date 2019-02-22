/* globals some */
// @ts-nocheck
/*
  StandardJS does not check arrow parens
*/

[1, 2, 3].map((number) => `A string containing the ${number}.`)
;[1, 2, 3].map(number => {
  const nextNumber = number + 1
  return `A string containing the ${nextNumber}.`
})

// and even the simpliest (which are very popular in `functional/streams` programming)

some.filter((x) => x)
some.flatMap((_) => _)

// this seems to me more readable and doesn't break consitency:

some.filter(
  x => x
)
some.flatMap(
  _ => _
)
