const fs = require('fs')

module.exports = class FileHelper {

    constructor() {
        this.template_dir = './src/'
    }

    get_file(file_name){
        try {
            return fs.readFileSync(this.template_dir + file_name, 'utf8')
        } catch (err) {
            console.error(err)
        }
    }

    put_file(file_name, data){
        try {
            return fs.writeFileSync(this.template_dir + file_name, data,)
        } catch (err) {
            console.error(err)
        }
    }

}
