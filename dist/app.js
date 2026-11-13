(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toast=document.querySelector('.toast');
  let toastTimer;
  const notify=message=>{if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200);};
  document.querySelectorAll('.theme-toggle').forEach(button=>{
    const updateLabel=()=>button.setAttribute('aria-label','Switch to '+(root.dataset.theme==='dark'?'light':'dark')+' theme');
    updateLabel();
    button.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('rafid-theme',root.dataset.theme);}catch{}updateLabel();document.querySelector('meta[name="theme-color"]')?.setAttribute('content',root.dataset.theme==='dark'?'#121511':'#f6f6ef');});
  });
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('site-nav');
  const closeMenu=()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open');};
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav?.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open);});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
  const reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduced){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07,rootMargin:'0px 0px -18px 0px'});
    root.classList.add('js');reveal.forEach((el,i)=>{el.style.transitionDelay=((i%3)*55)+'ms';observer.observe(el);});
  }else{reveal.forEach(el=>el.classList.add('visible'));}
  const filters=document.querySelectorAll('[data-filter]');
  const cards=document.querySelectorAll('.project-card');
  filters.forEach(button=>button.addEventListener('click',()=>{
    filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
    const value=button.dataset.filter;
    cards.forEach(card=>{card.hidden=value!=='all'&&card.dataset.category!==value;if(!card.hidden)card.classList.add('visible');});
    const count=[...cards].filter(card=>!card.hidden).length;
    const badge=document.querySelector('.work-count b');if(badge)badge.textContent=String(count).padStart(2,'0');
  }));
  const dialog=document.getElementById('resume-dialog');
  document.querySelectorAll('[data-resume]').forEach(button=>button.addEventListener('click',()=>{if(dialog?.showModal)dialog.showModal();else notify('Résumé is being prepared. Email me at rafidhasansydney@gmail.com.');}));
  dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);notify('Email address copied.');}catch{notify('Email: '+button.dataset.copy);}}));
  let scheduled=false;
  const progress=document.querySelector('.scroll-progress');
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const value=max>0?Math.min(window.scrollY/max,1):0;if(progress)progress.style.transform='scaleX('+value+')';scheduled=false;};
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});updateProgress();
  if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav?.querySelectorAll('a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-15% 0px -60% 0px',threshold:0});document.querySelectorAll('main>section[id]').forEach(section=>sectionObserver.observe(section));}
  if(!reduced&&window.matchMedia('(hover: hover) and (pointer: fine)').matches){document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const box=el.getBoundingClientRect();const x=(e.clientX-box.left-box.width/2)*.1;const y=(e.clientY-box.top-box.height/2)*.1;el.style.translate=x+'px '+y+'px';});el.addEventListener('pointerleave',()=>{el.style.translate='0px 0px';});});}
})();
