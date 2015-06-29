var Masonry = require('masonry-layout');
var imagesLoaded = require('imagesloaded');

jQuery(document).ready(function ($) {
	var container = document.querySelector('#main');

	var imgLoad = imagesLoaded(container);

	var msnry = new Masonry(container, {
		itemSelector: '.tree-image',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});

	imgLoad.on('progress', msnry.layout.bind(msnry));
});
