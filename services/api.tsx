const getToken = () => {
    return fetch(`https://api.baubuddy.de/index.php/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz',
      },
      body: JSON.stringify({
        username: '365',
        password: '1',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        const resToken = responseJson['oauth']['access_token'];
        return resToken;
      })
      .catch(error => {
        console.warn('error->', error);
      });
  };
  
  const getTasks = (resToken: any) => {
    return fetch('https://api.baubuddy.de/dev/index.php/v1/tasks/select', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: resToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.warn('error->', error);
      });
  };
  
  export { getToken, getTasks };
  