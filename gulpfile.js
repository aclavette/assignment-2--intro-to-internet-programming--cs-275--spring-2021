const { src, dest, watch, series } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssLinter = require(`gulp-stylelint`);
const cssCompressor = require('gulp-clean-css');
const jsLinter = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const jsCompressor = require(`gulp-uglify`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let validateHTML = () => {
    return src(`html/index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html/`));
};

let lintCSS = () => {
    return src(`css/style.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let compressCSS = () => {
    return src(`css/style.css`)
      .pipe(cssCompressor({collapseWhitespace: true}))
      .pipe(dest(`prod/css/`))
}

let lintJS = () => {
    return src(`js/app.js`)
        .pipe(jsLinter({
            parserOptions: {
                ecmaVersion: 2017,
                sourceType: `module`
            },
            rules: {
                indent: [2, 4, {SwitchCase: 1}],
                quotes: [2, `backtick`],
                semi: [2, `always`],
                'linebreak-style': [2, `unix`],
                'max-len': [1, 85, 4]
            },
            env: {
                es6: true,
                node: true,
                browser: true
            },
            extends: `eslint:recommended`
        }))
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let transpileJSForDev = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 10,
        server: {
            baseDir: [
                `html/`,
                `css/`,
                `js/`
            ]
        }
    });

    watch(`js/app.js`,
        series(lintJS, transpileJSForDev)
    ).on(`change`, reload);

    watch(`css/style.css`,
        series(lintCSS)
    ).on(`change`, reload);

    watch(`html/index.html`,
        series(validateHTML, compressHTML)
    ).on(`change`, reload);
};



exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.cssLinter = cssLinter;
exports.lintJS = lintJS;
exports.serve = series(lintCSS, lintJS, transpileJSForDev, validateHTML, serve);
