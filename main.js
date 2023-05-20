import * as THREE from 'https://cdn.skypack.dev/three';

//Scene
const scene = new THREE.Scene();
//Camera and renderer
const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 0;
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });  
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
//Light
const light = new THREE.AmbientLight(0xffffff ,0.55);
scene.add(light);
light.position.set(200,0,0);

//Variables
const vertices = [];
let velocities = [];
const accelerations = [];
var stars;
const starGeo = new THREE.BufferGeometry();
var moon = new THREE.Mesh();
var jupiter = new THREE.Mesh();
let cube;


//Add Cube
function addCube()
{
    let cubeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
    let loader = new THREE.TextureLoader();
    let materialArray = [
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
    new THREE.MeshStandardMaterial( { map: loader.load("https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/soham.png") } ),
];
    cube = new THREE.Mesh( cubeGeometry, materialArray );
    cube.position.set(0.75,0,camera.position.z + 6);
    scene.add( cube );
}
//Add stars
function addStar(){
for(let i = 0;i<10000;i++)
{
    vertices.push(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
    velocities.push( 0 );
    accelerations.push(0.00001);
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const sprite = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/star.png');
const starMaterial = new THREE.PointsMaterial({color:0xffffff,size:0.4,map:sprite});
stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);
}
//Animate stars movement
function starAnimations()
{
    const posAtr = starGeo.getAttribute('position');
    for(let i=0;i<posAtr.count;i++)
{
    let z = posAtr.getZ(i);
    let vel = velocities[i];
    const accel = accelerations[i];
    if(z<-200){
    
        z = 200;
        vel = 0;
    }
    vel += accel;
    velocities[i] = vel;
    z -= vel;
    posAtr.setZ(i,z);
}
    stars.rotation.z += 0.0002;
    posAtr.needsUpdate = true;
}


//Add moon
function addMoon()
{
    const moonGeometry = new THREE.SphereGeometry(5, 32, 32); 
    const moonTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/plutomap2k.jpg'); 
    const normalTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/plutobump2k.jpg'); 
    const moonMaterial = new THREE.MeshStandardMaterial({map:moonTexture,normalMap:normalTexture});
    moon.geometry = moonGeometry;
    moon.material = moonMaterial;
    moon.position.set(65,0,0)
    moon.name = "moon"
    scene.add( moon );
}
//Moon orbit
function createMoonOrbit(){
    var quaternion = new THREE.Quaternion();
    var object = scene.getObjectByName('moon');
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 0.005);
    object.position.applyQuaternion(quaternion);
}   

//Add Jupiter
function addJupiter(){
    const jupiterGeometry = new THREE.SphereGeometry(25, 320, 320); 
    const jupiterTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/SohamSinghal/MyPortfolio@master/asset/jupitermap.jpg'); 
    const jupiterMaterial = new THREE.MeshStandardMaterial({map:jupiterTexture});
    jupiter.geometry = jupiterGeometry;
    jupiter.material = jupiterMaterial;
    jupiter.rotation.set( 0, 0,-Math.PI * 35 / 180 ); 
    jupiter.name = "jupiter"
    scene.add( jupiter );
    jupiter.position.set(0,250,-750);
}
function createJupiterOrbit(){
    var quaternion = new THREE.Quaternion();
    var object = scene.getObjectByName('jupiter');
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), -0.003);
    object.position.applyQuaternion(quaternion);
}   
//Camera movement with scrolling
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.015;
  }
document.body.onscroll = moveCamera;

function animate()
{
    var z = camera.position.z - cube.position.z;
    if(z>5){
        cube.visible = false;
    }
    else{
        cube.visible = true;
    }
    cube.rotation.y +=0.0008;
    createMoonOrbit();
    createJupiterOrbit();
    starAnimations();
    moon.rotation.y += 0.005;
    jupiter.rotation.y -= 0.005;
    renderer.render(scene,camera);
    renderer.setClearColor( 0x000000, 0 );
    requestAnimationFrame(animate);
}
addCube();
moveCamera();
addJupiter();
addMoon();
addStar();
animate();