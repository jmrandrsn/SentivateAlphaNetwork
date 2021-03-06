module.exports = (state) => {
	state.logImprt('FILE', __dirname);
	const {
		writeFile,
		readFile
	} = require('fs');
	const {
		utility: {
			promise
		},
		success
	} = state;
	const operations = {
		write(fileName, contents, encode) {
			return promise((accept, reject) => {
				writeFile(fileName, contents, encode, (error) => {
					if (error) {
						reject(error);
					} else {
						success('SAVED', fileName);
						accept();
					}
				});
			});
		},
		read(fileName, encode) {
			return promise((accept, reject) => {
				readFile(fileName, encode, (error, contents) => {
					if (error) {
						reject(error);
					} else {
						accept(contents);
					}
				});
			});
		},
		async copy(source, destination, config) {
			let file = await operations.read(source);
			if (config) {
				if (config.prepend) {
					file = config.prepend + file;
				}
			}
			await operations.write(destination, file);
		}
	};
	state.file = operations;
};
