const apikey = Symbol('apiKey1');
const config = {
    [apikey] : '2214d757420974de33269c0134506f82',
    getApiKey() {
        return this[apikey];
    }
}

export default config;


/**
 * status - HTTP 응답 코드
200: OK - 요청이 성공했음을 나타냅니다.
201: CREATED - 요청이 성공적으로 처리되어 새로운 리소스가 생성되었음을 나타냅니다.
400: BAD REQUEST - 클라이언트의 요청이 잘못되었음을 나타냅니다.
401: UNAUTHORIZED - 인증되지 않은 요청을 나타냅니다.
404: NOT FOUND - 요청한 리소스를 찾을 수 없음을 나타냅니다.
500: INTERNAL SERVER ERROR - 서버에서 오류가 발생했음을 나타냅니다.
 */