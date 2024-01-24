import { color } from '../config'
import Base64 from './base64'

export function toDataUrl(str: string) {
  return `data:image/svg+xml;base64,${Base64.encode(str)}`
}

export function getSVG(c: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="${c || color.value}" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"/></svg>`
}
