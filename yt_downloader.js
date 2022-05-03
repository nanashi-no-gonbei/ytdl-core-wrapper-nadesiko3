const fs = require('fs')
const ytdl = require('ytdl-core')

const pluginDownloader = {
    '初期化': {
        type: 'func',
        josi: [],
        fn: function (sys) { 

         }
    
    },
    'YOUTUBEダウンロード': { // youtubeの動画をダウンロードする クエリパラメータのvを指定する // @ヨミガナ
      type: 'func', // 関数であれば func にする
      josi: ['を'], // 助詞を配列で宣言する (可変長引数として扱いたい助詞は末尾で宣言する)
      isVariableJosi: false, // 末尾の助詞を可変長引数として扱う場合 true にする
      uses: [], // この関数から別の関数を呼ぶ場合に記述する // (TODO: #282)
      asyncFn: false, // async関数定義かPromiseを返す関数を定義する場合 true にする (参照: #1154)
      fn: function (videoID, sys) { 
          
        ytdl.getBasicInfo(`http://www.youtube.com/watch?v=${videoID}`).then(result => {
 
            let title = result.videoDetails.title.replaceAll('/', "")
            if(title == null){
                title = 'video'
            }
            ytdl(`http://www.youtube.com/watch?v=${videoID}`,
            { filter: format => format.qualityLabel === '1080p' || 
                                format.qualityLabel === '720p' || 
                                format.qualityLabel === '480p'})
            .pipe(fs.createWriteStream(`${title}.mp4`))           
        })

    }, // 関数の実態
      return_none: false // 戻り値を返すかどうか
    }
    
}

module.exports = pluginDownloader


