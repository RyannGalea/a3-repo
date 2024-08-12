
import { centroid } from '@turf/turf'
import { Shape } from 'three'

export const GeoJsonToShape = (geoJSON: any): Shape => {

  if (geoJSON.type !== "Polygon" || !geoJSON.coordinates || !geoJSON.coordinates[0]) throw new Error("Invalid GeoJSON. Expected a Polygon with coordinates.")

  const coordinates = geoJSON.coordinates[0]
  if (coordinates.length === 0) return new Shape()

  const c = centroid(geoJSON)
  const [ centroidX, centroidY ] = c.geometry.coordinates

  const shape = new Shape()
  coordinates.forEach((coord: any, i: any) => {
    const x = coord[0] - centroidX
    const y = coord[1] - centroidY
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
  })

  return shape

}
