import $ from 'jquery'

export class Home {

    attached() {
        $('#resizeable').resizable({
            handles: "n, e, s, w"
        })
    }
    
}