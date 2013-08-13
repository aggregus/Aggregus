require.config({
	
	paths: {
		'backbone': 'lib/backbone-1.0.0',
		'bootstrap-select':'lib/bootstrap-select',
		'bootstrap-switch':'lib/bootstrap-switch',
		'bootstrap':'lib/bootstrap.min',
		'facebook': '//connect.facebook.net/en_US/all',
		'filepicker':'lib/filepicker',
		'flatui':'lib/application',
		'flatui-checkbox':'lib/flatui-checkbox',
		'flatui-radio':'lib/flatui-radio',
		'fullCalendar':'lib/fullcalendar.min',
		'hoverIntent':'lib/hoverIntent',
		'jquery': 'lib/jquery-1.8.3.min',
		'jquery-ui':'lib/jquery-ui-1.10.3.custom.min',
		'isotope':'lib/jquery.isotope',
		'perfectMasonry':'lib/jquery.isotope.perfectmasonry',
		'placeholder':'lib/jquery.placeholder',
		'stackable':'lib/jquery.stackable',
		'tagsInput':'lib/jquery.tagsinput',
		'touch-punch':'lib/jquery.ui.touch-punch.min',
		'leaflet':'lib/leaflet',
		'marionette':'lib/marionette',
		'stripe':'lib/stripe',
		'tpl':'lib/tpl',
		'wreqr':'lib/backbone.wreqr'
	},
	
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'backbone'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-select': {
			deps: ['jquery']
		},
		'bootstrap-switch': {
			deps: ['jquery']
		},
		'flatui': {
			deps: ['jquery', 'tagsInput', 'placeholder', 'stackable']
		},
		'flatui-checkbox': {
			deps: ['jquery']
		},
		'flatui-radio': {
			deps: ['jquery']
		},
		'jquery': {
			exports: '$'
		},
		'jquery-ui': {
			deps: ['jquery']
		},
		'leaflet': {
			exports: 'L'
		},
		'marionette': {
			deps: ['backbone','underscore','jquery'],
			exports: 'Marionette'
		},
		'perfectMasonry': {
			deps: ['isotope']
		},
		'placeholder': {
			deps:['jquery-ui']
		},
		'stackable': {
			deps:['jquery-ui']
		},
		'tagsInput': {
			deps:['jquery-ui']
		},
		'touch-punch': {
			deps:['jquery-ui']
		},
		'underscore': {
			exports: '_'
		},
		wreqr: {
			deps: ['backbone']
		}
	},
	
	waitseconds: 20
})