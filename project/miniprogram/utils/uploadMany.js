export async function uploadMany(data) {
    let arr = []
    data.forEach(item => {
        let name = new Date().getTime()
        let ext = item.url.split(".").pop()
        let cloudPath = "images/" + name + "." + ext
        let promise = wx.cloud.uploadFile({
            cloudPath,
            filePath: item.url
        })
        arr.push(promise)
    })
    //是否全部上传
    return await Promise.all(arr)
}