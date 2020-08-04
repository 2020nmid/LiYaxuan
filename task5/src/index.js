import data from './data.json';
import './index1.js';
import './style.css';
import './style1.css';
function fne(){
    console.log('fng');
}

fne()
console.log(data)

//开发坏境下打包
//webpack ./src/index.js -o ./dist/bundle.js --mode=development

//生产环境下打包
//webpack ./src/index.js -o ./dist/bundle_Production.js --mode=production