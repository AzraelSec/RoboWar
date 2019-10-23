export interface InputHandler {
    inputAttach(document: Document): InputHandlerTrack[];
}

export type InputHandlerTrack = {
    type: string;
    callback: EventListener;
}