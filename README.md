# lesstextjs <UNDER DEVELOPMENT>
At the world of web development, one of the most common scenario which is not built-in cross-browser is called truncated-multiple-lines-of-text.

While `text-overflow: ellipsis;` only resolves single line truncation of the text element, and only chrome provides bulit-in solution to multiline truncation which is CSS property `-webkit-line-clamp`. We, as web UI developer, really need to a simple and cross-browser solution to support multiline truncation.

## Demo
### Simple truncation with multiple lines
https://codesandbox.io/s/j20q95zq7v

## TODOS

 - Given options for hanlding element resize:
  1. JS library to detect element resize, so user have an ultimate experience. But it cost computing resources so doesn't fit the case there're many LessText objects.
  2. Change the LessText to class. We should provide several public API so consumer can update whenever they want.
 - Truncate using requestAnimationFrame for better performance
 - Ability to truncate text in middle
