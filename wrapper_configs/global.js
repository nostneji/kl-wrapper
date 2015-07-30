
var config = {};

config.redis = {
    host: "127.0.0.1",
    port: 6379
};

config.fs = {
    storagePath: "/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/tmp",
    tmpPath: "/tmp/wrapper/"
};

config.paramUsageTypes = {
    META: 'meta', //ei kasutata utiliidi parameetrina
    STRING : 'string', //parameeter  asendatakse väärtusega
    FILE : 'file' //parameeteri väärtus salvestatakse faili ja faili pathi kasutatakse argumendina
};

config.wrapper = {
    title: null,
    port: null,
    class: null,
    command: null,
    requestConf: null
};

config.log4js = {
    appenders: [
        { type: 'console',
            layout: {
                type: 'pattern',
                pattern: "[%d] %[[%x{port}-%x{pid}][%5.5p]%] %c - %m",
                tokens: {
                    pid: process.pid,
                    port: function () {
                       return config.wrapper.port;
                    }
                }
            }
        },
        { type: 'file',
            filename: __dirname + '/../wrapper.log'
        }/*,
        { // Error reporting
            "type": "logLevelFilter",
            "level": "ERROR",
            "appender": {
                "type": "smtp",
                "recipients": "**********",
                "sendInterval": 10, //sec
                "transport": "SMTP",
                "SMTP": {
                    "host": "smtp.gmail.com",
                    "secureConnection": false,
                    "port": 587,
                    "auth": {
                        "user": "***********",
                        "pass": "***********"
                    },
                    "debug": true
                }
            }
        }*/
    ]
};

/*var someCommandRequest = {
    requestBodyTemplate: {
        is_async: null//,
        someparam: null
    },
    requestBodyParamsMappings: {
        is_async: {
            usageType: config.paramUsageTypes.META,
            filter: function(value){
                return value == 1;
            },
            required: true,
            allowEmpty: false,
            validator: function(value, request){ return true; }
        },
         someparam: {
         usageType: config.paramUsageTypes.STRING,
         filter: function(value){
             if(value == 'yes'){
                return '-o';
             }
             return null;
         },
         required: false,
         allowEmpty: true,
         validator: function(value, request){
             return true;
            }
         }
    },
    requestFiles: {
        content: null
    },
    staticParams: {
        sessionMaxLifetime: 600, //(s) Sessioonid, mille failide viimased muudatused on vanemad kui antud aeg, kustutatakse süsteemist
        //siin saab päringu parameetrite väärtused üle kirjutada
        isAsync: undefined //väärtustega true/false saab päringu väärtuse üle kirjutada
    }
};*/

var simpleCommandRequest = {
    requestBodyTemplate: {
        is_async: null
    },
    requestBodyParamsMappings: {
        is_async: {
            usageType: config.paramUsageTypes.META,
            filter: function(value){
                return value == 1;
            },
            required: true,
            allowEmpty: false,
            validator: function(value, request){ return true; }
        }
    },
    requestFiles: {
        content: null
    },
    staticParams: {
        sessionMaxLifetime: 600,
        isAsync: undefined
    }
};



config.availableCommands = {
    TOKENIZER : {
        commandTemplate: 'python /var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/tokenizer/tokenizer.py -i [data] -o [outputPath1]'
    },
    MORFANALYSAATOR : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./morfanalyzer.sh [data]'
    },
    LAUSESTAJA : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./lausestaja.sh [data]'
    },
    OSALAUSESTAJA : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./osalausestaja.sh [data]'
    },
    MORFYHESTAJA : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./morfyhestaja.sh [data]'
    },
    PIND_SYN : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./pindsyn.sh [data]'
    },
    S6LT_SYN : {
        commandTemplate: '/var/www/bitweb.ee/keeleliin.bitweb.ee/wrapper/utils/./s6ltsyn.sh [data]'
    }
};

config.availableWappers = {
    TOKENIZER : {
        title: 'Sõnestaja',
        port: 3008,
        class: 'tokenizer',
        command: config.availableCommands.TOKENIZER,
        requestConf: simpleCommandRequest
    },
    MORFANALYSAATOR : {
        title: 'Morfoloogiline analüüs',
        port: 3002,
        class: 'simpleLocalCommand',
        command: config.availableCommands.MORFANALYSAATOR,
        requestConf: simpleCommandRequest
    },
    LAUSESTAJA : {
        title: 'Lausestaja',
        port: 3001,
        class: 'simpleLocalCommand',
        command: config.availableCommands.LAUSESTAJA,
        requestConf: simpleCommandRequest
    },
    OSALAUSESTAJA : {
        title: 'Osalausestamine',
        port: 3003,
        class: 'simpleLocalCommand',
        command: config.availableCommands.OSALAUSESTAJA,
        requestConf: simpleCommandRequest
    },
    ARCHIVE_EXTRACTOR: {
        title: 'Arhiivi lahtipakkija',
        port: 3007,
        class: 'archiveExtractor',
        requestConf: simpleCommandRequest
    },
    MORFYHESTAJA: {
        title: 'Morfoloogiline ühestamine (kitsenduste grammatika)',
        port: 3004,
        class: 'simpleLocalCommand',
        command: config.availableCommands.MORFYHESTAJA,
        requestConf: simpleCommandRequest
    },
    PIND_SYN: {
        title: 'Pindsüntaktiline analüüs',
        port: 3005,
        class: 'simpleLocalCommand',
        command: config.availableCommands.PIND_SYN,
        requestConf: simpleCommandRequest
    },
    S6LT_SYN: {
        title: 'Sõltuvussüntaktiline analüüs (ja järeltöötlus)',
        port: 3006,
        class: 'simpleLocalCommand',
        command: config.availableCommands.S6LT_SYN,
        requestConf: simpleCommandRequest
    }
};

module.exports = config;