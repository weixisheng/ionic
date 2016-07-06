var gulp = require("gulp"),
	imagemin = require("gulp-imagemin");

gulp.task("testImagemin", function() {
	gulp.src("wechat/img/*.{gif,png}")
		.pipe(imagemin())
		.pipe(gulp.dest("wechat/img2"));
});