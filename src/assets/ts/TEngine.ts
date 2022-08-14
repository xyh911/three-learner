import {AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, MOUSE, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
export class TEngine{
    private dom:HTMLElement
    private renderer : WebGLRenderer

    private scene : Scene
    private camera : PerspectiveCamera
    constructor(dom:HTMLElement){
        // 初始化
        this.dom = dom
        this.renderer = new WebGLRenderer({
            antialias:true
        })
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,1,1000)
        // 相机初始化
        this.camera.position.set(20,20,20)
        this.camera.lookAt(new Vector3(0,0,0))
        this.camera.up = new Vector3(0,1,0)

        // 大小设定
        this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)
        // 创建box
        const box = new Mesh(
            new BoxBufferGeometry(10,10,10),
            new MeshStandardMaterial({
                color: 'rgb(255,0,0)'
            })
        )
        // 光
        const ambientLight = new AmbientLight('rgb(255,255,255)',1)
        // 辅助
        const axesHepler = new AxesHelper(500)
        const gridHelper = new GridHelper(500,20,'rgb(200,200,200)','rgb(100,100,100')

        this.scene.add(box)
        this.scene.add(ambientLight)
        this.scene.add(axesHepler)
        this.scene.add(gridHelper)

        // this.renderer.setClearColor('rgb(255,255,255)')
        // this.renderer.clearColor()
        // this.renderer.render(this.scene,this.camera)

        // 初始性能监视器
        const stats = Stats()
        const statsDom = stats.domElement
        statsDom.style.position = 'fixed'
        statsDom.style.top = '0xp'
        statsDom.style.right = '5px'
        statsDom.style.left = 'unset'

        // 初始化orbitControls
        const orbitControls = new OrbitControls(this.camera,this.renderer.domElement)
        // orbitControls.autoRotate = true
        orbitControls.enableDamping = true
        orbitControls.mouseButtons = {
            LEFT:undefined,
            MIDDLE:MOUSE.DOLLY,
            RIGHT:MOUSE.ROTATE
        }

        const renderFun = ()=>{
            box.position.x += -0.1
            box.rotation.y += 0.01

            orbitControls.update()

            this.renderer.render(this.scene,this.camera)
            stats.update()
            requestAnimationFrame(renderFun)
            
        }
        renderFun()


        dom.appendChild(this.renderer.domElement)
        dom.appendChild(statsDom)
    }
}