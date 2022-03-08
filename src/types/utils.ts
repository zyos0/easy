export const getThumbnail = (url: string) => {
    const thumbnailTemplate = 'https://img.youtube.com/vi/$id/default.jpg'
    const segments = url.split('=')
    if (segments.length < 1) {
        return
    }
    const videoId = segments[1]
    return thumbnailTemplate.replace('$id', videoId)
}
