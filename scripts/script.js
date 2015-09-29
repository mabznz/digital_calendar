/*
 * Copyright (c) New Zealand Racing Board 2015. All rights reserved.
 *
 * $URL: http://dev.ho.tab.co.nz/svn/internet-svn/digital_calendar/scripts/script.js $
 * $LastChangedRevision: 177 $
 * $LastChangedBy: mabbettb $
 * $LastChangedDate: 2015-09-23 09:41:36 +1200 (Wed, 23 Sep 2015) $
 *
 * Author: Byron Mabbett
 *
 * Description: Custom javascript for Calendar page
 */

$(document).ready(function() {
   
   // declare properties of the different calendars in a hash  
   var calendars = {
         nz_all : {
            googleCalendarId: 'usk9cptnnehg7b55lbf3ssplpnden9sq@import.calendar.google.com',
            className: 'all',
            color: '#0baa47',
            textColor: 'black',
            subscribeText: 'Subscribe All NZ',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_full_calendar.ics',
            iconUnselected: 'icon sprt_ico-sport-shearing-b',
            iconSelected: 'icon sprt_ico-sport-shearing-a'
         },
         nz_greyhound : {
            googleCalendarId: 'humaisju2feldkadb3e5b2vmguqp42pc@import.calendar.google.com',
            className: 'greyhound',
            color: '#00aaa0',
            textColor: 'black',
            subscribeText: 'Subscribe NZ Greyhound',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Greyhounds_Racing.ics',
            iconUnselected: 'icon sprt_ico-sport-greyhound-b',
            iconSelected: 'icon sprt_ico-sport-greyhound-a'
         },
         nz_thoroughbred : {
            googleCalendarId: 'v8u0dsct3dke1uq7mpv372hg2111n4ct@import.calendar.google.com',
            className: 'thoroughbred',
            color: '#4495d1',
            textColor: 'black',
            subscribeText: 'Subscribe NZ Thoroughbred',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Thoroughbred_Racing.ics',
            iconUnselected: 'icon sprt_ico-sport-gallops-b',
            iconSelected: 'icon sprt_ico-sport-gallops-a'
         },
         nz_harness : {
            googleCalendarId: '0sbabnm0m1kkia4t5hrassuj3nkr6tje@import.calendar.google.com',
            className: 'harness',
            color: '#dad9d7',
            textColor: 'black',
            subscribeText: 'Subscribe NZ Harness',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Harness_Racing.ics',
            iconUnselected: 'icon sprt_ico-sport-harness-b',
            iconSelected: 'icon sprt_ico-sport-harness-a'
         },
         int_all : {
            googleCalendarId: 'pl6m8itje5dbg8ahv57hib3q4nks6ef7@import.calendar.google.com',
            className: 'int',
            color: 'red',
            textColor: 'black',
            subscribeText: 'Subscribe All Harness',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/All_full_calendar.ics',
            iconUnselected: '',
            iconSelected: ''
         }
   };
   
   
   
   // Simple accordion with jquery ui for help section
   $(function() {
      var icons =
      {
            header: "info-accordian-icon",
            activeHeader: "info-accordian-icon"
      };
      $( "#accordion" ).accordion({
         collapsible: true,
         icons: icons,
         heightStyle: "content",
         active: false
      });  
   });
   
   /* call sly js library to include a slyder frame of icons to select calendar
    * http://darsa.in/sly/
    * http://opensource.org/licenses/MIT
    */
   var $frame = $('.frame');
   var $wrap  = $frame.parent();
   $frame.sly({
      horizontal: 1,   
      itemNav: 'forceCentered',
      smart: 1,
      activateOn: 'click',      
      scrollBy: 1,
      mouseDragging: 1,
      swingSpeed: 0.2,
      scrollBar: $('.scrollbar'),
      dragHandle: 1,
      speed: 600,
      startAt: 0,
      
      // Buttons
      forward: $wrap.find('.forward'),
      backward: $wrap.find('.backward'),
      //prev: $wrap.find('.prev'),
      //next: $wrap.find('.next')
   });
   
   
   /* call fullcalendar js library to display calendars
    * http://fullcalendar.io/
    * http://opensource.org/licenses/MIT
    */
   $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyAsk3WNuNzqvIN1Ut3V2CJgKm6rwHph02c',      
      header: {
         left: 'prev,next today',
         center:'title',
         right: 'month,basicWeek,basicDay'
      },
      eventClick: function(event) {
         if (event.url) {
             window.open(event.url);
             return false;
         }
     }
   });
   
   // Default to NZ all calendar
   switchCalendar('nz_all');
   
   // switch calendar function, receives the id of the image the user clicked. Should match key of the calendars object 
   function switchCalendar(calType) {
      console.log('Switching to Calendar:' + calType);
      //console.log($("#country-select").val());
      // Calls the correct calendar through fullcalendar's  addEventSource call and Google Calendar API
      // Calendars are 'hosted' via a google account
      $('#calendar').fullCalendar( 'addEventSource', calendars[calType]);
      
      // Removes calendars that do not need to be displayed
      for (var o in calendars) {
         if ( o != calType) {
            $('#calendar').fullCalendar( 'removeEventSource', calendars[o]);
         }
      }
      
      // Changes subscribe button to appropiate calendar
      $('.btn_subscribe').text(calendars[calType].subscribeText);
      $('.btn_subscribe').attr('href', calendars[calType].subscribeURL);
   }
   
   // Calendar Code selection events
   for (var o in calendars) {
      //get country
      
      
      $("#calendar-selection #" + o).on("click", function() {
            //alert($("#country-select").val() + "_" + $(this).attr('id'));
            $(this).addClass( "selected" );
            // remove selected from other items
            for (var o in calendars) {
               alert($(this).attr('id'));
               if ( o != $(this).attr('id')) {
                  $("#calendar-selection #" + o).removeClass( "selected" );
               }
            }
            switchCalendar($(this).attr('id'));
      });
   }
   
   // Calendar Country selection events
   /*for (var o in calendars) {
      $("#country-selection #" + o).change(function() {
         switchCalendar($(this).val() + "_" + $("#country-select").val());
      });
   }*/
   
   for (var o in calendars) {
      $("#calendar-selection #" + o).hover( function() {
         $( this ).removeClass(calendars[$(this).attr('id')].iconUnselected);
         $( this ).addClass(calendars[$(this).attr('id')].iconSelected);
         
      }, function() {
         $( this ).removeClass(calendars[$(this).attr('id')].iconSelected);
         $( this ).addClass(calendars[$(this).attr('id')].iconUnselected);
      });
   }
});