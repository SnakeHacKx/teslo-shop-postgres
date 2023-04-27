export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  // console.log({file});
  if (!file) return callback(new Error('File is empty'), false); // Si le mandamos false niega el archivo

  const fileExtension = file.mimetype.split('/')[1];
  //TODO: poner las validExtensions en variables de entorno
  const validExtensions = ['jpg', 'png', 'gif', 'jpeg']

  if (validExtensions.includes(fileExtension)){
    return callback(null, true);
  }

  callback(null, true);
};
