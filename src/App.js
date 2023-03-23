import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const API_KEY = "02241b2895cf1d944e81bbfa1e33842f"
  const [location, setLocation] = useState('');
  // jsx문법안에서 값에 접근하기 위해서 만듬, object로 접근하려고 {} 썼음 
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
 

  // 이 function에서 비동기 방식으로 API통신을 진행하기 위해서 async로 감싸줌
  const searchWeather = async (e) => {
    // 엔터가 눌렸을 경우
    if(e.key === 'Enter'){
      try{
        // 비동기적으로 받기위해 await를 사용
        const data = await axios({
          // 정보를 가져오는 API이므로 get method 사용
          method: 'get',
          url: url
        })
        console.log(data);
        setResult(data);
      }
      catch(err){
        alert(err);
      }
    }
  }

  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input
          placeholder='도시를 입력하세요'
          value={location}

          // 입력값이 들어올때 Location 바꾸기
          onChange={(e)=>setLocation(e.target.value)}
          type='text'

          // 입력후 키를 누를시 searchWeather함수가 호출됨
          onKeyDown={searchWeather}
        />
        {
          // 아직 API데이터를 가져오지 않았을때 즉 처음시작할 경우에 렌더링 오류 처리해주어야함
          // 즉 result가 빈 object가 아닐경우에만 날씨정보가 나오도록 설정
           Object.keys(result).length !== 0 && (
            <ResultWrap>
              <div className='city'>{result.data.name}</div>
              <div className='temperature'>  
                {Math.round((result.data.main.temp - 273.15) * 10) /10}°C
              </div>
              <div className='sky'>{result.data.weather[0].main}</div>
            </ResultWrap>
           )
        }
        

      </div>
      
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }

  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;

  .city{
    font-size: 24px;
  }
  .temperature{
    font-size: 60px;
    margin-top: 8px;
  }
  .sky{
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;