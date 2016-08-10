/**
 * Created by atrey on 16.01.2016.
 */

(function() {
  var app = angular.module('tourApp', []);

  app.run(function($rootScope, $timeout) {
    var cancel;
    $rootScope.$on('$includeContentLoaded', function() {
      if(cancel) {
        $timeout.cancel(cancel);
      }
      cancel = $timeout(function() {
        (function($){
          $.widget( "custom.catcomplete", $.ui.autocomplete, {
            _create: function() {
              this._super();
              this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
            },
            _renderMenu: function( ul, items ) {
              var that = this,
                currentCategory = "";
              $.each( items, function( index, item ) {
                var li;
                if ( item.category != currentCategory ) {
                  ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                  currentCategory = item.category;
                }
                li = that._renderItemData( ul, item );
                if ( item.category ) {
                  li.attr( "aria-label", item.category + " : " + item.label );
                }
              });
            }
          });

          $(function() {

            var n = {
              zoom: 17,
              disableDefaultUI: !1,
              scrollwheel: !1,
              center: new google.maps.LatLng(55.7597846,37.6328621),
              styles: [
                {
                  "featureType": "administrative",
                  "elementType": "labels.text",
                  "stylers": [
                    { "visibility": "off" }
                  ]
                },
                {
                  "featureType": "poi",
                  "stylers": [
                    { "visibility": "off" }
                  ]
                }
              ]/*,
              styles: [
                {
                  "featureType": "landscape.man_made",
                  "elementType": "geometry.fill",
                  "stylers": [
                    { "color": "#ffffff" }
                  ]
                },{
                  "featureType": "water",
                  "stylers": [
                    { "visibility": "on" }
                  ]
                },{
                  "featureType": "administrative",
                  "elementType": "labels.text",
                  "stylers": [
                    { "visibility": "off" }
                  ]
                },{
                  "featureType": "poi",
                  "stylers": [
                    { "visibility": "off" }
                  ]
                },{
                  "featureType": "transit",
                  "stylers": [
                    { "visibility": "off" }
                  ]
                },{
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    { "color": "#24c2e6" },
                    { "weight": 0.7 }
                  ]
                },{
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                    { "color": "#9cd71d" },
                    { "weight": 1.5 }
                  ]
                },{
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                    { "color": "#24c2e6" },
                    { "lightness": 78 },
                    { "weight": 1.1 }
                  ]
                },{
                  "featureType": "landscape.man_made",
                  "elementType": "geometry.stroke",
                  "stylers": [
                    { "color": "#ff6700" }
                  ]
                },{
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                    { "color": "#24c2e6" },
                    { "weight": 0.7 }
                  ]
                },{
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    { "weight": 0.1 },
                    { "color": "#ff6700" }
                  ]
                },{
                  "featureType": "road.local",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    { "color": "#ffffff" },
                    { "weight": 4.2 }
                  ]
                },{
                  "featureType": "road.arterial",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    { "color": "#ff6700" }
                  ]
                },{
                  "featureType": "road.arterial",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    { "color": "#ffffff" },
                    { "weight": 3.8 }
                  ]
                },{
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    { "color": "#24c2e6" },
                    { "lightness": 94 }
                  ]
                },{
                  "featureType": "landscape.natural",
                  "elementType": "geometry.fill",
                  "stylers": [
                    { "color": "#ffffff" }
                  ]
                }
              ]*/
            }, s = new google.maps.Map(document.getElementById("map"), n);

            var pos = new google.maps.LatLng(55.7594416,37.6371829);
            var marker = new google.maps.Marker({
              position: pos,
              map: s,
              icon: new google.maps.MarkerImage('i/marker.png', null, null, null, new google.maps.Size(19, 28)),
              title: 'lol',
              zIndex: 1
            });

            var infowindow = new google.maps.InfoWindow({
              content: 'ТЦ ДАНИЭЛЬ<br>' +
              'г. Москва, ул. Соколово-Мещерская,<br>' +
              'д. 25, торговый центр Даниэль'
            });

            /*infowindow.open(s, marker);

            marker.addListener('click', function() {
              infowindow.open(s, marker);
            });*/

            $("#contact-tabs").tabs();

            $("input[type=radio]").after('<div class="pseudo-radio"></div>');
            $("input[type=checkbox]").after('<div class="pseudo-checkbox"></div>');

            var data = [
              { label: "Греция", category: "" },
              { label: "Греция", category: "Популярные направления" },
              { label: "Турция", category: "Популярные направления" },
              { label: "Израиль", category: "Популярные направления" },
              { label: "Ангола", category: "Остальные направления" },
              { label: "Сомали", category: "Остальные направления" },
              { label: "США", category: "Остальные направления" }
            ];

            $( ".catcomplete" ).catcomplete({
              delay: 0,
              source: data,
              minLength: 0
            }).on('focus', function() {
              $(this).keydown();
            });

            if (navigator.appVersion.indexOf("Mac")!=-1) {
              $("body").addClass('mac');
            }

            $("#totop").hide();
            $('head').append('<style type="text/css" id="datepickerstyle"></style>');
            $('.datepicker').datepicker({
              beforeShow: function(){
                var margin = '';
                if($(this).attr('id') == 'datepicker-back') {
                  margin = 'margin-left:-'+($(this).outerWidth()*1+4)+'px;';
                }

                if($(this).hasClass('dpw')) {
                  $("#datepickerstyle").html('.ui-datepicker {width:'+($(this).parents('.datepicker-width:first').outerWidth())+'px;}');
                } else
                  $("#datepickerstyle").html('.ui-datepicker {width:'+($(this).outerWidth()*2+4)+'px; '+margin+'}');
              }
            });

            $(window).scroll(function () {
              if ($(this).scrollTop() > 100) {
                $('#totop').fadeIn();
              } else {
                $('#totop').fadeOut();
              }
            });

            // scroll body to 0px on click
            $('#totop a').click(function () {
              $('body,html').animate({
                scrollTop: 0
              }, 800);
              return false;
            });

            $(".slider").flexslider({
              animation: "slide"
            });

            $("#responses").flexslider({
              animation: "slide"
            });

            var slidesUL = $(".exslider .slides");
            var slides = $(">li", slidesUL);
            slides.data('total', slides.length);
            $(window).resize(function() {
              var w = slides.outerWidth();
              slides.filter(":first").css({marginLeft:0}).data('pos', 0);
              $(".exslider").trigger('nextprev');
              var containerWidth = slidesUL.width();

              for(var i=0; i<slides.length; i++) {
                if(Math.abs(containerWidth - w*i) <= 4) {
                  break;
                }
              }
              slides.data('w', w);
              slides.data('visible', i);
            });

            $(".exslider .flex-next").click(function() {
              if(slides.data('pos') + slides.data('visible') < slides.data('total')) {
                slides.data('pos', slides.data('pos') + 1);
                slides.filter(":first").css({marginLeft: -slides.data('pos')*slides.data('w')});
              }
              $(".exslider").trigger('nextprev');
            });

            $(".exslider .flex-prev").click(function() {
              if(slides.data('pos') > 0) {
                slides.data('pos', slides.data('pos') - 1);
                slides.filter(":first").css({marginLeft: -slides.data('pos')*slides.data('w')});
              }
              $(".exslider").trigger('nextprev');
            });

            $(".exslider").bind('nextprev', function() {
              if(slides.data('pos') + slides.data('visible') == slides.data('total')) {
                $(".exslider .flex-next").hide();
              } else {
                $(".exslider .flex-next").show();
              }
              if(slides.data('pos') == 0) {
                $(".exslider .flex-prev").hide();
              } else {
                $(".exslider .flex-prev").show();
              }
            });

            $(window).resize().scroll();

            /*$(window).resize(function() {
              if($(window).width() <= 768) {
                $(".exslider").flexslider({
                  animation: "slide",
                  animationLoop: false,

                  move: 1
                });
              } else {

                var slides = $(".exslider .flex-viewport");
                var w = slides.width();
                var fw = 120;

                for(var i=5; i>=1; i--) {
                  if(w / i >= 120) {
                    fw = Math.floor(w/i);
                    break;
                  }
                }

                console.log(fw);

                $(".exslider").detach().removeData("flexslider").flexslider({
                  animation: "slide",
                  animationLoop: false,
                  itemWidth: fw,
                  //itemMargin: 15,
                  move: 1
                });
              }
            });

            $(window).resize();*/

            $(".selectric").selectric();

            $('.selectric.citizenship').selectric({
              optionsItemBuilder: function(currItem) {
                return '<span class="flag"><img src="'+currItem.element.attr('data-flag')+'"></span><span class="">'+currItem.text+'</span>';
              },
              labelBuilder: function(currItem) {
                return '<span class="flag"><img src="'+currItem.element.attr('data-flag')+'"></span><span class="">'+currItem.text+'</span>';
              }
            });

            $('.selectric.html').selectric({
              optionsItemBuilder: function(currItem) {
                return currItem.element.attr('data-html');
              }
            });

            $('.selectric.hasprice').selectric({
              optionsItemBuilder: function(currItem) {
                return '<span class="f d vtop space10"><span class="flex1">'+currItem.text+'</span><span class="orange">'+currItem.element.attr('data-price')+' <span class="rub">Р</span></span></span>';
              }
            });

            $('.selectric.countrycode').selectric({
              optionsItemBuilder: function(currItem) {
                return '<span class="flag country-code-flag"><img src="'+currItem.element.attr('data-flag')+'"></span><span class="">'+currItem.text+'</span><span class="country-code-option">'+currItem.element.attr('value')+'</span>';
              },
              labelBuilder: function(currItem) {
                return '<span class="flag"><img src="'+currItem.element.attr('data-flag')+'"></span>';
              },
              expandToItemText: true
            });

            $(".selectday").datepicker({
              numberOfMonths: $(window).width() >= 800 ? 3 : 1
            });

            $( "#slider-range" ).slider({
              range: true,
              min: 1,
              max: 60,
              values: [ 7, 14 ],
              slide: function( event, ui ) {
                $( "#amount" ).val( "" + ui.values[ 0 ] + " — " + ui.values[ 1 ] + ' дней');
              }
            });
            $( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
            " — " + $( "#slider-range" ).slider( "values", 1 )  + ' дней');


            $("#bn-l").sticky({topSpacing:-65}).css({height: $("#uniqueoffers").outerHeight()});

            $("#about-tabs").sticky({topSpacing:15});

            var lastId,
              topMenu = $("#about-tabs"),
              topMenuHeight = 1;//topMenu.outerHeight()+15,

            menuItems = topMenu.find("a"),

              scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
              });

            menuItems.click(function(e){
              var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
              $('html, body').stop().animate({
                scrollTop: offsetTop
              }, 300);
              e.preventDefault();
            });


            $(window).scroll(function(){
              var fromTop = $(this).scrollTop()+topMenuHeight;


              var cur = scrollItems.map(function(){
                if ($(this).offset().top <= fromTop)
                  return this;
              });

              cur = cur[cur.length-1];
              var id = cur && cur.length ? cur[0].id : "";

              if (lastId !== id) {
                lastId = id;

                menuItems
                  .parent().removeClass("active")
                  .end().filter("[href='#"+id+"']").parent().addClass("active");
              }
            });

            var availableTags = [
              {label: "Москва, Россия", code: 'MOW'},
              {label: "Мостар, Босния и Герцеговина", code: 'OMO'},
              {label: "Мосул, Ирак", code: 'OSM'},
              {label: "Санкт-Петербург, Россия", code: 'SVO'},
              {label: "Минск, Белоруссия", code: 'SVO'},
              {label: "Киев, Украина", code: 'SVO'}
            ];
            $( ".autocomplete" ).autocomplete({
              source: availableTags
            }).autocomplete( "instance" )._renderItem = function( ul, item ) {
              return $( "<li><span class='f d vtop space10'><div>" + item.label + "</div><div>" + item.code + "</div></span></li>" )
                .appendTo( ul );
            };;

            var is_mobile = false;

            if( $('.desktop').css('display')=='none') {
              is_mobile = true;
            }

            if(is_mobile) {
              $('.datepicker').attr('readonly', true);
            }

            var d = $('#alternate-popup').hide();
            $('body').append(d);

            $(".month-day").click(function() {
              var width = $(this).outerWidth();
              var offset = $(this).offset();
              var containerWidth = $("#alternate-results").outerWidth();
              var containerOffset = $("#alternate-results").offset();
              var match = offset.left + width*7 - 2 <= containerOffset.left + containerWidth;
              d.show().css({
                top: offset.top,
                left: match ? offset.left : 'auto',
                right: match ? 'auto' : containerOffset.left,
                width: width*7 - 2
              });


            });

          });

        })(jQuery);
      }, 100);
    });
  });
})();

