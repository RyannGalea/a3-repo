import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgtCanvas, provideStore } from 'angular-three'
import { Vector3 } from 'three'
import { SceneComponent } from './scene/scene.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgtCanvas],
  template: `
    <ngt-canvas #scene [sceneGraph]="sceneCmp" [orthographic]="true" [camera]="cameraOpts" [shadows]="true" />
  `,
  host: {
    class: 'w-full h-full'
  }
})
export class AppComponent {
  public sceneCmp       = SceneComponent
  public cameraOpts     = { type: 'orthographic', position: new Vector3(0, 90, 0), zoom: 15, near: 0.1, far: 10000 }
}
