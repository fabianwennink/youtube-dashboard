export const PLAY_VIDEO = 'PLAY_VIDEO';
export const STOP_VIDEO = 'STOP_VIDEO';

export function playVideo(id, title) {
    return {type: PLAY_VIDEO, data: {id, title}};
}

export function stopVideo() {
    return {type: STOP_VIDEO};
}
