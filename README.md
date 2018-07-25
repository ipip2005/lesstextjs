# lesstextjs
A cross-browser javascript solution for truncating any part of a multiline text that is built for variants of options.

## Background
At the world of web development, one of the most common scenario which is not built-in cross-browser is called truncated-multiple-lines-of-text.

While `text-overflow: ellipsis;` only resolves single line truncation of the text element, and only chrome provides bulit-in solution to multiline truncation which is CSS property `-webkit-line-clamp`. We, as web UI developer, really need to a simple, high performant and cross-browser solution to support multiline truncation.

## Demo (Vanilla JS)
https://codesandbox.io/s/yqxvx12lzv

## Demo (In React/Typescript application)
### Simple truncation with multiple lines
https://codesandbox.io/s/0xm2zxxk8n

![Demo of Simple truncation with multiple lines](https://user-images.githubusercontent.com/7711735/43232715-3b3acc58-9027-11e8-997f-a0ddee732e83.png)

### Truncate only part of the sentence
https://codesandbox.io/s/p5m07y2jzm

![Demo of Truncate only part of the sentence](https://user-images.githubusercontent.com/7711735/43232773-6f4e28dc-9027-11e8-95f5-1aa53bc00922.png)

### Use space character to separate words and do not truncate the last word. (Avoid any word to be broken up and losing meaning)
https://codesandbox.io/s/52vk27677n

![Demo of Use space character to separate words and do not truncate the last word. (Avoid any word to be broken up and losing meaning)](https://user-images.githubusercontent.com/7711735/43232799-886d807e-9027-11e8-8ba5-61ffcb8b3eee.png)

### Reserve white space for formatting
https://codesandbox.io/s/j20q95zq7v

![Demo of Reserve white space for formatting](https://user-images.githubusercontent.com/7711735/43232808-9b8c37ea-9027-11e8-8274-6d5cdd31f1d3.png)

## Features
 - Truncate any part of a multiline text and truncated text will end with `...`.

## TODOS
 - Truncate using requestAnimationFrame for better performance
 
## License
LessTextJS is [MIT licensed](https://github.com/ipip2005/lesstextjs/blob/master/LICENSE)
