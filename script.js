const anncX = document.getElementById('anncX');
if (anncX) {
  anncX.addEventListener('click',()=>document.getElementById('annc').classList.add('hide'));
}

  const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>10),{passive:true});

  // hero scene cycling
  const scenes=[...document.querySelectorAll('.scene')];
  const dotsWrap=document.getElementById('dots');
  if (dotsWrap && scenes.length > 0) {
    let cur=0,timer;
    scenes.forEach((_,i)=>{const b=document.createElement('button');if(i===0)b.className='on';b.addEventListener('click',()=>go(i,true));dotsWrap.appendChild(b);});
    const dots=[...dotsWrap.children];
    function go(i,manual){
      scenes[cur].classList.remove('active');dots[cur].classList.remove('on');
      cur=i;scenes[cur].classList.add('active');dots[cur].classList.add('on');
      if(manual){clearInterval(timer);start();}
    }
    function start(){timer=setInterval(()=>go((cur+1)%scenes.length),3800);}
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)start();
  }

  // logo marquee (client brand presentation)
  const brands=['Nova Realty','MetroMart','ZenCab','Aarav Foods','Tila Group','Vayu Mobility','Playhouse Retail','Suryā Power','Bharat Motors','Metro Express'];
  const lt=document.getElementById('logoTrack');
  if (lt) {
    lt.textContent = '';
    for (let k = 0; k < 2; k++) {
      brands.forEach(b => {
        const span = document.createElement('span');
        span.textContent = b;
        lt.appendChild(span);
      });
    }
  }

  // cities marquee
  const cities=['Delhi NCR','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Jaipur','Lucknow','Chandigarh','Indore','Kochi','Surat','Nagpur','Bhopal','Coimbatore','Noida','Gurugram','Guwahati'];
  const fill=(el,list)=>{
    if(el){
      el.textContent = '';
      for(let k=0;k<2;k++){
        list.forEach(c=>{
          const span = document.createElement('span');
          span.className = 'city';
          span.textContent = c;
          el.appendChild(span);
        });
      }
    }
  };
  fill(document.getElementById('cr1'),cities.slice(0,10));
  fill(document.getElementById('cr2'),cities.slice(10));

  // scroll reveal
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // count-up (SSR friendly: keeps canonical HTML text if JS/IntersectionObserver delayed)
  const countUp=(el)=>{
    const target=+el.dataset.count;
    if (isNaN(target)) return;
    const dur=1400,t0=performance.now();
    const uEl=el.querySelector('.u');
    const uText=uEl?uEl.textContent:'';
    const textNode=document.createTextNode('');
    el.textContent='';
    el.appendChild(textNode);
    if(uEl){
      const uSpan=document.createElement('span');
      uSpan.className='u';
      uSpan.textContent=uText;
      el.appendChild(uSpan);
    }
    const step=(now)=>{
      const p=Math.min((now-t0)/dur,1);
      const val=Math.floor((1-Math.pow(1-p,3))*target);
      textNode.nodeValue=val;
      if(p<1)requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const sio=new IntersectionObserver((es)=>es.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.num').forEach(countUp);
      sio.unobserve(e.target);
    }
  }),{threshold:.4});
  document.querySelectorAll('.stats-in').forEach(el=>sio.observe(el));

  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click',()=> {
      const svcs = document.getElementById('services');
      if (svcs) svcs.scrollIntoView({behavior:'smooth'});
    });
  }

