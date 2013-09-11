require.config({
	
	paths: {
		'backbone': 'lib/backbone-1.0.0',
		'bootstrap-select':'lib/bootstrap-select',
		'bootstrap-switch':'lib/bootstrap-switch',
		'facebook': '//connect.facebook.net/en_US/all',
		'filepicker':'lib/filepicker',
		'flatui':'lib/application',
		'flatui-checkbox':'lib/flatui-checkbox',
		'flatui-radio':'lib/flatui-radio',
		'fullCalendar':'lib/fullcalendar.min',
		'hoverIntent':'lib/hoverIntent',
		'jquery': 'lib/jquery-1.8.3.min',
		'jquery.bootstrap':'lib/bootstrap.min',
		'jquery-ui':'lib/jquery-ui-1.10.3.custom.min',
		'isotope':'lib/jquery.isotope',
		'perfectMasonry':'lib/jquery.isotope.perfectmasonry',
		'placeholder':'lib/jquery.placeholder',
		'stackable':'lib/jquery.stackable',
		'tagsInput':'lib/jquery.tagsinput',
		'touch-punch':'lib/jquery.ui.touch-punch.min',
		'leaflet':'lib/leaflet',
		'marionette':'lib/marionette',
		'social':'lib/social',
		'stripe':'lib/stripe',
		'tpl':'lib/tpl',
		'wreqr':'lib/backbone.wreqr'
	},
	
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'backbone'
		},
		'jquery.bootstrap': {
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
		'social':{
			deps:['jquery']
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

require(['jquery','lib/underscore', 'leaflet', 'jquery.bootstrap', 'bootstrap-switch', 'bootstrap-select', 'flatui', 'flatui-radio', 'flatui-checkbox', 'tagsInput' ,'placeholder', 'stackable', 'touch-punch','social'], function(jquery, L) {

	var datepickerSelector = '#datepicker-01';


	$(datepickerSelector).datepicker({
	  showOtherMonths: true,
	  selectOtherMonths: true,
	  dateFormat: "d MM, yy",
	  yearRange: '-1:+1'
	}).prev('.btn').on('click', function (e) {
	  	var boxTop = $($(datepickerSelector)[0].offsetParent)[0].offsetTop;
	  	var calenTop = $('.ui-datepicker')[0].offsetTop;
	  		if (boxTop < calenTop) {
				$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth() - 2, 'margin-top':'-10px'});
			}
			else {
				$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth() - 2, 'margin-top':'10px'});	
			}
	  e && e.preventDefault();
	  $(datepickerSelector).focus();
	});

	$(datepickerSelector).click(function() {
		boxTop = $($(datepickerSelector)[0].offsetParent)[0].offsetTop;
		calenTop = $('.ui-datepicker')[0].offsetTop;
	  		if (boxTop > calenTop) {
				$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth() - 2, 'margin-top':'-10px'});
			}
			else {
				$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth() - 2, 'margin-top':'10px'});	
			}
	})

	$(".select").selectpicker({style: 'btn btn-primary', menuStyle: 'dropdown-inverse'});

	$(".select-large").selectpicker({style: 'btn btn-large btn-primary', menuStyle: 'dropdown-inverse'});

$('#social').socialShare({
    social: 'facebook,twitter,google,linkedin,pinterest,stumbleupon',
    blur: true
});

$('.agg-switch').bootstrapSwitch();

$('.funk ul li[rel="1"]').click(function() {alert("YEAH!")});

$.ajax({
          url: "http://ws.geonames.org/searchJSON?&country=US",
          dataType: "jsonp",
          data: {
            featureClass: "P",
            style: "full",
            maxRows: 12,
            name_startsWith: 'Bel'
          },
          success: function( data ) {
          	results = [];
          	_.each(data.geonames, function(item) {
          		results.push(item.name + (item.adminName1 ? ", " + item.adminName1 : ""))
          	})
          	console.log(results)
          }
        });

$('.typeahead').typeahead({
	 minlength: 1,
	 items: 5,
     source: function( query, process ) {
	$.ajax({
          url: "http://ws.geonames.org/searchJSON",
          dataType: "jsonp",
          data: {
            featureClass: "P",
            country: 'US',
            style: "full",
            maxRows: 12,
            name_startsWith: query
          },
          success: function( data ) {
          	results = [];
          	_.each(data.geonames, function(item) {
          		results.push(item.name + (item.adminName1 ? ", " + item.adminName1 : ""))
          	})
          	console.log(results)
            return process(results)
          }
        });
      },
});

})