// 根据响应信息添加token，以及获取token

export function getLongToken() {
  return localStorage.getItem('longToken');
}
export function setLongToken(res) {
  const { headers } = res;

  const longtoken = headers['x-long-token'];
  if (longtoken) {
    return localStorage.setItem('longToken', longtoken);
  }
}
