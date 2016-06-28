/**
 * Created by atrey on 16.01.2016.
 */

(function($){
    $(function() {
      if (navigator.appVersion.indexOf("Mac")!=-1) {
        $("body").addClass('mac');
      }

        $("#totop").hide();
        $('head').append('<style type="text/css" id="datepickerstyle"></style>');
        $('.datepicker').datepicker({
            beforeShow: function(){

                $("#datepickerstyle").html('.ui-datepicker {width:'+($(this).outerWidth()*2+2)+'px}');
                //console.log($(this).outerWidth()*2+'px');
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