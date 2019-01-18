'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var del = require('del');
var jsReporter = require('jshint-stylish');
var annotateAdfPlugin = require('ng-annotate-adf-plugin');
var pkg = require('./package.json');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var annotateOptions = {
    plugin: [
        annotateAdfPlugin
    ]
};

var templateOptions = {
    root: '',
    module: 'opengate-angular-js',
    transformUrl: function(url) {
        return url.replace(/^\//, '')
    }
};

/** lint **/

gulp.task('csslint', function() {
    return gulp.src('src/**/*.css')
        .pipe($.csslint())
        .pipe($.csslint.reporter());
});

gulp.task('jslint', function() {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(jsReporter));
});

gulp.task('lint', gulp.series('csslint', 'jslint'));

/** serve **/

gulp.task('templates', function() {
    return gulp.src('src/**/*.html')
        .pipe($.angularTemplatecache('templates.tpl.js', templateOptions))
        .pipe(gulp.dest('.tmp/dist'));
});

gulp.task('sample', gulp.series('templates', function() {
    var files = gulp.src(['src/**/*.js', 'src/**/*.css', 'src/*.less', '.tmp/dist/*.js'])
        .pipe($.if('*.js', $.angularFilesort()));

    return gulp.src('sample/index.html')
        .pipe(wiredep({
            directory: './components/',
            bowerJson: require('./bower.json'),
            devDependencies: true,
            dependencies: true
        }))
        .pipe($.inject(files))
        .pipe(gulp.dest('.tmp/dist'))
        .pipe(connect.reload());
}));

gulp.task('watch', function() {
    return gulp.watch(['src/**'], gulp.series('sample'));
});

gulp.task('serve', gulp.parallel('watch', 'sample', function(done) {
    return connect.server({
            root: ['.tmp/dist', '.'],
            livereload: true,
            port: 9002
        },
        function() { this.server.on('close', done) });
}));

gulp.task('test', function() {
    return gulp
        .src('test/opengate-angular-js.test.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec',
            phantomjs: {
                useColors: true
            }
        }))
        .on('error', function(err) {
            console.error(err);
        });
});

/** build **/
gulp.task('imgs', function() {
    return copyImgs();
});

gulp.task('css', function() {
    return compileCSS();
});

gulp.task('js', function() {
    return compileJS();
});

// dependencies 
var ver = require('gulp-ver'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    argv = require('yargs').argv,
    ext_replace = require('gulp-ext-replace'),
    tag_version = require('gulp-tag-version');

function compileJS() {
    return gulp.src(['src/**/*.js', 'src/**/*.html'])
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe($.if('*.html', $.angularTemplatecache(pkg.name + '.tpl.js', templateOptions)))
        .pipe($.angularFilesort())
        .pipe($.if('*.js', $.replace(/'use strict';/g, '')))
        .pipe($.concat(pkg.name + '.js'))
        .pipe(ver())
        .pipe($.headerfooter('(function(window, undefined) {\'use strict\';\n', '})(window);'))
        .pipe($.ngAnnotate(annotateOptions))
        .pipe(gulp.dest('dist'))
        .pipe(ext_replace('.min.js', '.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));
}

function compileCSS() {
    return gulp.src(['src/**/*.css', 'src/*.less'])
        .pipe($.if('*.less', $.less()))
        .pipe($.concat(pkg.name + '.css'))
        .pipe(ver())
        .pipe(gulp.dest('dist'))
        .pipe(ext_replace('.min.css', '.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest('dist'));
}

function copyImgs() {
    return gulp.src(['src/**/images/**/*.*'])
        .pipe(gulp.dest('dist/images'));
}

/** clean **/

gulp.task('clean', function(cb) {
    del(['dist', '.tmp'], cb);
});

gulp.task('default', gulp.series('imgs', 'css', 'js'));




/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

//STEP 1 
gulp.task('create:release:branch', function(cb) {
    git.checkout(temporalBranchRelease(), {
        args: '-b'
    }, function(err) {
        cb(err);
    });
});

// STEP 2

gulp.task('increase:version', function() {
    console.log(versionType());
    return increase(versionType());
});

gulp.task('build:all', gulp.series('clean', 'create:release:branch', 'increase:version', 'imgs', 'js', 'css'));


// STEP 2

// STEP 3 
gulp.task('commit:increase:version', function() {
    return gulp.src(['dist', './bower.json', './package.json'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()));
});
// STEP 3 

// STEP 4
gulp.task('checkout:master:increase', function(cb) {
    git.checkout(masterBranch(), function(err) {
        cb(err);
    });
});
gulp.task('merge:master:increase', function(cb) {
    git.merge(temporalBranchRelease(), function(err) {
        cb(err);
    });
});

gulp.task('commit:master:increase:version', function() {
    return gulp.src(['.'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()));
});

gulp.task('prepare_tag:increase', function() {
    return gulp.src(['./package.json'])
        .pipe(tag_version());
});

gulp.task('prepare:master:increase', gulp.series('build:all', 'commit:increase:version', 'checkout:master:increase', 'merge:master:increase', 'commit:master:increase:version', 'prepare_tag:increase'));

gulp.task('checkout:develop', function(cb) {
    git.checkout(developBranch(), function(err) {
        if (!err) {
            git.merge(masterBranch(), function(err) {
                cb(err);
            });
        } else {
            cb(err);

        }
    });
});

gulp.task('prepare:develop:increase', gulp.series('prepare:master:increase', 'checkout:develop'));
// STEP 4

gulp.task('push:increase', gulp.series('prepare:develop:increase', function(cb) {
    git.push('origin', [masterBranch(), developBranch()], {
        args: " --follow-tags"
    }, function(err) {
        if (!err) {
            git.branch(temporalBranchRelease(), {
                args: "-D"
            }, function(err) {
                cb(err);
            });
        } else {
            cb(err);
        }
    });
}));


function increase(importance) {
    // get all the files to bump version in 
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files 
        .pipe(bump({
            type: importance
        }))
        // save it back to filesystem 
        .pipe(gulp.dest('./'));
}

function temporalBranchRelease() {
    return (argv['temporal-branch'] === undefined) ? 'release_branch' : argv['temporal-branch'];
}

function masterBranch() {
    return (argv['master-branch'] === undefined) ? 'master' : argv['master-branch'];
}

function developBranch() {
    return (argv['develop-branch'] === undefined) ? 'develop' : argv['develop-branch'];
}

function versionType() {
    if (isPatch()) return "patch";
    if (isMajor()) return "major";
    if (isMinor()) return "minor";
    throw new Error('Version increase type unknown. Only valid [minor,major,patch].');
}

function versionNumber() {
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return json.version;
}

function isMinor() {
    return (argv.minor === undefined) ? false : true;
}

function isMajor() {
    return (argv.major === undefined) ? false : true;
}

function isPatch() {
    return (argv.patch === undefined) ? false : true;
}