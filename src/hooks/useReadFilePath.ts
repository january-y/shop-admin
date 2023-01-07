export const useReadFilePath = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (res: any) => {
      const result = res.target.result
      resolve(result)
    }
  })
}
