// module.exports = {
//   plugins: {
//     'autoprefixer': {
//       browsers: ['Android >= 4.0', 'iOS >= 7']
//     },
//     'postcss-pxtorem': {
//       rootValue: 75,
//       propList: ['*']
//     }
//   }
// };
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({
  file
}) => {
  let rootValue
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 37.5
  } else {
    rootValue = 75
  }
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: rootValue,
        propList: ['*','!transform-origin'],
        minPixelValue: 2
      })
    ]
  }
}