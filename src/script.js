import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from "three/src/loaders/FontLoader.js";
import { TextGeometry} from "three/src/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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

const asphaltColorTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_005_COLOR.jpg')
const asphaltAmbientOcclusionTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_005_OCC.jpg')
const asphaltNormalTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_005_NORM.jpg')
const asphaltRoughnessTexture = textureLoader.load('/textures/Asphalt_005_SD/Asphalt_005_ROUGH.jpg')

const planeColorTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_COLOR.jpg')
const planeAmbientOcclusionTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_OCC.jpg')
const planeNormalTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_NORM.jpg')
const planeRoughnessTexture = textureLoader.load('/textures/White_Marble_004_SD/White_Marble_004_ROUGH.jpg')

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
 * House
 */
// Terminal container
const terminal = new THREE.Group()
scene.add(terminal)

const wallsTerminal = new THREE.Mesh(new THREE.BoxGeometry(14, 2.5, 4),
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

const wallsPlane = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 6, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
wallsPlane.position.y = 1
wallsPlane.position.z = -6
wallsPlane.rotation.x = Math.PI / 2
wallsPlane.rotation.z = Math.PI / 2
wallsPlane.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(wallsPlane.geometry.attributes.uv.array, 2))

plane.add(wallsPlane)

const nosePlane = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1, 1.5, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
nosePlane.position.y = 0.7
nosePlane.position.z = -6
nosePlane.position.x = -3.5
nosePlane.rotation.x = Math.PI / 2
nosePlane.rotation.z = Math.PI / 2
nosePlane.rotation.y = Math.PI / 8

plane.add(nosePlane)

const tailPlane = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.2, 1.5, 12),
    new THREE.MeshStandardMaterial({
        map: planeColorTexture,
        aoMap: planeAmbientOcclusionTexture,
        normalMap: planeNormalTexture,
        roughnessMap: planeRoughnessTexture
    }))
tailPlane.position.y = 1.3
tailPlane.position.z = -6
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
wingPlane1.position.z = -6
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
wingPlane2.position.z = -6
wingPlane2.position.x = 2
plane.add(wingPlane2)

plane.position.y = 10

/**
 * Bus
 */
// Terminal container
const bus = new THREE.Group()
scene.add(bus)

const wallsBus = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
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
wheelBus1.position.x = 10.5
wheelBus1.position.z = -9.5
wheelBus1.rotation.z += Math.PI / 2
bus.add(wheelBus1)

const wheelBus2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus2.position.y = 0.2
wheelBus2.position.x = 9.5
wheelBus2.position.z = -9.5
wheelBus2.rotation.z += Math.PI / 2
bus.add(wheelBus2)

const wheelBus3 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus3.position.y = 0.2
wheelBus3.position.x = 10.5
wheelBus3.position.z = -10.5
wheelBus3.rotation.z += Math.PI / 2
bus.add(wheelBus3)

const wheelBus4 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12),
    new THREE.MeshStandardMaterial({color: '#847a7a'}))
wheelBus4.position.y = 0.2
wheelBus4.position.x = 9.5
wheelBus4.position.z = -10.5
wheelBus4.rotation.z += Math.PI / 2
bus.add(wheelBus4)

bus.position.z = 4

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
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
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.5)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

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

window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA')
    {
        plane.rotation.y += 0.1;
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {

    // plane.rotation.z -= Math.PI / 16

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()