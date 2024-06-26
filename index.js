import eventInfo from './eventInfo.json' assert {type:'json'}; 
const eventDays=new Array(eventInfo.length).fill(0).map((x,i)=>`day${i+1}`);

////////////////////////
//element rendering tool
const createElement = (element) => {
	const tempDiv = document.createElement('div')
	tempDiv.innerHTML = element

	return tempDiv.firstChild
}
const renderElement = (element, parent) => {
	const parentElement = document.querySelector(parent);

	parentElement.appendChild(createElement(element));
}

///////////////////
//Adding tab links
eventDays.forEach(x=>{
	renderElement(`<a href="#${x}">${x.charAt(0).toUpperCase()+x.slice(1)}</a>`,'#events .tab-links');
});
document.querySelector('#events .tab-links [href="#day1"]').classList.add('selected');

//////////////////////////////
//event tabbed links behaviour
document.querySelector('.tab-links').addEventListener('click', (e) => {
	e.preventDefault()
	if (e.target.tagName !== 'A' || e.target.classList.contains('selected'))
		return

	//adds the selection affect
	document
		.querySelectorAll('.tab-links a')
		.forEach((x) => x.classList.remove('selected'));
	e.target.classList.add('selected');

	//renders the event card
	const id = e.target.getAttribute('href');
	document.querySelectorAll('#events .container *').forEach((x) => x.remove());
	
	eventInfo[id.charAt(id.length - 1) - 1].forEach((elementInfo)=>{
		const element=`<div class="card"><img src=${elementInfo.src} alt="Event Poster"  data-gform="${elementInfo.gform}"/><div class="card-content"><h2>${elementInfo.title}</h2><p><i class="ri-calendar-schedule-fill"></i> ${elementInfo.time} <span>|</span> ${elementInfo.date}</p><p>${elementInfo.description}</p><h3 data-src=${elementInfo.src}  data-gform="${elementInfo.gform}">Learn More</h3></div></div>`;
		renderElement(element,'#events .container');
	});
	//add modal behaviour to the posters
	addModalBehaviour();
})

///////////////////////////
//navigation link behaviour
document.querySelectorAll('nav .links, .footer .links').forEach((x)=>{
	x.addEventListener('click',(e)=>{
		const id=e.target.getAttribute('href');
		if(!id || !id.startsWith('#'))
			return;
		e.preventDefault();
		document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
}) ;

//////////////////
//Scroll Behaviour
const scrollObserver=new IntersectionObserver(entries=>{
	const [entry]=entries;
	
	if (!entry.isIntersecting) {
		document.querySelector('#home nav').classList.add('sticky');
		document.querySelector('#home nav [href="#events"]').classList.add('selected');
		document.querySelector('#home nav [href="#home"]').classList.remove('selected');
	}
	else {
		document.querySelector('#home nav').classList.remove('sticky');
		document.querySelector('#home nav [href="#events"]').classList.remove('selected');
		document.querySelector('#home nav [href="#home"]').classList.add('selected');
	}
},{ threshold: 0.001 });
scrollObserver.observe(document.querySelector('#home'));

///////////
//Hamburger
document.querySelector(".hamburger").addEventListener("click", ()=>{
	document.querySelector(".hamburger").classList.toggle("active")
	document.querySelector(".links").classList.toggle("active")
})

document.querySelector(".links").addEventListener("click", (event) => {
    if (event.target.textContent === 'HOME' || event.target.textContent === 'EVENTS' || event.target.textContent === 'HACKMATRIX') {
        document.querySelector(".hamburger").classList.remove("active");
        document.querySelector(".links").classList.remove("active");
    }
});

////////////////////
//modal for posters
const addModalBehaviour=()=>{
	document.querySelectorAll('#events img, #events .card-content h3').forEach(x=>{
		x.addEventListener('click',e=>{
			let src;
			if(e.target.tagName==='IMG')
				src=e.target.getAttribute('src');
			else if(e.target.tagName==='H3')
				src=e.target.getAttribute('data-src');
			else
				return;
			const gform=e.target.getAttribute('data-gform');

			renderElement(`<div class="modal"><img src=${src} alt="Event Poster"/><a href=${gform} target="_blank">REGISTER</a></div>`,'body');
		
			document.querySelector('.modal').addEventListener('click',e=>{
				if(e.target.tagName==='IMG'||e.target.tagName==='A')
					return;
				e.target.remove();
				document.querySelector('body').classList.remove('hide-scroll');
			});
			
			document.querySelector('body').classList.add('hide-scroll');
		});
	});
}


///////////////////
//default elements
eventInfo[0].forEach((elementInfo)=>{	
	const element=`<div class="card"><img src=${elementInfo.src} alt="Event Poster" data-gform=${elementInfo.gform}/><div class="card-content"><h2>${elementInfo.title}</h2><p><i class="ri-calendar-schedule-fill"></i> ${elementInfo.time} <span>|</span> ${elementInfo.date}</p><p>${elementInfo.description}</p><h3 data-src=${elementInfo.src}  data-gform="${elementInfo.gform}">Learn More</h3></div></div>`;
	renderElement(element,'#events .container');
});
addModalBehaviour();
