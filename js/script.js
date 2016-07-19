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



            $(window).resize(function() {
              if($(window).width() <= 768) {
                $(".exslider").flexslider({
                  animation: "slide",
                  animationLoop: false,

                  move: 1
                });
              } else {
                $(".exslider").flexslider({
                  animation: "slide",
                  animationLoop: false,
                  itemWidth: 120,
                  itemMargin: 15,
                  move: 1
                });
              }
            });

            $(window).resize();

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

            $("#nav-col").sticky({topSpacing:0});

            var lastId,
              topMenu = $("#nav-col"),
              topMenuHeight = 0;//topMenu.outerHeight()+15,

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
                if ($(this).offset().top < fromTop)
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

