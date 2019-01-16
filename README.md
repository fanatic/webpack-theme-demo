# webpack-theme-demo

This site implements code splitting across two themes.  Each theme may be
referenced in js or scss, and code is split out in a single run of webpack.
For fun, I added a dependency on lodash and allowed it to be split once and
re-used for both themes although each theme assets could have contained the
vendor modules directly.

The final output contains one html, css, js per theme, then an extra js for
shared code.  As you can see, the lodash dependency uses 71kb while each theme
is significantly smaller.

Further optimization could lazy load other vendor assets.

```bash
$ ls -Al dist
total 192
-rw-r--r--  1 jparrott  staff     35 Jan 15 18:58 carbon.css
-rw-r--r--  1 jparrott  staff   1678 Jan 15 18:58 carbon.js
-rw-r--r--@ 1 jparrott  staff    250 Jan 15 18:58 index-carbon.html
-rw-r--r--@ 1 jparrott  staff    250 Jan 15 18:58 index-quartz.html
-rw-r--r--  1 jparrott  staff     36 Jan 15 18:58 quartz.css
-rw-r--r--  1 jparrott  staff   1677 Jan 15 18:58 quartz.js
-rw-r--r--  1 jparrott  staff  71216 Jan 15 18:58 vendors~carbon~quartz.js
```

```bash
$ npm run build

> webpack-demo@1.0.0 build /Users/jparrott/src/webpack-demo
> webpack

Hash: 78976033d77e695f3e2b
Version: webpack 4.28.4
Time: 4087ms
Built at: 01/15/2019 6:58:05 PM
                   Asset      Size  Chunks             Chunk Names
              carbon.css  35 bytes       1  [emitted]  carbon
               carbon.js  1.64 KiB       1  [emitted]  carbon
              quartz.css  36 bytes       2  [emitted]  quartz
               quartz.js  1.64 KiB       2  [emitted]  quartz
vendors~carbon~quartz.js  69.4 KiB       0  [emitted]  vendors~carbon~quartz
Entrypoint quartz = vendors~carbon~quartz.js quartz.css quartz.js
Entrypoint carbon = vendors~carbon~quartz.js carbon.css carbon.js
[1] ./src/quartz.js 238 bytes {2} [built]
[2] (webpack)/buildin/global.js 472 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
[4] ./src/quartz.scss 39 bytes {2} [built]
[5] ./src/carbon.js 238 bytes {1} [built]
[6] ./src/carbon.scss 39 bytes {1} [built]
    + 3 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/lib/loader.js!src/carbon.scss:
    Entrypoint mini-css-extract-plugin = *
    [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/carbon.scss 175 bytes {0} [built]
        + 1 hidden module
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/lib/loader.js!src/quartz.scss:
    Entrypoint mini-css-extract-plugin = *
    [0] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/quartz.scss 176 bytes {0} [built]
        + 1 hidden module
```


