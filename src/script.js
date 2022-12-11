import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from "three/src/loaders/FontLoader.js";
import { TextGeometry} from "three/src/geometries/TextGeometry.js";
import {gsap} from "gsap";

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

scene.background = new THREE.CubeTextureLoader()
    .setPath( 'textures/cubeMaps/' )
    .load( [
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ] );

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const tilesColorTexture = textureLoader.load('/textures/Subway_tiles_001_SD/Subway_tiles_001_COLOR.jpg')
const tilesAmbientOcclusionTexture = textureLoader.load('/textures/Subway_tiles_001_SD/Subway_tiles_001_OCC.jpg')
const tilesNormalTexture = textureLoader.load('/textures/Subway_tiles_001_SD/Subway_tiles_001_NORM.jpg')
const tilesRoughnessTexture = textureLoader.load('/textures/Subway_tiles_001_SD/Subway_tiles_001_ROUGH.jpg')

const asphaltColorTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_006_COLOR.jpg')
const asphaltAmbientOcclusionTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_006_OCC.jpg')
const asphaltNormalTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_006_NRM.jpg')
const asphaltRoughnessTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_006_ROUGH.jpg')

const planeColorTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_COLOR.jpg')
const planeAmbientOcclusionTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_OCC.jpg')
const planeNormalTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_NORM.jpg')
const planeRoughnessTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_ROUGH.jpg')

const busColorTexture = textureLoader.load('/textures/Concrete_009_SD/Concrete_009_COLOR.jpg')
const busAmbientOcclusionTexture = textureLoader.load('/textures/Concrete_009_SD/Concrete_009_OCC.jpg')
const busNormalTexture = textureLoader.load('/textures/Concrete_009_SD/Concrete_009_NORM.jpg')
const busRoughnessTexture = textureLoader.load('/textures/Concrete_009_SD/Concrete_009_ROUGH.jpg')

const hangarColorTexture = textureLoader.load('/textures/Concrete_007/Concrete_007_COLOR.png')
const hangarAmbientOcclusionTexture = textureLoader.load('/textures/Concrete_007/Concrete_007_OCC.png')
const hangarNormalTexture = textureLoader.load('/textures/Concrete_007/Concrete_007_NRM.png')
const hangarRoughnessTexture = textureLoader.load('/textures/Concrete_007/Concrete_007_SPEC.png')

const bakedShadow = textureLoader.load('/textures/shadows/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/shadows/simpleShadow.jpg')


asphaltColorTexture.wrapS = THREE.RepeatWrapping
asphaltColorTexture.wrapT = THREE.RepeatWrapping
asphaltAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
asphaltAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
asphaltNormalTexture.wrapS = THREE.RepeatWrapping
asphaltNormalTexture.wrapT = THREE.RepeatWrapping
asphaltRoughnessTexture.wrapS = THREE.RepeatWrapping
asphaltRoughnessTexture.wrapT = THREE.RepeatWrapping
asphaltColorTexture.repeat.set(8,8)
asphaltAmbientOcclusionTexture.repeat.set(8,8)
asphaltNormalTexture.repeat.set(8,8)
asphaltRoughnessTexture.repeat.set(8,8)

/**
 * Terminal
 */
// Terminal container
const terminal = new THREE.Group()
scene.add(terminal)

const wallsTerminal = new THREE.Mesh(new THREE.BoxGeometry(14, 2.5, 8),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
wallsTerminal.position.y = 1.25
wallsTerminal.position.x = -3
wallsTerminal.position.z = 6
wallsTerminal.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wallsTerminal.geometry.attributes.uv.array, 2))
terminal.add(wallsTerminal)

const passageTerminal = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 8),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }))
passageTerminal.position.y = 1.25
passageTerminal.position.x = 1
passageTerminal.position.z = -2
passageTerminal.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(passageTerminal.geometry.attributes.uv.array, 2))
terminal.add(passageTerminal)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Pulkovo airport',{
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
    })
    const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    const text = new THREE.Mesh(textGeometry, material)
    text.position.y = 3
    text.position.x = -3
    text.position.z = 6
    text.rotation.y = Math.PI
    scene.add(text)
})

/**
 * Tower
 */
// Tower container
const tower = new THREE.Group()
scene.add(tower)

const wallsTower = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 6, 12),
    new THREE.MeshStandardMaterial({
        map: tilesColorTexture,
        aoMap: tilesAmbientOcclusionTexture,
        normalMap: tilesNormalTexture,
        roughnessMap: tilesRoughnessTexture
    }))
wallsTower.position.y = 3
wallsTower.position.x = 6
wallsTower.position.z = 6
wallsTower.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wallsTower.geometry.attributes.uv.array, 2))

tower.add(wallsTower)

// Roof tower
const roofTower1 = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1, 2, 12),
    new THREE.MeshStandardMaterial({
        map: tilesColorTexture,
        aoMap: tilesAmbientOcclusionTexture,
        normalMap: tilesNormalTexture,
        roughnessMap: tilesRoughnessTexture
    }))
roofTower1.position.y = 6
roofTower1.position.x = 6
roofTower1.position.z = 6
tower.add(roofTower1)

const roofTower2 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.5, 1, 12),
    new THREE.MeshStandardMaterial({
        map: tilesColorTexture,
        aoMap: tilesAmbientOcclusionTexture,
        normalMap: tilesNormalTexture,
        roughnessMap: tilesRoughnessTexture
    }))
roofTower2.position.y = 7
roofTower2.position.x = 6
roofTower2.position.z = 6
tower.add(roofTower2)

/**
 * Plane
 */
// Tower container
const plane = new THREE.Group()
scene.add(plane)

const wallsPlane = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 6, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
wallsPlane.position.y = 1
wallsPlane.position.z = -12
wallsPlane.rotation.x = Math.PI / 2
wallsPlane.rotation.z = Math.PI / 2
wallsPlane.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wallsPlane.geometry.attributes.uv.array, 2))

plane.add(wallsPlane)

const nosePlane = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.75, 1.5, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
nosePlane.position.y = 0.7
nosePlane.position.z = -12
nosePlane.position.x = -3.5
nosePlane.rotation.x = Math.PI / 2
nosePlane.rotation.z = Math.PI / 2
nosePlane.rotation.y = Math.PI / 8

plane.add(nosePlane)

const tailPlane = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.2, 1.5, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
tailPlane.position.y = 1.3
tailPlane.position.z = -12
tailPlane.position.x = 3.5
tailPlane.rotation.x = Math.PI / 2
tailPlane.rotation.z = Math.PI / 2
tailPlane.rotation.y = Math.PI / 8
plane.add(tailPlane)

const wingPlane1 = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 8),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
wingPlane1.position.y = 1
wingPlane1.position.z = -12
wingPlane1.position.x = -1
plane.add(wingPlane1)

const wingPlane2 = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 4),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
wingPlane2.position.y = 1
wingPlane2.position.z = -12
wingPlane2.position.x = 2
plane.add(wingPlane2)

plane.position.y = 10

/**
 * Bus
 */
// Bus container
const bus = new THREE.Group()
scene.add(bus)

const wallsBus = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1),
    new THREE.MeshStandardMaterial({
        map: busColorTexture,
        aoMap: busAmbientOcclusionTexture,
        normalMap: busNormalTexture,
        roughnessMap: busRoughnessTexture
    }))
wallsBus.position.y = 0.75
wallsBus.position.x = 10
wallsBus.position.z = -10
wallsBus.rotation.y = - Math.PI / 4
wallsBus.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wallsBus.geometry.attributes.uv.array, 2))
bus.add(wallsBus)

const wheelBus1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus1.position.y = 0.2
wheelBus1.position.x = 10
wheelBus1.position.z = -10.75
wheelBus1.rotation.z += Math.PI / 2
wheelBus1.rotation.y += Math.PI / 4
bus.add(wheelBus1)

const wheelBus2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus2.position.y = 0.2
wheelBus2.position.x = 10.75
wheelBus2.position.z = -10
wheelBus2.rotation.z += Math.PI / 2
wheelBus2.rotation.y += Math.PI / 4
bus.add(wheelBus2)

const wheelBus3 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus3.position.y = 0.2
wheelBus3.position.x = 10.05
wheelBus3.position.z = -9.2
wheelBus3.rotation.z += Math.PI / 2
wheelBus3.rotation.y += Math.PI / 4
bus.add(wheelBus3)

const wheelBus4 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus4.position.y = 0.2
wheelBus4.position.x = 9.25
wheelBus4.position.z = -10
wheelBus4.rotation.z += Math.PI / 2
wheelBus4.rotation.y += Math.PI / 4
bus.add(wheelBus4)

bus.position.z = 4

/**
 * Hangar
 */
// Hangar container
const hangar = new THREE.Group()
scene.add(hangar)

const hangarBuilding = new THREE.Mesh(new THREE.CylinderGeometry(
    4,
    4,
    8,
    12,
    2,
    false,
    Math.PI,
    Math.PI),
    new THREE.MeshStandardMaterial({
        map: hangarColorTexture,
        aoMap: hangarAmbientOcclusionTexture,
        normalMap: hangarNormalTexture,
        roughnessMap: hangarRoughnessTexture
    }));
hangarBuilding.position.x = -15
hangarBuilding.position.z = -15
hangarBuilding.rotation.z = -Math.PI / 2
hangarBuilding.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(hangarBuilding.geometry.attributes.uv.array, 2))
hangar.add(hangarBuilding)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        map: asphaltColorTexture,
        aoMap: asphaltAmbientOcclusionTexture,
        normalMap: asphaltNormalTexture,
        roughnessMap: asphaltRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.6)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.6)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

const busShadow = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
}))
busShadow.rotation.x = -Math.PI * 0.5
busShadow.rotation.z += Math.PI / 4
busShadow.position.x = wallsBus.position.x
busShadow.position.z = wallsBus.position.z
busShadow.position.y = bus.position.y + 0.01

bus.add(busShadow)

const towerShadow = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
}))
towerShadow.rotation.x = -Math.PI * 0.5
towerShadow.rotation.z += Math.PI / 4
towerShadow.position.x = 6
towerShadow.position.z = 6
towerShadow.position.y = tower.position.y + 0.01

tower.add(towerShadow)

const terminalShadow = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
}))
terminalShadow.rotation.x = -Math.PI * 0.5
terminalShadow.position.x = -3
terminalShadow.position.z = 6
terminalShadow.position.y = terminal.position.y + 0.02
terminal.add(terminalShadow)

const hangarShadow = new THREE.Mesh(new THREE.PlaneGeometry(20, 15), new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
}))
hangarShadow.rotation.x = -Math.PI * 0.5
hangarShadow.position.x = -15
hangarShadow.position.z = -15
hangarShadow.position.y = hangarShadow.position.y + 0.02
hangar.add(hangarShadow)

// /**
//  * Fog
//  */
//
// const fog = new THREE.Fog('#262837', 1, 15)
// scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=>{

    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullScreenElement){

        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW')
    {
        plane.position.y += 0.5;
    }
    if (event.code === 'KeyS')
    {
        plane.position.y -= 0.5;
    }
})

window.addEventListener('mousemove', () => {
    bus.rotation.y += 0.01;
})

/**
* Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 10
camera.position.y = 15
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

plane.position.x = 80
let planeGsap = gsap.timeline({repeat: 2, repeatDelay: 1});
planeGsap.to(plane.position, { duration: 10, x: -50 });

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()