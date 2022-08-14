import { BoxBufferGeometry, CylinderBufferGeometry, Mesh, MeshStandardMaterial, SphereBufferGeometry } from "three";

// 创建box
export const box = new Mesh(
    new BoxBufferGeometry(10,10,10),
    new MeshStandardMaterial({
        color: 'rgb(255,0,0)'
    })
)
box.position.x = -10
export const sphere = new Mesh(
    new SphereBufferGeometry(5),
    new MeshStandardMaterial()
)
sphere.position.x = 10

export const cylinder = new Mesh(
    new CylinderBufferGeometry(5,5,10,32,5),
    new MeshStandardMaterial()
)
cylinder.position.z = 10
export const cylinder2 = new Mesh(
    new CylinderBufferGeometry(5,5,10,32,5),
    new MeshStandardMaterial()
)
cylinder2.position.z = -10

export default [
    box,sphere,cylinder,cylinder2
]