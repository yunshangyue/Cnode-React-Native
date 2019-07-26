export const BASE_URL = 'https://cnodejs.org/api/v1'
export const accesstoken = 'dad21a73-214a-43c9-b422-7f9232f452f5'
export const COMMON_COLOR = '#3f51B5'
const SCRIPTCODE =
    `
    window.onload = function() {
       var height = document.body.scrollHeight
        setTimeout(function () {
            window.ReactNativeWebView.postMessage(height)
          }, 300)
    }
    `

export function HTMLCODE(content) {
    const MARKDOWNCSSLINK = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css'
    const HTML = `<html>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scaleable=no">
                        <head>
                            <link rel="stylesheet" href=${MARKDOWNCSSLINK}>
                           
                        </head>
                        <body>
                            <div id="container" class='markdown-body'>${content}</div>
                             <script>
                                ${SCRIPTCODE}
                            </script>
                        </body>
                    </html>`
    return HTML
}