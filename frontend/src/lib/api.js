/**
 * 
 * @param {*} operation: 데이터를 처리하는 방법, 소문자만 사용한다. 	get, post, put, delete
 * @param {*} url: 요청 URL, 단 백엔드 서버의 호스트명 이후의 URL만 전달 	/api/question/list
 * @param {*} params: 요청 데이터 	{page: 1, keyword: "마크다운" }
 * @param {*} success_callback: API 호출 성공시 수행할 함수, 전달된 함수에는 API 호출시 리턴되는 json이 입력으로 주어진다.
 * @param {*} failure_callback: API 호출 실패시 수행할 함수, 전달된 함수에는 오류 값이 입력으로 주어진다.
 */
const fastapi = (operation, url, params, success_callback, failure_callback) => {
    let method = operation
    let content_type = 'application/json'
    let body = JSON.stringify(params)

    let _url = import.meta.env.VITE_SERVER_URL + url    // 환경변수로부터 불러옴

    if (method ==='get') {
        _url += "?" + new URLSearchParams(params)
    }

    let options = {
        method: method,
        headers: {
            "Content-Type": content_type
        }
    }

    if (method !== 'get') {
        options['body'] = body
    }

    fetch(_url, options)
        .then(response => {
            response.json()
                .then(json => {
                    if (response.status >= 200 && response.status < 300) {  // 200 ~299
                        if (success_callback) {
                            success_callback(json)
                        }
                    } else {
                        if (failure_callback) {
                            failure_callback(json)
                        } else {
                            alert(JSON.stringify(json))
                        }
                    }
                })
                .catch(error => {
                    alert(JSON.stringify(error))
                    console.error("Error while fetching")
                })
        })
}

export default fastapi