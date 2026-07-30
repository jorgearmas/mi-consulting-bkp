/* ==========================================================================
   MI Consulting — shared shell behaviour for the interior pages.
   Mirrors the equivalent blocks in index.html's inline <script>.
   ========================================================================== */
(function(){
  'use strict';

  /* ---------- mobile nav ---------- */
  var burger=document.getElementById('burger');
  var navlinks=document.getElementById('navlinks');
  if(burger&&navlinks){
    burger.addEventListener('click',function(){
      burger.classList.toggle('x');
      navlinks.classList.toggle('open');
    });
    navlinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        burger.classList.remove('x');
        navlinks.classList.remove('open');
      });
    });
  }

  /* ---------- nav dropdowns — hover handles desktop (CSS); click handles touch and keyboard ---------- */
  function closeDrop(drop){
    drop.classList.remove('open');
    drop.querySelector('.nav-drop-toggle').setAttribute('aria-expanded','false');
  }
  document.querySelectorAll('.nav-drop').forEach(function(drop){
    var toggle=drop.querySelector('.nav-drop-toggle');
    toggle.addEventListener('click',function(e){
      e.stopPropagation();
      toggle.setAttribute('aria-expanded',drop.classList.toggle('open'));
    });
    drop.querySelectorAll('.nav-drop-menu a').forEach(function(a){
      a.addEventListener('click',function(){closeDrop(drop);});
    });
  });
  document.addEventListener('click',function(e){
    document.querySelectorAll('.nav-drop.open').forEach(function(drop){
      if(!drop.contains(e.target))closeDrop(drop);
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape')document.querySelectorAll('.nav-drop.open').forEach(closeDrop);
  });

  /* ---------- Calendly — popup on desktop, new tab on mobile; href stays as a graceful fallback ---------- */
  var CALENDLY_URL='https://calendly.com/consultwithmi/discovery-call-mi-consulting-group?hide_gdpr_banner=1';
  function isMobile(){return window.matchMedia('(max-width:768px)').matches;}
  document.querySelectorAll('.js-calendly').forEach(function(el){
    el.addEventListener('click',function(e){
      if(isMobile()){
        el.target='_blank';
        el.rel='noopener';
        return;
      }
      if(window.Calendly&&typeof window.Calendly.initPopupWidget==='function'){
        e.preventDefault();
        window.Calendly.initPopupWidget({url:CALENDLY_URL});
      }
    });
  });
  new MutationObserver(function(){
    document.body.classList.toggle('calendly-open',!!document.querySelector('.calendly-overlay'));
  }).observe(document.body,{childList:true});

  /* ---------- scroll reveal, with a failsafe so nothing stays hidden ---------- */
  var reveals=document.querySelectorAll('.reveal');
  function showAll(){reveals.forEach(function(el){el.classList.add('in');});}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
    reveals.forEach(function(el){io.observe(el);});
    setTimeout(showAll,2500);
  }else{
    showAll();
  }
})();
