# lesstextjs <UNDER DEVELOPMENT>
At the world of web development, one of the most common scenario that is not built-in cross-browser is truncated-multiple-lines-of-text.

While `text-overflow: ellipsis;` only resolves single line truncation of the text element, and only chrome provides bulit-in solution to multiline truncation which is CSS property `-webkit-line-clamp`. We, as web UI developer, really need to a simple and cross-browser solution to support multiline truncation.

## Demo
https://codesandbox.io/s/myp6jn4878

## TODOS

 - Given options for hanlding element resize:
  1. JS library to detect element resize, so user have an ultimate experience. But it cost computing resources so doesn't fit the case there're many LessText objects.
  2. Change the LessText to class. We should provide several public API so consumer can update whenever they want.
 - Truncate using requestAnimationFrame for better performance
 - Ability to truncate text in middle
