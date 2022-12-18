import htm from 'https://unpkg.com/htm?module'
import { tag } from './tag.js'

export const $ = htm.bind(tag)
