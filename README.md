# lesstextjs
A cross-browser javascript solution for truncating any part of a multiline text that is built for variants of options.

## Background
At the world of web development, one of the most common scenario which is not built-in cross-browser is called truncated-multiple-lines-of-text.

While `text-overflow: ellipsis;` only resolves single line truncation of the text element, and only chrome provides bulit-in solution to multiline truncation which is CSS property `-webkit-line-clamp`. We, as web UI developer, really need to a simple, high performant and cross-browser solution to support multiline truncation.

## Demo (In React/Typescript application)
### Simple truncation with multiple lines
https://codesandbox.io/s/0xm2zxxk8n

### Truncate only part of the sentence
https://codesandbox.io/s/p5m07y2jzm

### Use space character to separate words and do not truncate the last word. (Avoid any word to be broken up and losing meaning)
https://codesandbox.io/s/52vk27677n

### Reserve white space for formatting
https://codesandbox.io/s/j20q95zq7v

## Features
 - Truncate any part of a multiline text and truncated text will end with `...`.

## TODOS

 - Given options for hanlding element resize:
  2. Change the LessText to class. We should provide several public API so consumer can update whenever they want.
 - Truncate using requestAnimationFrame for better performance
