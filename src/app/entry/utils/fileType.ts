export const isImageFile = (filePath: string) => /\.(png|gif|jpe?g|webp)$/i.test(filePath);
export const isPdfFile = (filePath: string) => /\.pdf$/i.test(filePath);
