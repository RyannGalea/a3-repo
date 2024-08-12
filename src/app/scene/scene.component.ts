import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core'
import { extend, injectStore, NgtArgs } from 'angular-three'
import { NgtsGrid } from 'angular-three-soba/abstractions'
import { GridMaterialOptions } from 'angular-three-soba/shaders'
import { Euler, ExtrudeGeometry } from 'three'
import { MapControls } from 'three-stdlib'
import * as THREE from 'three'
import { GeoJsonToShape } from '../helper/geojson-to-shape.helper'
import { Parcels } from '../parcels'

extend({ MapControls })
extend(THREE)

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [NgtArgs, NgtsGrid],
  template: `

    <ngts-grid #grid [options]="gridOpts" />

    <ngt-map-controls
      #controls
      *args="[ this.store.get('camera'), this.store.get('gl', 'domElement') ]"
      [maxPolarAngle]="this.math.PI / 2.2"
      [enableDamping]="true"
      (beforeRender)="$event.object.update()"
    />

    @if (meshArgs(); as args) {
      <ngt-mesh [rotation]="args.rotation" [userData]="{ type: 'parcel' }">
        <ngt-extrude-geometry *args="args.geoArgs" />
        <ngt-mesh-standard-material [color]="args.color" />
      </ngt-mesh>
    }

  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneComponent {

  public math  = Math
  public store = injectStore()
  public meshArgs = signal<{
    rotation: Euler
    geoArgs: ConstructorParameters<typeof ExtrudeGeometry>
    color: string
  }>(null)

  public gridOpts: Partial<GridMaterialOptions> = {
    sectionSize: 10,
    sectionColor: '#d1d5db',
    sectionThickness: 1,
    cellSize: 1,
    cellColor: '#d1d5db',
    cellThickness: 0.7,
    infiniteGrid: true,
    fadeDistance: 10000,
    fadeStrength: 1
  }

  constructor() {
    const parcel = Parcels[0]
    this.meshArgs.update(() => ({ rotation: new Euler(-Math.PI / 2, 0, 0),  color: '#4B3C24',  geoArgs: [GeoJsonToShape(parcel), { depth: .75, bevelEnabled: false }]}))

    setTimeout(() => {
     const parcel = Parcels[1]
     this.meshArgs.update(() => ({ rotation: new Euler(-Math.PI / 2, 0, 0),  color: '#4B3C24',  geoArgs: [GeoJsonToShape(parcel), { depth: .75, bevelEnabled: false }]}))
    }, 5000)
  }
}
