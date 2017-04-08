# GameOfLife

include in node_modules/jasmine-core/lib/jasmine-core/node_boot.js:

```
var JasmineConsoleReporter = require('jasmine-console-reporter');
env.addReporter(
    new JasmineConsoleReporter({
        colors: true,           
        cleanStack: true,       
        verbosity: true,        
        listStyle: 'indent', 
        activity: false
    })
);
```