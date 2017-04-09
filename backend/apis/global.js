global.modulePath = function(module, part){
    var rootPath = require('path').resolve(__dirname);
    var filePath = {
        '$root': `${module}`,
        'controller': `controllers/${module}`,
        'helper': `helpers/${module}`,
        'middleware': `middlewares/${module}`,
        'model': `models/${module}`,
        'repo': `models/${module}/${module}.repository`,
        'route': `routes/${module}`
    };

    if(!part){ part = '$root'; }

    return `${rootPath}/${filePath[part]}`;
};