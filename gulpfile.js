var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    tag = require('gulp-tag-version');

['patch', 'minor', 'major'].forEach(type =>{
    gulp.task(type, function(){
        gulp.src('./package.json')
            .pipe(bump({type: type}))
            .pipe(gulp.dest('./'))
            .pipe(git.commit('Release'))
            .pipe(tag());
    });
});
