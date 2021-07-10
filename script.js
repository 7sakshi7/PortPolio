// import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
// animations
const left = document.getElementById('left');
const right  = document.getElementById('right');
const headline = document.querySelector('.headline');
const nav = document.querySelector('nav');
const para = document.querySelector('.para');
const headingh3 = document.querySelector('nav h3');

const allImages = document.querySelectorAll('.box img');
const allSections = document.querySelectorAll('.section');
const allBox = document.querySelectorAll('.box');
const t1 = new TimelineMax();
t1.fromTo(left,0.4,{width:"0%"},{width:"30%"})
.fromTo(left,1,{height:"10%",top:"40%"},{height:"100%",top:"0%"})
.fromTo(right,1.2,{height:"0"},{height:"100%"},"-=1")
.fromTo(headingh3,1.6,{top:"70%"},{x:"14%"},"-=1")
.fromTo(para,1.2,{opacity:"0"},{opacity:"1"})



// loading js/////////////////////////////////////
let container;
let camera;
let renderer;
let scene;
let globe;
init();

function init(){
    console.log('init called');
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();
    
    const fov = 35;
    const aspect = container.clientWidth/container.clientHeight;
    const near = 0.5;
    const far = 1000;

    // camera set up
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camera.position.set(0,0,5);

    const ambient = new THREE.AmbientLight(0x404040,3);
    scene.add(ambient);

    const light =  new THREE.DirectionalLight(0xffffff,5);
    light.position.set(10,10,10);
    scene.add(light);

    // renderer
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(300,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    
    // load model
}
    let loader = new THREE.GLTFLoader();
    loader.load('./model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        globe = gltf.scene.children[0];
        // document.querySelector('.developer').style.display="none";
        animate();
    });
    console.log(container);

function animate(){
    console.log('animate called');
    requestAnimationFrame(animate);
    globe.rotation.z+=0.005;
    renderer.render(scene,camera);
}

function onWindowResize(){
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);
}
window.addEventListener('resize',onWindowResize);
// init();


// //////////////////////rest Sections////////////////////


const text = document.querySelector('.headline');
const stringText = text.textContent;

const splitText = stringText.split('');

text.textContent="";
for(let i=0;i<splitText.length;i++){
    text.innerHTML+="<span>"+splitText[i]+"</span>";
}
let char=0;
let timer;
setTimeout(start,3000);
function start(){
     timer = setInterval(onTick,100);
}

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if(char === splitText.length){
        complete();
        return;
    }
}
function complete(){
    clearInterval(timer);
    timer=null;
}
// js
const navlist = document.querySelector('#navlist');
const li = document.querySelectorAll('#navlist li');
const section1 = document.querySelector('#section1');

navlist.addEventListener('click',(e)=>{
    const clicked = e.target.closest('.nav-link');
    console.log(clicked);
    if(!clicked)return;
    //  console.log(e.target.dataset.src);
     document.getElementById(`section${e.target.dataset.src}`).scrollIntoView({behavior:"smooth"});
    
});


// revealing section

const revealSection  = function(enteries,observer){
    const [entry] = enteries;
    if(!entry.isIntersecting)return;
    entry.target.classList.remove('sectionHidden')
   
    if(entry.target.classList.contains('second'))ImagesAndBoxes();
    else if(entry.target.classList.contains('sectwo'))educationData();
    else if(entry.target.classList.contains('lastSection'))contactus();
   
    observer.unobserve(entry.target);

}
const sectionObserver = new IntersectionObserver(revealSection,{
    root:null,
    threshold:0,
})
allSections.forEach((section)=>{
    sectionObserver.observe(section);
    section.classList.add('sectionHidden')
})

function ImagesAndBoxes(){

    // revealing images
    
    // const revealImage = function(entries,observer){
    //     const[entry] = entries;
    //     // if(!entry.isIntersecting)return;
    //     entry.target.classList.remove('lazy');
    //     observer.unobserve(entry.target);
    // }
    // const imageObserver = new IntersectionObserver(revealImage,{
    //     root:null,
    //     threshold:0.1,
        
    // });
    // allImages.forEach((img)=>{
    //     img.classList.add('lazy');
    //     imageObserver.observe(img);
        
    // });
    
    // revealing boxes
    const revealBox = function(entries,observer){
        
        const[entry] = entries;
        // if(!entry.isIntersecting)return;
        entry.target.classList.remove('slide');
        
        observer.unobserve(entry.target);
    };
    const boxObserver = new IntersectionObserver(revealBox,{
        root:null,
        threshold:0.50,
    });
    
    allBox.forEach((box)=>{
        boxObserver.observe(box);
        box.classList.add('slide');
        
    });

    const educationBox = document.querySelectorAll('.education-box');
    const educationRevaeal = function(entries,observer){
        const [entry]=entries;
        if(!entry.isIntersecting)return;

        entry.target.classList.remove('shiftLeft');
        observer.unobserve(entry.target);
    }
    const educationObserver = new IntersectionObserver(educationRevaeal,{
        root:null,
        threshold:0.60,
    });
    educationBox.forEach((box)=>{
        box.classList.add('shiftLeft');
        educationObserver.observe(box);

    })

    
}
// education 
const educationData = function(){
    // achievements
    const achieve = document.querySelector('.achievements');
    const achieveRevaeal = function(entries,observer){
        const [entry]=entries;
        if(!entry.isIntersecting)return;

        entry.target.classList.remove('shiftTop');
        observer.unobserve(entry.target);
    }
    const achieveObserver = new IntersectionObserver(achieveRevaeal,{
        root:null,
        threshold:0.20,
    });

    achieveObserver.observe(achieve);
    achieve.classList.add('shiftTop');
    
    
    // activities
    const activities = document.querySelector('.activities');
    const activitiesRevaeal = function(entries,observer){
        const [entry]=entries;
        if(!entry.isIntersecting)return;

        entry.target.classList.remove('shiftTop');
        observer.unobserve(entry.target);
    }
    const activitiesObserver = new IntersectionObserver(activitiesRevaeal,{
        root:null,
        threshold:0.60,
    });
    activitiesObserver.observe(activities);
    activities.classList.add('shiftTop');    
}

// //////////////////conatct us////////////////////

const contact = document.querySelector('.chatbox');
contact.classList.add('shiftRight');
function contactus(){

    const contactReveal = function(entries,observer){
        const [entry] = entries;
        if(!entry.isIntersecting)return;
        console.log(entry.target);
        entry.target.classList.remove('shiftRight');
        observer.unobserve(entry.target);
    }
    const contactObserver = new IntersectionObserver(contactReveal,{
        root:null,
        threshold:0.40,
    });

    contactObserver.observe(contact);
}

