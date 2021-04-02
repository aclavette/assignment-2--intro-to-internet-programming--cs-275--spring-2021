const { src } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsValidator = require(`gulp-eslint`);

let validateHTML = () => {
    return src(`html/index.html`)
        .pipe(htmlValidator());
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

let jsValidator = () => {
    return src(`js/app.js`)
        .pipe(jsValidator());

};

exports.validateHTML = validateHTML;
