export interface Resource {
    id:string,
    content:HTMLImageElement
};

export class ResourceManager {
    private _resourceNameList:string[];
    private _resourceList:Resource[];
    constructor(resourceNameList:string[]) {
        this._resourceNameList = resourceNameList || [];
    }

    public getResource(id:string):Resource {
        for(let i = 0; i < this._resourceList.length; i++)
            if(this._resourceList[i].id === id) return this._resourceList[i];
        return null;
    }

    public getDrawable(id:string):HTMLImageElement {
        for(let i = 0; i < this._resourceList.length; i++)
            if(this._resourceList[i].id === id) return this._resourceList[i].content;
        return null;
    }

    public resourcesPrefetch(): Promise<void> {
        const resources = this._resourceNameList;
        return new Promise((resolve, reject) => {
            const resourcePromises = [];
            for(let i = 0; i < resources.length; i++)
                resourcePromises.push(this.resourceFetch(resources[i]));
            Promise.all(resourcePromises).then(resources => {
                this._resourceList = resources as Resource[];
                resolve();
            }).catch((e) => reject());
        });
    }

    private resourceFetch(resource:string): Promise<Resource> {
        const path = `assets/imgs/${resource}.png`;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', (e) => {
                console.debug(`Resource ${resource} loaded from ${path}`);
                resolve({id: resource, content: img} as Resource);
            })
            img.addEventListener('error', (error) => {
                console.log(`Error loading resource ${resource} from ${path}`);
                reject(error);
            })
            img.src = path;
        });
    }
}