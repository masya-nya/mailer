export const BYTES_IN_MEGABYTE = 1024 * 1024;
export const DEFAULT_MAX_FILES_SIZE = 20 * BYTES_IN_MEGABYTE;

const validateFilesMaxSize = (
	files: Express.Multer.File[],
	maxSize: number = DEFAULT_MAX_FILES_SIZE
): boolean => {
	const totalSize = files.reduce((acc, file) => acc + file.size, 0);

	return totalSize < maxSize;
};

export default validateFilesMaxSize;
