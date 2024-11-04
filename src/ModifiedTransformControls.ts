import * as THREE from "three/src/Three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export class ModifiedTransformControls extends TransformControls {
    public constructor(camera: THREE.Camera, domElement?: HTMLElement) {
        super(camera, domElement);
    }
}
