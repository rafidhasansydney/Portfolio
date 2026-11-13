(() => {
'use strict';
const root=document.documentElement;
const $=selector=>document.querySelector(selector);
const all=selector=>[...document.querySelectorAll(selector)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
const toast=$('.toast');let timer;
function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2800);}
const theme=$('.theme-toggle');
function themeLabel(){theme?.setAttribute('aria-label','Switch to '+(root.dataset.theme==='light'?'dark':'light')+' theme');}
themeLabel();
theme?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';try{localStorage.setItem('rafid-theme-v2',root.dataset.theme);}catch{}themeLabel();$('meta[name="theme-color"]')?.setAttribute('content',root.dataset.theme==='light'?'#f6f6f6':'#111113');});
const nav=$('#navigation'),menu=$('.menu-toggle');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav?.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
addEventListener('resize',()=>{if(innerWidth>650)closeMenu();});
const modal=$('#resume-dialog');
all('[data-resume]').forEach(button=>button.addEventListener('click',()=>{if(modal?.showModal)modal.showModal();else notify('Résumé is being prepared. Please contact me by email.');}));
modal?.querySelector('.dialog-close')?.addEventListener('click',()=>modal.close());
modal?.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
all('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);notify('Email address copied.');}catch{notify('Email: '+button.dataset.copy);}}));
function time(){const node=$('[data-local-time]');if(node)node.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' BST';}
time();if($('[data-local-time]'))setInterval(time,60000);
const progress=$('.reading-progress');let scrollScheduled=false;
function updateProgress(){const max=root.scrollHeight-innerHeight;if(progress)progress.style.transform='scaleX('+(max>0?Math.min(scrollY/max,1):0)+')';scrollScheduled=false;}
addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});updateProgress();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)nav?.querySelectorAll('a').forEach(a=>a.classList.toggle('current',a.hash==='#'+entry.target.id));}),{rootMargin:'-15% 0px -65% 0px'});all('main>section[id]').forEach(s=>observer.observe(s));}
const gsap=window.gsap,ST=window.ScrollTrigger,Flip=window.Flip;
let mediaTweens=[];
function clearMedia(){mediaTweens.forEach(t=>{t.scrollTrigger?.kill();t.kill();});mediaTweens=[];if(gsap)gsap.set('.desktop-device,.phone-device',{clearProps:'transform'});}
function mediaMotion(){if(!gsap||!ST||reduced||innerWidth<651||$('.project-grid')?.dataset.view==='index')return;all('.project-preview').forEach(preview=>{const target=preview.querySelector('.desktop-device,.phone-device');if(!target)return;mediaTweens.push(gsap.to(target,{yPercent:5,ease:'none',scrollTrigger:{trigger:preview,start:'top bottom',end:'bottom top',scrub:1.2}}));});}
if(gsap&&ST&&Flip&&!reduced){
  try{
    gsap.registerPlugin(ST,Flip);
    const intro=gsap.timeline({defaults:{ease:'power4.out'}});
    if($('.title-line'))intro.from('.title-line',{yPercent:115,rotate:2,duration:1.15,stagger:.12},.05);
    if($('.intro-item'))intro.from('.intro-item',{y:24,opacity:0,duration:.9,stagger:.1},.2);
    all('.reveal-title').forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    all('.reveal').forEach(el=>gsap.from(el,{y:24,opacity:0,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    all('.project-image-link').forEach(el=>gsap.from(el,{clipPath:'inset(9% 0% 0% 0%)',opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}}));
    mediaMotion();
    document.fonts?.ready.then(()=>ST.refresh());
    addEventListener('load',()=>ST.refresh(),{once:true});
  }catch(error){console.warn('Motion fallback:',error);gsap.set('.title-line,.intro-item,.reveal-title,.reveal,.project-image-link',{clearProps:'transform,opacity,clipPath'});}
}
const grid=$('.project-grid');
let flipAnimation;let layoutHeightAnimation;
all('[data-layout]').forEach(button=>button.addEventListener('click',()=>{
  if(!grid||button.dataset.layout===grid.dataset.view)return;
  flipAnimation?.progress(1);layoutHeightAnimation?.progress(1);
  clearMedia();
  const cards=all('.project-card');
  const previousHeight=grid.getBoundingClientRect().height;
  const state=Flip&&!reduced?Flip.getState(cards):null;
  grid.dataset.view=button.dataset.layout;
  all('[data-layout]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  if(state){const nextHeight=grid.getBoundingClientRect().height;grid.style.height=previousHeight+'px';layoutHeightAnimation=gsap.to(grid,{height:nextHeight,duration:.7,ease:'power3.inOut'});flipAnimation=Flip.from(state,{duration:.7,ease:'power3.inOut',absolute:true,stagger:.025,onComplete:()=>{grid.style.height='';mediaMotion();ST?.refresh();updateProgress();}});}else{updateProgress();}
}));
if(gsap&&fine&&!reduced){
  const cursor=$('.project-cursor');
  if(cursor){const x=gsap.quickTo(cursor,'x',{duration:.32,ease:'power3.out'}),y=gsap.quickTo(cursor,'y',{duration:.32,ease:'power3.out'});all('.project-image-link').forEach(link=>{link.addEventListener('pointerenter',event=>{x(event.clientX+18);y(event.clientY+18);gsap.to(cursor,{opacity:1,duration:.18});});link.addEventListener('pointermove',event=>{x(event.clientX+18);y(event.clientY+18);});link.addEventListener('pointerleave',()=>gsap.to(cursor,{opacity:0,duration:.18}));});addEventListener('blur',()=>gsap.set(cursor,{opacity:0}));}
  all('.project-image-link').forEach(link=>{const target=link.querySelector('.desktop-device,.phone-device');link.addEventListener('pointermove',event=>{if(grid?.dataset.view==='index')return;const b=link.getBoundingClientRect(),n=(event.clientX-b.left)/b.width-.5;gsap.to(target,{rotation:(link.querySelector('.phone-device')?-7:0)+n*1.5,x:n*8,duration:.6,ease:'power3.out',overwrite:'auto'});});link.addEventListener('pointerleave',()=>{if(grid?.dataset.view==='index')return;gsap.to(target,{rotation:link.querySelector('.phone-device')?-7:0,x:0,duration:.7,ease:'power3.out'});});});
}
})();
