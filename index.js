const eventInfo=[
        [
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 1",
            "time": "10:00",
            "date": "14.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 2",
            "time": "12:30",
            "date": "15.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 3",
            "time": "15:00",
            "date": "16.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        ],
        [
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 4",
            "time": "18:30",
            "date": "17.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 5",
            "time": "21:00",
            "date": "18.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 6",
            "time": "09:45",
            "date": "19.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        ],
        [
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 7",
            "time": "14:15",
            "date": "20.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 8",
            "time": "17:30",
            "date": "21.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          },
          {
            "src": "img/poster/speedrun.jpg",
            "title": "Event 9",
            "time": "19:45",
            "date": "22.April.2k24",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        ]
      ];

const createElement=(element)=>{
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = element;
    
    return tempDiv.firstChild;
}

const renderElement=(attributes,parent)=>{
    const parentElement=document.querySelector(parent);

    attributes.forEach((x)=>{
        parentElement.appendChild(createElement(`<div class="card"><img src=${x.src} alt="Event Poster"/><div class="card-content"><h2>${x.title}</h2><p><i class="ri-calendar-schedule-fill"></i> ${x.time} <span>|</span> ${x.date}</p><p>${x.description}</p><a href="#"><h3>Register</h3></a></div></div>`));
    });
}

document.querySelector('.tab-links').addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.tagName !== 'A' || e.target.classList.contains('selected'))    return;
    
    //adds the selection affect
    document.querySelectorAll('.tab-links a').forEach((x)=>x.classList.remove('selected'));    
    e.target.classList.add('selected');
    
    //renders the event card
    const id=e.target.getAttribute('href');
    document.querySelectorAll('#events .container *').forEach((x)=>x.remove());
    renderElement(eventInfo[id.charAt(id.length - 1)-1],'#events .container');
})

