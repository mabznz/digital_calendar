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
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_full_calendar.ics'
         },
         nz_greyhound : {
            googleCalendarId: 'humaisju2feldkadb3e5b2vmguqp42pc@import.calendar.google.com',
            className: 'greyhound',
            color: '#00aaa0',
            textColor: 'black',
            subscribeText: 'Subscribe NZ Greyhound',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Greyhounds_Racing.ics'
         },
         nz_thoroughbred : {
            googleCalendarId: 'v8u0dsct3dke1uq7mpv372hg2111n4ct@import.calendar.google.com',
            className: 'thoroughbred',
            color: '#4495d1',
            textColor: 'black',
            subscribeText: 'Subscribe Thoroughbred',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Thoroughbred_Racing.ics'
         },
         nz_harness : {
            googleCalendarId: '0sbabnm0m1kkia4t5hrassuj3nkr6tje@import.calendar.google.com',
            className: 'harness',
            color: '#dad9d7',
            textColor: 'black',
            subscribeText: 'Subscribe Harness',
            subscribeURL: 'webcal://static.tab.co.nz/content/calendar/NZ_Harness_Racing.ics'
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
      $('.subscribe_button').text(calendars[calType].subscribeText);
      $('.subscribe_button').attr('href', calendars[calType].subscribeURL);
   }
   
   // Calendar selection events
   for (var o in calendars) {
      $(".frame #" + o).unbind("click").click(function() {
         if ($(this).parent().siblings(".slidee li").hasClass('active')) {
            switchCalendar($(this).attr('id'));
         }
      });
   } 
});