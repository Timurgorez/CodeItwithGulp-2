//Присваиваем модулям переменные, и как бы подключаем их к нашему проэкту.
var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	cssnano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	bourbon     = require('node-bourbon');

//Таск который компелирует с SASS в CSS.
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass') //Указываем весь путь и сам файл или все файлы (*) с таким разширением.
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css')) //Указываем какталог в котором будет находится файл.
	.pipe(browserSync.reload({stream: true})) //pipe который обновляет наш sass файл.
});

// Таск-"scripts" с помощью модулей "concat" и "uglifyjs" конкатенирует и сжимает библиотеки, а также делает один файл "libs.js".
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery.js',
		'app/libs/bootstrap/js/bootstrap.js' //файлы которые нужно сжать.
		])
	.pipe(concat('libs.js')) //Название файла в который попадут все библиотеки которые указаны выше.
	.pipe(uglify())          // свойство которое сжимает библиотеки.
	.pipe(gulp.dest('app/js')); // И в какой папке будет находится новый файл "libs.js".
});

// Таск-"css-libs" с помощью модулей "cssnano" и "rename" конкатенирует и сжимает библиотеки, а также делает один файл "libs.css".
gulp.task('css-libs', function () {
	return gulp.src(
		'app/libs/bootstrap/css/bootstrap.css'
		)
	.pipe(cssnano())                // свойство которое сжимает библиотеки.
	.pipe(rename('libscss.css')) //Переименовует файл.
	.pipe(gulp.dest('app/css'));
});

//Подключение модуля BrowserSync для автоматического обновления веб-страниц.
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir:'app'
		},
		notify: false  //Отключает уведомления в браузере.
	});
});

// Перед созданием проэкта удаляет все из папки dist.
gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('clear', function () {
	return cache.clearAll();
});

//Таск который оптимизирует и сжимает картинки.
gulp.task('img', function () {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

//Подключение модуля Watch который отслеживает изминение в файлах.(Sass,html,js).
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts',], function () { //в квадратных скобках указываем модули которые должны запускатся перед модулем Watch.
	gulp.watch('app/sass/**/*.sass', ['sass']); // Перечисляем файлы которые отслеживаем.
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Таск который создает готовый проэкт без лишних файлов и т.п.
gulp.task('build', ['clean', 'img', 'sass','css-libs', 'scripts'], function () {
	var buildCss = gulp.src([
		'app/css/loader.css',
		'app/css/libscss.css',
		'app/css/style.css',
		'app/css/stylecompany.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildphp = gulp.src('app/*.php')
	.pipe(gulp.dest('dist'));
});

//вендерные префиксы