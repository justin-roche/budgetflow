import { BASE_GRAPH } from './base-graph';
import { SIMULATION } from './base-simulation';


let BLANK_GRAPH = JSON.parse(JSON.stringify(BASE_GRAPH));
let s = JSON.parse(JSON.stringify(SIMULATION));

BLANK_GRAPH.simulation = s;
BLANK_GRAPH.data.name  = 'blank'

export { BLANK_GRAPH }