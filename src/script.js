import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// Группа объектов
// const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
// scene.add(group)
//
// const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}))
// cube1.position.x = -1.5
// group.add(cube1)
//
// const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}))
// cube2.position.x = 0
// group.add(cube2)
//
// const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}))
// cube3.position.x = 1.5
// group.add(cube3)

const geomerty = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geomerty, material)
// mesh.position.set(0.7, -0.6, 1) // Позиция объекта
// mesh.scale.set(2, 0.25, 0.5) // Масштаб объекта
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0) // Поворот объекта
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.lookAt(new THREE.Vector3(0, -1, 0)) // Посмотреть на объект
scene.add(camera)

// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animate
 */

gsap.to(mesh.position, {duration: 1, delta: 1, x: 2});

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.x = Math.cos(elapsedTime);
    // mesh.rotation.y = Math.sin(elapsedTime);

    // camera.position.x = Math.cos(elapsedTime);
    // camera.position.y = Math.sin(elapsedTime);
    // camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();