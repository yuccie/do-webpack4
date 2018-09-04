const path = require('path')

module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    output:{
        filename:'[name].boundle.js',
        path:path.resolve(__dirname,'dist')
    },
}