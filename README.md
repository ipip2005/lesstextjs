# lesstextjs <UNDER DEVELOPMENT>
A helper function that display multiple lines of text to be truncated at the end to fit given number of lines.

## Demo
https://codesandbox.io/s/myp6jn4878

## TODOS

 - Given options for hanlding element resize:
  1. JS library to detect element resize, so user have an ultimate experience. But it cost computing resources so doesn't fit the case there're many LessText objects.
  2. Change the LessText to class. We should provide several public API so consumer can update whenever they want.
 - Truncate using requestAnimationFrame for better performance
 - Ability to truncate text in middle
