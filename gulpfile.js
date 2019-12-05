const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const del = require('del');

const rootPath = process.cwd();
const srcPath = rootPath + '/src/assets/';
const outputPath = rootPath + '/build-remote-assets/';

gulp.task('clean-project-images', function(){
    return del([
        outputPath
    ]);
});

gulp.task('compress-project-images', gulp.series('clean-project-images', function(){

    return gulp.src(srcPath + 'project-images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle(),
            imageminJpegRecompress({
				progressive: true, /* Google recommends progressive format for images over 10k bytes. */
				strip: true, /* Strips metadata, such as EXIF data. */
				max: 95 /* Google recommends max quality of 85. */
			}),
            imagemin.optipng()
            // omit imagemin svg processing, to prevent the plugin from hanging
            // imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(outputPath + 'project-images/'));
}));