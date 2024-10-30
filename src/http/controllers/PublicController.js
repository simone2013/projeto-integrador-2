const path = require('path');

class PublicController {
    static index(req, res) {
        // Corrigindo o caminho para index.html
        res.sendFile(path.join(__dirname, '../../view/login/index.html'));
    }
}

module.exports = PublicController;