const { src } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);

let validateHTML = () => {
    return src(`../html/index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`../html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`../prod/html/`));
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

let lintJS = () => {
    return src(`app.js`)
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

function whiterice() {
    document.getElementById("wr").style.visiblity = "hidden";
}

function sproutedrice() {
    document.getElementById("scr").style.visibility = "visible";
}

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.cssLinter = cssLinter;
exports.lintJS = lintJS;
