class SrcMap extends Map {
    constructor(map){
        super();

        for(let [key, value] of map){
            this.set(key, value);
        }
    }

    get srcSet(){
        const srcset = [];
        for(let [key, value] of this){
            if(key!=='src'){
                srcset.push(value + ' ' + key + 'w');
            }
        }
        return srcset.join(', ');
    }

    get src(){
        return this.get('src');
    }
}

export default SrcMap;