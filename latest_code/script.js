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

  // logo marquee (placeholder brand names — swap for real client logos)
  const brands=['Aarav Foods','MetroMart','Zencab','Nova Realty','Bharat Motors','Tila','Kirana+','Playhouse','Suryā','Vayu Air'];
  const lt=document.getElementById('logoTrack');
  if (lt) {
    let ls='';for(let k=0;k<2;k++)brands.forEach(b=>ls+=`<span>${b}</span>`);lt.innerHTML=ls;
  }

  // cities marquee
  const cities=['Delhi NCR','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Jaipur','Lucknow','Chandigarh','Indore','Kochi','Surat','Nagpur','Bhopal','Coimbatore','Noida','Gurugram','Guwahati'];
  const fill=(el,list)=>{if(el){let s='';for(let k=0;k<2;k++)list.forEach(c=>s+=`<span class="city">${c}</span>`);el.innerHTML=s;}};
  fill(document.getElementById('cr1'),cities.slice(0,10));
  fill(document.getElementById('cr2'),cities.slice(10));

  // scroll reveal
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // count-up
  const countUp=(el)=>{const target=+el.dataset.count,dur=1400,t0=performance.now();const uEl=el.querySelector('.u'),u=uEl?uEl.outerHTML:'';const step=(now)=>{const p=Math.min((now-t0)/dur,1);el.innerHTML=Math.floor((1-Math.pow(1-p,3))*target)+u;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);};
  const sio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.num').forEach(countUp);sio.unobserve(e.target);}}),{threshold:.4});
  document.querySelectorAll('.stats-in').forEach(el=>sio.observe(el));

  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click',()=> {
      const svcs = document.getElementById('services');
      if (svcs) svcs.scrollIntoView({behavior:'smooth'});
    });
  }
